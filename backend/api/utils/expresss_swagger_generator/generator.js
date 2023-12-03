const fs = require('fs');
const glob = require('glob');
const path = require('path');
const parser = require('swagger-parser');
const doctrineFile = require('doctrine-file');

const swaggerHelpers = require('./helper');

const parseApiFile = (file) => {
	const content = fs.readFileSync(file, 'utf-8');
	return doctrineFile.parseFileContent(content, {unwrap: true, sloppy: true, tags: null, recoverable: true});
};

const parseRoute = (str) => {
	const split = str.split(' ');
	return {
		method: split[0].toLowerCase() || 'get',
		uri: split[1] || ''
	};
};

const parseField = (str) => {
	const split = str.split('.');
	return {
		name: split[0],
		parameter_type: split[1] || 'get',
		required: split[2] && split[2] === 'required' || false
	};
};

const parseType = (obj) => {
	if (!obj) return undefined;
	if (obj.name) {
		const spl = obj.name.split('.');
		if (spl.length > 1 && spl[1] === 'model') {
			return spl[0];
		}
		else return obj.name;
	}
	else if (obj.expression && obj.expression.name) {
		return obj.expression.name.toLowerCase();
	}
	else {
		return 'string';
	}
};

const parseSchema = (obj) => {
	if (!(obj.name || obj.applications)) return undefined;

	if (obj.name) {
		const spl = obj.name.split('.');
		if (spl.length > 1 && spl[1] === 'model') {
			return {'$ref': '#/definitions/' + spl[0]};
		}
		else return undefined;
	}
	if (obj.applications) {
		if (obj.applications.length === 1) {
			const type = obj.applications[0].name;
			if (type === 'object' || type === 'string' || type === 'integer' || type === 'boolean') {
				return {
					type: obj.expression.name.toLowerCase(),
					items: {
						'type': type
					}
				};
			}
			else {
				return {
					type: obj.expression.name.toLowerCase(),
					items: {
						'$ref': '#/definitions/' + obj.applications[0].name
					}
				};
			}
		}
		const oneOf = [];
		// eslint-disable-next-line guard-for-in
		for (const i in obj.applications) {
			const type = obj.applications[i].name;
			if (type === 'object' || type === 'string' || type === 'integer' || type === 'boolean') {
				oneOf.push({
					'type': type
				});
			}
			else {
				oneOf.push({
					'$ref': '#/definitions/' + obj.applications[i].name
				});
			}
			return {
				type: obj.expression.name.toLowerCase(),
				items: {
					oneOf: oneOf
				}
			};
		}
	}

	return undefined;
};

const parseItems = (obj) => {
	if (obj.applications && obj.applications.length > 0 && obj.applications[0].name) {
		const type = obj.applications[0].name;
		if (type === 'object' || type === 'string' || type === 'integer' || type === 'boolean') {
			return {'type': type};
		}
		else return {'$ref': '#/definitions/' + type};
	}
	else return undefined;
};

const parseReturn = (tags) => {
	const rets = {};
	const headers = parseHeaders(tags);

	for (const i in tags) {
		if (tags[i]['title'] === 'returns' || tags[i]['title'] === 'return') {
			const description = tags[i]['description'].split('-');const key = description[0].trim();

			rets[key] = {
				description: description[1] ? description[1].trim() : '',
				headers: headers[key]
			};
			const type = parseType(tags[i].type);
			if (type) {
				// rets[key].type = type;
				rets[key].schema = parseSchema(tags[i].type);
			}
		}
	}
	return rets;
};

const parseDescription = (obj) => {
	const description = obj.description || '';
	const sanitizedDescription = description.replace('/**', '');
	return sanitizedDescription;
};

const parseTag = (tags) => {
	for (const i in tags) {
		if (tags[i]['title'] === 'group') {
			return tags[i]['description'].split('-');
		}
	}
	return [ 'default', '' ];
};

const parseProduces = (str) => {
	return str.split(/\s+/);
};

