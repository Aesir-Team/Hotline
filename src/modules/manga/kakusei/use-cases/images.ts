import type { Context } from "hono";
import { SwitchProviders } from "../../utils/switchProviders";
import Invariant from "../../../../common/utils/invariant";
import { ExtractImagesResults } from "../extractors/images";

export const KakuseiMangaImages = async (c: Context) => {
	try {
		const provider = SwitchProviders("Kakusei");
		const searchQuery = String(c.req.query("manga"));
		const searchQueryCap = String(c.req.query("cap"));
		const searchUrl = await provider.getImages(searchQuery, searchQueryCap);
		console.log(searchUrl);

		const response = await fetch(searchUrl);
		Invariant(response.ok, "Failed to fetch search results");
		const body = await response.text();

		const mangaList = ExtractImagesResults(body);

		return c.json(mangaList);
	} catch (error) {
		return c.json({ error: "An error occurred" }, 500);
	}
};
