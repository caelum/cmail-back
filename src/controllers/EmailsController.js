import * as requestUtils from '../infra/utils/requestUtils'
import HttpStatus from 'http-status'

export class EmailsController {
    
    constructor(emailRepository){
        this.emailRepository = emailRepository
    }

    sendEmail = (req,res) => {

        this.emailRepository
            .create(req.body)
            .then(createdEmail => {
                requestUtils.defaultResponse(res, createdEmail, HttpStatus.CREATED)
            })
            .catch(
                error => {
                    error = {
                        message: error.message,
                        body: error.errors.map((item) => {
                            return {
                                message: item.message,
                                value: item.value
                            }
                        })
                    }
                    requestUtils.errorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
                }
            )
    }
}