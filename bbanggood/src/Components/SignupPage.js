import React, { useState } from 'react';
import '../CSS/SignupPage.css'; // 회원가입 페이지용 CSS 파일 import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        userSetbxId: '',
        userEmail: '',
        userPwd: '',
        confirmUserPwd: '',
        username: '',
        userPhone: '',
        userSex: '',
        userBirth: '',
    });

    const navigate = useNavigate();

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(`Updating ${id} to ${value}`);
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.userPwd !== formData.confirmUserPwd) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            console.log('Submitting form with data:', formData);
            const response = await axios.post('http://localhost:7500/account/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            alert(response.data);
            navigate('/genre-selection');
        } catch (error) {
            alert('회원 가입 중 오류가 발생했습니다.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-rectangle">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="userSetbxId">셋톱박스 아이디 입력:</label>
                        <input
                            type="text"
                            id="userSetbxId"
                            className="input-field"
                            value={formData.userSetbxId}
                            onChange={handleChange}
                        />
                        <button type="button" className="check-button">중복확인</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userEmail">이메일 입력:</label>
                        <input
                            type="email"
                            id="userEmail"
                            className="input-field"
                            value={formData.userEmail}
                            onChange={handleChange}
                        />
                        <button type="button" className="check-button">중복확인</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userPwd">비밀번호 입력:</label>
                        <input
                            type="password"
                            id="userPwd"
                            className="input-field"
                            value={formData.userPwd}
                            onChange={handleChange}
                        />
                        <button type="button" className="invisible-button">비밀번호 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmUserPwd">비밀번호 확인:</label>
                        <input
                            type="password"
                            id="confirmUserPwd"
                            className="input-field"
                            value={formData.confirmUserPwd}
                            onChange={handleChange}
                        />
                        <button type="button" className="invisible-button">비밀번호 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userName">이름 입력:</label>
                        <input
                            type="text"
                            id="userName"
                            className="input-field"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        <button type="button" className="invisible-button">이름 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userPhone">전화번호 입력:</label>
                        <input
                            type="tel"
                            id="userPhone"
                            className="input-field"
                            value={formData.userPhone}
                            onChange={handleChange}
                        />
                        <button type="button" className="check-button">전화번호 인증</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userSex">성별:</label>
                        <select
                            id="userSex"
                            className="select-field"
                            value={formData.userSex}
                            onChange={handleChange}
                        >
                            <option value="">성별 선택</option>
                            <option value="Male">남자</option>
                            <option value="Female">여자</option>
                        </select>
                        <button type="button" className="invisible-button">성별 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="userBirth">생년월일:</label>
                        <input
                            type="date"
                            id="userBirth"
                            className="input-field"
                            value={formData.userBirth}
                            onChange={handleChange}
                        />
                        <button type="button" className="invisible-button">생년월일 확인용</button>
                    </div>
                    <button type="submit" className="signup-next-button">다음</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;