# Cmail Back End

[![Coverage Status](https://coveralls.io/repos/github/omariosouto/cmail-back/badge.svg?branch=master)](https://coveralls.io/github/omariosouto/cmail-back?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/eeb79d17670beb95df6b/maintainability)](https://codeclimate.com/github/omariosouto/cmail-back/maintainability)
[![CircleCI](https://circleci.com/gh/omariosouto/cmail-back/tree/master.svg?style=svg)](https://circleci.com/gh/omariosouto/cmail-back/tree/master)

Seja bem vindo ao back-end do Cmail :)

## API
`http://localhost:3200/`  

Response formats: JSON

## Endpoints
### Users `/users`:
**Accepts:**  
    - `GET`  
    - `POST`  
```
{
    name: '',
    username: '',
    phone: '',
    password: '',
    avatar: ''
}
```

#### Parameters `user/:userId`:
**Accepts:**  
    - `GET`  
    - `PATCH`   
    
### Login `/login`:
**Accepts:**  
    - `POST`
```
{
    email: '',
    password: ''
}
```

### Email `/emails`:
Headers: `authorization`

**Accepts:**  
    - `POST`
    - `GET`


```
{
    to: '',
    subject: '',
    content: ''
}
```

#### Parameters `emails/:emailId`:
**Accepts:**  
    - `DELETE`  
