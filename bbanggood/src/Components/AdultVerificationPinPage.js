import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdultVerificationPin.css';
import lockImage from '../images/성인인증.png'; // 성인 인증 로고 이미지 경로

const AdultVerificationPinPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("PIN 번호 설정이 완료되었습니다.");
        navigate('/mypage'); // 설정 완료 후 마이페이지로 이동
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
                            <input type="password" name="pin" />
                        </label>
                        <label>
                            PIN 번호 확인:
                            <input type="password" name="confirmPin" />
                        </label>
                        <button type="submit">설정 완료</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdultVerificationPinPage;
