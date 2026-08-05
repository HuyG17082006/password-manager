import express from 'express'
import controller from '../features/auth/controller.js';

import loginLimit from '../middleware/loginLimit.js';
import registerLimit from '../middleware/registerLimit.js';

import asyncHandler from '../utils/asyncHandler.js';

const {
    login,
    approveLogin,
    rejectLogin,
    completeLoginVerification,
    
    register,
    verifyEmail,

    refresh
} = controller

const authRoute = express.Router();

authRoute.post('/login', loginLimit, asyncHandler(login));
authRoute.get('/login/login-verifications/:loginVerificationId', asyncHandler(completeLoginVerification ))
authRoute.get('/login/approve/:loginVerificationId', asyncHandler(approveLogin))
authRoute.get('/login/reject/:loginVerificationId', asyncHandler(rejectLogin))

authRoute.post('/register', registerLimit, asyncHandler(register));
authRoute.get('/register/verify/:userId', asyncHandler(verifyEmail));

authRoute.get('/refresh', asyncHandler(refresh));


export default authRoute;