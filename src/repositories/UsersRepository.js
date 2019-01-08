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
            throw new Error(`User id ${userId} not found`)
        })
        
    }

    create = (newUser) => {
        newUser = {
            "name": newUser.name,
            "username": newUser.username,
            "email": `${newUser.username}@cmail.com.br`,
            "phone": newUser.phone,
            "avatar_url": newUser.avatar || "http://placehold.it/120x120"
        }
        return this.users.create(newUser)
    }

    update = (newData) => {
        return this.users.update(newData, {
            where: {
                id: newData.id
            }
        })
        .then((rowsAffected) => {
            if(rowsAffected[0]){
                return rowsAffected
            }
            throw new Error(`User id ${newData.id} not found`)
        })
    } 

}   