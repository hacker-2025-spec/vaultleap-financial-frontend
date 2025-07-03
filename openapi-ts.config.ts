import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: { name: '@hey-api/client-axios', bundle: false },
  experimentalParser: true,
  input: 'api/openapi.json',

  output: {
    clean: true,
    lint: 'eslint',
    format: 'prettier',
    path: './client',
  },
  types: {
    name: 'PascalCase',
  },
  services: {
    operationId: true,
  },
  plugins: [
    ...defaultPlugins,
    '@hey-api/transformers',
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
    '@hey-api/schemas',
    'zod',
    {
      name: '@hey-api/sdk',
      validator: true,
    },
    '@tanstack/react-query',
    {
      asClass: false, // default
      name: '@hey-api/sdk',
    },
  ],
})
