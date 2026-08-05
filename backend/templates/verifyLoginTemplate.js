export default ({
    username,
    approveUrl,
    rejectUrl
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login Verification</title>
</head>

<body style="margin:0;padding:40px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:8px;padding:40px;">

        <tr>
            <td>

                <h2 style="margin-top:0;color:#222;">
                    Login Verification
                </h2>

                <p>
                    Hello <strong>${username}</strong>,
                </p>

                <p>
                    A login request requires your approval.
                    If this was you, click <strong>Approve</strong>.
                    Otherwise, click <strong>Reject</strong>.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin:36px 0;">
                    <tr>
                        <td align="center">

                            <a href="${approveUrl}"
                                style="
                                    background:#2563eb;
                                    color:#fff;
                                    text-decoration:none;
                                    padding:14px 28px;
                                    border-radius:6px;
                                    display:inline-block;
                                    font-weight:bold;
                                    margin-right:12px;">
                                Approve
                            </a>

                            <a href="${rejectUrl}"
                                style="
                                    background:#dc2626;
                                    color:#fff;
                                    text-decoration:none;
                                    padding:14px 28px;
                                    border-radius:6px;
                                    display:inline-block;
                                    font-weight:bold;">
                                Reject
                            </a>

                        </td>
                    </tr>
                </table>

                <p style="color:#888;font-size:13px;">
                    This link expires after a limited time and can only be used once.
                </p>

                <p style="color:#888;font-size:13px;">
                    This is an automated email. Please do not reply.
                </p>

            </td>
        </tr>

    </table>
</body>
</html>
`;