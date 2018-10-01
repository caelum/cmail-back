import * as requestUtils from '../infra/utils/requestUtils'
import HttpStatus from 'http-status'

export class UsersController {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    createUser = (req, res) => {
        const newUser = req.body

        this.userRepository.create(newUser)
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

        this.userRepository.findOne({ where: { id: req.params.userId } })
            .then(theUser => {
                
                if(theUser){
                    return requestUtils.defaultResponse(res, theUser, HttpStatus.OK)
                }
                
                throw new Error('User not found, please check your information')

            })
            .catch(error => {
                requestUtils.errorResponse(res, error, HttpStatus.NOT_FOUND)
            });
    }

}
