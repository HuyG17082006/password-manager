import accountFetch from "./accountFetch.js";

export const getAll = async () => {
    return await accountFetch('/', {
        method : "GET"
    })
} 

export const getWithFolderId = async (folderId) => {
    return await accountFetch(`/folder/${folderId}`, {
        method : "GET"
    });
}

export const getIsNoFolder = async () => {
    return await accountFetch(`/no-folder`, {
        method : "GET"
    })
}

export const getSystemFolderTotalAccounts = async () => {
    return await accountFetch('/overview', {
        method : "GET"
    })
}