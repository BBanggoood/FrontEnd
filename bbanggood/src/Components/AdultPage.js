import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdultPage.css';
import lockImage from '../images/성인 잠금.png'; // 이미지 경로를 임포트

const AdultPage = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const pin = localStorage.getItem('pin');

    useEffect(() => {
        // 로컬 스토리지에서 인증 상태를 확인합니다.
        const verifiedStatus = localStorage.getItem('isAdultVerified');
        if (verifiedStatus === 'true') {
            setIsVerified(true);
        }
    }, []);

    const handleLockClick = () => {
        if (isVerified) {
            const pin_input = prompt("PIN 번호를 입력해주세요.");
            if (pin_input === null) {
                return; // 사용자가 취소 버튼을 눌렀을 때 아무것도 하지 않음
            }
            if (pin_input === pin) { // 여기에 실제 PIN 번호 확인 로직을 추가하세요.
                navigate('/adult-access');
            } else {
                alert("잘못된 PIN 번호입니다.");
            }
        } else {
            const userConfirmed = window.confirm("성인 인증이 필요합니다.\n성인 인증 페이지로 이동하시겠습니까?");
            if (userConfirmed) {
                navigate('/adult-verification');
            }
        }
    };

    return (
        <div className="adult-page">
            <div className="adult-page-container" onClick={handleLockClick}>
                <img src={lockImage} alt="Lock" className="lock-image" />
            </div>
        </div>
    );
}

export default AdultPage;
