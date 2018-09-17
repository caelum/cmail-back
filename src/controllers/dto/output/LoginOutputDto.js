export const loggedUserInfo = (userFound, token) => {
    return {
        email: userFound.email,
        name: userFound.name,
        avatarUrl: userFound.avatar_url,
        token
    }
}