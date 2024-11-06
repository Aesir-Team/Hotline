import * as cheerio from "cheerio";

export const ExtractMangaResults = (html: string) => {
	const $ = cheerio.load(html);

	const title = $(".post-title h1").text().trim();
	const imageUrl = $(".summary_image img").attr("src") || "";
	const rating = $(".post-total-rating .total_votes").text().trim();
	const rank = $(".post-content_item .summary-content").first().text().trim();
	const views = $(".post-content_item .summary-content")
		.first()
		.text()
		.split(",")[1]
		?.trim();

	const authors = $(
		".post-content_item:contains('Autor(es)') .summary-content a",
	)
		.map((_, el) => $(el).text().trim())
		.get();

	const artists = $(
		".post-content_item:contains('Artista(s)') .summary-content a",
	)
		.map((_, el) => $(el).text().trim())
		.get();

	const genres = $(
		".post-content_item:contains('Gênero(s)') .summary-content a",
	)
		.map((_, el) => $(el).text().trim())
		.get();

	const tags = $(".post-content_item:contains('Tag(s)') .summary-content a")
		.map((_, el) => $(el).text().trim())
		.get();

	const releaseYear = $(
		".post-content_item:contains('Lançamento') .summary-content a",
	)
		.text()
		.trim();
	const status = $(".post-content_item:contains('Status') .summary-content")
		.text()
		.trim();

	const mangaInfo = {
		title,
		imageUrl,
		rating,
		rank,
		views,
		authors,
		artists,
		genres,
		tags,
		releaseYear,
		status,
	};

	return mangaInfo;
};
