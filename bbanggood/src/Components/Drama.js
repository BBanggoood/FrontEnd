import React from 'react';
import '../CSS/Drama.css';

const Drama = () => {
    return (
        <div className="drama-page">
            <div className="drama-page-container">
                <h1 className="drama-page-title">드라마</h1>
                <h2 className="drama-page-subtitle">주원님을 위한 추천</h2>
                <div className="drama-page-content">
                    <div className="drama-page-box-container">
                        <div className="drama-page-box brown">
                            <div className="drama-page-box white"></div>
                        </div>
                        <div className="drama-page-box brown">
                            <div className="drama-page-box white"></div>
                        </div>
                    </div>
                </div>
                <h2 className="drama-page-subtitle">다른 사람들은 이런 걸 좋아해요</h2>
                <div className="drama-page-row">
                    <div className="drama-page-box"></div>
                    <div className="drama-page-box"></div>
                    <div className="drama-page-box"></div>
                </div>
            </div>
        </div>
    );
}

export default Drama;
