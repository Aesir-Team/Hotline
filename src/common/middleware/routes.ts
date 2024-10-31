import type { Hono } from "hono";
import MangaController from "../../modules/manga/controller";
import * as fs from "node:fs";
import path from "node:path";

export const DefineRoutes = (app: Hono) => {
	MangaController(app);
	app.get("/assets/*", (c) => {
		const url = c.req.url;
		const urlFile = url.split("/assets/")[1];
		const filePath = path.join(__dirname, "../../assets", urlFile);

		try {
			const file: Buffer = fs.readFileSync(filePath);
			const ext = path.extname(filePath).toLowerCase();

			let contentType: string;
			switch (ext) {
				case ".jpg":
				case ".jpeg":
					contentType = "image/jpeg";
					break;
				case ".png":
					contentType = "image/png";
					break;
				case ".gif":
					contentType = "image/gif";
					break;
				case ".svg":
					contentType = "image/svg+xml";
					break;
				case ".webp":
					contentType = "image/webp";
					break;
				default:
					contentType = "application/octet-stream";
			}

			return c.body(file, 200, {
				"Content-Type": contentType,
			});
		} catch (error) {
			console.error(error);
			return c.notFound();
		}
	});
};
