import limit from "../utils/limit.js";

import { FIFTEEN_MINUTES } from "../constants/limit.constants.js";

const limitByUsername = async (username) => {
    await limit(
        `register:username:${username}`,
        FIFTEEN_MINUTES.in_seconds,
        5,
        `Tên tài khoản "${username}" được sử dụng để đăng ký quá nhiều lần. Vui lòng thử lại sau ${FIFTEEN_MINUTES.in_minutes} phút.`
    );
}

const limitByEmail = async (email) => {
    await limit(
        `register:email:${email}`,
        FIFTEEN_MINUTES.in_seconds,
        5,
        `Email "${email}" được sử dụng để đăng ký quá nhiều lần. Vui lòng thử lại sau ${FIFTEEN_MINUTES.in_minutes} phút.`
    );
}

export default async (req, res, next) => {
    const { ip } = req.client;
    const { username = "", email = "" } = req.body || {};

    await limit(
        `register:${ip}`,
        FIFTEEN_MINUTES.in_seconds,
        20,
        "Bạn đã đăng ký quá nhiều lần. Vui lòng thử lại sau."
    );

    if (!username || !email)
        return next();

    await Promise.all([
        limitByUsername(username),
        limitByEmail(email)
    ])

    next();
};
