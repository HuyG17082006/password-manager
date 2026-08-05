import users from "../../../repository/users.js";
import loginVerifications from "../../../repository/loginVerifications.js"

import getLocation from "../../../utils/getLocation.js";
import bcrypt from '../../../utils/bcrypt.js';
import uuid from '../../../utils/uuid.js'
import jwt from "../../../utils/jwt.js";
import nodemailer from "../../../utils/nodemailer.js";
import transaction from "../../../utils/transaction.js";
import { SERVER_BASE_API } from '../../../constants/server.constants.js'
import verifyLoginTemplate from '../../../templates/verifyLoginTemplate.js'
import maskEmail from '../../../utils/maskEmail.js'

import appError from "../../../errors/appError.js";
import refreshTokens from "../../../repository/refreshTokens.js";

const loginValidate = (username, password) => {
    const errors = {}
    if (!username || !username.trim())
        errors.username = 'Không được bỏ trống'
    if (!password || !password.trim())
        errors.password = 'Không được bỏ trống'
    if (Object.keys(errors).length > 0) {
        throw appError(
            { code: 400, message: "INVALID_INPUT" },
            { ...errors }
        );
    }
}



export const login = async (username, password, deviceId) => {

    loginValidate(username, password);

    const user = await users.findByUsername(username);
    if (!user)
        throw appError(
            { code: 401, message: "INVALID_INPUT" },
            { error: "Sai tên tài khoản hoặc mật khẩu" }
        )
    console.log(user)
    const isCompared = await bcrypt.compare(password, user.passwordHash);
    if (!isCompared)
        throw appError(
            { code: 401, message: "INVALID_INPUT" },
            { error: "Sai tên tài khoản hoặc mật khẩu" }
        )

    const isRejected = await loginVerifications.findValidRejectedByUserIdAndDeviceId(user.id, deviceId);
    if (isRejected)
        throw appError(
            { code: 401, message: "REJECTED" },
            { error: "Vui lòng đăng nhập lại sau" }
        )

    const isEmailVerified = user.isEmailVerified;
    if (!isEmailVerified)
        throw appError(
            { code: 401, message: "EMAIL_NOT_VERIFIED" },
            { error: "Vui lòng xác thực email" }
        )

    const isNewUser = user.isNewUser;
    if (!isNewUser) {

        const loginVerificationId = uuid.V7();

        const isCreated = await loginVerifications.create(
            loginVerificationId,
            user.id,
            deviceId
        )

        if (isCreated)
            try {

                await nodemailer.send(
                    user.email,
                    "Xác thực đăng nhập",
                    verifyLoginTemplate({
                        username: user.username,
                        approveUrl: `${SERVER_BASE_API}/auth/login/approve/${loginVerificationId}`,
                        rejectUrl: `${SERVER_BASE_API}/auth/login/reject/${loginVerificationId}`
                    })
                )

                return {
                    loginVerificationId,
                    needVerifyFromEmail: true
                }

            } catch {
                await loginVerifications.deleteById(loginVerificationId);

                throw appError(
                    { code: 401, message: "SERVER_ERROR" },
                    { error: "Có lỗi xảy ra khi xử lí yêu cầu đăng nhập" }
                )
            }

    }
    else {

        await users.updateFirstLogin(user.id);

    }

    const refreshTokenId = uuid.V4();

    const refreshToken = jwt.refreshToken.create(user.id, refreshTokenId);

    const refreshTokenHash = await bcrypt.hash(refreshToken);

    await refreshTokens.create(
        refreshTokenId,
        user.id,
        refreshTokenHash
    );

    const accessToken = jwt.accessToken.create(user.id);

    return {
        user: {
            username: user.username,
            email: user.email,
            userId: user.id,
            deviceId
        },
        token: {
            refreshToken,
            accessToken
        }
    }

}

const VALID_STATUS = ['pending', 'rejected', 'accepted'];

