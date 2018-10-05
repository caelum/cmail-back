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

    findUserById = (userId) => {
        return this.users.findOne({
            where: {
                id: userId
            }
        })
        .then((userFound) => {
            const hasUser = userFound && userFound.dataValues
            if (hasUser) {
                return userFound.dataValues
            }
            throw new Error('User id not found')
        })
        
    }

    create = (newUser) => {
        return this.users.create(newUser)
    }

}