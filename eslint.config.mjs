import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // La copia que el CLI de Netlify deja al publicar. Es el mismo JavaScript
    // minificado de `out/`, y sin esta línea el lint lo revisa y devuelve
    // miles de avisos sobre código que nadie escribió.
    ".netlify/**",
  ]),
]);

export default eslintConfig;
