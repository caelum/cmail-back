import HttpStatus from 'http-status'
import { app, request, expect } from "../utils/helpers";

const defaultUser = {
    email: 'teste@teste.com',
    name: 'Teste',
    password: 'teste123',
    avatar_url: 'http://placehold.it/200x200',
    id: '1234567890'
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

                    expect(res.status).to.be.equal(HttpStatus.OK)
                    done()
                })
        })
    })

    describe('## GET /users/:userId', () => {

        it('Should return one user by id', (done)=> {
            request
                .get(`users/${defaultUser.id}`)
                .end((err, res) => {
                    console.log(res.body);
                    
                    expect(res.body.id).to.be.deep.equal(defaultUser.id)

                    expect(res.status).to.be.equal(HttpStatus.OK)
                    done()
                })
        })
    })

    describe('## POST /users', () => {
        const newUser = {
            email: 'teste2@teste.com',
            name: 'Usuario Novo Teste',
            password: 'teste1234',
            avatar_url: 'http://placehold.it/200x200'    
        };

        it('should register a new user and return the created user', (done) => {
            request
                .post('/users')
                .send(newUser)
                .end((err, res) => {
                    expect(res.status).to.equal(HttpStatus.CREATED);
                    done(err);
                });
        })

        it('should return error if email already exists', (done) => {
            const newUser2 = {
                ...newUser,
                email: defaultUser.email
            }
            request
                .post('/users')
                .send(newUser2)
                .end((err, res) => {
                    expect(res.status).to.equal(HttpStatus.BAD_REQUEST);
                    done(err);
                });
        })
    })
})