const parseConsumes = (str) => {
	return str.split(/\s+/);
};

const parseTypedef = (tags) => {
	const typeName = tags[0]['name'];
	const details = {
		required: [],
		properties: {}
	};
	if (tags[0].type && tags[0].type.name) {
		details.allOf = [ {'$ref': '#/definitions/' + tags[0].type.name} ];
	}
	for (let i = 1;i < tags.length;i++) {
		if (tags[i].title === 'property') {
			let propName = tags[i].name;
			const propNameArr = propName.split('.');

			const props = propNameArr.slice(1, propNameArr.length);
			const required = props.indexOf('required') > -1;
			const readOnly = props.indexOf('readOnly') > -1;

			if (required) {
				if (details.required === null) details.required = [];
				propName = propName.split('.')[0];
				details.required.push(propName);
			}
			const schema = parseSchema(tags[i].type);

			if (schema) {
				details.properties[propName] = schema;
			}
			else {
				const type = parseType(tags[i].type);
				const parsedDescription = (tags[i].description || '').split(/-\s*eg:\s*/);
				const description = parsedDescription[0];
				const example = parsedDescription[1];

				const prop = {
					type: type,
					description: description,
					items: parseItems(tags[i].type)
				};
				if (readOnly) {
					prop.readOnly = true;
				}
				details.properties[propName] = prop;

				if (prop.type === 'enum') {
					const parsedEnum = parseEnums('-eg:' + example);
					prop.type = parsedEnum.type;
					prop.enum = parsedEnum.enums;
				}

				if (example) {
					switch (type) {
					case 'boolean':
						details.properties[propName].example = example === 'true';
						break;
					case 'integer':
						details.properties[propName].example = +example;
						break;
					case 'enum':
						break;
					default:
						details.properties[propName].example = example;
						break;
					}
				}
			}
		}
	}
	return {typeName, details};
};

const parseSecurity = (comments) => {
	let security;
	try {
		security = JSON.parse(comments);
	}
	catch (e) {
		const obj = {};
		obj[comments] = [];
		security = [
			obj
		];
	}
	return security;
};

const parseHeaders = (comments) => {
	const headers = {};
	for (const i in comments) {
		if (comments[i]['title'] === 'headers' || comments[i]['title'] === 'header') {
			const description = comments[i]['description'].split(/\s+-\s+/);

			if (description.length < 1) {
				break;
			}
			const code2name = description[0].split('.');

			if (code2name.length < 2) {
				break;
			}

			const type = code2name[0].match(/\w+/);
			const code = code2name[0].match(/\d+/);

			if (!type || !code) {
				break;
			}
			const code0 = code[0].trim();
			if (!headers[code0]) {
				headers[code0] = {};
			}

			headers[code0][code2name[1]] = {
				type: type[0],
				description: description[1]
			};
		}
	}
	return headers;
};

const parseEnums = (description) => {
	const enums = ('' + description).split(/-\s*eg:\s*/);
	if (enums.length < 2) {
		return [];
	}
	let parseType = enums[1].split(':');
	if (parseType.length === 1) {
		parseType = [ 'string', parseType[0] ];
	}
	return {
		type: parseType[0],
		enums: parseType[1].split(',')
	};
};

