import { FastifyInstance } from "fastify";
import { bookController } from "./book.controller";
import { bookParams, createBookBody, updateBookBody } from "./book.schema";

export default async function bookRoutes(fastify: FastifyInstance) {
  fastify.get("/", bookController.getAll);
  fastify.get(
    "/:id",
    { schema: { params: bookParams } },
    bookController.getById
  );
  fastify.post(
    "/",
    { schema: { body: createBookBody } },
    bookController.create
  );
  fastify.put(
    "/:id",
    { schema: { params: bookParams, body: updateBookBody } },
    bookController.update
  );
  fastify.delete(
    "/:id",
    { schema: { params: bookParams } },
    bookController.delete
  );
}
