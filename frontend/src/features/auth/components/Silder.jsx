import React, { useEffect, useRef } from 'react'

import '../styles/Slider.scss'

export default function Silder({ swtichAuth, isLogin }) {

  const isFirstAccess = useRef(true);

  useEffect(() => {
    isFirstAccess.current = false;
  }, [isLogin])

  const sliderClass = !isFirstAccess
    ? (isLogin ? "moveToRight" : "moveToLeft")
    : (isLogin ? "base-right" : "base-left");

  return (
    <div
      className={`slider ${isLogin ? 'base-right' : 'base-left'} ${!isFirstAccess ? (isLogin ? 'moveToRight' : 'moveToLeft') : ''}`}
    >
      <h2>{isLogin ? "Chào mừng trở lại!" : "Chào mừng bạn mới!"}</h2>

      <p>
        {isLogin
          ? "Đăng nhập để tiếp tục quản lý tài khoản của bạn một cách an toàn, đồng bộ và nhanh chóng."
          : "Tạo tài khoản mới để bắt đầu lưu trữ và quản lý thông tin của bạn an toàn, đồng bộ và nhanh chóng."
        }
      </p>

      <button onClick={swtichAuth}>
        {isLogin ? "Chuyển sang Đăng ký" : "Chuyển sang Đăng nhập"}
      </button>
    </div>
  )

}
