import HttpStatus from 'http-status'
import validator from "fluent-validator";

import * as tokenManager from '../infra/tokenManager'
import * as requestUtils from '../infra/utils/requestUtils'
import * as LoginInputDto from './dto/input/LoginInputDto'
import * as LoginOutputDto from './dto/output/LoginOutputDto'

export class LoginController {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    signIn = (req,res) => {
        const validations = validator()
            .validate(req.body.email).param('email').isEmail().and.isNotEmpty()
            .validate(req.body.password).param('password').isNotEmpty()

        if(validations.hasErrors()) {
            const error = new Error('Please, fill all fields correctly')
            error.body = validations.getErrors()
            requestUtils.errorResponse(res, error)
        }

        const userLoginInfo = LoginInputDto.extractLoginInfo(req.body)
        
        this.userRepository
            .findUserByLoginAndPassword(userLoginInfo)
            .then(async (userFound) => {
                const token = await tokenManager.generate({
                    email: userLoginInfo.email
                })

                const loginResponse = LoginOutputDto.loggedUserInfo(userFound, token)
                requestUtils.defaultResponse(res, loginResponse, HttpStatus.CREATED)
            })
            .catch((err) => {
                requestUtils.errorResponse(res, err)
            })
    }
}