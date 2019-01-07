import JWT from 'jsonwebtoken'

const SECRET_KEY = 'BIRDMAN'

const options = {
    expiresIn: '168h'
}

export const generate = (obj) => {
    return new Promise((resolve, reject) => {
        var token = JWT.sign(obj, SECRET_KEY, options, (err, token) => {
            if(err) {
                reject(err)
            }
            resolve(token)
        });
    })
}

export const verify = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, SECRET_KEY, function(err, decoded) {
            if(err) {
                reject(err)
            }
            resolve(decoded)
        });
    })
}