'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {

		static associate(models) {
		}
	
	}
	Users.init({
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		phone_number: DataTypes.STRING,
		type: DataTypes.BIGINT,
		is_removed: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Users'
	});
	return Users;
};