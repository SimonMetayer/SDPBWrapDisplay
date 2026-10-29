#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
port="${SDPBWRAPDISPLAY_PORT:-8000}"
printf 'Serving SDPBWrapDisplay at http://127.0.0.1:%s/\n' "$port"
exec python3 -m http.server "$port" --bind 127.0.0.1
