// Tope de estilos en línea de las piezas compartidas (UX7 sistema 6), como en
// el panel y el portal: el aspecto vive en `src/compartido.css`. Este número
// solo puede bajar: si quitas estilos en línea, bájalo aquí también.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const TOPE = 1; // 4.10 (2026-11-24): el de `Skeleton` en compartido.tsx (ancho y alto que pide quien lo usa).
const src = new URL('../src', import.meta.url).pathname;
const n = readdirSync(src).filter((f) => f.endsWith('.tsx')).reduce((a, f) => a + (readFileSync(join(src, f), 'utf8').match(/style=\{\{/g) ?? []).length, 0);
if (n > TOPE) { console.error(`FALLA: ${n} estilos en línea (tope ${TOPE}). Usa una clase de compartido.css.`); process.exit(1); }
console.log(`estilos en línea: ${n} (tope ${TOPE})`);
