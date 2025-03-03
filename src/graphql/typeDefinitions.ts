export const typeDefs = /* GraphQL */ `

scalar DateTime

  enum SortOrder {
    asc
    desc
  }
    
  type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
  }

  type TodoEdge {
    cursor: String!
    node: Todo!
  }

  type TodoConnection {
    edges: [TodoEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
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
    getTodos(first: Int = 10, after: String, completed: Boolean, sortOrder: SortOrder = desc): TodoConnection!
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
