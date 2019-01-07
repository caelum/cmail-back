import * as requestUtils from '../infra/utils/requestUtils'
import HttpStatus from 'http-status'
import * as tokenManager from '../infra/tokenManager'

export class EmailsController {
    
    constructor(emailRepository){
        this.emailRepository = emailRepository
    }

    sendEmail = async (req,res) => {
        if(req.validations.hasErrors()) {
            requestUtils.errorResponse(res, req.validations.errors)
            return;
        }

        const senderToken = req.headers.authorization
        const tokenData = await tokenManager.verify(senderToken)
        
        const senderEmail = tokenData.email

        this.emailRepository
            .create({
                from: senderEmail,
                to: req.body.to,
                subject: req.body.subject,
                content: req.body.content
            })
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

    listAllEmailsFromUser = async (req,res) => {
        if(req.validations.hasErrors()) {
            requestUtils.errorResponse(res, req.validations.errors)
            return;
        }

        const senderToken = req.headers.authorization
        const tokenData = await tokenManager.verify(senderToken)
        
        const senderEmail = tokenData.email

        this.emailRepository
            .getAllEmailsBySender(senderEmail)
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

    removeEmail = async (req,res) => {
        if(req.validations.hasErrors()) {
            requestUtils.errorResponse(res, req.validations.errors)
            return;
        }

        const emailId = req.params.id

        this.emailRepository
            .delete(emailId)
            .then(deletedEmailOperationStatus => {
                requestUtils.defaultResponse(res, {
                    emailStatus: Boolean(deletedEmailOperationStatus)
                }, HttpStatus.CREATED)
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