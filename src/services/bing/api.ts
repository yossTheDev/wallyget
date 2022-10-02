import axios from 'axios';

interface wallpaper {
	// eslint-disable-next-line camelcase
	start_date: string;
	// eslint-disable-next-line camelcase
	end_date: string;
	url: string;
	copyright: string;
	// eslint-disable-next-line camelcase
	copyright_link: string;
}

/**
 *
 * @param resulution Wallpaper Resolution 1920|1080|3840
 * @param format json|image
 * @param index  0-7 : 0 = Today, 1 = Yesterday
 * @returns Wallpaper
 */
async function getWallpaper(resulution: string, format: string, index: string) {
	const response = await axios.get(
		`https://bing.biturl.top/?resolution=${resulution}&format=${format}&index=${index}&mkt=en-US`,
	);

	return response.data as undefined as wallpaper;
}

export async function getTodayWallpaper(): Promise<wallpaper> {
	return getWallpaper('1920', 'json', '0');
}

export async function getYesterdayWallpaper(): Promise<wallpaper> {
	return getWallpaper('1920', 'json', '1');
}

/**
 * Get wallpaper for the specified day of the week
 * @param day Day of the Week 0-7
 * @returns ""
 */
export async function getWallpaperFromDay(day: string): Promise<wallpaper> {
	return getWallpaper('1920', 'json', day);
}
