import * as cheerio from "cheerio";

export const ExtractHomeResults = (html: string): KakuseiHomeManga => {
	const $ = cheerio.load(html);
	const mangaList: KakuseiHomeMangaItem[] = [];

	$(".page-listing-item").each((_, element) => {
		const mangaItems = $(element).find(".row.row-eq-height .col-6.col-md-2");

		mangaItems.each((_, mangaElement) => {
			const titleElement = $(mangaElement).find(".post-title a");
			const title = titleElement.text().trim();
			const url = titleElement.attr("href") || "";
			const imgSrc = $(mangaElement).find(".item-thumb img").attr("src") || "";
			const rating =
				$(mangaElement).find(".post-total-rating .score").text().trim() ||
				"N/A";

			const chapters: { title: string; link: string }[] = [];
			$(mangaElement)
				.find(".list-chapter .chapter-item")
				.each((j, chapElement) => {
					const chapterLink =
						$(chapElement).find(".chapter a").attr("href") || "";
					const chapterTitle = $(chapElement).find(".chapter a").text().trim();
					chapters.push({ title: chapterTitle, link: chapterLink });
				});

			mangaList.push({
				title,
				url,
				imgSrc,
				rating,
				chapters,
			});
		});
	});

	return {
		mangaList,
	};
};
