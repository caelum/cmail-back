import HttpStatus from 'http-status'
import { app, request, expect } from "../utils/helpers";

const defaultUser = {
    email: 'teste@teste.com',
    name: 'Teste',
    password: 'teste123',
    avatar_url: 'http://placehold.it/200x200'
}

const defaultUser2 = {
    email: 'teste2@teste.com',
    name: 'Teste',
    password: 'teste123',
    avatar_url: 'http://placehold.it/200x200'
}

describe('# Routes: Login', () => {
    beforeEach((done) => {
        (async () => {
            const sequelize = app.datasource.sequelize
            const users = app.datasource.models.users;

            await sequelize.drop() // Drop everything
            await sequelize.sync() // Rebuild Everything
            await users.create(defaultUser)
            await users.create(defaultUser2)

            done()
        })()
    })

    describe('## POST /login', () => {
        it('should create a token and return it with user information', (done) => {
            const loginData = {
                email: defaultUser.email,
                password: defaultUser.password,
            }
            request
                .post('/login')
                .send(loginData)
                .end((err, res) => {
                    expect(res.status).to.equal(HttpStatus.CREATED);
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('avatarUrl')
                    expect(res.body).to.have.property('name')

                    done(err)
                })
        })
        // should return error if password is invalid
        // should return error if email is invalid
        // should return error if email already exists
    })
})