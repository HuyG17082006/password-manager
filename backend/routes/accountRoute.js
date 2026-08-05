import express from 'express'
import controller from '../features/accounts/controller.js';

import asyncHandler from '../utils/asyncHandler.js';

const {
    getAll,
    getIsNoFolder,
    getWithFolderId,
    getSystemFolderTotalAccounts,

    create
} = controller;

const accountRoute = express.Router();

accountRoute.get('/', asyncHandler(getAll));
accountRoute.get('/no-folder', asyncHandler(getIsNoFolder));
accountRoute.get('/folder/:folderId', asyncHandler(getWithFolderId));
accountRoute.get('/overview', asyncHandler(getSystemFolderTotalAccounts));

accountRoute.post('/', asyncHandler(create));

export default accountRoute

