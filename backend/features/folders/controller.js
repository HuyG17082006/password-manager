import * as service from './service/index.js'

const create = async (req, res, next) => {

    const { userId } = req;

    const folder = await service.create(userId, req?.body || {});

    return res.status(201).json({
        message: "Tạo thư mục mới thành công",
        folder
    })

}

const getAll = async (req, res, next) => {

    const { userId } = req;

    const { list } = await service.getAll(userId);

    return res.status(200).json({
        list
    })
}

const softDelete = async (req, res, next) => {

    const { userId } = req;

    const { folderId = '' } = req.params || {};
    console.log(folderId)
    await service.deleteFolder(userId, folderId, {
        force : false
    })

    return res.status(200).json({
        message : "Đã chuyển thư mục vào thùng rác"
    })

}

const hardDelete = async (req, res, next) => {

    const { userId } = req;

    const { folderId = '' } = req.params || {};

    await service.deleteFolder(userId, folderId, {
        force : true
    })

    return res.status(200).json({
        message : "Đã xóa vĩnh viễn thư mục"
    })

}


export default {
    create,

    getAll,

    softDelete,
    hardDelete
}