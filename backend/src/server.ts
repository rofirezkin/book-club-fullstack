import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "fastify-sensible";

import prismaPlugin from "./plugins/prisma";
import authorRoutes from "./modules/authors/author.routes";
import bookRoutes from "./modules/books/book.routes";
import { ApiResponse } from "./helpers/response-formatter";

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

async function buildServer() {
  const server = Fastify({ logger: true });

  await server.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await server.register(sensible);

  await server.register(prismaPlugin);

  await server.register(authorRoutes, { prefix: "/authors" });
  await server.register(bookRoutes, { prefix: "/books" });

  server.setNotFoundHandler((request, reply) => {
    const response: ApiResponse<null> = {
      data: null,
      status: "error",
      code: "404",
      message: "Not Found",
    };
    reply.code(404).send(response);
  });

  return server;
}

buildServer()
  .then((server) => {
    server.listen({ port, host: "0.0.0.0" }).catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
