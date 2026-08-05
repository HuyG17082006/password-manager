import appError from "../../../errors/appError.js";
import accounts from "../../../repository/accounts.js"
import folders from "../../../repository/folders.js";

export const get = async (userId, folderId = null, { isNoFolder = false } = {}) => {
    
    if (folderId && !isNoFolder) {

        const isValidFolder = await folders.checkValidFolder(userId, folderId);
        
        if (!isValidFolder)
            throw appError(
                { code : 404, message : "FOLDER_NOT_FOUND"},
                { error : "Không tìm thấy thư mục hợp lệ"}
            )
    }

    return await accounts.get(userId, folderId, { isNoFolder });

}

export const getSystemFolderTotalAccounts = async (userId) => {

    return await accounts.getSystemFolderTotalAccount(userId);

}