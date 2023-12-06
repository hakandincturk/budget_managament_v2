'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserTypes extends Model {

		static associate(models) {
			// define association here
		}
	
	}
	UserTypes.init({
		name: DataTypes.STRING,
		type: DataTypes.INTEGER,
		is_removed: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'UserTypes'
	});
	return UserTypes;
};