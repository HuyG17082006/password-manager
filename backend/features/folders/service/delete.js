import folders from '../../../repository/folders.js'

import appError from '../../../errors/appError.js'

export const deleteFolder = async (userId, folderId, { force = false }) => {

    const isExisted = await folders.checkValidFolder(userId, folderId);

    if (!isExisted)
        throw appError(
            { code : 409, message : "FOLDER_NOT_FOUND"},
            { error : "Không tìm thấy folder"}
        )

    return await folders.deleteByUserIdAndFolderId(userId, folderId, { force });

}