import type { Context } from "hono";
import { SwitchProviders } from "../../utils/switchProviders";
import Invariant from "../../../../common/utils/invariant";
import { ExtractHomeResults } from "../extractors/home";

export const KakuseiHome = async (c: Context) => {
	try {
		const provider = SwitchProviders("Kakusei");
		const searchUrl = await provider.homePage();

		const response = await fetch(searchUrl);
		Invariant(response.ok, "Failed to fetch search results");
		const body = await response.text();

		const mangaList = ExtractHomeResults(body);

		return c.json(mangaList);
	} catch (error) {
		return c.json({ error: "An error occurred" }, 500);
	}
};
