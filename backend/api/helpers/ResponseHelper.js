const reponseWithData = (type, message, data) => {
	return {
		type,
		message,
		data
	};
};

const responseWithoutData = (type, message) => {
	return {
		type,
		message
	};

};

const setSuccess = (req, res, message, data = null) => {
	if (data) {
		return res.json(reponseWithData(true, message, data));
	}
	return res.json(responseWithoutData(true, message));
};

const setError = (req, res, message, data = null) => {
	if (data) {
		return res.json(reponseWithData(false, message, data));
	}
	return res.json(responseWithoutData(false, message));
};

export {
	setSuccess,
	setError
};