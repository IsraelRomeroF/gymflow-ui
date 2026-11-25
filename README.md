# @gymflow/ui

Lo que comparten el **panel** (`gymflow-web`) y el **portal del socio** (`gymflow-portal`) de GymFlow: los tokens de color y medida, los estilos de las piezas comunes y las piezas de diseño en React. Una sola copia para las dos apps (auditoría 8, decisión D-40, bloque 4.10). Antes eran ocho archivos «espejo» copiados a mano en los dos repos y vigilados por huella.

## Qué vive aquí

| Se importa como | Archivo | Qué es |
|---|---|---|
| `@gymflow/ui/tokens.css` | `src/tokens.css` | Colores, escala de texto y de alturas, movimiento. Solo estos tokens; ningún color nuevo |
| `@gymflow/ui/compartido.css` | `src/compartido.css` | Estilos de las piezas de abajo (y de los campos de fecha y hora) |
| `@gymflow/ui/compartido` | `src/compartido.tsx` | `Badge`, `Callout`, `ErrorCarga`, `Empty`, `Skeleton`, `IconTile`, `IconButton`, `Button` |
| `@gymflow/ui/dialogo` | `src/dialogo.tsx` | `Dialog`: en `document.body`, teclado y foco, el error en el pie; con `hoja`, la hoja inferior del portal |
| `@gymflow/ui/campos` | `src/campos.tsx` | `CampoFecha` y `CampoHora`: día/mes/año y hora de 24 sin depender del equipo |
| `@gymflow/ui/carga` | `src/carga.tsx` | `useCarga` y `EstadoCarga`: cargas con sus tres estados |
| `@gymflow/ui/format` | `src/format.ts` | Pesos, fechas y horas en la zona del gimnasio |
| `@gymflow/ui/formulario` | `src/formulario.ts` | `useFormulario`: errores por campo y el foco al primero |

Lo que cambia entre las dos apps no está aquí: cada `globals.css` ajusta medidas con las variables `--c-*` y pone sus propias clases (`dialog-*` en el panel, `sheet-*` en el portal). Nada de este paquete importa de una app (`@/…`) ni del núcleo.

## Cómo lo usan el panel y el portal

- `package.json`: `"@gymflow/ui": "link:../gymflow-ui"` (carpeta hermana, igual que `@gymflow/core`).
- `next.config.ts`: `transpilePackages: ['@gymflow/ui']` (se compila desde el código, sin `dist/`) y `turbopack.root` en la carpeta que contiene a los repos.
- `app/globals.css` empieza con `@import '@gymflow/ui/tokens.css';` y `@import '@gymflow/ui/compartido.css';`, en ese orden.
- `pnpm test:tokens` de cada app falla si alguien vuelve a crear una copia local.

## Uso

```bash
pnpm install
pnpm verify     # typecheck, lint, pruebas de format, tope de estilos en línea y exports
```

Para cambiar una pieza: se edita aquí, una vez, y se mira en las dos apps (`next dev` recarga solo). Al cambiar un color o una medida, `pnpm test:contraste` del panel y del portal dice si sigue pasando AA.

Repo público: sin datos reales ni secretos; los ejemplos usan datos inventados.
