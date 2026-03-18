#!/usr/bin/env bash
set -euo pipefail

TARGET_PROFILE="${1:-jeremyjee}"
OUTPUT_DIR="${2:-public/instagram}"
LOGIN_USER="${INSTAGRAM_LOGIN:-}"

if [[ ! -x ".venv/bin/instaloader" ]]; then
  echo "Instaloader not found in .venv. Creating a local virtual environment..."
  python3 -m venv .venv
  .venv/bin/python -m pip install instaloader >/dev/null
fi

mkdir -p "${OUTPUT_DIR}"

ARGS=(
  "--dirname-pattern" "${OUTPUT_DIR}"
  "--fast-update"
  "--no-videos"
  "--no-captions"
  "--no-metadata-json"
  "${TARGET_PROFILE}"
)

if [[ -n "${LOGIN_USER}" ]]; then
  ARGS=(--login "${LOGIN_USER}" "${ARGS[@]}")
  echo "Syncing ${TARGET_PROFILE} with login user ${LOGIN_USER}..."
else
  echo "Syncing ${TARGET_PROFILE} without login..."
  echo "Note: private profiles will fail without --login."
fi

.venv/bin/instaloader "${ARGS[@]}"

echo "Done. Synced files are in ${OUTPUT_DIR}."
