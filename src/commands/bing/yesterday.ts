import { CliUx, Command } from '@oclif/core';
import { getYesterdayWallpaper } from '../../services/bing/api';
import { logWallpaper } from '../../services/general/logs';
import { randomNumber } from '../../services/wallabyss/scraper';
import { setWallpaper } from '../../services/wallpaper-manager';

export default class Yesterday extends Command {
	static description = 'Download yesterday`s Wallpaper';

	static examples = ['<%= config.bin %> <%= command.id %>'];

	static flags = {};

	static args: any = [];

	public async run(): Promise<void> {
		// Start the spinner
		CliUx.ux.action.start('⏬ Downloading...');

		// Get today wallpaper
		const wallpaper = await getYesterdayWallpaper();

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

		// Stop the spinner
		CliUx.ux.action.stop('✔ Download complete');
	}
}
