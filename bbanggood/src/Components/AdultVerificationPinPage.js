import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdultVerificationPin.css';
import lockImage from '../images/성인인증.png'; // 성인 인증 로고 이미지 경로

const AdultVerificationPinPage = () => {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const handleSubmit = (event) => {
        // 여기 핀 번호 userdata에 넣어야됨
        if (pin !== confirmPin) {
            alert('PIN번호가 일치하지 않습니다.');
            return;
        }
        localStorage.setItem('pin', pin);
        alert('PIN번호가 변경되었습니다.');
        navigate('/mypage');
    };

    return (
        <div className="adult-verification-page">
            <div className="adult-verification-container">
                <div className="adult-verification-header">
                    <img src={lockImage} alt="Lock" className="adult-verification-logo" />
                    <h2 className="adult-verification-title">성인 인증</h2>
                </div>
                <div className="adult-verification-box">
                    <form className="adult-verification-form" onSubmit={handleSubmit}>
                        <p>성인 카테고리 접근 시 사용할 PIN 번호를 입력해주세요.</p>
                        <label>
                            PIN 번호 입력:
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="input-field"
                            />
                        </label>
                        <label>
                            PIN 번호 확인:
                            <input
                                type="password"
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                className="input-field"
                            />  
                        </label>
                        <button type="submit">설정 완료</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdultVerificationPinPage;
