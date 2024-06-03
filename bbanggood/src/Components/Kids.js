import React from 'react';
import '../CSS/Kids.css';

const Kids = () => {
    return (
        <div className="kids-page">
            <div className="kids-page-container">
                <h1 className="kids-page-title">키즈</h1>
                <h2 className="kids-page-subtitle">주원님을 위한 추천</h2>
                <div className="kids-page-content">
                    <div className="kids-page-box-container">
                        <div className="kids-page-box brown">
                            <div className="kids-page-box white"></div>
                        </div>
                        <div className="kids-page-box brown">
                            <div className="kids-page-box white"></div>
                        </div>
                    </div>
                </div>
                <h2 className="kids-page-subtitle">다른 사람들은 이런 걸 좋아해요</h2>
                <div className="kids-page-row">
                    <div className="kids-page-box"></div>
                    <div className="kids-page-box"></div>
                    <div className="kids-page-box"></div>
                </div>
            </div>
        </div>
    );
}

export default Kids;
