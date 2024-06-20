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
            const response = await axios.post('http://localhost:7300/login', {
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

                const token = response.headers['x-amzn-remapped-authorization'] || response.headers['authorization']; // JWT 토큰 추출
                if (token) {
                    localStorage.setItem('jwtToken', token); // JWT 토큰 로컬 스토리지에 저장
                }

                // 찜 목록, 캐스트, 디렉터 목록을 가져와 로컬 스토리지에 저장
                await fetchAndStoreBBangVod(username);
                await fetchAndStoreBBangCast(username);
                await fetchAndStoreBBangDirector(username);

                navigate('/mainpage');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다.', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const fetchAndStoreBBangVod = async (setbxId) => {
        try {
            const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/vod/${setbxId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.status === 200) {
                const bbangList = response.data;
                bbangList.forEach(vod => {
                    const key = `isAddedToBreadList_${vod.vodId}`;
                    localStorage.setItem(key, true);
                });
            } else {
                console.error('찜 목록을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('찜 목록을 가져오는 중 오류가 발생했습니다.', error);
        }
    };

    const fetchAndStoreBBangCast = async (setbxId) => {
        try {
            const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/cast/${setbxId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.status === 200) {
                const bbangCastList = response.data;
                bbangCastList.forEach(cast => {
                    const key = `isAddedToBreadList_cast_${cast.vodCast}`;
                    localStorage.setItem(key, true);
                });
            } else {
                console.error('캐스트 목록을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('캐스트 목록을 가져오는 중 오류가 발생했습니다.', error);
        }
    };

    const fetchAndStoreBBangDirector = async (setbxId) => {
        try {
            const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/director/${setbxId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            if (response.status === 200) {
                const bbangDirectorList = response.data;
                bbangDirectorList.forEach(director => {
                    const key = `isAddedToBreadList_director_${director.vodDirector}`;
                    localStorage.setItem(key, true);
                });
            } else {
                console.error('디렉터 목록을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('디렉터 목록을 가져오는 중 오류가 발생했습니다.', error);
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
