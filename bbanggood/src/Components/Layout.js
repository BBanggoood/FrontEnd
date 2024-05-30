import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../CSS/Layout.css';
import logo from '../images/BBanggood_logo_white_line.png'; // 로고 이미지 import

const Layout = () => {
    return (
        <div className="layout">
            <div className="layout-sidebar">
                <img src={logo} alt="Logo" className="layout-logo" />
                <input type="text" placeholder="검색" className="layout-search" />
                <div className="layout-menu">
                    <Link to="/kids">키즈</Link>
                    <Link to="/drama">드라마</Link>
                    <Link to="/movie">영화</Link>
                    <Link to="/tv">TV/예능</Link>
                    <Link to="/anime">애니</Link>
                    <Link to="/adult">성인</Link>
                </div>
            </div>
            <div className="layout-topbar">
                <div className="layout-topbar-menu">
                    <Link to="/mainpage">홈페이지</Link>
                    <Link to="/schedule">일정</Link>
                    <Link to="/list">빵 목록</Link>
                    <Link to="/mypage">마이페이지</Link>
                    <Link to="/settings">설정</Link>
                    <Link to="/help">도움말</Link>
                </div>
            </div>
            <div className="layout-main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
