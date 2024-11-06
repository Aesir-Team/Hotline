import * as cheerio from "cheerio";

export const ExtractImagesResults = (html: string) => {
	const $ = cheerio.load(html);

	const images: string[] = [];

	$(".wp-manga-chapter-img").each((index, element) => {
		const imageUrl = $(element).attr("src")?.trim();
		if (imageUrl) {
			images.push(imageUrl);
		}
	});

	return images;
};
