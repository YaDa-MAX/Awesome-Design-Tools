#!/usr/bin/env bash
# Schemathesis: erzeugt aus der Spec automatisch Konformitäts-Tests und prüft
# Statuscodes, Response-Schemas, Header etc. gegen die Ziel-URL.
# Default-Ziel ist der Prism-Mock (Selbsttest); für das echte Backend
# HEIBEN_BACKEND_URL setzen.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
BASE="${HEIBEN_BACKEND_URL:-http://127.0.0.1:4010}"
TOKEN="${HEIBEN_TOKEN:-mock}"
schemathesis run "$DIR/../web/openapi.yaml" --base-url "$BASE" --checks all \
  -H "Authorization: Bearer $TOKEN"
