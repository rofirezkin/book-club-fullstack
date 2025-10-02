import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authorController } from "./author.controller";
import {
  authorParams,
  createAuthorBody,
  updateAuthorBody,
  authorsResponseSchema,
} from "./author.schema";

export default async function authorRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get(
    "/",
    { schema: { response: { 200: authorsResponseSchema } } },
    authorController.getAll
  );
  fastify.get(
    "/:id",
    { schema: { params: authorParams } },
    authorController.getById
  );
  fastify.post(
    "/",
    { schema: { body: createAuthorBody } },
    authorController.create
  );
  fastify.put(
    "/:id",
    { schema: { params: authorParams, body: updateAuthorBody } },
    authorController.update
  );
  fastify.delete(
    "/:id",
    { schema: { params: authorParams } },
    authorController.delete
  );
}
