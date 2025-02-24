import type { CodegenConfig } from "@graphql-codegen/cli";

import { typeDefs } from "./src/graphql/typeDefinitions";

const config: CodegenConfig = {
  overwrite: true,
  schema: typeDefs.toString(),
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
