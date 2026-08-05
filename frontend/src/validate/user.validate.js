import {EMAIL, USERNAME, PASSWORD}from "../constants/user.constants.js"

const validUsername = (username) => {

    if (!username || !username.trim())
        return 'Không được bỏ trống'

    if (username.length > USERNAME.max_length || username.length < USERNAME.min_length)
        return 'Số lượng ký tự : 8-50'

    if (!USERNAME.regex.test(username))
        return 'Chỉ được dùng các ký tự : a-z, A-Z, 0-9 và "_"'

    return ''
}

const validPassword = (password) => {

    if (!password || !password.trim())
        return 'Không được bỏ trống'

    if (password.length > PASSWORD.max_length || password.length < PASSWORD.min_length)
        return 'Số lượng ký tự : 8-64'

    if (!PASSWORD.regex.test(password))
        return 'Phải chứa ít nhất : 1 ký tự hoa, thường, đặc biệt và số'

    return ''
}

const validEmail = (email) => {

    if (!email || !email.trim())
        return 'Không được bỏ trống'

    if (!EMAIL.regex.test(email.toLowerCase()))
        return 'Sai định dạng email (ví dụ: abc@abc.com)';

    return ''
}

export {
    validEmail,
    validPassword,
    validUsername
}