import 'dotenv';

import db from '../../src/models';
import md5 from 'md5';

import { Lang } from '../../src/enums/language';

class AuthService {

	static async createUser(body, lang) {
		try {
			const user = await db.Users.findOne({
				where: {
					email: body.email
				}
			});
			if (user) {
				return {
					type: false,
					message: Lang[lang].Users.info.alreadyExist
				};
			}

			const passwordWithMD5 = md5(body.password + md5(process.env.PASSWORD_SALT));

			const createdUser = await db.Users.create({
				name: body.name,
				surname: body.surname,
				email: body.email,
				password: passwordWithMD5,
				phone_number: body.phone_number,
				type: body.user_type
			});
			return {
				type: true,
				message: Lang[lang].Users.success.create,
				data: createdUser
			}; 
		}
		catch (error) {
			throw error;
		}
	}

}

export default AuthService;