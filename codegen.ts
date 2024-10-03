import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    // 'src/graphql': {
    //   preset: 'client',
    //   plugins: []
    // },
    'src/graphql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ]
    }
  }
}

export default config
