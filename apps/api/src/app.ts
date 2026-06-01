import Fastify, { type FastifyInstance } from "fastify";

import { registerHealthRoute } from "./http/health-route.js";

export const createApp = (): FastifyInstance => {
  const app = Fastify();

  registerHealthRoute(app);

  return app;
};
