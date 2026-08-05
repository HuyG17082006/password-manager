import appError from "../../../errors/appError.js";
import folders from "../../../repository/folders.js";
import uuid from "../../../utils/uuid.js";

export const create = async (userId, data) => {

    const {
        name = '',
        isPinned = false,
    } = data || {};

    if (!name)
        throw appError(
            { code : 401, message : "INVALID_INPUT"},
            { name : "Không được bỏ trống"}
        )

    const isExisted = await folders.checkDuplicateName(userId, name);
    if (isExisted)
        throw appError(
            { code: 409, message: "FOLDER_NAME_EXISTED" },
            { name: "Tên thư mục đã tồn tại." }
        )
    
    const id = uuid.V7();

    await folders.create({
        id,
        userId,
        name,
        isPinned
    });

    return {
        id,
        name,

        type : "Folder",
        totalAccounts : 0
    }

} 