require('dotenv').config();

const { log } = require('console');

module.exports = { 
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
		logging: process.env.DB_LOGGING === 'true' ? log : false,
		timezone: 'Europe/Istanbul'
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
		logging: process.env.DB_LOGGING === 'true' ? log : false,
		timezone: 'Europe/Istanbul'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
		logging: process.env.DB_LOGGING === 'true' ? log : false,
		timezone: 'Europe/Istanbul'
	}
};
