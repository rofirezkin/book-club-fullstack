import { FastifyReply, FastifyRequest } from "fastify";
import {
  errorResponse,
  successResponse,
} from "../../helpers/response-formatter";
import { bookService } from "./book.service";

type BookParams = { id: number };
type CreateBookBody = {
  title: string;
  authorId: number;
  description?: string;
  publishedYear?: number;
};
type UpdateBookBody = Partial<CreateBookBody>;

export const bookController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const books = await bookService.getAll();
      return successResponse(books, 200, "Books retrieved successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve books";
      reply.code(500);
      return errorResponse(message, 500);
    }
  },

  getById: async (
    req: FastifyRequest<{ Params: BookParams }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const book = await bookService.getById(id);
      if (!book) {
        reply.code(404);
        return errorResponse("Book not found", 404);
      }
      return successResponse(book, 200, "Book retrieved successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve book";
      reply.code(500);
      return errorResponse(message, 500);
    }
  },

  create: async (
    req: FastifyRequest<{ Body: CreateBookBody }>,
    reply: FastifyReply
  ) => {
    try {
      const { authorId } = req.body;
      const author = await bookService.checkAuthorExists(authorId);
      if (!author) {
        reply.code(400);
        return errorResponse("Invalid authorId", 400);
      }
      const book = await bookService.create(req.body);
      reply.code(201);
      return successResponse(book, 201, "Book created successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create book";
      reply.code(500);
      return errorResponse(message, 500);
    }
  },

  update: async (
    req: FastifyRequest<{ Params: BookParams; Body: UpdateBookBody }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const existing = await bookService.getById(id);
      if (!existing) {
        reply.code(404);
        return errorResponse("Book not found", 404);
      }

      if (req.body.authorId) {
        const author = await bookService.checkAuthorExists(req.body.authorId);
        if (!author) {
          reply.code(400);
          return errorResponse("Invalid authorId", 400);
        }
      }

      const updated = await bookService.update(id, req.body);
      return successResponse(updated, 200, "Book updated successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update book";
      reply.code(500);
      return errorResponse(message, 500);
    }
  },

  delete: async (
    req: FastifyRequest<{ Params: BookParams }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const existing = await bookService.getById(id);
      if (!existing) {
        reply.code(404);
        return errorResponse("Book not found", 404);
      }
      await bookService.delete(id);
      return successResponse(null, 200, "Book deleted successfully");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete book";
      reply.code(500);
      return errorResponse(message, 500);
    }
  },
};
