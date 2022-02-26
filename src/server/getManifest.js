import fs from 'fs';

function getManifest() {
	let manifest;
	try {
		manifest = JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
	} catch (error) {
		console.log(error);
	}
	return manifest;
}

export default getManifest;
