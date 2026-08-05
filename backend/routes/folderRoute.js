import express from 'express'
import controller from '../features/folders/controller.js';

import asyncHandler from '../utils/asyncHandler.js';

const {
    create,

    getAll,

    hardDelete,
    softDelete
} = controller;

const folderRoute = express.Router();

// accountRoute.get('/', asyncHandler(getAll));
// accountRoute.get('/no-folder', asyncHandler(getIsNoFolder));
// accountRoute.get('/:folderId', asyncHandler(getWithFolderId));

folderRoute.post('/', asyncHandler(create));

folderRoute.get('/', asyncHandler(getAll));

folderRoute.delete('/:folderId', asyncHandler(softDelete));
folderRoute.delete('/:folderId/force', asyncHandler(hardDelete))

export default folderRoute

