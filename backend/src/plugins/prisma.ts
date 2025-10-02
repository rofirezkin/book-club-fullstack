import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

/**
 * Options for the Prisma plugin.  Currently unused but can be extended in the
 * future to customise the Prisma Client (e.g. enable logging).
 */
export interface PrismaPluginOptions {}

// Augment the FastifyInstance interface to include the prisma property.  This
// makes the Prisma Client available via `fastify.prisma` in route handlers.
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

/**
 * This plugin instantiates a single PrismaClient and decorates the Fastify
 * instance with it.  The client is connected when the server starts and
 * disconnected when the server closes.  Using fastify-plugin ensures that the
 * plugin is correctly encapsulated and can be reused in other parts of the
 * application.
 */
export default fp<PrismaPluginOptions>(async (fastify, opts) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  // Decorate the Fastify instance with the Prisma client
  fastify.decorate('prisma', prisma);

  // Disconnect Prisma when Fastify shuts down
  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
});