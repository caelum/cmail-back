import * as requestUtils from '../infra/utils/requestUtils'
import HttpStatus from 'http-status'

export class UsersController {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    createUser = (req, res) => {
        this.userRepository
            .create(req.body)
            .then(createdUser => {
                requestUtils.defaultResponse(res, createdUser, HttpStatus.CREATED)
            })
            .catch(error => {
                error = {
                    message: error.message,
                    body: error.errors.map((item) => {
                        return {
                            message: item.message,
                            value: item.value
                        }
                    })
                }

                requestUtils.errorResponse(res, error)
            });
    }

    searchUser = (req, res) => {

        return this.userRepository
                    .findUserById(req.params.userId)
                    .then(userData => {
                        requestUtils.defaultResponse(res, userData, HttpStatus.FOUND)
                    })
                    .catch(error => {
                        requestUtils.errorResponse(res, error, HttpStatus.NOT_FOUND)
                    });
            
    }

}
