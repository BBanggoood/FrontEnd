import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/InitialScreen2.css';
import logo from '../images/BBanggood_logo_white_line.png'; // 초기화면2 이미지 파일 import

function InitialScreen2() {
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬 스토리지 비우기
        localStorage.clear();
    }, []);

    return (
        <div className="initial-screen2">
            <div className="outer-rectangle2">
                <div className="rectangle-set">
                    <div className="rectangle-565" onClick={() => navigate('/login')}>
                        <img src={logo} alt="Logo" className="initial2-logo-image" />
                    </div>
                    <p className="text">회원이신가요?</p>
                </div>
                <div className="rectangle-set">
                    <div className="rectangle-566" onClick={() => navigate('/signup')}>
                        <img src={logo} alt="Logo" className="initial2-logo-image" />
                    </div>
                    <p className="text">소금빵이 처음이신가요?</p>
                </div>
            </div>
        </div>
    );
}

export default InitialScreen2;
