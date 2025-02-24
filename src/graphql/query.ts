import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  getTodos: async (_, __, { prisma }) => {
    return prisma.todo.findMany();
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