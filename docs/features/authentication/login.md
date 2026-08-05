# LOGIN

## LOGIN

### INPUT
- username
- password

### Rate limt
- username : 10 lần
- ip : 30 lần
- Thời gian chặn : 15 phút

### FLOW

1. Validate input
   - Invalid -> Error

2. Tìm user theo username
   - Không có -> Sai tên tài khoản hoặc mật khẩu

3. So sánh password
   - Sai -> Sai tên tài khoản hoặc mật khẩu

4. Kiểm tra loginVerification bị rejected và còn hạn
   - Có -> Vui lòng đăng nhập lại sau

5. Kiểm tra email đã xác minh
   - Chưa -> Trả EMAIL_NOT_VERIFIED

6. Kiểm tra isNewUser

   - false
       -> Tạo loginVerification
       -> Gửi email
       -> Return {
            needVerifyLogin: true
          }

   - true
       -> isNewUser = false

7. Tạo refreshToken

8. Tạo accessToken

9. Hash refreshToken và lưu vào database

10. Return
{
    user,
    token
}


