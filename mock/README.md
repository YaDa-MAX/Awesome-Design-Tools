# HeiBen — Mock-Server (Test ohne Backend)

Bedient die OpenAPI-Spezifikation (`../web/openapi.yaml`) als **Mock**: jeder Endpunkt
liefert Beispielantworten, die aus den Schemas der Spec erzeugt werden — ganz ohne
echtes Backend. Damit funktioniert auch „Try it out" in der Swagger-Seite (`web/api.html`).

## Voraussetzung
Node.js 18+ (für `npx`/`npm`).

## Starten

**Variante A — ohne Installation (npx):**
```bash
bash mock/run-mock.sh
```

**Variante B — mit npm (pinnt Prism):**
```bash
cd mock && npm install && npm run mock
```

Der Mock lauscht dann auf **http://127.0.0.1:4010**.

## Mit der Swagger-Seite nutzen
1. Kit über HTTP ausliefern (z. B. `python3 -m http.server 9000`) und `web/api.html` öffnen.
2. Im Feld **Servers** den Eintrag *„Mock (Prism, lokal — ohne Backend)"* wählen.
3. Für gesicherte Endpunkte oben **Authorize** klicken und ein beliebiges Token
   eingeben (z. B. `mock`) — der Mock akzeptiert jeden Bearer-Token.
4. Endpunkt aufklappen → **Try it out** → **Execute**. Du erhältst Beispielantworten.

## Per curl
```bash
curl http://127.0.0.1:4010/catalog
curl -X POST http://127.0.0.1:4010/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@heiben.de","password":"secret12"}'
curl http://127.0.0.1:4010/subscriptions -H 'Authorization: Bearer mock'
```

## Hinweise
- Antworten sind **Beispieldaten aus den Schemas**, keine echte Geschäftslogik.
- Prism setzt permissive CORS-Header, daher klappt „Try it out" aus dem Browser.
- Ohne Token liefern gesicherte Endpunkte korrekt **401** (Sicherheits-Check der Spec).
- Für zufällige statt statischer Beispiele: `... mock <spec> --dynamic`.
