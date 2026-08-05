import React, {useEffect, useState} from 'react'

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import useLogin from '../hooks/useLogin.jsx';

export default function Login({ goReigster, isLogin }) {
   
    const {
        user,
        errors,
        loading,
        handleInput,
        resetErrors,
        resetUser,
        login
    } = useLogin();
   
    const [showPassword, setShowPassword] = useState(false);
   
    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    useEffect(() => {
        resetUser();
        resetErrors();
    }, [isLogin])

    const { username : nameError = '', password : passError = '', error = ''} = errors || {};

    return (
        <div className={`login form ${!isLogin ? "disappear" : ''}`}>

            {
                errors.error && <div className='main-error'> {error} </div>
            }

            <h2>Đăng nhập</h2>

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
                <p>Hoặc đăng nhập với tài khoản</p>
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

                <button onClick={login} disabled={loading}>Đăng nhập</button>

            </div>

            <p className='navigate'>Chưa có tài khoản? <span onClick={goReigster}>Đăng kí</span></p>

        </div>
    )
}
