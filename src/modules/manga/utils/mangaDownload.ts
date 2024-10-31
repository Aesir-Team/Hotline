import axios from "axios";
import * as fs from "node:fs";
import * as path from "node:path";

export const downloadImages = async (imageUrls: string[], chapterUrl: string): Promise<string[]> => {
	const mangaName = extractMangaName(chapterUrl);
	const chapterName = extractChapterName(chapterUrl);

	const baseDir = path.resolve('./src/assets');
	const chapterDir = path.join(baseDir, mangaName, chapterName);

	fs.mkdirSync(chapterDir, { recursive: true });

	const downloadPromises = imageUrls.map(async (url) => {
		try {
			const response = await axios.get(url, { responseType: "arraybuffer" });
			
			const imageName = path.basename(url);
			const filePath = path.join(chapterDir, imageName);

			fs.writeFileSync(filePath, response.data);
			return filePath;
		} catch (error) {
			console.error(`Erro ao baixar a imagem ${url}:`, error);
			return null; 
		}
	});

	const results = await Promise.all(downloadPromises);
	return results.filter((path): path is string => path !== null);
};

const extractMangaName = (url: string): string => {
	const match = url.match(/\/ler-manga\/([^\/]+)\//);
	return match ? match[1] : "unknown-manga";
};

const extractChapterName = (url: string): string => {
	const match = url.match(/capitulo-([^\/]+)/);
	return match ? `capitulo-${match[1]}` : "unknown-capitulo";
};
