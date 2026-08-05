import * as service from './service/index.js'


const create = async (req, res, next) => {

    const { userId } = req

    const account = await service.create(userId, req?.body || {});

    return res.status(201).json({
        message: "Thêm tài khoản thành công",
        account
    })
}

const getWithFolderId = async (req, res, next) => {

    const { userId } = req

    const { folderId = '' } = req.params || {};

    const accounts = await service.get(userId, folderId);
    
    return res.status(200).json({
        total : accounts.length,
        accounts
    })

}

const getAll = async (req, res, next) => {

    const { userId } = req;

    const accounts = await service.get(userId, null);

    return res.status(200).json({
        total : accounts.length,
        accounts
    })

}

const getIsNoFolder = async (req, res, next) => {


    const { userId } = req;

    const accounts = await service.get(userId, null, { isNoFolder : true });

    return res.status(200).json({
        total : accounts.length,
        accounts
    })

}

const getSystemFolderTotalAccounts = async (req, res, next) => {

    const { userId } = req;

    const total = await service.getSystemFolderTotalAccounts(userId);

    return res.status(200).json({
        total
    })

}

export default {
    
    getAll,
    getWithFolderId,
    getIsNoFolder,
    getSystemFolderTotalAccounts,
    
    create
}