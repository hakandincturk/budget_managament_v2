import UserService from '../Services/User';
import {setError, setSuccess} from '../../helpers/ResponseHelper';

class UserController {

	static async getAllUser(req, res) {
		try {
			const result = await UserService.getAllUser();
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