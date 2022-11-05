import { CliUx, Command } from '@oclif/core';
import { logWallpaper } from '../../services/general/logs';
import { getImageOfTheDay } from '../../services/nasa/api';
import { randomNumber } from '../../services/wallabyss/scraper';
import { setWallpaper } from '../../services/wallpaper-manager';

export default class About extends Command {
	static description =
		'Download wallpapers from NASA Astronomy Picture Of The Day';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {};

	static args: any = [];

	public async run(): Promise<void> {
		// Start the spinner
		CliUx.ux.action.start('⏬ Downloading...');

		const wallpaper = await getImageOfTheDay();

		// Log Wallpaper
		logWallpaper(null, wallpaper.title, null, wallpaper.url);

		// Download and set wallpaper
		await setWallpaper(
			wallpaper.url,
			`nasa-${randomNumber(1000, 9999)}`,
			this.config.dataDir,
			true,
		);

		// Stop the spinner
		CliUx.ux.action.stop('✔ Download complete');
	}
}
