import Joi from 'joi';

class AuthValidation{

	static async registerValidation(data){
		try {
			const schema = Joi.object().keys({
				name: Joi.string().min(3).max(18).required(),
				surname: Joi.string().min(3).max(18).required(),
				email: Joi.string().email(),
				password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
				password_again: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
				phone_number: Joi.string().min(10),
				user_type: Joi.number().required()
			});

			await schema.validateAsync(data);
			return ({type: true});

		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

}

export default AuthValidation;