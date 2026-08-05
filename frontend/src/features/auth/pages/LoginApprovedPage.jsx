import { FaCircleCheck } from "react-icons/fa6";
import '../styles/LoginResult.scss';

import useLogin from "../hooks/useLogin.jsx";
import { useEffect } from "react";

export default function LoginApprovedPage() {

    const {
        goDashBoard,
        isAuth
    } = useLogin();

    useEffect(() => {
        console.log(isAuth)
        if (!isAuth)
            return;

        const timer = setTimeout(() => goDashBoard(), 2000);

        return () => clearTimeout(timer)
    }, [isAuth])

    return (
        <div className="login-result">
            <div className="login-result-card">
                <FaCircleCheck className="login-result-icon success" />

                <h1>Đăng nhập thành công</h1>

                <p>
                    Thiết bị của bạn đã được xác minh thành công.
                    Đang chuyển hướng...
                </p>
            </div>
        </div>
    );
}