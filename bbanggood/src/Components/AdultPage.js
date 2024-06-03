import React from 'react';
import '../CSS/AdultPage.css';
import lockImage from '../images/성인 잠금.png'; // 이미지 경로를 임포트

const AdultPage = () => {
    return (
        <div className="adult-page">
            <div className="adult-page-container">
                <img src={lockImage} alt="Lock" className="lock-image" />
            </div>
        </div>
    );
}

export default AdultPage;
