export const validateAccount = ({ applicationName, username, email, password }) => {

    const errors = {};

    if (!applicationName.trim())
        errors.applicationName = 'Tên ứng dụng là bắt buộc';

    if (!username.trim() && !email.trim())
        errors.error = 'Tên tài khoản hoặc email là bắt buộc.';

    if (!password.trim())
        errors.password = 'Mật khẩu là bắt buộc';

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
};
