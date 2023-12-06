import AuthService from '../Services/Auth';
import AuthValidation from '../Validations/Auth';
import {setError, setSuccess} from '../../helpers/ResponseHelper';

/**
 * @typedef CreateUserReq
 * @property { string } email
 * @property { string } name
 * @property { string } surname 
 * @property { string } password - Must be 5-30 characters
 * @property { string } password_again - Must be same with password
 * @property { string } phone_number - 10 digits
 * @property { string } user_type - 1: SYSTEM, 2: PUBLIC
 */

class AuthController {

	/**
	 * @route POST /private/auth/createUser
	 * @group User
	 * @param { CreateUserReq.model } body.body.required
	 * @summary CreateUser with email and password
	 * @returns { object } 200 - Success message
	 * @returns { Error } default - Unexpected error
	 */
	static async createUser(req, res) {
		try {
			const lang = req.headers.language;

			const validation = await AuthValidation.registerValidation(req.body);
			if (validation.type === false){
				return setError(
					req, res, 
					validation.message
				);
			}

			const result = await AuthService.createUser(req.body, lang);
			if (result.type === false){
				return setError(
					req, res, 
					result.message
				);
			}
				
			return setSuccess(
				req, res, 
				result.message, 
				result.data
			);
		}
		catch (err) {
			console.log(err);
			return setError(
				req, res, 
				'Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
			);
		}
	}

}

export default AuthController;