const fileFormat = (comments) => {
	let route;const parameters = {};const params = [];const tags = [];const definitions = {};
	// eslint-disable-next-line guard-for-in
	for (const i in comments) {
		const desc = parseDescription(comments);
		if (i === 'tags') {
			if (comments[i].length > 0 && comments[i][0]['title'] && comments[i][0]['title'] === 'typedef') {
				const typedefParsed = parseTypedef(comments[i]);
				definitions[typedefParsed.typeName] = typedefParsed.details;
				continue;
			}
			// eslint-disable-next-line guard-for-in
			for (const j in comments[i]) {
				const title = comments[i][j]['title'];
				if (title === 'route') {
					route = parseRoute(comments[i][j]['description']);
					const tag = parseTag(comments[i]);
					parameters[route.uri] = parameters[route.uri] || {};
					parameters[route.uri][route.method] = parameters[route.uri][route.method] || {};
					parameters[route.uri][route.method]['parameters'] = [];
					parameters[route.uri][route.method]['description'] = desc;
					parameters[route.uri][route.method]['tags'] = [ tag[0].trim() ];
					tags.push({
						name: typeof tag[0] === 'string' ? tag[0].trim() : '',
						description: typeof tag[1] === 'string' ? tag[1].trim() : ''
					});
				}
				if (title === 'param') {
					const field = parseField(comments[i][j]['name']);
					const properties = {
						name: field.name,
						in: field.parameter_type,
						description: comments[i][j]['description'],
						required: field.required
					};
					const schema = parseSchema(comments[i][j]['type']);
					// we only want a type if there is no referenced schema
					if (!schema) {
						properties.type = parseType(comments[i][j]['type']);
						if (properties.type === 'enum') {
							const parsedEnum = parseEnums(comments[i][j]['description']);
							properties.type = parsedEnum.type;
							properties.enum = parsedEnum.enums;
						}
					}
					else {
						properties.schema = schema;
					}
					params.push(properties);
				}

				if (title === 'operationId' && route) {
					parameters[route.uri][route.method]['operationId'] = comments[i][j]['description'];
				}

				if (title === 'summary' && route) {
					parameters[route.uri][route.method]['summary'] = comments[i][j]['description'];
				}

				if (title === 'produces' && route) {
					parameters[route.uri][route.method]['produces'] = parseProduces(comments[i][j]['description']);
				}

				if (title === 'consumes' && route) {
					parameters[route.uri][route.method]['consumes'] = parseConsumes(comments[i][j]['description']);
				}

				if (title === 'security' && route) {
					parameters[route.uri][route.method]['security'] = parseSecurity(comments[i][j]['description']);
				}

				if (title === 'deprecated' && route) {
					parameters[route.uri][route.method]['deprecated'] = true;
				}

				if (route) {
					parameters[route.uri][route.method]['parameters'] = params;
					parameters[route.uri][route.method]['responses'] = parseReturn(comments[i]);
				}
			}
		}
	}
	return {parameters: parameters, tags: tags, definitions: definitions};
};

const filterJsDocComments = (jsDocComments) => {
	return jsDocComments.filter(function(item) {
		return item.tags.length > 0;
	});
};

const convertGlobPaths = (base, globs) => {
	return globs.reduce(function(acc, globString) {
		const globFiles = glob.sync(path.resolve(base, globString));
		return acc.concat(globFiles);
	}, []);
};

module.exports = (options) => {
	if (!options) {
		throw new Error('\'options\' is required.');
	}
	else if (!options.swaggerDefinition) {
		throw new Error('\'swaggerDefinition\' is required.');
	}
	else if (!options.files) {
		throw new Error('\'files\' is required.');
	}

	let swaggerObject = swaggerHelpers.swaggerizeObj(options.swaggerDefinition);
	const apiFiles = convertGlobPaths(options.basedir, options.files);

	for (let i = 0;i < apiFiles.length;i = i + 1) {
		const parsedFile = parseApiFile(apiFiles[i]);
		const comments = filterJsDocComments(parsedFile);

		// eslint-disable-next-line guard-for-in
		for (const j in comments) {
			try {
				const parsed = fileFormat(comments[j]);
				swaggerHelpers.addDataToSwaggerObject(swaggerObject, [ {
					paths: parsed.parameters,
					tags: parsed.tags,
					definitions: parsed.definitions
				} ]);
			}
			catch (e) {
				console.log(`Incorrect comment format. Method was not documented.\nFile: ${apiFiles[i]}\nComment:`, comments[j]);
			}
		}
	}

	parser.parse(swaggerObject, function(err, api) {
		if (!err) {
			swaggerObject = api;
		}
	});

	return swaggerObject;
};

