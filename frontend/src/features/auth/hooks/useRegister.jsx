import React, { useState } from 'react'

import * as service from '../service/index.js'
import authStore from '../../../store/authStore.js'

import { USER_DEFAULT, ERRORS_DEFAULT } from '../constants/user.constants.js'

import { validEmail, validPassword, validUsername } from '../../../validate/user.validate.js'

import useLoading from '../../../shared/hooks/useLoading.jsx'

const validUser = (user) => {
    const { username = '', password = '', email = '' } = user || {};

    const errors = {
        username: validUsername(username),
        email: validEmail(email),
        password: validPassword(password)
    }

    return errors;
}


export default function useRegister() {

    const [user, setUser] = useState(USER_DEFAULT);

    const [errors, setErrors] = useState(ERRORS_DEFAULT);

    const { runFuncWithLoading, loading } = useLoading();

    const [success, setSuccess] = useState()

    const register = async () => {

        const errors = validUser(user)
        if (Object.values(errors).some(Boolean)) {
            setErrors(errors);
            return null;
        }

        const result = await runFuncWithLoading(() => service.register(user));

        if (!result.isOk) {
            setErrors(result.errors);
            setSuccess('')
        }
        else {
            setErrors(ERRORS_DEFAULT);
            setSuccess(result.message);
        }

    }

    const handleInput = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const resetUser = () => setUser(USER_DEFAULT);
    const resetErrors = () => setErrors(ERRORS_DEFAULT);
    const resetSuccess = () => setSuccess('')

    return {
        user,
        errors,
        loading,
        success,

        handleInput,
        resetErrors,
        resetSuccess,
        resetUser,

        register
    }

}
