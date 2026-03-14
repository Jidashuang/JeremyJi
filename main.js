/**
 * main.js – deferred, non-blocking JavaScript for Jeremy Ji's personal site.
 *
 * Performance principles applied throughout this file:
 *
 * 1. DEFERRED LOADING – the script tag uses `defer` so this file never blocks
 *    HTML parsing or the first contentful paint.
 *
 * 2. INTERSECTION OBSERVER instead of scroll listeners – scroll events fire
 *    dozens of times per second and run on the main thread, causing jank.
 *    IntersectionObserver callbacks run asynchronously and are coalesced by
 *    the browser, avoiding frame budget overruns.
 *
 * 3. DEBOUNCED RESIZE – when a resize listener is truly necessary, it is
 *    wrapped in a debounce so the handler runs once after the user stops
 *    resizing, not on every pixel change.
 *
 * 4. EVENT DELEGATION – a single listener on a container handles events for
 *    all children, reducing total listener count and GC pressure.
 *
 * 5. PASSIVE EVENT LISTENERS – touch/wheel listeners are marked { passive: true }
 *    so the browser knows it can scroll without waiting for JS to call
 *    preventDefault(), enabling smoother scrolling.
 *
 * 6. requestAnimationFrame for DOM writes – any direct style mutation is
 *    batched inside rAF to avoid layout thrashing (reading layout then
 *    immediately writing layout in a loop).
 *
 * 7. DOCUMENT FRAGMENT for batch DOM insertion – when multiple nodes are
 *    inserted, they are added to a DocumentFragment first so the browser only
 *    performs a single reflow.
 */

'use strict';

/* ── Utilities ──────────────────────────────────────────────────────────── */

/**
 * Returns a debounced version of `fn` that only runs after `wait` ms of
 * inactivity.  Prevents expensive handlers from firing on every event.
 *
 * @param {Function} fn   - Function to debounce.
 * @param {number}   wait - Quiet period in milliseconds.
 * @returns {Function}
 */
function debounce(fn, wait) {
  let timerId;
  return function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Returns a throttled version of `fn` that fires at most once every `limit`
 * ms.  Used for listeners that need *some* real-time feedback (e.g. header
 * hide/show on scroll) without triggering on every pixel.
 *
 * @param {Function} fn    - Function to throttle.
 * @param {number}   limit - Minimum interval in milliseconds.
 * @returns {Function}
 */
function throttle(fn, limit) {
  let lastTime = 0;
  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime >= limit) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/* ── Copyright year ─────────────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Scroll-reveal via IntersectionObserver ─────────────────────────────── */
/*
 * Performance improvement over a scroll listener approach:
 *   OLD (slow): window.addEventListener('scroll', () => { elements.forEach(el
 *     => { if (el.getBoundingClientRect().top < window.innerHeight) … }) })
 *     → triggers layout thrashing (getBoundingClientRect forces reflow),
 *       runs on every scroll event.
 *   NEW (fast): IntersectionObserver observes elements asynchronously.
 *       Zero main-thread cost while elements are off-screen.
 */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // stop watching once revealed
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}());

/* ── Skill bars ─────────────────────────────────────────────────────────── */
/*
 * Performance improvement: trigger CSS transitions via a class toggle rather
 * than animating style.width in a JavaScript loop with setInterval/setTimeout.
 * CSS transitions on width are handled by the browser's animation engine and
 * can be optimised independently of JS execution.
 */
(function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        skillsSection.classList.add('skills-animated');
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  observer.observe(skillsSection);
}());

/* ── Animated stat counters ─────────────────────────────────────────────── */
/*
 * Performance improvement: use requestAnimationFrame for the counting
 * animation instead of setInterval.  rAF is synced to the display refresh
 * rate (typically 60 fps), produces smoother visuals, and is automatically
 * paused when the tab is in the background, saving CPU.
 *
 * ALSO improved: a single IntersectionObserver starts all counters together
 * when the about section enters the viewport, rather than each counter
 * registering its own scroll listener.
 */
(function initStatCounters() {
  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  if (!counterEls.length) return;

  /**
   * Animate a single counter element from 0 to its data-target value.
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200; // ms
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quadratic for a natural deceleration feel
      const eased = 1 - (1 - progress) ** 2;
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Announce final value to screen readers via aria-valuenow on the
        // parent stat card (which already has a visible label).
        el.closest('.stat-card')?.setAttribute('aria-label',
          `${target}+ ${el.nextElementSibling?.textContent ?? ''}`);
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        counterEls.forEach(animateCounter);
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}());

/* ── Header hide / show on scroll ──────────────────────────────────────── */
/*
 * Performance improvement: throttle the scroll handler to at most once every
 * 100 ms.  Using a CSS class toggle + CSS transition on the header means the
 * hide/show animation runs on the compositor thread (transform), not the
 * main thread.
 *
 * Listener is also marked { passive: true } so the browser doesn't wait for
 * JS before performing the scroll, keeping scrolling silky smooth.
 */
(function initHeaderBehaviour() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = 0;

  const onScroll = throttle(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = currentScrollY;
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}());

/* ── Smooth scroll for nav links ───────────────────────────────────────── */
/*
 * Performance improvement: event delegation – a single listener on the <nav>
 * element handles clicks for all anchor children, rather than attaching one
 * listener per link.  This reduces memory usage and is more robust when
 * links are added/removed dynamically.
 */
(function initSmoothScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}());

/* ── Contact form ──────────────────────────────────────────────────────── */
/*
 * Performance improvement: client-side validation prevents a round-trip to
 * the server for obviously invalid inputs.  The form submission itself uses
 * fetch() so the page never fully reloads.
 *
 * Validation runs on 'input' (debounced) for real-time feedback without
 * hammering the DOM, and on 'submit' for final checks.
 */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');

  /** @param {HTMLInputElement|HTMLTextAreaElement} field */
  function getError(field) {
    if (!field.value.trim()) return `${field.labels?.[0]?.textContent ?? 'Field'} is required.`;
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  /** Show or clear the error for a single field. */
  function validateField(field) {
    const errorEl = field.closest('.form-group')?.querySelector('.field-error');
    const error = getError(field);
    if (errorEl) errorEl.textContent = error;
    field.classList.toggle('invalid', Boolean(error));
    return !error;
  }

  /*
   * Debounced real-time validation: wait 300 ms after the user stops typing
   * before running the validator so it doesn't fire on every keystroke.
   */
  const debouncedValidate = debounce((field) => validateField(field), 300);

  form.addEventListener('input', (e) => {
    if (e.target.matches('input, textarea')) {
      debouncedValidate(e.target);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('input, textarea')];
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    statusEl.textContent = 'Sending…';

    try {
      /*
       * Replace this URL with your actual form endpoint (e.g. Formspree,
       * Netlify Forms, or your own API).
       */
      const response = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (response.ok) {
        statusEl.textContent = "\u2713 Message sent! I\u2019ll get back to you soon.";
        form.reset();
      } else {
        statusEl.textContent = 'Something went wrong. Please try again.';
      }
    } catch {
      statusEl.textContent = 'Network error. Please check your connection and try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}());

/* ── Add data-reveal to sections for scroll animations ──────────────────── */
/*
 * Sections are marked programmatically rather than in HTML so that the page
 * degrades gracefully when JS is disabled (content is visible by default).
 */
(function addRevealAttributes() {
  document.querySelectorAll('.section').forEach((el) => {
    el.setAttribute('data-reveal', '');
  });
}());
