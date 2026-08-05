# Development

## Naming
1. File
    name.type

2. Function
    functionName()

3. CONSTANT
    const CONSTANT

4. Variable
    const variableName

## UUID 

### UUID v7
Sử dụng cho dữ liệu nghiệp vụ (application data):
- users
- folders
- accounts
- trustedDevices
- loginSessions

### UUID v4
Sử dụng cho dữ liệu bảo mật/xác thực (authentication & security):
- loginVerifications
- otps
- tokens
- loginBlocks


## Business Logic

### Authentication
- Username là duy nhất.
- Email là duy nhất.
- Khi chưa xác minh email, tài khoản chỉ được phép đăng nhập trên thiết bị đã đăng nhập thành công lần đầu.
- Muốn đăng nhập trên thiết bị khác, người dùng phải xác minh email trước.
- Nếu từ chối yêu cầu xác minh trên thiết bị khác :
    + Tài khoản sẽ bị khóa (database)
    + Chặn request từ username, ip và device đó trong một khoảng thời gian
    + Gửi mail mở khóa về kèm khuyến nghị đổi mật khẩu
- Nếu đăng nhập bằng một username và sai mật khẩu quá nhiều lần sẽ bị khóa (rate limit)
- refreshToken không được trả về client mà lưu vào cookie
- deviceId được tạo tự động bởi FE khi truy cập vào website và lưu ở localStorage
- Mọi request sau lớp auth phải được đính kèm accessToken : { userId, deviceId }

### Folder
- Folder chỉ tối đa 1 cấp
- Không hỗ trợ folder lồng nhau
- Folder có thể ghim
- Folder xóa sẽ chuyển vào thùng rác
- Khi xóa folder, account bên trong không bị xóa
- Có thể khôi phục folder từ thùng rác

### Account 
- Account có thể thuộc một folder hoặc không
- Một account chỉ có thể thuộc một folder
- Account xóa sẽ chuyển vào thùng rác
- Có thể khôi phục account từ thùng rác

### User