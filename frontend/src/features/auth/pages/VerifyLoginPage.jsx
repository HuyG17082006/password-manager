import { useParams } from 'react-router';

import { FaEnvelopeCircleCheck } from 'react-icons/fa6';
import '../styles/LoginResult.scss';

import useLogin from '../hooks/useLogin.jsx';
import { useEffect } from 'react';

export default function VerifyLoginPage() {

    const params = useParams();

    const {
        completeLoginVerification,
        user
    } = useLogin();



    useEffect(() => {

        let timeout;

        const checkLoginVerification = async () => {

            const result = await completeLoginVerification(
                params.loginVerificationId
            );

            if (!result) {
                timeout = setTimeout(checkLoginVerification, 2000);
            }

        };

        checkLoginVerification();

        return () => clearTimeout(timeout);

    }, [params.loginVerificationId]);

    return (
        <div className='login-result'>
            <div className='login-result-card'>
                <FaEnvelopeCircleCheck className='login-result-icon info' />

                <h1>Đang chờ xác nhận</h1>

                <p>
                    Chúng tôi đã gửi yêu cầu xác nhận đăng nhập đến {user.maskEmail}
                </p>

                <p>
                    Vui lòng mở email và nhấn <strong>Chấp nhận</strong> hoặc <strong>Từ chối</strong>.
                </p>

            </div>
        </div>
    );
}