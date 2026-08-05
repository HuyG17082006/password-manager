import React, { useEffect, useState } from 'react'

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';

import useRegister from '../hooks/useRegister.jsx';

export default function Register({ goLogin, isLogin }) {

    const [showPassword, setShowPassword] = useState(false);

    const {
        errors,
        user,
        success,
        loading,
        handleInput,
        resetErrors,
        resetSuccess,
        resetUser,
        register
    } = useRegister();

    useEffect(() => {
        resetErrors();
        resetSuccess();
        resetUser();
    }, [isLogin])

    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const { username: nameError = '', password: passError = '', email: mailError, error = '' } = errors || {};

    return (
        <div className={`register form ${isLogin ? "disappear" : ''}`}>

            {
                (error && success ==='') && <div className='main-error'> {error} </div>
            }

            {
                success && (
                    <div className="main-success">
                        {success}
                    </div>
                )
            }

            <h2>Đăng ký</h2>

            <div className='login-group'>

                <div >
                    <FaFacebook className='icon' />
                </div>

                <div >
                    <FaGithub className='icon' />
                </div>

                <div >
                    <FaGoogle className='icon' />
                </div>

            </div>

            <div className='divine-group'>
                <p>Hoặc đăng kí tài khoản mới</p>
                <div className='line'></div>
            </div>

            <div className='input-group'>

                <div className='input-element'>

                    <input
                        type="text"
                        name='username'
                        onChange={handleInput}
                        placeholder='Tên đăng nhập...'
                        value={user.username}
                    />
                    <User className='icon' />
                    <span className='error'>{nameError} </span>
                </div>

                <div className='input-element'>

                    <input
                        type="text"
                        name='email'
                        placeholder='Email...'
                        onChange={handleInput}
                        value={user.email}
                    />
                    <Mail className='icon' />
                    <span className='error'> {mailError} </span>
                </div>

                <div className='input-element'>

                    <input
                        type={showPassword ? "text" : 'password'}
                        name='password'
                        placeholder='Mật khẩu...'
                        onChange={handleInput}
                        value={user.password}
                    />

                    {
                        !showPassword ?
                            <EyeOff className='icon' onClick={togglePassword} />
                            :
                            <Eye className='icon' onClick={togglePassword} />
                    }

                    <span className='error'> {passError} </span>

                </div>

            </div>

            <div className='feature-group'>

                <p>Quên mật khẩu?</p>

                <button onClick={register} disabled={loading}>Đăng ký</button>

            </div>

            <p className='navigate'>Đã có tài khoản? <span onClick={goLogin}>Đăng nhập</span></p>

        </div>
    )
}
