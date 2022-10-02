import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import axios from 'axios';

// #region Enums and Interfaces
// Wallpaper Object
export interface Wallpaper {
	id: string;
	wallpaperName: string;
	link: string;
	thumb?: string;
	downloadLink?: string;
}

// Resolution Mobile or Desktop
export enum Resolution {
	Mobile = 'Mobile',
	Desktop = 'Desktop',
}

// Categories Category = number
enum Categories {
	Abstract = 1,
	Animal = 2,
	Anime = 3,
	Artistics = 4,
	Celebrity = 7,
	Comics = 8,
	Dark = 9,
	Earth = 10,
	Fantasy = 11,
	Food = 12,
	Game = 14,
	Holiday = 15,
	Humor = 13,
	ManMade = 16,
	Men = 17,
	Military = 18,
	Misc = 19,
	Movies = 20,
	Music = 22,
	Photography = 24,
	Products = 25,
	Religious = 26,
	SciFi = 27,
	Sport = 28,
	Technology = 30,
	TVshows = 29,
	Vehicles = 31,
	VideoGames = 32,
	Weapons = 34,
	Women = 33,
}
// #endregion

// #region  Utility Tools

// Inclusive min exlusive max
export function randomNumber(max: number, min: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Make the link based on resolution(mobile or desktop) and categories
export function makeLink(resolution: Resolution, categories: string): string {
	return resolution === Resolution.Mobile
		? `https://mobile.alphacoders.com/by-category/${categories}`
		: `https://wall.alphacoders.com/by_category.php?id=${categories}`;
}

// #endregion

// #region Functions

/**
 * Get random wallpaper for the defined Resolution and Category
 *
 * @param {Resolution} resolution Wallpaper Resolution, Mobile or Desktop
 * @param {string} categories Category Code see Readme.md for all category codes
 * @return {Promise<Wallpaper>} Wallpaper
 *
 */
export async function getRandomWallpaper(
	resolution: Resolution,
	categories: string,
): Promise<Wallpaper> {
	let wallpaper: Wallpaper;

	if (resolution === Resolution.Desktop) {
		// Get All wallpapers in the defined category page
		const wallpapers = await getDesktopWallpaper(
			makeLink(resolution, categories) + `&page=${randomNumber(0, 100)}`,
		);

		// console.log(wallpapers);

		// Get Random Wallpaper
		wallpaper = wallpapers[randomNumber(0, wallpapers.length)];

		// Get Wallpaper Download Link
		const link = await getDesktopWallpaperDLink(`https://${wallpaper.link}`);

		// Set Link
		wallpaper.downloadLink = link;
	} else {
		// Get All wallpapers in the defined category page
		const wallpapers = await getMobileWallpaper(
			makeLink(resolution, categories) + `?page=${randomNumber(0, 100)}`,
		);

		// Get Random Wallpaper
		wallpaper = wallpapers[randomNumber(0, wallpapers.length)];

		// Get Wallpaper Donwload Link
		const link = await getMobileWallpaperDLink(`https://${wallpaper.link}`);

		// Set Link
		wallpaper.link = link;
	}

	// Return Random Wallpaper
	return wallpaper;
}

/**
 * Get a collection of random wallpaper
 *
 * @param {Resolution} resolution Wallpaper Resolution, Mobile or Desktop
 * @param {string} categories Category Code see Readme.md for all category codes
 * @return {string} Wallpapers
 *
 */
export async function getRandomWallpaperCollection(
	resolution: Resolution,
	categories: string,
): Promise<Wallpaper[]> {
	let wallpapers: Wallpaper[] = [];

	wallpapers = await (resolution === Resolution.Desktop
		? getDesktopWallpaper(
				makeLink(resolution, categories) + `&page=${randomNumber(0, 100)}`,
		  )
		: getMobileWallpaper(
				makeLink(resolution, categories) + `?page=${randomNumber(0, 100)}`,
		  ));

	// Return Random Wallpaper
	return wallpapers;
}

/**
 * Get wallpapers from https://mobile.alphacoders.com
 *
 * @param {string} url Wallpaper Link
 * @return {string} Wallpapers
 *
 */
export async function getMobileWallpaper(url: string): Promise<Wallpaper[]> {
	console.log(url);

	// Config Puppeteer Browser
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	// Go to Page
	await page.goto(url);

	// Await for load all images
	await page.waitForSelector('div .item');

	// Get Body html to scrap
	const bodyHandle = await page.$('body');
	const html = await page.evaluate((body) => body.innerHTML, bodyHandle);

	// Now load html data in cheerio
	const $ = cheerio.load(html);

	// Define the list with all wallpapers
	const wallpaperList: Wallpaper[] = [];

	// Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
	$('div .item').map((i, el) => {
		const wallpaper: Wallpaper = {
			id: el.attribs.id,
			wallpaperName: (
				(el.childNodes[1] as unknown as cheerio.Element)
					.childNodes[1] as unknown as cheerio.Element
			).attribs.title,
			link:
				'mobile.alphacoders.com' +
				(el.childNodes[1] as unknown as cheerio.Element).attribs.href,
			thumb: (
				(el.childNodes[1] as unknown as cheerio.Element)
					.childNodes[1] as unknown as cheerio.Element
			).attribs.src,
		};

		// console.log(wallpaper);

		// Add to the list
		wallpaperList.push(wallpaper);
	});

	// Close the Browser
	await browser.close();

	return wallpaperList;
}

/**
 * Get wallpapers from https://wall.alphacoders.com/
 *
 * @param {string} url Wallpaper Link
 * @return {string} Wallpapers
 *
 */
export async function getDesktopWallpaper(url: string): Promise<Wallpaper[]> {
	// console.log(url);

	// Config Puppeteer Browser
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	// Go to Page
	await page.goto(url);

	// Await for load all images
	await page.waitForSelector('div .thumb-container');

	// Get Body html to scrap
	const bodyHandle = await page.$('body');
	const html = await page.evaluate((body) => body.innerHTML, bodyHandle);

	// Now load html data in cheerio
	const $ = cheerio.load(html);

	// Define the list with all wallpapers
	const wallpaperList: Wallpaper[] = [];

	// Get all wallpapers => Note: In wallpapers abyss, wallpapers is a div with .thumb-element class
	$('div .thumb-container').map((i, el) => {
		const wallpaper: Wallpaper = {
			// id: Math.random().toString(), // ToDo Get the Real Wallpaper ID
			id: (el.parent as cheerio.Element).attribs['id'],
			wallpaperName: (
				(el.childNodes[1] as unknown as cheerio.Element)
					.childNodes[1] as unknown as cheerio.Element
			).attribs.title,
			link:
				'wall.alphacoders.com' +
				(
					(el.childNodes[1] as unknown as cheerio.Element)
						.childNodes[1] as unknown as cheerio.Element
				).attribs.href,
			thumb: (
				(
					(
						(el.childNodes[1] as unknown as cheerio.Element)
							.childNodes[1] as unknown as cheerio.Element
					).childNodes[1] as unknown as cheerio.Element
				).childNodes[3] as unknown as cheerio.Element
			).attribs.srcset,
		};

		// Add to the list
		wallpaperList.push(wallpaper);
	});

	// Close the Browser
	await browser.close();

	// console.log(wallpaperList);

	return wallpaperList;
}

/**
 * Get download link from https://wall.alphacoders.com/ wallpapers
 *
 * @param {string} url Wallpaper link
 * @return {string} Download link
 */
export async function getDesktopWallpaperDLink(url: string): Promise<string> {
	// Load url and get response
	const resp = await axios.get(url);

	// Now load html data in cheerio
	const $ = cheerio.load(resp.data);

	// console.log(html);

	// The result url
	let wallpaperUrl: string;

	// Extract all img and t the download link
	$('img').map((i, el) => {
		// console.log(el);

		if (el.attribs.class === 'main-content') wallpaperUrl = el.attribs.src;
	});

	return wallpaperUrl;
}

/**
 * Get download link from https://mobile.alphacoders.com wallpapers
 *
 * @param {string} url Wallpaper Link
 * @return {string} Download link
 *
 */
export async function getMobileWallpaperDLink(url: string): Promise<string> {
	// Load url and get response
	const resp = await axios.get(url);

	// Now load html data in cheerio
	const $ = cheerio.load(resp.data);

	// The result url
	let wallpaperUrl: string;

	// Extract all img and get the the download link
	$('img').map((i, el) => {
		// console.log(el);

		if (el.attribs.class === 'img-full-size') wallpaperUrl = el.attribs.src;
	});

	// Retur Donload Link
	return wallpaperUrl;
}

// #endregion
