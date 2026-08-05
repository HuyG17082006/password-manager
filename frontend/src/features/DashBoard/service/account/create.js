import accountFetch from "./accountFetch.js";

export const create = async (account) => {
    return await accountFetch('/', {
        method : "POST",
        body : JSON.stringify(account)
    })
}