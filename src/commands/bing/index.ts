import { CliUx, Command, Flags } from '@oclif/core';
import {
	getTodayWallpaper,
	getWallpaperFromDay,
} from '../../services/bing/api';
import { logWallpaper } from '../../services/general/logs';
import { randomNumber } from '../../services/wallabyss/scraper';
import { setWallpaper } from '../../services/wallpaper-manager';

export default class Bing extends Command {
	static description = 'Download wallpapers from Bing';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {
		day: Flags.integer({
			char: 'd',
			description: 'Day of the week to download wallpaper',
			required: false,
		}),
	};

	static args: any = [];

	public async run(): Promise<void> {
		const { flags } = await this.parse(Bing);

		// Start the spinner
		CliUx.ux.action.start('⏬ Downloading...');

		if (flags.day) {
			// Get today wallpaper
			const wallpaper = await getWallpaperFromDay(flags.day.toString());

			// Log wallpaper
			logWallpaper(
				null,
				wallpaper.copyright,
				null,
				wallpaper.url,
				null,
				wallpaper.copyright,
			);

			// Download and set wallpaper
			await setWallpaper(
				wallpaper.url,
				`bing-${randomNumber(1000, 9999)}`,
				this.config.dataDir,
				true,
			);
		} else {
			// Get today wallpaper
			const wallpaper = await getTodayWallpaper();

			// Log wallpaper
			logWallpaper(
				null,
				wallpaper.copyright,
				null,
				wallpaper.url,
				null,
				wallpaper.copyright,
			);

			// Download and set wallpaper
			await setWallpaper(
				wallpaper.url,
				`bing-${randomNumber(1000, 9999)}`,
				this.config.dataDir,
				true,
			);
		}

		// Stop the spinner
		CliUx.ux.action.stop('✔ Download complete');
	}
}
