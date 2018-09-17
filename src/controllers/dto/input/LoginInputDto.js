export const extractLoginInfo = (reqBody) => {
    return {
        email: reqBody.email,
        password: reqBody.password,
    }
}