import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/InitialScreen.css';
import logo from '../images/logo.png'; // 초기화면 이미지 파일 import

function InitialScreen() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     // 3초 후에 /initial2 페이지로 이동
    //     const timer = setTimeout(() => {
    //         navigate('/initial2');
    //     }, 3000);

    //     // 컴포넌트 언마운트 시 타이머 클리어
    //     return () => clearTimeout(timer);
    // }, [navigate]);

    // 화면을 클릭하면 /initial2 페이지로 이동
    const handleClick = () => {
        navigate('/initial2');
    };

    return (
        <div className="initial-screen" onClick={handleClick}>
            <div className="outer-rectangle">
                <div className="initial-logo-background">
                    <img src={logo} alt="Logo" className="initial-logo-image" />
                </div>
            </div>
        </div>
    );
}

export default InitialScreen;
