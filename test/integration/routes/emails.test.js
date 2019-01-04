import HttpStatus from 'http-status'
import { app, request, expect } from "../utils/helpers";
import * as tokenManager from "../../../src/infra/tokenManager";

describe('# Routes: Emails', () => {

    describe('## POST /emails', () => {
        
        const defaultUser = {
            email: 'teste@cmail.com',
            name: 'Teste',
            password: 'teste123',
            avatar_url: 'http://placehold.it/200x200'
        }

        beforeEach((done) => {
            (async () => {
                const sequelize = app.datasource.sequelize;
                const users = app.datasource.models.users;

                await sequelize.drop()
                await sequelize.sync()
                await users.create(defaultUser)

                done();
            })()
        })
        
        it('Should register an email object and return the date of sent and the recipient address ', (done) => {

            const loginData = {
                email: defaultUser.email,
                password: defaultUser.password,
            }
            
            tokenManager
            .generate(loginData)
            .then( token => defaultUser.token = token )
            .then( () => {

                const email = {
                    from: defaultUser.email,
                    to: 'btest@cmail.com',
                    subject: 'Lorem',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }

                request
                    .post('/emails')
                    .send(email)
                    .set({ authorization: defaultUser.token })
                    .end((err, res) => {
                        expect(res.body.from).to.be.equal(email.from)
                        expect(res.body.to).to.be.equal(email.to)
                        expect(res.body.subject).to.be.equal(email.subject)
                        
                        expect(res.status).to.equal(HttpStatus.CREATED);
                        done(err)
                    })
            })

        })
    })    

})