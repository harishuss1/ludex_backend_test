import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { Prisma } from "@prisma/client";

export const Query: IQuery<Context> = {
  hello: () => "world",

  getTodos: async (_, { limit = 10, offset = 0, completed, sortOrder = "desc" }, { prisma }) => {
    return prisma.todo.findMany({
      where: completed !== null && completed !== undefined ? { completed } : undefined, 
      skip: offset,
      take: limit,
      orderBy: { createdAt: sortOrder as Prisma.SortOrder }, 
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