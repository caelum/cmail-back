export class UserRepository {
    constructor(users) {
        this.users = users
    }
    findUserByLoginAndPassword = (userLoginInfo) => {
        return this.users.findOne({
            where: {
                email: userLoginInfo.email,
                password: userLoginInfo.password
            }
        })
        .then((userFound) => {
            if(!userFound) {
                new Error('User not found, please check your information')
            }
            return userFound.dataValues
        })
    }
}