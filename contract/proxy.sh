#!/usr/bin/env bash
# Prism im PROXY-Modus: leitet an das echte Backend weiter und prüft jede
# Anfrage/Antwort live gegen die OpenAPI-Spec. Mit --errors werden Verstöße
# zu Fehlerantworten (inkl. Begründung). Client/Swagger auf Port 4020 zeigen lassen.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND="${HEIBEN_BACKEND_URL:-http://127.0.0.1:8080}"
echo "Prism-Proxy → $BACKEND  (Spec-Verstöße = Fehler) auf http://127.0.0.1:4020"
npx --yes @stoplight/prism-cli@5 proxy "$DIR/../web/openapi.yaml" "$BACKEND" --errors -p 4020 -h 127.0.0.1
