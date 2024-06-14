import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/AdultVerificationPage.css';
import logo from '../images/성인인증.png';

const AdultVerificationPage = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    // const handleBoxClick = () => {
    //     // 여기에서 실제 성인 인증 로직을 추가하세요.
    //     // 인증이 완료되면 로컬 스토리지에 상태를 저장합니다.
    //     const isSuccess = true; // 실제 인증 로직에 따라 성공 여부를 설정하세요.

    //     if (isSuccess) {
    //         localStorage.setItem('isAdultVerified', 'true');
    //         alert("성인 인증이 완료되었습니다.");
    //         navigate('/adult-verification-pin');
    //     } else {
    //         alert("성인 인증이 실패했습니다.");
    //     }
    // };

    const handleSendCode = async () => {
        setIsCodeSent(true);
        // try {
        //     console.log(`Sending SMS to ${phoneNumber}`); // 디버그용 로그
        //     const response = await axios.post(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/sms/send/${phoneNumber}`);
        //     console.log('Response:', response); // 디버그용 로그
        //     if (response.data === 'SMS sent successfully') {
        //         setIsCodeSent(true);
        //         alert('인증번호가 발송되었습니다.');
        //     }
        // } catch (error) {
        //     console.error('SMS 전송 중 오류가 발생했습니다.', error);
        //     alert('SMS 전송 중 오류가 발생했습니다.');
        // }
    };

    const handleVerifyCode = async () => {
        setIsCodeVerified(true);
        // try {
        //     const response = await axios.post(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/sms/verify`, null, {
        //         params: {
        //             phoneNumber: phoneNumber,
        //             code: verificationCode
        //         }
        //     });
        //     if (response.data === 'Verification successful') {
        //         setIsCodeVerified(true);
        //         alert('인증이 완료되었습니다.');
        //     } else {
        //         alert('인증번호가 정확하지 않습니다.');
        //     }
        // } catch (error) {
        //     console.error('인증번호 검증 중 오류가 발생했습니다.', error);
        //     alert('인증번호가 정확하지 않습니다.');
        // }
    };

    const handlePinSubmit = () => {
        if (pin !== confirmPin) {
            alert('PIN번호가 일치하지 않습니다.');
            return;
        }
        localStorage.setItem('isAdultVerified', 'true');
        localStorage.setItem('pin', pin);
        alert('PIN번호가 설정되었습니다.');
        navigate('/mypage');
    };
    
    return (
        <div className="adult-verification-page">
            <div className="adult-verification-container">
                <div className="adult-verification-header">
                    <img src={logo} alt="성인 인증 로고" className="adult-verification-logo" />
                    <h2 className="adult-verification-title">성인 인증</h2>
                </div>
                <div className="adult-verification-box">
                    <div className="input-container">
                        <div className="phone-verification">
                            <div className="input-group input-phone">
                                <input
                                    type="text"
                                    placeholder="핸드폰 번호 입력"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="input-field"
                                />
                                <button onClick={handleSendCode} className="verification-button">인증 메세지 전송</button>
                            </div>
                        </div>
                        {isCodeSent && (
                            <div className="verification-code">
                                <div className="input-group input-phone-verification">
                                    <input
                                        type="text"
                                        placeholder="인증번호 입력"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="input-field"
                                    />
                                    <button onClick={handleVerifyCode} className="verification-button">인증번호 확인</button>
                                </div>
                            </div>
                        )}
                        {isCodeVerified && (
                            <div className="pin-verification">
                                <div className="input-group input-pin">
                                    <input
                                        type="password"
                                        placeholder="PIN번호 입력"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className="input-group input-pin-verification">
                                    <input
                                        type="password"
                                        placeholder="PIN번호 확인"
                                        value={confirmPin}
                                        onChange={(e) => setConfirmPin(e.target.value)}
                                        className="input-field"
                                    />
                                    <button onClick={handlePinSubmit} className="verification-button">PIN번호 설정</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdultVerificationPage;
