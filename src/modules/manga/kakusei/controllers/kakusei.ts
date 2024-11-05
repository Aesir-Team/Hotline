import type { Hono } from "hono";
import { KakuseiSearch } from "../use-cases/search";

const defaultUrl = "api/kakusei";

const routes = {
	homePage: () => `${defaultUrl}`,
	searchPage: () => `${defaultUrl}/search`,
};

export default function KakuseiController(app: Hono) {
	app.get(routes.searchPage(), async (c) => {
		return KakuseiSearch(c);
	});
}
