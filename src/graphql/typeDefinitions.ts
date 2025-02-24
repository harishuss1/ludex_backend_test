export const typeDefs = /* GraphQL */ `

scalar DateTime

enum SortOrder {
  asc
  desc
}

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateTodoInput {
    title: String!
  }

  input UpdateTodoInput {
    id: ID!
    title: String!
  }

  
  type Query {
    hello: String
    getTodos(limit: Int = 10, offset: Int = 0, completed: Boolean, sortOrder: SortOrder = desc): [Todo!]!
    getTodoById(id: ID!): Todo   
    getCompletedTodos: [Todo!]!  
    getIncompleteTodos: [Todo!]! 
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! 
    updateTodoTitle(input: UpdateTodoInput!): Todo! 
    toggleTodoCompletion(id: ID!): Todo! 
    deleteTodo(id: ID!): Boolean! 
  }
`;
