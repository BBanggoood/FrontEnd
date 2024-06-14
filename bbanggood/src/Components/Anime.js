import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Anime.css';

const Anime = () => {
    const initialContents = [
        "Content 1", "Content 2", "Content 3", "Content 4", "Content 5",
        "Content 6", "Content 7", "Content 8", "Content 9", "Content 10"
    ];

    const [recommendation1Contents, setRecommendation1Contents] = useState(initialContents.slice(0, 5));
    const [recommendation1Page, setRecommendation1Page] = useState(1);

    const handleNextRecommendation1 = () => {
        if (recommendation1Page === 1) {
            setRecommendation1Contents(initialContents.slice(5, 10));
            setRecommendation1Page(2);
        }
    };

    const handlePrevRecommendation1 = () => {
        if (recommendation1Page === 2) {
            setRecommendation1Contents(initialContents.slice(0, 5));
            setRecommendation1Page(1);
        }
    };

    const [recommendation2Contents, setRecommendation2Contents] = useState(initialContents.slice(0, 5));
    const [recommendation2Page, setRecommendation2Page] = useState(1);

    const handleNextRecommendation2 = () => {
        if (recommendation2Page === 1) {
            setRecommendation2Contents(initialContents.slice(5, 10));
            setRecommendation2Page(2);
        }
    };

    const handlePrevRecommendation2 = () => {
        if (recommendation2Page === 2) {
            setRecommendation2Contents(initialContents.slice(0, 5));
            setRecommendation2Page(1);
        }
    };

    const [popularContents, setPopularContents] = useState([]);
    const [popularPage, setPopularPage] = useState(1);

    useEffect(() => {
        fetch('http://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/contents/animation/top')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setPopularContents(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const navigate = useNavigate();

    const handleImageClick = (vodId) => {
        console.log('Clicked vodID:', vodId);
        navigate(`/vod-detail/${vodId}`);
    };

    const handleNextPopular = () => {
        if (popularPage === 1) {
            setPopularContents(prevContents => prevContents.slice(5, 10));
            setPopularPage(2);
        }
    };

    const handlePrevPopular = () => {
        if (popularPage === 2) {
            setPopularContents(prevContents => prevContents.slice(0, 5));
            setPopularPage(1);
        }
    };

    return (
        <div className="anime-page">
            <div className="anime-page-container">
                <h1 className="anime-page-title">애니</h1>
                <div className="anime-page-content-section">
                    <h2>추천 1</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {recommendation1Page === 2 && (
                                <div className="content-arrow" onClick={handlePrevRecommendation1}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {recommendation1Contents.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {recommendation1Page === 1 && (
                                <div className="content-arrow" onClick={handleNextRecommendation1}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="anime-page-content-section">
                    <h2>추천 2</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {recommendation2Page === 2 && (
                                <div className="content-arrow" onClick={handlePrevRecommendation2}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {recommendation2Contents.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {recommendation2Page === 1 && (
                                <div className="content-arrow" onClick={handleNextRecommendation2}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="anime-page-content-section">
                    <h2>지금 인기있는 컨텐츠</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {popularPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevPopular}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {popularContents.slice(0, 5).map((content, index) => (
                            <div key={index} className="content-box" onClick={() => handleImageClick(content.vodId)}>
                                <img src={content.vodPoster} alt={`Content ${index + 1}`} className="content-image" />
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {popularPage === 1 && (
                                <div className="content-arrow" onClick={handleNextPopular}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Anime;
