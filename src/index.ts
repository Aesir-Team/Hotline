import { Hono } from "hono";
import { AppMiddlewares } from "./common/middleware/app";
import { DefineRoutes } from "./common/middleware/routes";
import { HandleConfig } from "./common/config/config";

export const app = new Hono();

const instance = process.env.INSTANCE;
const config = HandleConfig(String(instance));
const port = instance === "PROD" ? config.productionPort : config.developmentPort

AppMiddlewares(app);
DefineRoutes(app);

export default {
	port,
	fetch: app.fetch,
};
