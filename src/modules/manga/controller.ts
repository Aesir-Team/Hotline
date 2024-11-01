import type { Hono } from "hono";
import { TestFunction } from "./use-case/testDownload";
import { SendImages } from "./use-case/sendImage";
import { TestProvider } from "./use-case/searchManga";

export default function MangaController(app: Hono) {
	app.get("/manga", async (c) => {
		return c.text("Hello World!");
	});
	app.get("/test", (c) => TestFunction(c));
	app.get("/test2", (c) => SendImages(c));
	app.get("/test3", (c) => TestProvider(c));
}
