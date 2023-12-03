module.exports = {
	swaggerOptions: {
		swaggerDefinition: {
			info: {
				description: 'Bütçe Yönetim Sistemi API',
				title: 'Bütçe Yönetim Services',
				version: '1.0.0'
			},
			host: 'localhost:5000',
			consumes: [ 'application/json', 'multipart/form-data' ],
			basePath: '',
			produces: [
				'application/json',
				'application/xml',
				'multipart/form-data',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			],
			schemes: 'https',
			security: [
				{
					JWT: [],
					Language: []
				}
			],
			securityDefinitions: {
				JWT: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization',
					description: ''
				},
				language: {
					type: 'apiKey',
					in: 'header',
					name: 'language',
					description: ''
				}
			}
		},
  
		basedir: __dirname, // app absolute path
		files: [
			'../api/private/controllers/*.js',
			'../api/public/controllers/*.js'
		]
	}
};