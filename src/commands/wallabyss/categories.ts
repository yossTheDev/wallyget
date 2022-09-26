import { Command } from '@oclif/core';
import { getCategories } from '../../services/wallabyss/catagories';

export default class Categories extends Command {
	static description = 'Show all available categories for Wallpapers Abyss';

	static flags = {};

	static args: any = [];

	async run(): Promise<void> {
		this.log('hello world! (./src/commands/hello/world.ts)');

		this.log('ALL AVAILABLE CATEGORIES FOR WALLPAPERS ABYSS');

		for (const item of getCategories()) {
			this.log(item[0]);
		}
	}
}
