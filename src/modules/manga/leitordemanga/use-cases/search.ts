import type { Context } from "hono";
import { SwitchProviders } from "../../utils/switchProviders";

export const TestProvider = async (c: Context) => {
	const Provider = SwitchProviders("LeitoDeManga");
	const Search = Provider.searchManga("blue");
	return c.json({ Search });
};
