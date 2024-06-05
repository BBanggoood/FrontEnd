import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyPage.css';
import profileImage from '../images/호빵맨.png'; // 새로운 프로필 이미지

const MyPage = () => {
    const navigate = useNavigate();

    const handleAdultVerification = () => {
        navigate('/adult-verification');
    };

    return (
        <div className="my-page">
            <div className="my-page-container">
                <div className="my-page-welcome">
                    <div className="welcome-text">
                        <h3>HELLO, BBANGGOOD !</h3>
                        <button className="edit-button">개인 정보 수정</button>
                    </div>
                    <img src={profileImage} alt="Profile" className="welcome-img" />
                </div>
                <div className="my-page-main">
                    <div className="my-page-info">
                        <div className="info-text">
                            <p>이름: 이주원</p>
                            <p>셋탑번호: 2001920</p>
                            <p>핸드폰 번호: 01012345678</p>
                            <p>성별: 여성</p>
                        </div>
                    </div>
                    <div className="my-page-actions">
                        <button className="action-button" onClick={handleAdultVerification}>성인인증</button>
                        <button className="action-button">로그아웃</button>
                        <button className="action-button">회원 탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
