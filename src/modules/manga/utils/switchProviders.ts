import { KakuseiController } from "../providers/kakusei";
import { LeitoDeMangaController } from "../providers/leitordemanga";

const Controllers = {
	Kakusei: KakuseiController,
	LeitoDeManga: LeitoDeMangaController,
};

export const SwitchProviders = (provider: keyof typeof Controllers) => {
	switch (provider) {
		case "Kakusei":
			return Controllers.Kakusei;
		case "LeitoDeManga":
			return Controllers.LeitoDeManga;
		default:
			throw new Error("Provider not found");
	}
};
