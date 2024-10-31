interface Config {
	productionPort: number;
	developmentPort: number;
}

export const HandleConfig = (config: string): Config => {
	let Config: Config;

	if (config === "PROD") {
		Config = {
			productionPort: 80,
			developmentPort: 80,
		};
	} else {
		Config = {
			developmentPort: 3000,
			productionPort: 3000,
		};
	}

	return Config;
};
