import React from 'react'

import { useLocation, useNavigate } from 'react-router'

import AuthContainer from '../components/AuthContainer.jsx';

export default function AuthPage() {

    const location = useLocation()
    const navigate = useNavigate();

    const isLogin = location.pathname.includes('login');

    const switchAuth = () => {
        const path = isLogin ? '/auth/register' : '/auth/login';
        navigate(path)
    }

    return (
        <AuthContainer
            isLogin={isLogin}
            switchAuth={switchAuth}
        />
    )
}
