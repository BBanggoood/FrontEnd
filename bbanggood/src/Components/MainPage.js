import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MainPage.css';

// 이미지 import
import insideOut2 from '../images/인사이드아웃2.png';
import wonka from '../images/웡카.png';
import pamyo from '../images/파묘.png';
import avengers from '../images/어벤져스.png';
import bestBaseball from '../images/최강야구.png';

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
        { image: insideOut2, trailer: 'https://bbanggoood-front.s3.ap-northeast-2.amazonaws.com/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C+%EC%95%84%EC%9B%832+%EC%98%88%EA%B3%A0%ED%8E%B8.mp4' },
        { image: wonka, trailer: 'https://bbanggoood-front.s3.ap-northeast-2.amazonaws.com/%EC%9B%A1%EC%B9%B4+%EC%98%88%EA%B3%A0%ED%8E%B8.mp4' },
        { image: pamyo, trailer: 'https://bbanggoood-front.s3.ap-northeast-2.amazonaws.com/%ED%8C%8C%EB%AC%98+%EC%98%88%EA%B3%A0%ED%8E%B8.mp4' },
        { image: avengers, trailer: 'https://bbanggoood-front.s3.ap-northeast-2.amazonaws.com/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4+%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84+%EC%98%88%EA%B3%A0%ED%8E%B8.mp4' },
        { image: bestBaseball, trailer: 'https://bbanggoood-front.s3.ap-northeast-2.amazonaws.com/%EC%B5%9C%EA%B0%95%EC%95%BC%EA%B5%AC+%EC%98%88%EA%B3%A0%ED%8E%B8.mp4' }
    ];
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleNextBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const handlePrevBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setIsHovered(true);
        }, 1000); // 1초로 변경
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setIsHovered(false);
    };

    return (
        <div className="main-page">
            <div className="main-page-container">
                <div className="main-page-banner-ad">
                    <div className="banner-arrow left-arrow" onClick={handlePrevBanner}>
                        ◀
                    </div>
                    <div
                        className="main-page-banner-image"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {!isHovered && (
                            <img src={banners[currentBannerIndex].image} alt={`Banner ${currentBannerIndex + 1}`} />
                        )}
                        {isHovered && (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${banners[currentBannerIndex].trailer}?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&vq=hd720`}
                                title={`Trailer ${currentBannerIndex + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                    <div className="banner-arrow right-arrow" onClick={handleNextBanner}>
                        ▶
                    </div>
                    <div className="banner-pagination">
                        {currentBannerIndex + 1} / {banners.length}
                    </div>
                </div>
                <div className="main-page-content-section">
                    <h2>지금 인기 있는 컨텐츠</h2>
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
