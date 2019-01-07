import { UsersRepository } from '../repositories/UsersRepository';
import { UsersController } from '../controllers/UsersController';

module.exports = (app) => {
    const users = app.datasource.models.users;
    const usersRepository = new UsersRepository(users);
    const usersController = new UsersController(usersRepository);

    app.get('/users', (req, res) => {
        users.findAll({})
            .then((listOfUsers) => {
                res.json({
                    users: listOfUsers
                })
            })
    })

    app.get('/users/:userId', usersController.searchUser)

    app.post('/users', usersController.createUser)

    app.patch('/users/:userId', usersController.updateUser)


}