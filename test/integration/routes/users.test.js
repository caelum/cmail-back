import HttpStatus from 'http-status'
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
            const sequelize = app.datasource.sequelize;
            const users = app.datasource.models.users;

            await sequelize.drop() // Drop everything
            await sequelize.sync() // Rebuild Everything
            await users.create(defaultUser)
            done();
        })()
    })

    describe('## GET /users', () => {
        it('should return all users', (done) => {
            request
                .get('/users')
                .end((err, res) => {
                    expect(res.body[0].email).to.be.deep.equal(defaultUser.email);
                    expect(res.body[0].name).to.be.deep.equal(defaultUser.name);
                    expect(res.body[0].password).to.be.deep.equal(defaultUser.password);
                    expect(res.body[0].avatar_url).to.be.deep.equal(defaultUser.avatar_url);

                    expect(res.status).to.be.equal(HttpStatus.OK);

                    done();
                })
        })
    })

    describe('## GET /users/:userId', () => {

        let createdUser;

        beforeEach((done) => {
            (async () => {
                const sequelize = app.datasource.sequelize;
                const users = app.datasource.models.users;

                await sequelize.drop();
                await sequelize.sync();
                createdUser = await users.create(defaultUser);

                done();
            })()
        })

        it('Should return one user by id', (done) => {

            request
                .get(`/users/${createdUser.id}`)
                .end((err, res) => {
                    expect(res.body.id).to.be.deep.equal(createdUser.id);
                    expect(res.status).to.be.equal(HttpStatus.FOUND);

                    done(err);
                })
        })

        it('Should return a not found error if user not exists', (done) => {

            let randomId = Math.round(Math.random() * 10000);

            request
                .get(`/users/${randomId}`)
                .end((err, res) => {
                    expect(res.body.message).to.be.deep.equal(`User id ${randomId} not found`)
                    expect(res.status).to.be.equal(HttpStatus.NOT_FOUND);
                    done(err);
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

    describe('## PATCH /users/:userId', () => {
        let oldUser,
            newUserData = {
                email: 'jon@teste.com',
                name: 'Jon Doe',
                password: '123testing',
                avatar_url: 'http://placehold.it/200x200/123'
            }

        beforeEach((done) => {
            (async () => {
                const sequelize = app.datasource.sequelize;
                const users = app.datasource.models.users;

                await sequelize.drop();
                await sequelize.sync();
                oldUser = await users.create(defaultUser);

                done();
            })()
        })
        
        it('Should update data from a user by id', (done) => {
            newUserData.id = oldUser.id;

            request
                .patch(`/users/${newUserData.id}`)
                .send(newUserData)
                .end((err,res)=>{
                    expect(res.body.message).to.be.deep.equal(`${newUserData.name} successfully updated!`)
                    expect(res.status).to.be.deep.equal(HttpStatus.OK)

                    done(err);
                })
        })

        it('Should return an error if user not exists', (done) => {
            
            let randomId = Math.round(Math.random() * 10000);
            newUserData.id = randomId;

            request
                .patch(`/users/${randomId}`)
                .send(newUserData)
                .end((err, res) => {
                    
                    expect(res.status).to.be.equal(HttpStatus.BAD_REQUEST);
                    done(err);      
                    
                })
        })
    })
})

