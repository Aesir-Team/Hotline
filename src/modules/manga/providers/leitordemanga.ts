const baseUrl = "https://leitordemanga.com";

type Generos = {
	acao: "acao";
	aventura: "aventura";
	comedia: "comedia";
	drama: "drama";
	escoria: "escolar";
	espadas: "espadas";
	esportes: "esportes";
	fantasia: "fantasia";
	manhwa: "manhwa";
	ninjas: "ninjas";
	romance: "romance";
	terror: "terror";
	"super-poderes": "super-poderes";
	sobrenatural: "sobrenatural";
	shounen: "shounen";
	seinen: "seinen";
};

export const LeitoDeMangaController = {
	homePage: () => `${baseUrl}`,
	searchManga: (slug: string) => `${baseUrl}/?s=${encodeURIComponent(slug)}&post_type=wp-manga`,
	searchMangaPerGenre: (genre: keyof Generos) => `${baseUrl}/manga-genero/${genre}`,
	latestMangas: () => `${baseUrl}/?s=&post_type=wp-manga&m_orderby=latest`,
	newMangas: () => `${baseUrl}/?s=&post_type=wp-manga&m_orderby=new-manga`,
	mostViewed: () => `${baseUrl}/?s=&post_type=wp-manga&m_orderby=views`,
	infoManga: (slug: string) => `${baseUrl}/ler-manga/${encodeURIComponent(slug)}`,
};
