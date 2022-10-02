import { Command } from '@oclif/core';
import { getCategories } from '../../services/wallabyss/catagories';

export default class Categories extends Command {
	static description = 'Show all available categories for Wallpapers Abyss';

	static flags = {};

	static args: any = [];

	async run(): Promise<void> {
		// eslint-disable-next-line unicorn/import-style
		const chalk = await import('chalk');

		this.log(
			chalk.default.bold(`
			ℹ️ ALL AVAILABLE CATEGORIES FOR WALLPAPERS ABYSS`),
		);

		for (const item of getCategories()) {
			this.log(item[0]);
		}
	}
}
