import { GraphQLScalarType, Kind } from "graphql";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid ISO-8601 DateTime value",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return typeof value === "string" ? new Date(value) : null;
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  },
});
// This will format the date automatically 