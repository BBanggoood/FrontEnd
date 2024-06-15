import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    const [popularContents, setPopularContents] = useState([]);
    const [popularPage, setPopularPage] = useState(1);
    const [allPopularContents, setAllPopularContents] = useState([]);

    useEffect(() => {
        fetch('https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/contents/main/top')
            .then(response => response.json())
            .then(data => {
                setAllPopularContents(data);
                setPopularContents(data.slice(0, 5)); // 첫 5개 아이템을 초기값으로 설정
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleImageClick = (vodId) => {
        navigate(`/vod-detail/${vodId}`);
    };

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

    const [recommendation2Contents, setRecommendation2Contents] = useState([]);
    const [recommendation2Page, setRecommendation2Page] = useState(1);
    const [allRecommendation2Contents, setAllRecommendation2Contents] = useState([]);

    useEffect(() => {
        const setbxId = localStorage.getItem('setbxId');
        if (setbxId) {
            fetch('https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/recommend/main', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ setbxId }),
            })
                .then(response => response.json())
                .then(data => {
                    // 20개의 항목 중 10개를 랜덤으로 선택
                    const shuffled = data.sort(() => 0.5 - Math.random());
                    const selected = shuffled.slice(0, 10);
                    setAllRecommendation2Contents(selected);
                    setRecommendation2Contents(selected.slice(0, 5)); // 첫 5개 아이템을 초기값으로 설정
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, []);

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

    const banners = [
        '배너 광고 1',
        '배너 광고 2',
        '배너 광고 3',
        '배너 광고 4',
        '배너 광고 5'
    ];
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const handleNextBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const handlePrevBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    return (
        <div className="main-page">
            <div className="main-page-container">
                <div className="main-page-banner-ad">
                    <div className="banner-arrow left-arrow" onClick={handlePrevBanner}>
                        ◀
                    </div>
                    <div className="main-page-banner-text">{banners[currentBannerIndex]}</div>
                    <div className="banner-arrow right-arrow" onClick={handleNextBanner}>
                        ▶
                    </div>
                    <div className="banner-pagination">
                        {currentBannerIndex + 1} / {banners.length}
                    </div>
                </div>
                <div className="main-page-content-section">
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
                <div className="main-page-content-section">
                    <h2>추천 VOD</h2>
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

export default MainPage;
