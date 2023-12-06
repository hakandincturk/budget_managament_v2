import UserService from '../Services/User';
import {setError, setSuccess} from '../../helpers/ResponseHelper';

/**
 * @typedef LoginBodyReq
 * @property { string } email
 * @property { string } password
 */

class UserController {

	/**
	 * @route POST /public/user/login
	 * @group User
	 * @param { LoginBodyReq.model } body.body.required
	 * @summary Login with credentials
	 * @returns { object } 200 - Success message
	 * @returns { Error } default - Unexpected error
	 */
	static async login(req, res) {
		try {
			const result = await UserService.login();
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

export default UserController;