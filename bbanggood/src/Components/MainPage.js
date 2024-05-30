import React, { useState } from 'react';
import '../CSS/MainPage.css';

const MainPage = () => {
    const initialContents = [
        "Content 1", "Content 2", "Content 3", "Content 4", "Content 5",
        "Content 6", "Content 7", "Content 8", "Content 9", "Content 10"
    ];

    const [displayedContents, setDisplayedContents] = useState(initialContents.slice(0, 5));
    const [currentContentPage, setCurrentContentPage] = useState(1);

    const handleNextContents = () => {
        if (currentContentPage === 1) {
            setDisplayedContents(initialContents.slice(5, 10));
            setCurrentContentPage(2);
        }
    };

    const handlePrevContents = () => {
        if (currentContentPage === 2) {
            setDisplayedContents(initialContents.slice(0, 5));
            setCurrentContentPage(1);
        }
    };

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
                    <h2>이어보기</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {currentContentPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevContents}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {displayedContents.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {currentContentPage === 1 && (
                                <div className="content-arrow" onClick={handleNextContents}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="main-page-content-section">
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
                <div className="main-page-content-section">
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
            </div>
        </div>
    );
};

export default MainPage;
