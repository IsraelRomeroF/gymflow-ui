import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

const globales = {
  process: "readonly", console: "readonly", URL: "readonly", setTimeout: "readonly", clearTimeout: "readonly",
  window: "readonly", document: "readonly", HTMLElement: "readonly", HTMLInputElement: "readonly", Intl: "readonly",
};

/**
 * LO COMPARTIDO NO CONOCE A NINGUNA APP (auditoría 8, D-40, bloque 4.10).
 * Estas piezas las usan el panel y el portal: no importan nada de ninguno de
 * los dos (`@/…` es otra cosa en cada app) ni del núcleo de negocio. Solo
 * React, react-dom, lucide-react y los archivos de esta misma carpeta.
 */
const SOLO_REACT = ["error", {
  patterns: [
    { group: ["@/*", "@gymflow/web", "@gymflow/web/*", "@gymflow/portal", "@gymflow/portal/*", "../../*"], message: "@gymflow/ui no importa de las apps: lo compartido no puede depender de una de ellas." },
    { group: ["@gymflow/core", "@gymflow/core/*", "@gymflow/db", "@gymflow/db/*"], message: "@gymflow/ui son piezas de diseño: el negocio llega como argumento." },
  ],
}];

export default tseslint.config(
  { ignores: ["node_modules/**"] },
  { languageOptions: { globals: globales } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  { files: ["src/**/*.{ts,tsx}"], rules: { "no-restricted-imports": SOLO_REACT } },
);
