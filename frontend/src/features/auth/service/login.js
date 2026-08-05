import authFetch from "./authFetch.js"

const login = async ({ username, password }) => {

    return await authFetch('/login', {
        method : "POST",
        body : JSON.stringify({ username, password })
    })

}

const completeLoginVerification = async (loginVerificationId) => {
    const result = await authFetch(`/login/login-verifications/${loginVerificationId}`)

    return result
}

export {
    login,
    completeLoginVerification
}
