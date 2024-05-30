import React from 'react';
import '../CSS/SignupPage.css'; // 회원가입 페이지용 CSS 파일 import
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-page">
            <div className="signup-rectangle">
                <form className="signup-form">
                    <div className="input-group">
                        <label htmlFor="username">셋톱박스 아이디 입력:</label>
                        <input type="text" id="username" className="input-field" />
                        <button type="button" className="check-button">중복확인</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">이메일 입력:</label>
                        <input type="email" id="email" className="input-field" />
                        <button type="button" className="check-button">중복확인</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호 입력:</label>
                        <input type="password" id="password" className="input-field" />
                        <button type="button" className="invisible-button">비밀번호 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">비밀번호 확인:</label>
                        <input type="password" id="confirm-password" className="input-field" />
                        <button type="button" className="invisible-button">비밀번호 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">전화번호 입력:</label>
                        <input type="tel" id="phone" className="input-field" />
                        <button type="button" className="check-button">전화번호 인증</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="birthdate">생년월일:</label>
                        <input type="date" id="birthdate" className="input-field" />
                        <button type="button" className="invisible-button">생년월일 확인용</button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">성별:</label>
                        <select id="gender" className="input-field">
                            <option value="">성별 선택</option>
                            <option value="male">남자</option>
                            <option value="female">여자</option>
                        </select>
                        <button type="button" className="invisible-button">성별 확인용</button>
                    </div>
                    <button type="button" className="signup-next-button" onClick={() => navigate('/genre-selection')}>다음</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
