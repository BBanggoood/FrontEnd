import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/GenreSelectionPage.css'; // 선호 장르 선택 페이지용 CSS 파일 import

const genres = [
    '액션', '스릴러', '코미디', '로맨스',
    '음악', '미스터리', 'SF', '모험'
];

const GenreSelectionPage = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        } else if (selectedGenres.length < 3) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleNextClick = () => {
        if (selectedGenres.length === 3) {
            localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
            navigate('/contents-selection');
        }
    };

    return (
        <div className="genre-selection-page">
            <div className="genre-outer-rectangle">
                <div className="genre-sidebar">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div class="circle"></div>
                </div>
                <div className="genre-inner-rectangle">
                    <h2 style={{ fontSize: '1.5em' }}>좋아하는 장르를 선택해주세요 (3개 선택)</h2>
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
                        className="genre-next-button"
                        onClick={handleNextClick}
                        disabled={selectedGenres.length !== 3}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenreSelectionPage;
