import { app, request, expect } from "../utils/helpers";

describe('# Routes: Users', () => {

    describe('## GET /users', () => {
        request
            .get('/users')
            .end((err, res)=>{
                expect(res.status).to.be.equal(200)
            })
    })
})

