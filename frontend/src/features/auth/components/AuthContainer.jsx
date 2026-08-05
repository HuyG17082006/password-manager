import React from 'react'

import { FaFacebook } from 'react-icons/fa'

import Silder from './Silder.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

import '../styles/AuthContainer.scss'
import '../styles/Form.scss'

export default function AuthContainer({ isLogin, switchAuth }) {
    return (
        <div className='auth-container'>
            
            <Login 
                goReigster={switchAuth}
                isLogin={isLogin}
            />
            
            <Silder 
                swtichAuth={switchAuth}
                isLogin={isLogin}
            />
            
            <Register 
                goLogin={switchAuth}
                isLogin={isLogin}
            />

        </div>
    )
}
