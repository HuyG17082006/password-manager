import authFetch from "./authFetch.js";

const register = async ({ username, password, email }) => {

    return await authFetch('/register', {
        method : "POST",
        body : JSON.stringify({
            username,
            password,
            email
        })
    })

} 

export {
    register
}