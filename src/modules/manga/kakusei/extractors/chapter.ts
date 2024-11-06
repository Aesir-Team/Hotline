import * as cheerio from "cheerio";

export const ExtractChaptersResults = (html: string): KakuseiChapterManga[] => {
	const $ = cheerio.load(html); 

	const chapters: KakuseiChapterManga[] = []; 

	$(".wp-manga-chapter").each((_, element) => {
		const title = $(element).find("a").text().trim(); 
		const link = $(element).find("a").attr("href") || ""; 
		const releaseDate = $(element)
			.find(".chapter-release-date i")
			.text()
			.trim(); 

		chapters.push({
			title,
			link,
			releaseDate,
		});
	});

	return chapters; 
};
