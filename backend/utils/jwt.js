import jwt from 'jsonwebtoken'
import { REGISTER_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN, RESET_TOKEN } from '../constants/token.constants.js'

import appError from '../errors/appError.js'

const verifying = (token, secret, { session = false } = {}) => {
    try {
        return jwt.verify(token, secret)
    } catch (err) {

        if (err.name === 'JsonWebTokenError')
            throw appError(
                { code: 401, message: "INVALID_TOKEN" },
                { error: 'Token sai hoặc bị mất' }
            )

        if (err.name === 'TokenExpiredError')
            throw appError(
                { code: 401, message: "EXPIRED_TOKEN" },
                { error: session ? "Phiên của bạn đã hết" : 'Token hết hạn' }
            )

        throw err
    }
}

const refreshToken = {
    create: (userId, refreshTokenId) => {
        return jwt.sign(
            { userId, refreshTokenId },
            REFRESH_TOKEN.secret,
            {
                expiresIn: REFRESH_TOKEN.expired.jwt
            }
        )
    },

    verify: (token) => {
        return verifying(token, REFRESH_TOKEN.secret)
    }
}

const accessToken = {
    create: (userId) => {
        return jwt.sign(
            { userId },
            ACCESS_TOKEN.secret,
            {
                expiresIn: ACCESS_TOKEN.expired.jwt
            }
        )
    },

    verify: (token) => {
        return verifying(token, ACCESS_TOKEN.secret)
    }
}

const registerToken = {
    create: ({ id }) => {
        return jwt.sign(
            { id },
            REGISTER_TOKEN.secret,
            {
                expiresIn: REGISTER_TOKEN.expired.jwt
            }
        )
    },

    verify: (token) => {
        return verifying(token, REGISTER_TOKEN.secret)
    }
}

export default {
    refreshToken,
    accessToken,
    registerToken
}