import React from 'react';
import '../CSS/Anime.css';

const Anime = () => {
    return (
        <div className="anime-page">
            <div className="anime-page-container">
                <h1 className="anime-page-title">애니</h1>
                <h2 className="anime-page-subtitle">주원님을 위한 추천</h2>
                <div className="anime-page-content">
                    <div className="anime-page-box-container">
                        <div className="anime-page-box brown">
                            <div className="anime-page-box white"></div>
                        </div>
                        <div className="anime-page-box brown">
                            <div className="anime-page-box white"></div>
                        </div>
                    </div>
                </div>
                <h2 className="anime-page-subtitle">다른 사람들은 이런 걸 좋아해요</h2>
                <div className="anime-page-row">
                    <div className="anime-page-box"></div>
                    <div className="anime-page-box"></div>
                    <div className="anime-page-box"></div>
                </div>
            </div>
        </div>
    );
}

export default Anime;
