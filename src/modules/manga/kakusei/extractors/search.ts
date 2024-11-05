import * as cheerio from "cheerio";

export const ExtractSearchResults = (
	html: string,
): Array<KakuseiSearchManga> => {
	const $ = cheerio.load(html);
	const mangaList: Array<KakuseiSearchManga> = [];

	$(".row.c-tabs-item__content").each((_, element) => {
		const title = $(element).find(".post-title h3 a").text().trim();
		const link = $(element).find(".post-title h3 a").attr("href") || "";

		const authors = $(element)
			.find(".mg_author .summary-content a")
			.map((_, el) => $(el).text().trim())
			.get();

		const artists = $(element)
			.find(".mg_artists .summary-content a")
			.map((_, el) => $(el).text().trim())
			.get();

		const genres = $(element)
			.find(".mg_genres .summary-content a")
			.map((_, el) => $(el).text().trim())
			.get();

		const status = $(element).find(".mg_status .summary-content").text().trim();
		const releaseYear = $(element)
			.find(".mg_release .summary-content a")
			.text()
			.trim();
		const latestChapter = $(element)
			.find(".meta-item.latest-chap .chapter a")
			.text()
			.trim();
		const lastUpdated = $(element)
			.find(".meta-item.post-on span")
			.text()
			.trim();
		const rating = $(element)
			.find(".post-total-rating .total_votes")
			.text()
			.trim();

		const imageUrl = $(element).find(".tab-thumb img").attr("src") || "";

		mangaList.push({
			title,
			imageUrl,
			link,
			authors,
			artists,
			genres,
			status,
			releaseYear,
			latestChapter,
			lastUpdated,
			rating,
		});
	});

	return mangaList;
};
