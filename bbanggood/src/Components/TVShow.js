import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/TVShow.css';

const TVShow = () => {
    const [recommendation1Contents, setRecommendation1Contents] = useState([]);
    const [recommendation1Page, setRecommendation1Page] = useState(1);
    const [allRecommendation1Contents, setAllRecommendation1Contents] = useState([]);
    
    const [recommendation2Contents, setRecommendation2Contents] = useState([]);
    const [recommendation2Page, setRecommendation2Page] = useState(1);
    const [allRecommendation2Contents, setAllRecommendation2Contents] = useState([]);

    useEffect(() => {
        const setbxId = localStorage.getItem('setbxId');
        if (setbxId) {
            fetch('http://localhost:7400/recommend/tv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ setbxId }),
            })
                .then(response => response.json())
                .then(data => {
                    const firstTen = data.slice(0, 10);
                    const secondTen = data.slice(10, 20);
                    setAllRecommendation1Contents(firstTen);
                    setRecommendation1Contents(firstTen.slice(0, 5));
                    setAllRecommendation2Contents(secondTen);
                    setRecommendation2Contents(secondTen.slice(0, 5));
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, []);

    const navigate = useNavigate();

    const handleImageClick = (vodId) => {
        navigate(`/vod-detail/${vodId}`);
    };

    const handleNextRecommendation1 = () => {
        if (recommendation1Page === 1) {
            setRecommendation1Contents(allRecommendation1Contents.slice(5, 10));
            setRecommendation1Page(2);
        }
    };

    const handlePrevRecommendation1 = () => {
        if (recommendation1Page === 2) {
            setRecommendation1Contents(allRecommendation1Contents.slice(0, 5));
            setRecommendation1Page(1);
        }
    };

    const handleNextRecommendation2 = () => {
        if (recommendation2Page === 1) {
            setRecommendation2Contents(allRecommendation2Contents.slice(5, 10));
            setRecommendation2Page(2);
        }
    };

    const handlePrevRecommendation2 = () => {
        if (recommendation2Page === 2) {
            setRecommendation2Contents(allRecommendation2Contents.slice(0, 5));
            setRecommendation2Page(1);
        }
    };

    const [popularContents, setPopularContents] = useState([]);
    const [popularPage, setPopularPage] = useState(1);
    const [allPopularContents, setAllPopularContents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7200/contents/tv/top')
            .then(response => response.json())
            .then(data => {
                setAllPopularContents(data);
                setPopularContents(data.slice(0, 5)); // 첫 5개 아이템을 초기값으로 설정
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleNextPopular = () => {
        if (popularPage === 1) {
            setPopularContents(allPopularContents.slice(5, 10));
            setPopularPage(2);
        }
    };

    const handlePrevPopular = () => {
        if (popularPage === 2) {
            setPopularContents(allPopularContents.slice(0, 5));
            setPopularPage(1);
        }
    };

    return (
        <div className="tvshow-page">
            <div className="tvshow-page-container">
                <h1 className="tvshow-page-title">TV/예능</h1>
                <div className="tvshow-page-content-section">
                    <h2>지금 인기있는 컨텐츠</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {popularPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevPopular}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {popularContents.map((content, index) => (
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
                <div className="tvshow-page-content-section">
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
                            <div key={index} className="content-box" onClick={() => handleImageClick(content.id)}>
                                <img src={content.vodPoster} alt={`Content ${index + 1}`} className="content-image" />
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
                <div className="tvshow-page-content-section">
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
                            <div key={index} className="content-box" onClick={() => handleImageClick(content.id)}>
                                <img src={content.vodPoster} alt={`Content ${index + 1}`} className="content-image" />
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
            </div>
        </div>
    );
};

export default TVShow;
