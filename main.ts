import Fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "./context.ts";
import { appRouter } from "./router.ts";

const server = Fastify({
  logger: true,
  maxParamLength: 5000,
});

await server.register(cors, {
  origin: true,
});

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

// Declare a route
server.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

// Run the server!
try {
  await server.listen({ port: 3030 });
  console.log(`Server listening on ${server.server.address().port}`);
} catch (err) {
  server.log.error(err);
  Deno.exit(1);
}
