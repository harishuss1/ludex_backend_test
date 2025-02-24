import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createTodo: async (_, { input }, { prisma }) => {
    return prisma.todo.create({
      data: {
        title: input.title,
        completed: false,
      },
    });
  },

  updateTodoTitle: async (_, { input }, { prisma }) => {
    return prisma.todo.update({
      where: { id: input.id },
      data: { title: input.title },
    });
  },

  toggleTodoCompletion: async (_, { id }, { prisma }) => {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) throw new Error("Todo not found");

    return prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  },

  deleteTodo: async (_, { id }, { prisma }) => {
    await prisma.todo.delete({ where: { id } });
    return true;
  },
};