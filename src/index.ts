import { serve } from "bun";
import { Hono } from "hono";
import { AppMiddlewares } from "./common/middleware/app";
import { DefineRoutes } from "./common/middleware/routes";
import * as fs from "node:fs";
import path from "node:path";

export const app = new Hono();

AppMiddlewares(app);
DefineRoutes(app);

export default {
	port: 3000,
	fetch: app.fetch,
};
