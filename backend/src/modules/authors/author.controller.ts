import { FastifyReply, FastifyRequest } from "fastify";
import { authorService } from "./author.service";
import {
  errorResponse,
  successResponse,
} from "../../helpers/response-formatter";

export const authorController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const authors = await authorService.getAll();
      return successResponse(authors, 200, "Authors retrieved successfully");
    } catch (error: any) {
      reply.code(500);
      return errorResponse(error.message || "Failed to retrieve authors", 500);
    }
  },

  getById: async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const author = await authorService.getById(id);
      if (!author) {
        reply.code(404);
        return errorResponse("Author not found", 404);
      }
      return successResponse(author, 200, "Author retrieved successfully");
    } catch (error: any) {
      reply.code(500);
      return errorResponse(error.message || "Failed to retrieve author", 500);
    }
  },

  create: async (
    req: FastifyRequest<{ Body: { name: string; bio?: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const author = await authorService.create(req.body);
      reply.code(201);
      return successResponse(author, 201, "Author created successfully");
    } catch (error: any) {
      reply.code(500);
      return errorResponse(error.message || "Failed to create author", 500);
    }
  },

  update: async (
    req: FastifyRequest<{
      Params: { id: number };
      Body: { name?: string; bio?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const existing = await authorService.getById(id);
      if (!existing) {
        reply.code(404);
        return errorResponse("Author not found", 404);
      }
      const updated = await authorService.update(id, req.body);
      return successResponse(updated, 200, "Author updated successfully");
    } catch (error: any) {
      reply.code(500);
      return errorResponse(error.message || "Failed to update author", 500);
    }
  },

  delete: async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const id = Number(req.params.id);
      const existing = await authorService.getById(id);
      if (!existing) {
        reply.code(404);
        return errorResponse("Author not found", 404);
      }
      await authorService.deleteWithBooks(id);
      return successResponse(
        null,
        200,
        "Author and related books deleted successfully"
      );
    } catch (error: any) {
      reply.code(500);
      return errorResponse(error.message || "Failed to delete author", 500);
    }
  },
};
