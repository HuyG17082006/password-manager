import React from 'react'

import "../styles/SideBar.scss"

import { FaMoon, FaCog, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import ThemeToggle from './ThemeToggle.jsx'

export default function SideBar({ labelSelected }) {

    const navigate = useNavigate();

    const goAll = () => navigate('/dashboard/folder');
    const goSettings = () => navigate('/dashboard/settings');

    return (
        <div className='side-bar'>

            <div className='items'>

                <div 
                    className={`item ${labelSelected === 'folder' ? 'selected' : ''}`}
                    onClick={goAll}    
                >

                    <p>Tất cả</p>

                </div>

            </div>

            <div className='features'>

                <div className="feature-item">

                    <ThemeToggle/>

                </div>

                <div 
                    className="feature-item"
                    onClick={goSettings}    
                >

                    <FaCog />

                    <span>Settings</span>

                </div>

                <div className="profile">

                    <FaUserCircle className="avatar" />

                    <div className="info">

                        <span className="name">
                            Đạt Huy
                        </span>

                        <span className="email">
                            huy@gmail.com
                        </span>

                    </div>

                </div>

            </div>

        </div>
    )
}
