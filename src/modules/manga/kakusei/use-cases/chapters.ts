import type { Context } from "hono";
import { SwitchProviders } from "../../utils/switchProviders";
import Invariant from "../../../../common/utils/invariant";
import { ExtractChaptersResults } from "../extractors/chapter";

export const KakuseiChapters = async (c: Context) => {
	try {
		const provider = SwitchProviders("Kakusei");
		const searchQuery = String(c.req.query("manga"));
		const searchUrl = await provider.getChapters(searchQuery);

		const response = await fetch(searchUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"x-referer": `https://kakuseiproject.com/manga/${searchQuery}/`,
			},
		});
		Invariant(response.ok, "Failed to fetch search results");
		const body = await response.text();

		const mangaList = ExtractChaptersResults(body);

		return c.json(mangaList);
	} catch (error) {
		return c.json({ error: "An error occurred" }, 500);
	}
};
