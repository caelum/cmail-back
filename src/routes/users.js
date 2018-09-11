module.exports = (app) => {
    const users = app.datasource.models.users;

    app.get('/users', (req, res) => {

        users.findAll({})
            .then((listOfUsers) => {
                res.json(listOfUsers)
            })

    })
}