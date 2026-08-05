import folderFetch from "./folderFetch.js";

export const getAll = async () => {

    return await folderFetch('/', {
        method : "GET"
    })
}