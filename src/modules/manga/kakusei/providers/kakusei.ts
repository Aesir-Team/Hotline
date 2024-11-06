const baseUrl = "https://kakuseiproject.com";

type Genres = {
	acao: "acao";
	adulto: "adulto";
	artesMarciais: "artes-marciais";
	aventura: "aventura";
	comedia: "comedia";
	crime: "crime";
	culinaria: "culinaria";
	drama: "drama";
	ecchi: "ecchi";
	escolar: "escolar";
	esportes: "esportes";
	fantasia: "fantasia";
	gore: "gore";
	hentai: "hentai";
	historico: "historico";
	horror: "horror";
	isekai: "isekai";
	magia: "magia";
	militar: "militar";
	misterio: "misterio";
	monstro: "monstro";
	ninja: "ninja";
	oneshot: "oneshot";
	psicologico: "psicologico";
	romance: "romance";
	sciFi: "sci-fi";
	seinen: "seinen";
	shounen: "shounen";
	sliceOfLife: "slice-of-life";
	sobrenatural: "sobrenatural";
	superPoderes: "super-poderes";
	thriller: "thriller";
	tragedia: "tragedia";
	viagemNoTempo: "viagem-no-tempo";
};

export const KakuseiController = {
	homePage: () => `${baseUrl}`,
	searchManga: (slug: string) =>
		`${baseUrl}/?s=${encodeURIComponent(slug)}&post_type=wp-manga&op=&author=&artist=&release=&adult=`,
	searchMangaPerGenre: (genre: keyof Genres) =>
		`${baseUrl}/?s=&post_type=wp-manga&genre[]=${genre}&op=&author=&artist=&release=&adult=`,
	latestMangas: () => `${baseUrl}/?s&post_type=wp-manga&m_orderby=latest`,
	newMangas: () => `${baseUrl}/?s&post_type=wp-manga&m_orderby=new-manga`,
	mostViewed: () => `${baseUrl}/?s&post_type=wp-manga&m_orderby=views`,
	infoManga: (slug: string) => `${baseUrl}/manga/${encodeURIComponent(slug)}`,
	getChapters: (slug: string) =>
		`${baseUrl}/manga/${encodeURIComponent(slug)}/ajax/chapters/`,
};
