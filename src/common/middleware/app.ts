import type { Hono } from "hono";
import { logger } from "hono/logger";

export const AppMiddlewares = (app: Hono) => {
	app.use(logger());
};
