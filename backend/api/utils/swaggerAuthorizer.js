const db = require('../bin/db');
const {APP} = require('../bin/index');
const md5 = require('md5');

module.exports = async (email, password, cb) => {
	if (!email || email.length === 0 || !password || password.length === 0) {
		return cb(null, false);
	}

	const userData = await db
		.get()
		.model('users')
		.findOne({email, password: md5(md5(password) + md5(APP.private.salt))});
	if (!userData) {
		return cb(null, false);
	}

	const permission = await db
		.get()
		.model('permissions')
		.findOne({_id: userData.permission_id, type: 0});
	if (!permission) {
		return cb(null, false);
	}
	return cb(null, true);
};
