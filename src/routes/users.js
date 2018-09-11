import { UsersController } from '../controllers/UsersController'

module.exports = (app) => {
    const users = app.datasource.models.users;
    const usersController = new UsersController(users)

    app.get('/users', (req, res) => {
        users.findAll({})
            .then((listOfUsers) => {
                res.json(listOfUsers)
            })
    })

    app.post('/users', usersController.createUser)
}