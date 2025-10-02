import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { errorResponse, successResponse } from "../helpers/response-formatter";

export default async function bookRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  const authorRef = {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      bio: { type: "string", nullable: true },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  };

  const bookSchema = {
    type: "object",
    properties: {
      id: { type: "number" },
      title: { type: "string" },
      description: { type: "string", nullable: true },
      publishedYear: { type: "number", nullable: true },
      authorId: { type: "number" },
      author: authorRef,
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  };

  const bookParams = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  };

  const createBookBody = {
    type: "object",
    required: ["title", "authorId"],
    properties: {
      title: { type: "string" },
      authorId: { type: "integer" },
      description: { type: "string" },
      publishedYear: { type: "integer" },
    },
    additionalProperties: false,
  };

  const updateBookBody = {
    type: "object",
    properties: {
      title: { type: "string" },
      authorId: { type: "integer" },
      description: { type: "string" },
      publishedYear: { type: "integer" },
    },
    additionalProperties: false,
  };

  // GET /books
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: { type: "array", items: bookSchema },
            },
          },
          500: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: { type: "null" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const books = await fastify.prisma.book.findMany({
          orderBy: { id: "asc" },
          include: { author: true },
        });
        return successResponse(books, 200, "Books retrieved successfully");
      } catch (error: any) {
        reply.code(500);
        return errorResponse(error.message || "Failed to retrieve books", 500);
      }
    }
  );

  // GET /books/:id
  fastify.get<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        params: bookParams,
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: bookSchema,
            },
          },
          404: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: { type: "null" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const id = Number(request.params.id);
        const book = await fastify.prisma.book.findUnique({
          where: { id },
          include: { author: true },
        });
        if (!book) {
          reply.code(404);
          return errorResponse("Book not found", 404);
        }
        return successResponse(book, 200, "Book retrieved successfully");
      } catch (error: any) {
        reply.code(500);
        return errorResponse(error.message || "Failed to retrieve book", 500);
      }
    }
  );

  // POST /books
  fastify.post<{
    Body: {
      title: string;
      authorId: number;
      description?: string;
      publishedYear?: number;
    };
  }>(
    "/",
    {
      schema: {
        body: createBookBody,
        response: {
          201: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: bookSchema,
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { title, authorId, description, publishedYear } = request.body;
        const author = await fastify.prisma.author.findUnique({
          where: { id: authorId },
        });
        if (!author) {
          reply.code(400);
          return errorResponse("Invalid authorId", 400);
        }

        const book = await fastify.prisma.book.create({
          data: { title, authorId, description, publishedYear },
          include: { author: true },
        });
        reply.code(201);
        return successResponse(book, 201, "Book created successfully");
      } catch (error: any) {
        reply.code(500);
        return errorResponse(error.message || "Failed to create book", 500);
      }
    }
  );

  // PUT /books/:id
  fastify.put<{
    Params: { id: number };
    Body: {
      title?: string;
      authorId?: number;
      description?: string;
      publishedYear?: number;
    };
  }>(
    "/:id",
    {
      schema: {
        params: bookParams,
        body: updateBookBody,
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: bookSchema,
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const id = Number(request.params.id);

        const existing = await fastify.prisma.book.findUnique({
          where: { id },
        });
        if (!existing) {
          reply.code(404);
          return errorResponse("Book not found", 404);
        }

        if (request.body.authorId) {
          const author = await fastify.prisma.author.findUnique({
            where: { id: request.body.authorId },
          });
          if (!author) {
            reply.code(400);
            return errorResponse("Invalid authorId", 400);
          }
        }

        const updated = await fastify.prisma.book.update({
          where: { id },
          data: request.body,
          include: { author: true },
        });

        return successResponse(updated, 200, "Book updated successfully");
      } catch (error: any) {
        reply.code(500);
        return errorResponse(error.message || "Failed to update book", 500);
      }
    }
  );

  // DELETE /books/:id
  fastify.delete<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        params: bookParams,
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              code: { type: "string" },
              message: { type: "string" },
              data: { type: "null" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const id = Number(request.params.id);

        const existing = await fastify.prisma.book.findUnique({
          where: { id },
        });
        if (!existing) {
          reply.code(404);
          return errorResponse("Book not found", 404);
        }

        await fastify.prisma.book.delete({ where: { id } });

        return successResponse(null, 200, "Book deleted successfully");
      } catch (error: any) {
        reply.code(500);
        return errorResponse(error.message || "Failed to delete book", 500);
      }
    }
  );
}
