import type { Hono } from "hono";
import KakuseiController from "./kakusei/controllers/kakusei";
import LeitoDeMangaController from "./leitordemanga/controllers/leitordemanga";

export default function MangaController(app: Hono) {
	KakuseiController(app);
	LeitoDeMangaController(app);
}
