import axios from "axios";
import type { Context } from "hono";
import * as cheerio from "cheerio";
import { downloadImages } from "../../utils/mangaDownload";
import fs from "node:fs";
import path from "node:path";

const DOWNLOAD_DIR = "./src/assets/";
const checkChapterExists = (chapterPath: string) => {
	if (fs.existsSync(chapterPath)) {
		return true;
	}
	return false;
};

const createChapterDirectory = (chapterPath: string) => {
	fs.mkdirSync(chapterPath, { recursive: true });
};

export const TestFunction = async (c: Context) => {
	const url = String(c.req.query("mangaUrl"));
	const title = url.split("/ler-manga/")[1].split("/")[0];
	const chapter = url.split("/")[6];
	const chapterPath = path.join(DOWNLOAD_DIR, title, chapter);

	if (checkChapterExists(chapterPath)) {
		return c.json({ message: "Capítulo já baixado." });
	}

	const { data } = await axios.get(url, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
			Referer: url,
		},
	});

	const $ = cheerio.load(data);

	const imageUrls = $(".reading-content img.wp-manga-chapter-img")
		.map((_, img) => $(img).attr("data-src")?.trim())
		.get()
		.filter(
			(url) => url && (url.startsWith("http://") || url.startsWith("https://")),
		);

	console.log("URLs das imagens:", imageUrls);

	if (imageUrls.length > 0) {
		createChapterDirectory(chapterPath);
		const imagePaths = await downloadImages(imageUrls, url);
		return c.json({ imageUrls, imagePaths });
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return c.json({ message: "Nenhuma imagem válida encontrada.", imageUrls });
	}
};
