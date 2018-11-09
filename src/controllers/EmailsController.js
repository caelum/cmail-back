import * as requestUtils from '../infra/utils/requestUtils'
import HttpStatus from 'http-status'

export class EmailsController {
    
    constructor(emailRepository){
        this.emailRepository = emailRepository
    }

    sendEmail = (req,res) => {

        this.emailRepository
            .create(req.body)
            .then(
                (res) => {
                    requestUtils.defaultResponse(res, email, HttpStatus.OK)
                    //res.json(HttpStatus.OK)
                }
            )
            .catch(
                () => {
                    res.json(HttpStatus.INTERNAL_SERVER_ERROR)
                }
            )
    }
}