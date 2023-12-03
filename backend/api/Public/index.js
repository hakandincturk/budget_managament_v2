import express from 'express';
import fs from 'fs';

import path from 'path';

const app = express();

const __dirname = path.dirname(__filename);

fs.readdir(`${__dirname}/Routes`, (err, files) => {
	if (err) throw err;
  
	for (const file of files) {
		const routeName = file.slice(0, file.length - 3);
		const routeNameLower = routeName.toLowerCase();

		import(`${__dirname}/Routes/${routeName}.js`).then(module => {
			app.use(`/${routeNameLower}`, module.default);
		});
	}
});

export default app;