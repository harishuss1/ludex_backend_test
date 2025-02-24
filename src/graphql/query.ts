import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { Prisma } from "@prisma/client";

export const Query: IQuery<Context> = {
  hello: () => "world",

  getTodos: async (_, { first = 10, after, completed, sortOrder = "desc" }, { prisma }) => {
    const MAX_LIMIT = 50;
    const limit = Math.min(first, MAX_LIMIT); 

    const where: Prisma.TodoWhereInput = completed !== undefined ? { completed: Boolean(completed) } : {};
    const orderBy: Prisma.TodoOrderByWithRelationInput = { createdAt: sortOrder as Prisma.SortOrder };
    const cursor = after ? { id: after } : undefined;

    const todos = await prisma.todo.findMany({
      where,
      take: limit + 1, 
      cursor,
      skip: after ? 1 : 0, 
      orderBy,
    });

    const totalCount = await prisma.todo.count({ where });

    const hasNextPage = todos.length > limit;
    const edges = todos.slice(0, limit).map(todo => ({
      cursor: todo.id,
      node: todo,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor: hasNextPage ? todos[limit].id : null,
      },
      totalCount,
    };
  },

  getTodoById: async (_, { id }, { prisma }) => {
    return prisma.todo.findUnique({ where: { id } });
  },

  getCompletedTodos: async (_, __, { prisma }) => {
    return prisma.todo.findMany({ where: { completed: true } });
  },

  getIncompleteTodos: async (_, __, { prisma }) => {
    return prisma.todo.findMany({ where: { completed: false } });
  },
};