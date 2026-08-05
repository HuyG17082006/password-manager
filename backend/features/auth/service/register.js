import users from "../../../repository/users.js";

import bcrypt from "../../../utils/bcrypt.js";
import uuid from "../../../utils/uuid.js";
import nodemailer from "../../../utils/nodemailer.js";

import appError from "../../../errors/appError.js";
import { validUsername, validEmail, validPassword } from '../validate/user.validate.js'
import confirmEmailTemplate from '../../../templates/confirmEmailTemplate.js'
import { SERVER_BASE_API } from "../../../constants/server.constants.js";

const registerValidate = ({ username, email, password }) => {

    const errors = {
        username: validUsername(username),
        email: validEmail(email),
        password: validPassword(password)
    }

    if (Object.values(errors).some(Boolean))
        throw appError(
            { code: 401, message: "INVALID_INPUT" },
            { ...errors }
        )

    return true;

}

export const register = async ({ username, email, password }) => {
    
    registerValidate({ username, email, password });

    const [userExists, emailExists] = await Promise.all([
        users.findByUsername(username),
        users.findByEmail(email)
    ]);

    const exists = userExists || emailExists;

    if (exists)
        throw appError(
            { code: 409, message: "EXISTS_INPUT" },
            { error: "Tên tài khoản hoặc email đã tồn tại." }
        );

    const passwordHash = await bcrypt.hash(password);
    const userId = uuid.V4();

    await users.createUser(
        userId,
        username,
        passwordHash,
        email,
        false
    )

    try {
        await nodemailer.send(
            email,
            "Xác thực tạo tài khoản",
            confirmEmailTemplate({
                username,
                confirmUrl: `${SERVER_BASE_API}/auth/register/verify/${userId}`,
            })
        )
    } catch (err) {
        console.error(err);

        await users.deleteById(userId);

        throw appError(
            { code: 500, message: "MAIL_SEND_FAILED" },
            { error: "Có lỗi xảy ra trong quá trình tạo tài khoản" }
        )

    }

    return true;

}

export const verifyEmail = async (userId) => {

    const user = await users.findById(userId);

    if (!user)
        throw appError(
            { code: 404, message: "NOT_FOUND" },
            { error: "Người dùng không tồn tại." }
        );

    if (user.isEmailVerified)
        throw appError(
            { code: 409, message: "EMAIL_ALREADY_VERIFIED" },
            { error: "Email đã được xác thực." }
        );

    await users.updateEmailVerifyById(userId);

    return {
        user : {
            username : user.username,
            email : user.email,
            userId
        }
    };
};
