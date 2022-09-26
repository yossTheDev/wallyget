import { Command } from '@oclif/core';

export default class Fetched extends Command {
	static description = 'Show the location of the Fetched folder';

	static flags = {};

	static args: any = [];

	async run(): Promise<void> {
		this.log(`📁 ${this.config.dataDir}/fetched/`);
	}
}
