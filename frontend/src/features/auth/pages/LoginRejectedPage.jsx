import { FaCircleXmark } from 'react-icons/fa6';
import '../styles/LoginResult.scss';

export default function LoginRejectedPage() {
    return (
        <div className='login-result'>
            <div className='login-result-card'>

                <FaCircleXmark className='login-result-icon error'/>

                <h1>Đăng nhập bị từ chối</h1>

                <p>
                    Yêu cầu đăng nhập đã bị từ chối.
                    Nếu đây không phải bạn, hãy đổi mật khẩu ngay lập tức.
                </p>

            </div>
        </div>
    );
}