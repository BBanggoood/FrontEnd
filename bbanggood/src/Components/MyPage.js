import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MyPage.css';
import logo from '../images/BBanggood_logo_white_line.png'; // 기존 로고
import profileImage from '../images/호빵맨.png'; // 새로운 프로필 이미지

const MyPage = () => {
    const navigate = useNavigate();

    const handleAdultVerification = () => {
        navigate('/adult-verification');
    };

    return (
        <div className="my-page">
            <div className="my-page-container">
                <div className="my-page-header">
                    <img src={logo} alt="Logo" className="my-page-logo" />
                    <h2>회원 정보</h2>
                </div>
                <div className="my-page-content">
                    <div className="my-page-info">
                        <img src={profileImage} alt="Profile" className="profile-img" />
                        <div className="info-text">
                            <p>이름: 이주원</p>
                            <p>셋탑번호: 2001920</p>
                            <p>핸드폰 번호: 01012345678</p>
                            <p>성별: 여성</p>
                        </div>
                    </div>
                    <div className="my-page-actions">
                        <button className="action-button">개인 정보 수정</button>
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
