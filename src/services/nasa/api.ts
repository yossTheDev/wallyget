import axios from 'axios';

interface wallpaper {
	date: string;
	url: string;
	title: string;
}

/**
 * Get image or the day from APOD NADA service
 * @returns Wallpaper Data
 */
export async function getImageOfTheDay(): Promise<wallpaper> {
	const response = await axios.get(
		'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
	);

	return response.data as undefined as wallpaper;
}
