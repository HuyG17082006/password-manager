import React, { useState } from 'react'
import { replace, useNavigate } from 'react-router'

import * as service from '../service/index.js'
import authStore from '../../../store/authStore.js'

import { USER_DEFAULT, ERRORS_DEFAULT } from '../constants/user.constants.js'

import useLoading from '../../../shared/hooks/useLoading.jsx'

const validUser = (user) => {
    const { username = '', password = '' } = user || {};

    const errors = {}

    if (!username || !username.trim())
        errors.username = 'Không được bỏ trống'

    if (!password || !password.trim())
        errors.password = 'Không được bỏ trống'

    return errors;
}

export default function useLogin() {

    const store = authStore.getState();

    const [user, setUser] = useState(USER_DEFAULT)

    const [errors, setErrors] = useState(ERRORS_DEFAULT)

    const navigate = useNavigate();

    const { loading, runFuncWithLoading } = useLoading()

    const goDashBoard = () => navigate('/DashBoard', replace);

    const login = async () => {

        const errors = validUser(user)
        if (Object.values(errors).some(Boolean)) {
            setErrors(errors);
            return;
        }

        const result = await runFuncWithLoading(() => service.login(user));

        if (!result.isOk) {
            setErrors(result.errors)
        }
        else {

            if (result.needVerifyFromEmail) {
                navigate(`/auth/verify-email/${result.loginVerificationId}`)
            }

            store.setAccessToken(result.accessToken);
            store.setUser(result.user);

            navigate('/dashboard')
        }


    }

    const completeLoginVerification = async (loginVerificationId) => {

        const result = await service.completeLoginVerification(loginVerificationId)

        if (result.status === 'accepted') {
            store.setAccessToken(result.accessToken);
            store.setUser(result.user);
            navigate('/auth/login-approved', replace);
            return true;
        }

        if (result.status === 'rejected') {
            navigate('/auth/login-rejected', replace);
            return true;
        }

        if (result.status === 'pending') {
            setUser({ maskEmail : result.maskEmail })
            return false;
        }
    }


    const handleInput = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const resetUser = () => setUser(USER_DEFAULT)
    const resetErrors = () => setErrors(ERRORS_DEFAULT)

    return {
        isAuth : !!store.accessToken,
        user,
        errors,
        loading,

        handleInput,
        resetUser,
        resetErrors,

        login,
        completeLoginVerification,
        goDashBoard
    }

}
