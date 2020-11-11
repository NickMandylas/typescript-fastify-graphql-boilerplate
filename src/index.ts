import "reflect-metadata";
import { ApolloServer } from "@autotelic/apollo-server-fastify";
import dotenv from "dotenv";
import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyCors from "fastify-cors";
import jwt from "fastify-jwt";
import fastifySession from "fastify-session";
import { FastifyContext } from "./types/Context";
import { connection } from "./utils/connection";
import { createSchema } from "./utils/createSchema";
import { sessionOptions } from "./utils/session";

dotenv.config();

const main = async () => {
  const PORT: number = Number(process.env.PORT) || 4000;

  await connection;
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ request, reply }: FastifyContext) => ({
      request,
      reply,
    }),
  });

  const app = fastify({
    logger: true,
    trustProxy: process.env.NODE_ENV === "production",
  });

  app.register(server.createHandler({ cors: false }));
  app.register(fastifyCors, {
    origin:
      process.env.NODE_ENV === "production" ? "example.com" : "localhost:4000",
    credentials: true,
  });
  app.register(fastifyCookie);
  app.register(jwt, {
    secret: "boilerplate-secret",
    cookie: { cookieName: "jid" },
  });
  app.register(fastifySession, sessionOptions);

  app.listen(PORT, (err, address) => {
    if (err) {
      app.log.error(err.message);
      process.exit(1);
    }

    app.log.info(
      `🚀 Server launched on address ${address} in ${process.env.NODE_ENV?.toUpperCase()}`,
    );
  });

  app.get("/", async (_, reply) => {
    reply.redirect(302, "http://github.com/NickMandylas");
  });
};

main();
