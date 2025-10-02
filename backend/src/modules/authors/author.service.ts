import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authorService = {
  getAll: () => prisma.author.findMany({ orderBy: { id: "asc" } }),
  getById: (id: number) => prisma.author.findUnique({ where: { id } }),
  create: (data: { name: string; bio?: string }) =>
    prisma.author.create({ data }),
  update: (id: number, data: { name?: string; bio?: string }) =>
    prisma.author.update({ where: { id }, data }),
  deleteWithBooks: (id: number) =>
    prisma.$transaction([
      prisma.book.deleteMany({ where: { authorId: id } }),
      prisma.author.delete({ where: { id } }),
    ]),
};
