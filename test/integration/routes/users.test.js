import { app, request, expect } from "../utils/helpers";

const defaultUser = {
    email: 'teste@teste.com',
    name: 'Teste',
    password: 'teste123',
    avatar_url: 'http://placehold.it/200x200'
}

describe('# Routes: Users', () => {
    beforeEach((done) => {
        (async () => {
            const sequelize = app.datasource.sequelize
            const users = app.datasource.models.users;

            await sequelize.drop() // Drop everything
            await sequelize.sync() // Rebuild Everything
            await users.create(defaultUser)
            done()
        })()
    })

    describe('## GET /users', () => {
        it('should return all users', (done) => {
            request
                .get('/users')
                .end((err, res)=>{                    
                    expect(res.body[0].email).to.be.deep.equal(defaultUser.email)
                    expect(res.body[0].name).to.be.deep.equal(defaultUser.name)
                    expect(res.body[0].password).to.be.deep.equal(defaultUser.password)
                    expect(res.body[0].avatar_url).to.be.deep.equal(defaultUser.avatar_url)

                    expect(res.status).to.be.equal(200)
                    done()
                })
        })
    })
})

