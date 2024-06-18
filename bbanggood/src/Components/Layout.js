import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../CSS/Layout.css';
import logo from '../images/BBanggood_logo_white_line.png'; // 로고 이미지 import

const Layout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const handleSearchContainerClick = () => {
            navigate(`/search`);
        
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <div className="layout">
            {/* 왼쪽 */}
            <div className="layout-sidebar">
                {/* 검색 버튼 */}
                <div className="search-container" onClick={handleSearchContainerClick}>
                    {/* <input 
                        type="text" 
                        placeholder="검색" 
                        className="layout-search" 
                        value={searchQuery} 
                        onChange={handleSearchInputChange}
                        onKeyPress={handleKeyPress}
                        readOnly // 입력 불가능하도록 설정
                    /> */}
                    <div className="layout-search-icon" onClick={handleSearch}></div>
                </div>
                {/* 영화 카테고리 */}
                <div className="layout-menu">
                    <Link to="/kids" className={getLinkClass('/kids')}>키즈</Link>
                    <Link to="/drama" className={getLinkClass('/drama')}>드라마</Link>
                    <Link to="/movie" className={getLinkClass('/movie')}>영화</Link>
                    <Link to="/tv" className={getLinkClass('/tv')}>TV/예능</Link>
                    <Link to="/anime" className={getLinkClass('/anime')}>애니</Link>
                    <Link to="/adult" className={getLinkClass('/adult')}>성인</Link>
                </div>
            </div>
            {/* 상단 */}
            <div className="layout-topbar">
                {/* 메인 카테고리 */}
                {/* 로고 */}
                <div className="layout-topbar-menu">
                    <img src={logo} alt="Logo" className="layout-logo" onClick={() => navigate('/mainpage')} />
                    <Link to="/mainpage" className="bold">&nbsp;&nbsp;&nbsp;&nbsp;메인페이지</Link>
                    <Link to="/schedule">일정</Link>
                    <Link to="/bread-list">빵 목록</Link>
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
