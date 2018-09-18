import HttpStatus from 'http-status'

import * as requestUtils from '../infra/utils/requestUtils'
import * as LoginInputDto from './dto/input/LoginInputDto'

export class LoginController {
    constructor(usersService) {
        this.usersService = usersService
    }

    signIn = (req, res) => {
        if(req.validations.hasErrors()) {
            requestUtils.errorResponse(res, req.validations.errors)
            return;
        }

        const userLoginInfo = LoginInputDto.extractLoginInfo(req.body)
        this.usersService.login(userLoginInfo)
            .then((loginResponse) => {
                requestUtils.defaultResponse(res, loginResponse, HttpStatus.CREATED)
            })
            .catch((err) => {
                requestUtils.errorResponse(res, err)
            })
    }
}