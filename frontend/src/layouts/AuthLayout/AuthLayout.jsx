import React from 'react'

import { Outlet } from 'react-router'

import './AuthLayout.scss'

export default function AuthLayout() {
  return (
    <div className='auth-layout'>
      <Outlet/>
    </div>
  )
}
