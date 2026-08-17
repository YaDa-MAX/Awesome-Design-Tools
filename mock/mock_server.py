#!/usr/bin/env python3
# Schlanker, schema-konformer Mock der HeiBen-Buchungs-API.
# Endpunkte: GET /availability, POST /quotes, POST /bookings, GET /bookings/{ref}.
# Validiert Requests gegen das OpenAPI-Schema (anyOf quoteId|items; items[].productId/date),
# liefert Beispiel-konforme Antworten. CORS aktiv. Bootet sofort.
import json, sys, datetime, threading, time, hashlib
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

REQLOG='/tmp/mock_requests.log'
open(REQLOG,'w').close()
CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,GET,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Prefer,Authorization'}

def logreq(d):
    with open(REQLOG,'a') as f: f.write(json.dumps(d)+'\n')

def unit_price(pid):
    h=int(hashlib.md5(pid.encode()).hexdigest(),16)
    return 20.0 + (h % 6)*5.0

def money(a): return {'amount':round(a,2),'currency':'EUR'}

class H(BaseHTTPRequestHandler):
    def _send(self,code,obj,ctype='application/json'):
        body=json.dumps(obj).encode()
        self.send_response(code)
        for k,v in CORS.items(): self.send_header(k,v)
        self.send_header('Content-Type',ctype); self.send_header('Content-Length',str(len(body)))
        self.end_headers(); self.wfile.write(body)
    def do_OPTIONS(self):
        self.send_response(204)
        for k,v in CORS.items(): self.send_header(k,v)
        self.end_headers()
    def do_GET(self):
        u=urlparse(self.path); q=parse_qs(u.query)
        if u.path.rstrip('/')=='/availability':
            pid=(q.get('productId') or [''])[0]; date=(q.get('date') or [''])[0]
            persons=int((q.get('persons') or ['1'])[0] or 1)
            if not pid or not date:
                return self._send(422,{'title':'productId und date erforderlich','status':422},'application/problem+json')
            try: day=int(date.split('-')[-1])
            except: day=1
            available = (day % 7 != 0)
            remaining = 0 if not available else 2 + (int(hashlib.md5((pid+date).encode()).hexdigest(),16) % 7)
            up=unit_price(pid)
            logreq({'path':'/availability','productId':pid,'date':date,'available':available})
            return self._send(200,{'productId':pid,'date':date,'persons':persons,'available':available,
                'remaining':remaining,'unitPrice':money(up),'totalPrice':money(up*persons)})
        if self.path.startswith('/bookings/'):
            ref=self.path.split('/')[-1]
            return self._send(200,{'reference':ref,'status':'confirmed','items':[],'total':money(58.0)})
        return self._send(404,{'title':'Not found','status':404})
    def do_POST(self):
        ln=int(self.headers.get('Content-Length','0') or 0)
        raw=self.rfile.read(ln) if ln else b'{}'
        try: body=json.loads(raw or b'{}')
        except Exception: body={}
        path=urlparse(self.path).path.rstrip('/') or '/'
        if path=='/quotes':
            items=body.get('items'); persons=int(body.get('persons') or 1)
            ok=isinstance(items,list) and len(items)>0 and all(isinstance(i,dict) and i.get('productId') and i.get('date') for i in items)
            logreq({'path':'/quotes','valid':bool(ok),'n':(len(items) if isinstance(items,list) else 0)})
            if not ok:
                return self._send(422,{'title':'items[].productId und date erforderlich','status':422},'application/problem+json')
            qitems=[]; total=0.0
            for i in items:
                up=unit_price(i['productId']); lt=up*persons; total+=lt
                qitems.append({'productId':i['productId'],'title':i.get('title') or i['productId'],
                    'date':i['date'],'unitPrice':money(up),'lineTotal':money(lt)})
            vu=(datetime.datetime.utcnow()+datetime.timedelta(days=14)).replace(microsecond=0).isoformat()+'Z'
            return self._send(200,{'quoteId':'q_9f2c7a','persons':persons,'currency':'EUR',
                'validUntil':vu,'items':qitems,'total':money(total)})
        if path=='/bookings':
            items=body.get('items')
            ok=bool(body.get('quoteId')) or (isinstance(items,list) and len(items)>0 and
                all(isinstance(i,dict) and i.get('productId') for i in items))
            logreq({'path':'/bookings','valid':bool(ok),'quoteId':body.get('quoteId'),
                    'productId':(items[0].get('productId') if isinstance(items,list) and items else None)})
            if not ok:
                return self._send(422,{'title':'quoteId oder items[].productId erforderlich','status':422},'application/problem+json')
            its=items or []
            booking={'reference':'HB-6MK2V1','status':'confirmed','persons':body.get('persons',1),
                     'createdAt':datetime.datetime.utcnow().replace(microsecond=0).isoformat()+'Z',
                     'quoteId':body.get('quoteId'),
                     'items':[{'productId':i.get('productId'),'date':i.get('date',''),'status':'confirmed'} for i in its] or
                             [{'productId':'-','date':'','status':'confirmed'}],
                     'total':money(58.0)}
            return self._send(201,booking)
        return self._send(404,{'title':'Not found','status':404})
    def log_message(self,*a): pass

if __name__=='__main__':
    port=int(sys.argv[1]) if len(sys.argv)>1 else 4010
    srv=HTTPServer(('127.0.0.1',port),H)
    threading.Thread(target=srv.serve_forever,daemon=True).start()
    print('mock listening on %d (availability, quotes, bookings)'%port,flush=True)
    while True: time.sleep(1)
