import type { Context } from "hono";
import { SwitchProviders } from "../utils/switchProviders";

export const TestProvider = async (c: Context) => {
	const Provider = SwitchProviders("Kakusei");
	const Search = Provider.searchManga("blue");
	return c.json({ Search });
};