export const completeLoginVerification = async (loginVerificationId) => {

    const loginRequest = await loginVerifications.findById(loginVerificationId);

    if (!loginRequest)
        throw appError(
            { code: 401, message: "INVALID_LOGIN_VERIFICATION" },
            { error: "Yêu cầu xác minh đăng nhập không hợp lệ hoặc đã hết hạn." }
        );

    const { status, userId } = loginRequest;

    if (!VALID_STATUS.includes(status))
        throw appError(
            { code: 403, message: "INVALID_LOGIN_VERIFICATION" },
            { error: "Yêu cầu đăng nhập không tồn tại hoặc không hợp lệ." }
        );

    const user = await users.findById(userId);
    if (!user)
        throw appError(
            { code: 404, message: "NOT_FOUND" },
            { error: "Người dùng không tồn tại." }
        );

    if (status === "pending") {
        return {
            status,
            maskEmail: maskEmail(user.email)
        };
    }

    if (status === "rejected") {
        throw appError(
            { code: 403, message: "LOGIN_REJECTED" },
            { error: "Yêu cầu đăng nhập đã bị từ chối." }
        );
    }

    const isRowChanged = await loginVerifications.updateConsumedAt(loginVerificationId)

    if (status === 'accepted' && isRowChanged) {

        const refreshTokenId = uuid.V4();

        const refreshToken = jwt.refreshToken.create(userId, refreshTokenId);

        const accessToken = jwt.accessToken.create(userId);

        const refreshTokenHash = await bcrypt.hash(refreshToken);

        await refreshTokens.create(
            refreshTokenId,
            userId,
            refreshTokenHash
        )
        return {
            status: "accepted",
            user: {
                userId: user.id,
                username: user.username,
                email: user.email
            },
            token: {
                accessToken,
                refreshToken
            }
        };
    }


    if (status === 'accepted')
        return {
            status: "completed",
            consumedAt: loginRequest.consumedAt
        }

}

export const approveLogin = async (loginVerificationId) => {

    const loginRequest = await loginVerifications.findById(loginVerificationId);

    if (!loginRequest)
        throw appError(
            { code: 401, message: "INVALID_LOGIN_VERIFICATION" },
            { error: "Yêu cầu xác minh đăng nhập không hợp lệ hoặc đã hết hạn." }
        );

    if (loginRequest.status !== 'pending')
        throw appError(
            { code: 409, message: "LOGIN_VERIFICATION_NOT_PENDING" },
            { error: "Yêu cầu xác minh đăng nhập đã được xử lý hoặc không còn hiệu lực." }
        );

    const isApproved = await loginVerifications.updateStatus(
        loginRequest.id,
        'accepted'
    );

    if (!isApproved)
        throw appError(
            { code: 500, message: "SERVER_ERROR" },
            { error: "Có lỗi xảy ra khi xử lý yêu cầu đăng nhập." }
        );

    return true;
}

export const rejectLogin = async (loginVerificationId) => {
    const loginRequest = await loginVerifications.findById(loginVerificationId);

    if (!loginRequest)
        throw appError(
            { code: 401, message: "INVALID_LOGIN_VERIFICATION" },
            { error: "Yêu cầu xác minh đăng nhập không hợp lệ hoặc đã hết hạn." }
        );

    if (loginRequest.status !== 'pending')
        throw appError(
            { code: 409, message: "LOGIN_VERIFICATION_NOT_PENDING" },
            { error: "Yêu cầu xác minh đăng nhập đã được xử lý hoặc không còn hiệu lực." }
        );

    const isApproved = await loginVerifications.updateStatus(
        loginRequest.id,
        'rejected',
        { blockDevice: true }
    );

    if (!isApproved)
        throw appError(
            { code: 500, message: "SERVER_ERROR" },
            { error: "Có lỗi xảy ra khi xử lý yêu cầu đăng nhập." }
        );

    return true;
}

export const refresh = async (refreshToken) => {

    const tokenExpiredError = () =>
        appError(
            { code: 401, message: "TOKEN_EXPIRED" },
            { error: "Phiên đăng nhập của bạn đã hết." }
        );

    const { userId, refreshTokenId } = jwt.refreshToken.verify(refreshToken);

    const refreshTokenData = await refreshTokens.checkValid(refreshTokenId);

    if (!refreshTokenData)
        throw tokenExpiredError();

    if (refreshTokenData.userId !== userId)
        throw tokenExpiredError();

    const isCompared = await bcrypt.compare(refreshToken, refreshTokenData.refreshTokenHash);

    if (!isCompared)
        throw tokenExpiredError();

    const newRefreshToken = jwt.refreshToken.create(userId, refreshTokenId);

    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken);

    const isRotated = await refreshTokens.rotate(refreshTokenId, newRefreshTokenHash);

    if (!isRotated)
        throw tokenExpiredError();

    const accessToken = jwt.accessToken.create(userId);

    return {
        accessToken,
        newRefreshToken
    };

};