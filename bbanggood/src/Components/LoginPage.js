import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/LoginPage.css';
import logo from '../images/pngegg.png'; // 버튼 아이콘 이미지

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [(data) => {
                    return Object.keys(data)
                        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                        .join('&');
                }]
            });

            // 로그인 성공 시 로컬 스토리지에 setbxId 및 JWT 토큰 저장 및 메인 페이지로 이동
            if (response.status === 200) {
                localStorage.setItem('setbxId', username);

                const token = response.headers['authorization']; // JWT 토큰 추출
                if (token) {
                    localStorage.setItem('jwtToken', token); // JWT 토큰 로컬 스토리지에 저장
                }

                navigate('/mainpage');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다.', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="login-screen">
            <div className="login-rectangle">
                <div className="inner-rectangle">
                    <div className="input-group">
                        <label htmlFor="username">셋톱박스 아이디 입력:</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="input-field" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호 입력:</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="input-field" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
