/* eslint-disable no-await-in-loop */
import { mkdirSync } from 'node:fs';
import downloadFile from './general/downloader';
import {
	getDesktopWallpaperDLink,
	getRandomWallpaper,
	getRandomWallpaperCollection,
	Resolution,
} from './wallabyss/scraper';
import { logWallpaper } from './general/logs';
// eslint-disable-next-line unicorn/prefer-module
const Downloader = require('nodejs-file-downloader');

// eslint-disable-next-line valid-jsdoc
/**
 * Set Wallpaper from Url
 * @param url Url to download wallpaper
 * @param id Id or filename to save wallpaper
 * @param dataDir Folder to save downloaded wallpaper
 * @param set Set wallpaper? Or only download it
 * */
export async function setWallpaper(
	url: string,
	id: string,
	dataDir: string,
	set?: boolean,
): Promise<void> {
	// Import Wallpaper NodeJS
	const wallpaperCLI = await import('wallpaper');

	// Create Wallyget Fetched Folder
	mkdirSync(`${dataDir}/fetched/`, { recursive: true });

	// Path for the downloades image
	const path = `${dataDir}/fetched/${id}.jpeg`;

	// await downloadFile(url, path);
	const downloader = new Downloader({
		url: url,
		directory: `${dataDir}/fetched`,
		fileName: `${id}.jpeg`,
	});

	// Start download
	await downloader.download();

	// Set Wallpaper
	if (set === true) wallpaperCLI.setWallpaper(path);
}

/**
 * Download and set wallpaper from wallpaper abyss site
 * @param category Category to download wallpaper
 * @param dataDir  Folder to save wallpapers
 * @return ""
 */
export async function downloadWallpaper(
	category: string,
	dataDir: string,
): Promise<void> {
	// Get Random Wallpaper for the defined Category
	const wallpaper = await getRandomWallpaper(Resolution.Desktop, category);

	// If the wallpaper has valid download link, download and set it
	if (wallpaper.downloadLink !== undefined)
		await setWallpaper(wallpaper.downloadLink, wallpaper.id, dataDir, true);

	// Log to the user
	logWallpaper(
		wallpaper.id,
		wallpaper.wallpaperName,
		wallpaper.link,
		wallpaper.downloadLink,
		wallpaper.thumb,
	);
}

/**
 *  Download a collection of wallpapers for the defined category
 * @param category  Category to download wallpaper
 * @param dataDir Folder to save wallpapers
 * @return ""
 */
export async function downloadCollection(
	category: string,
	dataDir: string,
): Promise<void> {
	// Get All wallpapers in the defined category page
	const wallpapers = await getRandomWallpaperCollection(
		Resolution.Desktop,
		category,
	);

	// Download wallpapers one by one
	for (const wall of wallpapers) {
		// If the wallpaper has valid download link, download it
		if (wall.link !== undefined) {
			const link = await getDesktopWallpaperDLink(`https://${wall.link}`);

			if (link !== undefined) {
				await downloadFile(link, `${dataDir}/fetched/${wall.id}.jpeg`);
			}

			// await setWallpaper(link, el.id, this.config.dataDir);
		}

		// Log to the user
		// Log to the user
		logWallpaper(
			wall.id,
			wall.wallpaperName,
			wall.link,
			wall.downloadLink,
			wall.thumb,
		);
		/* console.log(`
		🔎 I found this wallpaper
		
		🖇 ID: ${wall.id}
		🌄 Name: ${wall.wallpaperName}
		🌐 Link: ${wall.link}
		🌐 Download Link: ${'link'}
		`); */
	}
}
