import React from 'react';
import '../CSS/TVShow.css';

const TVShow = () => {
    return (
        <div className="tvshow-page">
            <div className="tvshow-page-container">
                <h1 className="tvshow-page-title">TV/예능</h1>
                <h2 className="tvshow-page-subtitle">주원님을 위한 추천</h2>
                <div className="tvshow-page-content">
                    <div className="tvshow-page-box-container">
                        <div className="tvshow-page-box brown">
                            <div className="tvshow-page-box white"></div>
                        </div>
                        <div className="tvshow-page-box brown">
                            <div className="tvshow-page-box white"></div>
                        </div>
                    </div>
                </div>
                <h2 className="tvshow-page-subtitle">다른 사람들은 이런 걸 좋아해요</h2>
                <div className="tvshow-page-row">
                    <div className="tvshow-page-box"></div>
                    <div className="tvshow-page-box"></div>
                    <div className="tvshow-page-box"></div>
                </div>
            </div>
        </div>
    );
}

export default TVShow;
