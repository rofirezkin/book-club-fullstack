import { PrismaClient, Book } from "@prisma/client";

const prisma = new PrismaClient();

type CreateBookInput = {
  title: string;
  authorId: number;
  description?: string;
  publishedYear?: number;
};

type UpdateBookInput = Partial<CreateBookInput>;

export const bookService = {
  getAll: () =>
    prisma.book.findMany({
      orderBy: { id: "asc" },
      include: { author: true },
    }),

  getById: (id: number) =>
    prisma.book.findUnique({
      where: { id },
      include: { author: true },
    }),

  create: (data: CreateBookInput) =>
    prisma.book.create({
      data,
      include: { author: true },
    }),

  update: (id: number, data: UpdateBookInput) =>
    prisma.book.update({
      where: { id },
      data,
      include: { author: true },
    }),

  delete: (id: number) => prisma.book.delete({ where: { id } }),

  checkAuthorExists: (id: number) =>
    prisma.author.findUnique({ where: { id } }),
};
