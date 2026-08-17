/* Kopiert die Web-Assets aus ../web in ./www (einzige Quelle der Wahrheit bleibt ../web). */
import { rm, cp, mkdir } from 'node:fs/promises';
const SRC = new URL('../web/', import.meta.url);
const DST = new URL('./www/', import.meta.url);
await rm(DST, { recursive: true, force: true });
await mkdir(DST, { recursive: true });
await cp(SRC, DST, { recursive: true });
console.log('✓ ../web → ./www kopiert');
