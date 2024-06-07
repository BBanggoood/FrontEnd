import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdultVerificationPage.css';
import logo from '../images/성인인증.png';

const AdultVerificationPage = () => {
    const navigate = useNavigate();

    const handleBoxClick = () => {
        // 여기에서 실제 성인 인증 로직을 추가하세요.
        // 인증이 완료되면 로컬 스토리지에 상태를 저장합니다.
        const isSuccess = true; // 실제 인증 로직에 따라 성공 여부를 설정하세요.

        if (isSuccess) {
            localStorage.setItem('isAdultVerified', 'true');
            alert("성인 인증이 완료되었습니다.");
            navigate('/adult-verification-pin');
        } else {
            alert("성인 인증이 실패했습니다.");
        }
    };

    return (
        <div className="adult-verification-page">
            <div className="adult-verification-container">
                <div className="adult-verification-header">
                    <img src={logo} alt="성인 인증 로고" className="adult-verification-logo" />
                    <h2 className="adult-verification-title">성인 인증</h2>
                </div>
                <div className="adult-verification-box" onClick={handleBoxClick}>
                    <span className="adult-verification-text">성인 인증 API 창</span>
                </div>
            </div>
        </div>
    );
};

export default AdultVerificationPage;
