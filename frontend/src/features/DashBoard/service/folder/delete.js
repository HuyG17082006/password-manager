import folderFetch from "./folderFetch.js";

export const softDelete = async (folderId) => {
    return await folderFetch(`/${folderId}`, {
        method : "DELETE"
    })
}

export const hardDelete = async (folderId) => {
    return await folderFetch(`/${folderId}/force`, {
        method : "DELETE"
    })
}