import * as LoginOutputDto from '../controllers/dto/output/LoginOutputDto'
import * as tokenManager from '../infra/tokenManager'

export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    login = (userLoginInfo) => {
        return this.usersRepository
            .findUserByLoginAndPassword(userLoginInfo)
            .then(async (userFound) => {
                const token = await tokenManager.generate({
                    email: userLoginInfo.email
                })

                const loginResponse = LoginOutputDto.loggedUserInfo(userFound, token)
                return loginResponse
            })
    }
}