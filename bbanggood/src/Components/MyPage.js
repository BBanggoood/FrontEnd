import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/MyPage.css';
import profileImage from '../images/호빵맨.png'; // 새로운 프로필 이미지

const MyPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const setbxId = localStorage.getItem('setbxId');
                if (setbxId) {
                    const response = await axios.post('http://localhost/userdata', {
                        setbxId
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
                    setUserData(response.data);
                } else {
                    console.error('셋톱박스 아이디가 로컬 스토리지에 없습니다.');
                }
            } catch (error) {
                console.error('사용자 데이터를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserData();
    }, []);

    const handleAdultVerification = () => {
        navigate('/adult-verification');
    };

    const handleEditInfo = () => {
        navigate('/personal-info-edit');
    };

    const handleLogout = () => {
        const confirmation = window.confirm('로그아웃하시겠습니까?');
        if (confirmation) {
            localStorage.removeItem('setbxId');
            navigate('/login');
        }
    };

    if (!userData) {
        return <div>Loading...</div>; // 데이터 로드 중 표시
    }

    const handleWithdrawal = async () => {
        const confirmation = window.confirm('정말로 탈퇴하시겠습니까?');
        if (confirmation) {
            try {
                const setbxId = localStorage.getItem('setbxId');
                if (!setbxId) {
                    alert('사용자 정보가 없습니다.');
                    return;
                }

                const response = await axios.delete('http://localhost/account/withdraw', {
                    data: { setbxId: parseInt(setbxId, 10) } // 문자열을 정수로 변환
                });

                alert('정상적으로 탈퇴되었습니다.');
                localStorage.removeItem('setbxId');
                navigate('/');
            } catch (error) {
                console.error('회원 탈퇴 중 오류가 발생했습니다.', error);
                alert('회원 탈퇴 중 오류가 발생했습니다.');
            }
        }
    };

    const gender = userData.gender === null ? '알 수 없음' : (userData.gender === 'Male' ? '남성' : '여성');

    return (
        <div className="my-page">
            <div className="my-page-container">
                <div className="my-page-welcome">
                    <div className="welcome-text">
                        <h3>HELLO, BBANGGOOD !</h3>
                        <button className="edit-button" onClick={handleEditInfo}>개인 정보 수정</button>
                    </div>
                    <img src={profileImage} alt="Profile" className="welcome-img" />
                </div>
                <div className="my-page-main">
                    <div className="my-page-info">
                        <div className="info-text">
                            <p>이름: {userData.username}</p>
                            <p>셋탑번호: {userData.setbxId}</p>
                            <p>핸드폰 번호: {userData.phone}</p>
                            <p>성별: {gender}</p>
                        </div>
                    </div>
                    <div className="my-page-actions">
                        <button className="action-button" onClick={handleAdultVerification}>성인인증</button>
                        <button className="action-button" onClick={handleLogout}>로그아웃</button>
                        <button className="action-button" onClick={handleWithdrawal}>회원 탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
