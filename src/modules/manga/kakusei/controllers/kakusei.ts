import type { Hono } from "hono";
import { KakuseiSearch } from "../use-cases/search";
import { KakuseiHome } from "../use-cases/home";
import { KakuseiManga } from "../use-cases/manga";
import { KakuseiChapters } from "../use-cases/chapters";
import { KakuseiMangaImages } from "../use-cases/images";

const defaultUrl = "api/kakusei";

const routes = {
	homePage: () => `${defaultUrl}`,
	searchPage: () => `${defaultUrl}/search`,
	mangaPage: () => `${defaultUrl}/manga`,
	chapterPage: () => `${defaultUrl}/chapter`,
	imagePage: () => `${defaultUrl}/images`,
};

export default function KakuseiController(app: Hono) {
	app.get(routes.searchPage(), async (c) => {
		return KakuseiSearch(c);
	});

	app.get(routes.homePage(), async (c) => {
		return KakuseiHome(c);
	});

	app.get(routes.mangaPage(), async (c) => {
		return KakuseiManga(c);
	});

	app.get(routes.chapterPage(), async (c) => {
		return KakuseiChapters(c);
	});

	app.get(routes.imagePage(), async (c) => {
		return KakuseiMangaImages(c);
	});
}
