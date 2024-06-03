import React from 'react';
import '../CSS/Movie.css';

const Movie = () => {
    return (
        <div className="movie-page">
            <div className="movie-page-container">
                <h1 className="movie-page-title">영화</h1>
                <h2 className="movie-page-subtitle">주원님을 위한 추천</h2>
                <div className="movie-page-content">
                    <div className="movie-page-box-container">
                        <div className="movie-page-box brown">
                            <div className="movie-page-box white"></div>
                        </div>
                        <div className="movie-page-box brown">
                            <div className="movie-page-box white"></div>
                        </div>
                    </div>
                </div>
                <h2 className="movie-page-subtitle">다른 사람들은 이런 걸 좋아해요</h2>
                <div className="movie-page-row">
                    <div className="movie-page-box"></div>
                    <div className="movie-page-box"></div>
                    <div className="movie-page-box"></div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
