/* eslint-disable no-prototype-builtins */
import RecursiveIterator from 'recursive-iterator';

const _tagDuplicated = (target, tag) => {
	if (target && target.length && tag) {
		for (let i = 0;i < target.length;i = i + 1) {
			const targetTag = target[i];
			if (targetTag.name === tag.name) {
				return true;
			}
		}
	}
	return false;
};

const _attachTags = (conf) => {
	const tag = conf.tag;
	const swaggerObject = conf.swaggerObject;
	let propertyName = conf.propertyName;

	// Correct deprecated property.
	if (propertyName === 'tag') {
		propertyName = 'tags';
	}

	if (Array.isArray(tag)) {
		for (let i = 0;i < tag.length;i = i + 1) {
			if (!_tagDuplicated(swaggerObject[propertyName], tag[i])) {
				swaggerObject[propertyName].push(tag[i]);
			}
		}
	}
	else if (!_tagDuplicated(swaggerObject[propertyName], tag)) {
		swaggerObject[propertyName].push(tag);
	}
};

const _objectMerge = (obj1, obj2) => {
	const obj3 = {};
	for (const attr in obj1) {
		if (obj1.hasOwnProperty(attr)) {
			obj3[attr] = obj1[attr];
		}
	}
	for (const name in obj2) {
		if (obj2.hasOwnProperty(name)) {
			obj3[name] = obj2[name];
		}
	}
	return obj3;
};

const swaggerizeObj = (swaggerObject) => {
	swaggerObject.swagger = '2.0';
	swaggerObject.paths = swaggerObject.paths || {};
	swaggerObject.definitions = swaggerObject.definitions || {};
	swaggerObject.responses = swaggerObject.responses || {};
	swaggerObject.parameters = swaggerObject.parameters || {};
	swaggerObject.securityDefinitions = swaggerObject.securityDefinitions || {};
	swaggerObject.tags = swaggerObject.tags || [];
	return swaggerObject;
};

const _getSwaggerSchemaWrongProperties = () => [
	'consume',
	'produce',
	'path',
	'tag',
	'definition',
	'securityDefinition',
	'scheme',
	'response',
	'parameter',
	'deprecated'
];

const _correctSwaggerKey = (propertyName) => {
	const wrong = _getSwaggerSchemaWrongProperties();
	if (wrong.indexOf(propertyName) > 0) {
		// Returns the corrected property name.
		return propertyName + 's';
	}
	return propertyName;
};

const _organizeSwaggerProperties = (swaggerObject, pathObject, propertyName) => {
	const simpleProperties = [
		'consume',
		'consumes',
		'produce',
		'produces',
		// 'path',
		// 'paths',
		'schema',
		'schemas',
		'securityDefinition',
		'securityDefinitions',
		'response',
		'responses',
		'parameter',
		'parameters',
		'definition',
		'definitions'
	];

	// Common properties.
	if (simpleProperties.indexOf(propertyName) !== -1) {
		const keyName = _correctSwaggerKey(propertyName);
		const definitionNames = Object
			.getOwnPropertyNames(pathObject[propertyName]);
		for (let k = 0;k < definitionNames.length;k = k + 1) {
			const definitionName = definitionNames[k];
			swaggerObject[keyName][definitionName] = pathObject[propertyName][definitionName];
		}
		// Tags.
	}
	else if (propertyName === 'tag' || propertyName === 'tags') {
		const tag = pathObject[propertyName];
		_attachTags({
			tag: tag,
			swaggerObject: swaggerObject,
			propertyName: propertyName
		});
		// Paths.
	}
	else {
		const routes = Object
			.getOwnPropertyNames(pathObject[propertyName]);

		for (let k = 0;k < routes.length;k = k + 1) {
			const route = routes[k];
			if (!swaggerObject.paths) {
				swaggerObject.paths = {};
			}
			swaggerObject.paths[route] = _objectMerge(
				swaggerObject.paths[route], pathObject[propertyName][route],
			);
		}
	}
};

const addDataToSwaggerObject = (swaggerObject, data) => {
	if (!swaggerObject || !data) {
		throw new Error('swaggerObject and data are required!');
	}

	for (let i = 0;i < data.length;i = i + 1) {
		const pathObject = data[i];
		const propertyNames = Object.getOwnPropertyNames(pathObject);
		for (let j = 0;j < propertyNames.length;j = j + 1) {
			const propertyName = propertyNames[j];
			_organizeSwaggerProperties(swaggerObject, pathObject, propertyName);
		}
	}
};

const seekWrong = (list, wrongSet, problems) => {
	const iterator = new RecursiveIterator(list, 0, false);
	for (let item = iterator.next();!item.done;item = iterator.next()) {
		const isDirectChildOfProperties = item.value.path[item.value.path.length - 2] === 'properties';
		if (wrongSet.indexOf(item.value.key) > 0 && !isDirectChildOfProperties) {
			problems.push(item.value.key);
		}
	}
};

const findDeprecated = (sources) => {
	const wrong = _getSwaggerSchemaWrongProperties();
	const problems = [];
	sources.forEach(function(source) {
		seekWrong(source, wrong, problems);
	});
	return problems;
};

module.exports = {
	addDataToSwaggerObject: addDataToSwaggerObject,
	swaggerizeObj: swaggerizeObj,
	findDeprecated: findDeprecated
};
