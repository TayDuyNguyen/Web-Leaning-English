import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `Repo/` holds third-party checkouts kept as local reference material (see
  // .gitignore). They are not part of this app's source and must never enter the
  // lint graph — their build scripts use globals this project does not declare.
  globalIgnores(['dist', 'Repo']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Node-context files: build scripts and the test runner. Without this block
    // they either inherit browser globals or, in the .mjs case, match no config
    // at all and go silently unlinted.
    files: ['scripts/**/*.{js,mjs,cjs}', 'test/**/*.{js,mjs,cjs}', 'eslint.config.js', 'vite.config.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
])
