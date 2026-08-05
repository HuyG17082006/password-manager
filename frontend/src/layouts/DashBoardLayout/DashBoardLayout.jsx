import React from 'react'

import "./DashBoardLayout.scss"
import "./DashBoardStyle.scss"
import { useLocation, Outlet } from 'react-router'

import SideBar from '../../shared/components/SideBar.jsx'
import Header from '../../shared/components/Header.jsx'

export default function DashBoardLayout() {

    const location = useLocation();

    const path = location.pathname.split("/")[2] || "all";

    return (
        <div className='dashboard-layout'>

            <Header />

            <div className='body'>

                <SideBar labelSelected={path}/>

                <Outlet/>

            </div>

        </div>
    )
}
