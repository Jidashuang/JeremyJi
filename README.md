# JeremyJi

My personal website – a fast, accessible, single-page portfolio built with
vanilla HTML, CSS, and JavaScript.

## Performance improvements implemented

This site was built from scratch with performance as a first-class concern.
Every decision is motivated by a measurable improvement in load time, runtime
smoothness, or memory usage.

### Loading

| Technique | Why it's faster |
|-----------|-----------------|
| **Critical CSS inlined** in `<head>` | The browser can paint the hero section immediately without waiting for an external stylesheet round-trip. |
| **Non-critical CSS loaded asynchronously** (`media="print"` + `onload`) | `styles.css` is fetched in the background and applied after the first paint, eliminating a render-blocking resource. |
| **Google Fonts loaded with `display=swap`** | Body text is visible instantly using a system font; the web font swaps in once downloaded. |
| **`<link rel="preconnect">` for font origins** | Establishes TCP + TLS connections to `fonts.googleapis.com` and `fonts.gstatic.com` early, cutting hundreds of milliseconds from font load time on cold connections. |
| **`<script defer>`** | `main.js` is downloaded in parallel with HTML parsing and executes after parsing is complete, never blocking the first paint. |

### Runtime (JavaScript)

| Technique | Why it's faster |
|-----------|-----------------|
| **`IntersectionObserver` for scroll-reveal** | Replaces the common anti-pattern of a `scroll` event listener that calls `getBoundingClientRect()` in a loop. `getBoundingClientRect` forces a synchronous layout (reflow); `IntersectionObserver` runs asynchronously on a background thread, costing zero main-thread time while elements are off-screen. |
| **`IntersectionObserver` for skill bars** | Triggers the CSS `width` transition only when the section enters the viewport. The CSS transition itself runs on the compositor thread (no JS loop needed). |
| **`requestAnimationFrame` for stat counters** | Replaces `setInterval`-based counters. `rAF` is synced to the display refresh rate (60 fps), produces smoother animation, and is automatically paused when the tab is hidden, saving CPU. |
| **Throttled scroll handler** (`100 ms`) | The header hide/show handler runs at most once every 100 ms. Combined with a CSS `transform` transition (compositor-thread, no reflow), scrolling stays jank-free. |
| **`{ passive: true }` on scroll listener** | Tells the browser the handler will never call `preventDefault()`, so it can scroll immediately without waiting for JS — critical for 60 fps touch scrolling on mobile. |
| **Event delegation for nav links** | One `click` listener on `<nav>` handles all anchor links instead of one listener per link, reducing listener count and GC pressure. |
| **Debounced form validation** (`300 ms`) | Validation runs 300 ms after the user stops typing, not on every keystroke, so the DOM is updated at most a few times per typing burst. |
| **`fetch()` for form submission** | Submitting the contact form via `fetch` avoids a full page reload and the associated re-parse/re-render cycle. |

### CSS

| Technique | Why it's faster |
|-----------|-----------------|
| **`transform` + `opacity` for all animations** | These properties are GPU-composited and do not trigger layout or paint. Alternatives like `top`/`left`/`width` changes do trigger layout (expensive). |
| **`auto-fill` grid for project cards** | The browser handles responsive column counts natively; no JavaScript resize listener is needed. |
| **CSS custom properties for theme values** | A single source of truth avoids repetitive declarations and enables instant theme changes without JS. |
| **`::after` pseudo-element for the title underline** | No extra DOM element is needed; the browser renders it as part of the CSS paint pass. |

## File structure

```
index.html   – HTML with inlined critical CSS
styles.css   – Non-critical styles (loaded async)
main.js      – Deferred JavaScript
README.md    – This file
```

## Running locally

No build step required. Open `index.html` directly in a browser, or serve the
directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
