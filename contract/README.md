# HeiBen — Contract-Tests

Prüft, ob ein (späteres) echtes Backend dem API-Vertrag (`../web/openapi.yaml`) folgt.
Zwei sich ergänzende Verfahren.

## 1 · Prism Proxy — Laufzeit-Wächter
Leitet Anfragen an das echte Backend weiter und validiert **live** Anfrage und
Antwort gegen die Spec. Mit `--errors` werden Verstöße zu klaren Fehlerantworten.
```bash
HEIBEN_BACKEND_URL=https://staging-api.heiben.de bash contract/proxy.sh
# Client/Swagger dann auf http://127.0.0.1:4020 zeigen lassen.
```
Eignet sich für manuelles Durchklicken und als Gate in der Entwicklung.

## 2 · Schemathesis — automatische Konformitäts-Suite
Erzeugt aus der Spec property-based Testfälle und prüft u. a. Statuscodes,
Response-Schemas, Content-Type und Header.
```bash
pip install schemathesis
# gegen das echte Backend:
HEIBEN_BACKEND_URL=https://staging-api.heiben.de HEIBEN_TOKEN=<jwt> bash contract/schemathesis.sh
# oder als Selbsttest gegen den Mock (Terminal 1: bash mock/run-mock.sh):
bash contract/schemathesis.sh
# nur generieren, ohne Netz:
schemathesis run web/openapi.yaml --dry-run --base-url http://127.0.0.1:4010
```

## Hinweise
- Gegen den **Mock** prüft Schemathesis, dass der Mock spec-konform ist (Selbsttest).
  Gegen das **echte Backend** prüft es dessen Vertragstreue.
- In CI: Schemathesis als Job nach dem Deploy aufs Staging; Prism-Proxy lokal.
- Auth: gesicherte Endpunkte brauchen `Authorization: Bearer <token>`.
