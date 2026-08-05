import accounts from "../../../repository/accounts.js";
import folders from "../../../repository/folders.js";

import AES from '../../../utils/AES.js'
import uuid from "../../../utils/uuid.js";

import { validateAccount } from "../validate/account.validate.js";
import { DEFAULT_ACCOUNT } from "../../../constants/vault.constants.js";

import appError from "../../../errors/appError.js";

export const create = async (userId, data) => {

    const {
        applicationName,
        username,
        email,
        password,
        note,
        url,
        owner,
        folderId
    } = {
        ...DEFAULT_ACCOUNT,
        ...data
    }

    const {valid, errors} = validateAccount({ applicationName, username, email, password })
    if (!valid)
        throw appError(
            { code : 409, message : "INVALID_INPUT"},
            errors
        )

    const id = uuid.V7();

    const { authTag, encrypted, iv } = await AES.encrypt(password);

    //Cần xử lí race condition
    if (folderId)
        await folders.update(userId, folderId, { increase : true });

    await accounts.create(id, userId, {
        applicationName,
        username,
        email,
        note,
        authTag,
        owner,
        iv,
        passwordEncrypted : encrypted,
        url,
        folderId
    })

    return {
        id,
        applicationName,
        folderId,

        owner,
        username,
        email,
        url,
        
        note,
        type : "Account"
    }

}
