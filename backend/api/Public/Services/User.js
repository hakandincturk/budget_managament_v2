import db from '../../src/models';

class User {

	constructor() {
		this.db = db;
	}

	static async getAllUser() {
		try {
			const allUsers = await db.Users.findAll();
			console.log('allUsers -->', allUsers);
			return {
				type: true,
				message: 'Kullanıcılar başarıyla getirildi.',
				data: allUsers
			}; 
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;