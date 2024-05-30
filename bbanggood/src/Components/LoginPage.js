import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';
import logo from '../images/pngegg.png'; // 버튼 아이콘 이미지

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 로그인 처리 로직을 여기에 추가할 수 있습니다.
        // 로그인 성공 시 메인 페이지로 이동
        navigate('/home');
    }

    return (
        <div className="login-screen">
            <div className="login-rectangle">
                <div className="inner-rectangle">
                    <div className="input-group">
                        <label htmlFor="username">셋톱박스 아이디 입력:</label>
                        <input type="text" id="username" className="input-field" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호 입력:</label>
                        <input type="password" id="password" className="input-field" />
                    </div>
                    <button className="login-button" onClick={handleLogin}>
                        <img src={logo} alt="login icon" className="login-icon" />
                        <span>로그인</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
