import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post("/pools", async (request: any, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    try {
      const { title } = createPoolBody.parse(request.body);
      const generate = new ShortUniqueId({ length: 6 });
      const code = String(generate()).toUpperCase();

      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });

      return reply.status(201).send({ code });
    } catch (e: any) {
      return reply.status(400).send({ error: "You should pass a title" });
    }
  });
}
