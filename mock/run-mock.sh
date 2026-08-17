#!/usr/bin/env bash
# HeiBen Mock-Server — bedient die OpenAPI-Spec als Mock (ohne Backend).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
SPEC="$DIR/../web/openapi.yaml"
echo "Starte Mock auf http://127.0.0.1:4010  (Spec: $SPEC)"
npx --yes @stoplight/prism-cli@5 mock "$SPEC" -p 4010 -h 127.0.0.1
