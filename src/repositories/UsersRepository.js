export class UsersRepository {
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
            const hasUser = userFound && userFound.dataValues
            if(hasUser) {
                return userFound.dataValues
            }
            throw new Error('User not found, please check your information')
        })
    }
}