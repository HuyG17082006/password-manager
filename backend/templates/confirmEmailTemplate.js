export default ({ username, confirmUrl }) => `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xác nhận địa chỉ email</title>
</head>

<body style="margin:0;padding:32px;background:#f5f5f5;font-family:Arial,sans-serif;color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#fff;border-radius:12px;padding:40px;">

                    <tr>
                        <td align="center">
                            <h2 style="margin:0 0 24px;">
                                Xác nhận địa chỉ email
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="font-size:16px;line-height:1.7;">
                            Xin chào <strong>${username}</strong>,
                            <br><br>

                            Cảm ơn bạn đã đăng ký tài khoản.

                            <br><br>

                            Vui lòng xác nhận địa chỉ email của bạn để kích hoạt tài khoản và bắt đầu sử dụng dịch vụ.

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:36px 0;">

                            <a href="${confirmUrl}"
                                style="
                                    background:#2563eb;
                                    color:#fff;
                                    text-decoration:none;
                                    padding:14px 28px;
                                    border-radius:8px;
                                    display:inline-block;
                                    font-weight:bold;
                                ">
                                Xác nhận email
                            </a>

                        </td>
                    </tr>

                    <tr>
                        <td style="font-size:14px;color:#666;line-height:1.7;">
                            Liên kết này chỉ có hiệu lực trong một khoảng thời gian nhất định và chỉ có thể sử dụng một lần.

                            <br><br>

                            Nếu bạn không thực hiện đăng ký tài khoản, hãy bỏ qua email này.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>
`;