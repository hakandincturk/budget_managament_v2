export default {
	Global: {
		hoopMessage: 'Oops! Something went wrong!',
		expiredMessage: 'Your connection has expired',
		transactionSuccessfull: 'Transaction completed successfully.',
		dataNotFound: 'Data not found.',
		unauthorized: 'You are not authorized to perform this action.'
	},
	Auth: {
		success: {
			login: 'Successfully logged in'
		},
		error: {
			wrongEmail: 'Incorrect email or password',
			tokenNotFound: 'You must login',
			unauthorizedLogin: 'You are not authorized to perform this action.'
		}
	},
	Users: {
		success: {
			create: 'User created successfully.',
			update: 'User updated successfully.',
			delete: 'User deleted successfully.'
		},
		error: {
			create: 'User could not be created.',
			update: 'User could not be updated.',
			delete: 'User could not be deleted.'
		},
		info: {
			notFound: 'User not found.',
			get: 'User retrieved successfully.',
			gets: 'Users retrieved successfully.',
			alreadyExist: 'User already exist.'
		}
	},
	UserCards: {
		success: {
			create: 'Card created successfully.',
			update: 'Card updated successfully.',
			delete: 'Card deleted successfully.'
		},
		error: {
			create: 'Card could not be created.',
			update: 'Card could not be updated.',
			delete: 'Card could not be deleted.'
		},
		info: {
			notFound: 'Card not found.',
			get: 'Card retrieved successfully.',
			gets: 'Cards retrieved successfully.',
			alreadyExist: 'Card already exist.'
		}
	},
	Outgoings: {
		success: {
			create: 'Outgoing money created successfully.',
			update: 'Outgoing money updated successfully.',
			delete: 'Outgoing money deleted successfully.'
		},
		error: {
			create: 'Outgoing money could not be created.',
			update: 'Outgoing money could not be updated.',
			delete: 'Outgoing money could not be deleted.'
		},
		info: {
			notFound: 'Outgoing money not found.',
			get: 'Outgoing money retrieved successfully.',
			gets: 'Outgoing moneys retrieved successfully.',
			alreadyExist: 'Outgoing money already exist.'
		}
	},
	Installments: {
		success: {
			create: 'Installment created successfully.',
			update: 'Installment updated successfully.',
			delete: 'Installment deleted successfully.',
			paid: 'Installment paid successfully.'
		},
		error: {
			create: 'Installment could not be created.',
			update: 'Installment could not be updated.',
			delete: 'Installment could not be deleted.'
		},
		info: {
			notFound: 'Installment not found.',
			get: 'Installment retrieved successfully.',
			gets: 'Installments retrieved successfully.',
			alreadyExist: 'Installment already exist.'
		}
	},
	Joi: {
		'any.required': '{{#label}} is required',
		'array.base': '{{#label}} must be a array',
		'array.length': '{{#label}} must contain {{#limit}} items',
		'array.max': '{{#label}} must contain less than or equal to {{#limit}} items',
		'array.min': '{{#label}} must contain at least {{#limit}} items',
		'boolean.base': '{{#label}} must be a boolean',
		'date.base': '{{#label}} must be a date',
		'number.base': '{{#label}} must be a number',
		'number.integer': '{{#label}} must be an integer',
		'number.max': '{{#label}} must be less than or equal to {{#limit}}',
		'number.min': '{{#label}} must be larger than or equal to {{#limit}}',
		'number.negative': '{{#label}} must be a negative',
		'number.positive': '{{#label}} must be a positive',
		'number.greater': '{{#label}} cannot be greater than {{#root}}',
		'object.base': '{{#label}} must be a object',
		'object.unknown': '{{#label}} is not allowed',
		'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
		'string.base': '{{#label}} must be a string',
		'string.base64': '{{#label}} must be a valid base64 string',
		'string.creditCard': '{{#label}} must be a credit card',
		'string.dataUri': '{{#label}} must be a valid dataUri string',
		'string.domain': '{{#label}} must contain a valid domain name',
		'string.email': '{{#label}} must be a valid email',
		'string.empty': '{{#label}} is not allowed to be empty',
		'string.guid': '{{#label}} must be a valid GUID',
		'string.hex': '{{#label}} must only contain hexadecimal characters',
		'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
		'string.hostname': '{{#label}} must be a valid hostname',
		'string.ip': '{{#label}} must be a valid ip address',
		'string.isoDate': '{{#label}} must be in iso format',
		'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
		'string.length': '{{#label}} length must be {{#limit}} characters long',
		'string.lowercase': '{{#label}} must only contain lowercase characters',
		'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
		'string.min': '{{#label}} length must be at least {{#limit}} characters long',
		'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
		'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
		'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}',
		'string.trim': '{{#label}} must not have leading or trailing whitespace',
		'string.uri': '{{#label}} must be a valid uri',
		'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
		'string.uppercase': '{{#label}} must only contain uppercase characters'
	}
};