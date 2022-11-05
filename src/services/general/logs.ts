import axios from 'axios';

/**
 * Function to log wallpaper data
 * @param id
 * @param name
 * @param link
 * @param downloadLink
 * @param thumb
 * @param copyright
 */
// eslint-disable-next-line max-params
export async function logWallpaper(
	id?: string,
	name?: string,
	link?: string,
	downloadLink?: string,
	thumb?: string,
	copyright?: string,
): Promise<void> {
	// Log to the user
<<<<<<< HEAD
	console.log('      🔎 I found this wallpaper');
=======
	console.log(`
	🔎 I found this wallpaper`);
>>>>>>> 7697476 (-)

	// Import Terminal-Image
	const terminalimage = await import('terminal-image');

	// import Chalk
	// eslint-disable-next-line unicorn/import-style
	const chalk = await import('chalk');

	let buffer;

	// Get wallpaper thumbnail
	if (thumb) {
		const response = await axios.get(thumb, {
			responseType: 'arraybuffer',
		});

		// Get image buffer
		buffer = Buffer.from(response.data, 'base64');

		// Log separator
		console.log(`
        ==============================
        `);

		// Log image
		console.log(
			await terminalimage.default.buffer(buffer, {
				width: '40%',
				height: '40%',
			}),
		);
	}

	// Log separator
	console.log(`
        ==============================
        `);

	// Log wallpaper properties
	if (id) console.log(`      🖇  ${chalk.default.bold('ID: ')}${id}`);
	if (name) console.log(`      🌄 ${chalk.default.bold('NAME: ')} ${name}`);
	if (link) console.log(`      🌐 ${chalk.default.bold('LINK: ')} ${link}`);
	if (downloadLink)
		console.log(
			`      🌐 ${chalk.default.bold('DOWNLOAD LINK: ')} ${downloadLink}`,
		);
	if (copyright)
		console.log(`      ⚖️  ${chalk.default.bold('COPYRIGHT: ')} ${copyright}`);
}
