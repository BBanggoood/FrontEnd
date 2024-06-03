import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdultVerificationPage.css';
import logo from '../images/성인인증.png';

const AdultVerificationPage = () => {
    const navigate = useNavigate();

    const handleBoxClick = () => {
        navigate('/adult-verification-pin');
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
