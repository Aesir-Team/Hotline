import fs from "node:fs";
import path from "node:path";
import type { Context } from "hono";

export const SendImages = async (c: Context) => {
	const title = String(c.req.query("title"));
	const chapt = String(c.req.query("chapter"));
	const chapterDir = path.resolve(`./src/assets/${title}/capitulo-${chapt}`);
	let imageUrls = [];

	try {
		const files = fs.readdirSync(chapterDir);
		imageUrls = files
			.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file))
			.map((file) => {
				const pageNumber = Number.parseInt(file.match(/(\d+)\./)?.[1] || "0", 10);
				return { pageNumber, url: `http://localhost:3000/assets/${title}/capitulo-${chapt}/${file}` };
			})
			.sort((a, b) => a.pageNumber - b.pageNumber)
			.map(({ url }) => url);

		return c.json({ imageUrls });
	} catch (error) {
		return c.json({ error: "Capítulo não existe", data: error }, 500);
	}
};
