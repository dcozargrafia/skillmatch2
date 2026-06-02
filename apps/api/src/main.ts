import { createApp } from "./app.js";

const app = createApp();

const start = async (): Promise<void> => {
  await app.listen({
    host: process.env.API_HOST ?? "0.0.0.0",
    port: Number(process.env.API_PORT ?? 3000),
  });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});
