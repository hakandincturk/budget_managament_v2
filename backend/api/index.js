require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { success } from 'consola';

// import publicRoutes from './Public/index';
// import privateRoutes from './Private/index';
// import { swaggerOptions } from './src/config/swaggerOptions';

const PORT = process.env.PORT || 5000;
const app = express();

// const swaggerGenerator = require('express-swagger-generator')(app);

app.listen();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/public', publicRoutes);
// app.use('/private', privateRoutes);

// swaggerGenerator(swaggerOptions);

app.get('/health', (req, res) => {
	res.json({type: true, message: 'server is running'});
});

app.listen(PORT, () => {
	success({ message: `SERVER IS RUNNING ON ${PORT}`, badge: true });
});