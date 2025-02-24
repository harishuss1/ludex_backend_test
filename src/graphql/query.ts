import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  getTodos: async (_, { limit = 10, offset = 0 }, { prisma }) => {
    return prisma.todo.findMany({
      skip: offset,  
      take: limit,  
      orderBy: { createdAt: "desc" }, 
    });
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