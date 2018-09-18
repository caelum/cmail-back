
import { validatorMiddleware } from '../infra/validator'
import { userLoginSchema } from '../controllers/schemas/userLoginSchema.js'
import { UsersRepository } from '../repositories/UsersRepository'
import { UsersService } from '../services/UsersService'
import { LoginController } from '../controllers/LoginController'

module.exports = (app) => {
    const users = app.datasource.models.users;
    const usersRepository = new UsersRepository(users)
    const usersService = new UsersService(usersRepository)
    const loginController = new LoginController(usersService)

    app.post(
        '/login',
        validatorMiddleware({
            body: userLoginSchema,
        }),
        loginController.signIn
    )
}