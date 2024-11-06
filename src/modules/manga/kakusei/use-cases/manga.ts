import type { Context } from "hono";
import { SwitchProviders } from "../../utils/switchProviders";
import Invariant from "../../../../common/utils/invariant";
import { ExtractMangaResults } from "../extractors/manga";

export const KakuseiManga = async (c: Context) => {
	try {
		const provider = SwitchProviders("Kakusei");
		const searchQuery = String(c.req.query("manga"));
		const searchUrl = await provider.infoManga(searchQuery);

		const response = await fetch(searchUrl);
		Invariant(response.ok, "Failed to fetch search results");
		const body = await response.text();

		const mangaList = ExtractMangaResults(body);

		return c.json(mangaList);
	} catch (error) {
		return c.json({ error: "An error occurred" }, 500);
	}
};
