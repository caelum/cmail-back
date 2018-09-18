import * as validator from '../infra/validator'
import { UsersRepository } from '../repositories/UsersRepository'
import { UsersService } from '../services/UsersService'
import { LoginController } from '../controllers/LoginController'

import Joi from 'joi'

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = (app) => {
    const users = app.datasource.models.users;
    const usersRepository = new UsersRepository(users)
    const usersService = new UsersService(usersRepository)
    const loginController = new LoginController(usersService)

    app.post(
        '/login',
        validator.validateMiddleware({
            body: userLoginSchema,
        }),
        loginController.signIn
    )
}