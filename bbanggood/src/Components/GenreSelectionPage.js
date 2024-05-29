import React, { useState } from 'react';
import '../CSS/GenreSelectionPage.css'; // 선호 장르 선택 페이지용 CSS 파일 import
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const genres = [
    '장르 1', '장르 2', '장르 3', '장르 4',
    '장르 5', '장르 6', '장르 7', '장르 8'
];

const GenreSelectionPage = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="genre-selection-page">
            <div className="genre-container">
                <div className="sidebar">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <div className="genre-content">
                    <h2>좋아하는 장르를 선택해주세요 (3개 이상)</h2>
                    <div className="genre-grid">
                        {genres.map((genre, index) => (
                            <div
                                key={index}
                                className={`genre-box ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                                onClick={() => handleGenreClick(genre)}
                            >
                                {genre}
                            </div>
                        ))}
                    </div>
                    <button
                        className="next-button"
                        disabled={selectedGenres.length < 3}
                        onClick={() => navigate('/contents-selection')} // 다음 페이지로 이동
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenreSelectionPage;
