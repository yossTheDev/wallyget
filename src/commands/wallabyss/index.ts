import { Command, CliUx, Flags } from '@oclif/core';
import {
	getCategoryCode,
	hasCategory,
} from '../../services/wallabyss/catagories';
import {
	downloadCollection,
	downloadWallpaper,
} from '../../services/wallpaper-manager';

export default class Set extends Command {
	static description = 'Download wallpapers from Wallpaper Abyss';

	static examples = [
		`<%= config.bin %> <%= command.id %> [CATEGORY CODE]
        🔎 I found this wallpaper

		🖇 ID: "Wallpaper_ID"
		🌄 Name: "Wallpaper_Name"
		🌐 Link:  "Wallpaper_Link"
		🌐 Download Link:  "Wallpaper_Download_Link"
`,
	];

	static flags = {
		collection: Flags.boolean({
			char: 'c',
			description:
				'Download several wallpapers at the same time and save them in the Fetched folder',
			required: false,
		}),
	};

	static args: any = [
		{
			name: 'category',
			description:
				'Category of the wallpaper to download. Type Wallyget Wallabyss Categories to show all available categories',
			required: true,
		},
	];

	async run(): Promise<void> {
		const { args, flags } = await this.parse(Set);

		if (hasCategory(args.category)) {
			// Start the spinner
			CliUx.ux.action.start('Downloading...');

			// Download collection or single wallpaper
			await (flags.collection
				? downloadCollection(
						getCategoryCode(args.category),
						this.config.dataDir,
				  )
				: downloadWallpaper(
						getCategoryCode(args.category),
						this.config.dataDir,
				  ));
		} else {
			this.log('Incorrect category code');
		}
	}
}
