// Lo que hay en `src/` es exactamente lo que el paquete exporta (bloque 4.10):
// un archivo que nadie puede importar es una copia olvidada, y una entrada de
// `exports` sin archivo rompe el panel o el portal al compilar. También vigila
// que ninguna pieza importe algo fuera de esta carpeta salvo React,
// react-dom y lucide-react.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
const raiz = new URL('..', import.meta.url);
const { exports } = JSON.parse(readFileSync(new URL('package.json', raiz), 'utf8'));
const destinos = new Set(Object.entries(exports).filter(([k]) => k !== './package.json').map(([, v]) => v.replace(/^\.\//, '')));
let mal = false;
const falla = (m) => { console.error(`FALLA: ${m}`); mal = true; };
for (const d of destinos) if (!existsSync(new URL(d, raiz))) falla(`exports apunta a ${d}, que no existe`);
const archivos = readdirSync(new URL('src/', raiz)).map((f) => `src/${f}`);
for (const f of archivos) if (!destinos.has(f)) falla(`${f} no está en exports de package.json`);
const PERMITIDOS = new Set(['react', 'react-dom', 'lucide-react']);
for (const f of archivos.filter((x) => /\.tsx?$/.test(x))) {
  for (const [, desde] of readFileSync(new URL(f, raiz), 'utf8').matchAll(/from '([^']+)'/g)) {
    const local = desde.startsWith('./') && ['', '.ts', '.tsx'].some((e) => existsSync(new URL(`src/${desde.slice(2)}${e}`, raiz)));
    if (!local && !PERMITIDOS.has(desde)) falla(`${f} importa «${desde}»: solo React, react-dom, lucide-react o un archivo de src/`);
  }
}
if (mal) process.exit(1);
console.log(`@gymflow/ui: ${archivos.length} archivos, todos exportados; solo importan React, react-dom, lucide-react y src/`);
