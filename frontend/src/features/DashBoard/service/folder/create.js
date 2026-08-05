import folderFetch from "./folderFetch.js"

export const create = async (folder) => {

    return await folderFetch('/', {
        method : "POST",
        body : JSON.stringify(folder)
    })

} 