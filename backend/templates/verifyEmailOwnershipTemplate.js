
export default ({ username, rejectUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:32px;background:#f5f5f5;font-family:Arial,sans-serif;color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#fff;border-radius:12px;padding:40px;">

                    <tr>
                        <td align="center">
                            <h2 style="margin:0 0 20px;">
                                Có phải bạn vừa tạo tài khoản?
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="font-size:16px;line-height:1.7;">
                            Xin chào <strong>${username}</strong>,
                            <br><br>

                            Email này được sử dụng để đăng ký một tài khoản.

                            <br><br>

                            Nếu chính bạn đã thực hiện việc đăng ký thì bạn không cần làm gì thêm và có thể bỏ qua email này.

                            <br><br>

                            Nếu <strong>bạn không phải là người đã đăng ký</strong>, vui lòng nhấn nút bên dưới để yêu cầu xóa tài khoản vừa được tạo.
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:36px 0;">
                            <a href="${rejectUrl}"
                                style="
                                    background:#dc2626;
                                    color:#fff;
                                    text-decoration:none;
                                    padding:14px 28px;
                                    border-radius:8px;
                                    display:inline-block;
                                    font-weight:bold;
                                ">
                                Đây không phải email của tôi
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="font-size:14px;color:#666;line-height:1.6;">
                            Nếu bạn không thực hiện bất kỳ hành động nào, tài khoản sẽ vẫn được giữ nguyên.

                            <br><br>

                            Cảm ơn bạn đã sử dụng dịch vụ.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
