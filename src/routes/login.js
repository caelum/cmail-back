import { LoginController } from '../controllers/LoginController'
import { UserRepository } from '../repositories/UserRepository'

module.exports = (app) => {
    const users = app.datasource.models.users;
    const userRepository = new UserRepository(users)
    const loginController = new LoginController(userRepository)

    app.post('/login', loginController.signIn)
}