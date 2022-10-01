import fs = require('node:fs');
import https = require('https');

/**
 * Download a file from the given `url` into the `targetFile`.
 *
 * @param {String} url url
 * @param {String} targetFile File to be saved
 *
 * @return {Promise<void>} promise
 */
export default async function downloadFile(
	url: string,
	targetFile: string,
): Promise<any> {
	return new Promise((resolve, reject) => {
		https
			.get(url, (response) => {
				const code = response.statusCode ?? 0;

				if (code >= 400) {
					return reject(new Error(response.statusMessage));
				}

				// handle redirects
				if (code > 300 && code < 400 && Boolean(response.headers.location)) {
					return downloadFile(response.headers.location, targetFile);
				}

				// save the file to disk
				const fileWriter = fs.createWriteStream(targetFile).on('finish', () => {
					resolve({});

					console.log('saved ' + targetFile);
				});

				response.pipe(fileWriter);
			})
			.on('error', (error) => {
				reject(error);
			});
	});
}
