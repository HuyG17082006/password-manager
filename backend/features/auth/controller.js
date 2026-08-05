import * as authService from './service/index.js'
import { REFRESH_TOKEN } from '../../constants/token.constants.js'

const setRefreshToken = (res, refreshToken) => {

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: REFRESH_TOKEN.expired.number
    })

    return true;

}

const login = async (req, res, next) => {
    const { username = '', password = '' } = req.body || {}
    const { deviceId } = req.client || {}

    const result = await authService.login(username, password, deviceId);

    if (result.needVerifyFromEmail)
        return res.status(200).json({
            needVerifyFromEmail: true,
            message: "Vui lòng kiểm tra email để xác thực đăng nhập",
            loginVerificationId : result.loginVerificationId
        })

    const { user, token } = result;

    setRefreshToken(res, token.refreshToken);

    return res.status(200).json({
        message: "Đăng nhập thành công",
        accessToken: token.accessToken,
        user
    })
}

const approveLogin = async (req, res, next) => {
    const { loginVerificationId = '' } = req.params || {};

    await authService.approveLogin(loginVerificationId);

    return res.status(200).json({
        message: "Xác thực đăng nhập thành công"
    })
}

const rejectLogin = async (req, res, next) => {
    const { loginVerificationId = '' } = req.params || {};

    await authService.rejectLogin(loginVerificationId);

    return res.status(200).json({
        message: "Đã chặn đăng nhập từ thiết bị lạ"
    })
}

const completeLoginVerification  = async (req, res, next) => {
    const { loginVerificationId = "" } = req.params;

    const result = await authService.completeLoginVerification (
        loginVerificationId
    );

    const { status = "", token, consumedAt } = result;

    if (status === "accepted") {

        setRefreshToken(res, token.refreshToken);

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token.accessToken,
            status
        });
    }

    if (status === "pending") {
        return res.status(202).json({
            isRejected : true,
            message: "Vui lòng xác thực đăng nhập qua email của bạn."
        });
    }

    if (status === 'completed') {
        return res.status(200).json({
            consumedAt,
            message: "Đã xác thực đăng nhập thành công"
        });
    }

    return res.status(401).json({
        message: "Yêu cầu xác thực đăng nhập đã bị từ chối. Vui lòng thử lại sau."
    });
};

const register = async (req, res, next) => {
    const { username = '', password = '', email = ''} = req.body || {};
    
    const result = await authService.register({ username, password, email : email?.toLowerCase() });

    return res.status(201).json({
        message: "Đăng ký thành công - Vui lòng xác thực email để hoàn thành đăng ký",
    })
}

const verifyEmail = async (req, res, next) => {
    const { userId = '' } = req.params || {};

    const result = await authService.verifyEmail(userId);

    return res.status(201).json({
        message: "Đăng ký thành công - Đã xác thực email",
        ...result
    })

}

const refresh = async (req, res, next) => {

    const refreshToken = req?.cookies?.refreshToken || '';

    const result = await authService.refresh(refreshToken);

    const { newRefreshToken, accessToken } = result;

    setRefreshToken(res, newRefreshToken);

    res.status(200).json({
        accessToken
    })

}

export default {
    login,
    approveLogin,
    rejectLogin,
    completeLoginVerification,

    register,
    verifyEmail,

    refresh
}