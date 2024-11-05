import type { Hono } from "hono";

const defaultUrl = "api/leitor";
const routes = {
	homePage: () => `${defaultUrl}`,
};
export default function LeitoDeMangaController(app: Hono) {
	app.get(routes.homePage(), async (c) => {
		return c.text("Hello World!");
	});
}
