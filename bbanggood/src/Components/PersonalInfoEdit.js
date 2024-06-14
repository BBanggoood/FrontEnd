import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/PersonalInfoEdit.css';

const PersonalInfoEdit = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        name: '',
        sex: '',
        birthDate: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const setbxId = localStorage.getItem('setbxId'); // localStorage에서 setbxId를 가져옵니다.
            if (!setbxId) {
                alert('사용자 정보가 없습니다.');
                return;
            }

            const response = await axios.patch('https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/account/update', {
                setbxId: parseInt(setbxId, 10), // setbxId를 숫자로 변환합니다.
                userPwd: formData.password,
                confirmUserPwd: formData.confirmPassword,
                userName: formData.name,
                userSex: formData.sex,
                userBirth: formData.birthDate
            });

            alert('회원 정보가 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('회원 정보 수정 중 오류가 발생했습니다.', error);
            alert('회원 정보 수정 중 오류가 발생했습니다.');
        }
    };

    const handleCancel = () => {
        navigate('/mypage');
    };

    return (
        <div className="personal-info-edit-page">
            <div className="personal-info-edit-container">
                <h2>회원 정보 수정</h2>
                <form className="personal-info-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 입력:</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">비밀번호 확인:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">이름 입력:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sex">성별:</label>
                        <select
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="select-field"
                        >
                            <option value="">성별 선택</option>
                            <option value="Male">남자</option>
                            <option value="Female">여자</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthDate">생년월일:</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">저장</button>
                        <button type="button" onClick={handleCancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoEdit;
