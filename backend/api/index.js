require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { success } from 'consola';

import publicRoutes from './Public/index';
import privateRoutes from './Private/index';

import { swaggerOptions } from './src/config/swaggerOptions';
import './src/models';

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [ 'http://127.0.0.1:3000' ];

const corsOptions = {
	origin: allowedOrigins
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.headers.language = req.headers.language || 'tr';
	next();
});

const basicAuth = require('express-basic-auth');
const swaggerUi = require('swagger-ui-express');
const swaggerApiDocs = require('./utils/expresss_swagger_generator/generator')(swaggerOptions);
// const swaggerAuthorizer = require('./utils/swaggerAuthorizer');

// app.use('/api-docs', (req, res, next) => {
// 	const extensions = [ '.js', '.png', '.jpg', '.jpeg', '.css', '.map' ];
// 	for (let i = 0;i < extensions.length;i++) {
// 		if (req.url.endsWith(extensions[i]) && !req.url.endsWith('swagger-ui-init.js')) {
// 			return next();
// 		}
// 	}
// 	return basicAuth({
// 		challenge: true,
// 		realm: 'Imb4T3st4pp',
// 		authorizer: swaggerAuthorizer,
// 		authorizeAsync: false
// 	})(req, res, next);
// });

app.use('/api-docs', swaggerUi.serveFiles(swaggerApiDocs), swaggerUi.setup(swaggerApiDocs));

app.use('/public', publicRoutes);
app.use('/private', privateRoutes);

app.get('/health', (req, res) => {
	res.json({type: true, message: 'server is running', env: process.env.NODE_ENV});
});

app.listen(PORT, () => {
	success({ message: `SERVER IS RUNNING ON ${PORT}`, badge: true });
});