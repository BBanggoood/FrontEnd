import React, { useState } from 'react';
import '../CSS/BreadListPage.css';

const BreadListPage = () => {
    const initialVOD = [
        { title: "VOD 1", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 2", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 3", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 4", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 5", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 6", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 7", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 8", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 9", poster: "https://via.placeholder.com/108x176" },
        { title: "VOD 10", poster: "https://via.placeholder.com/108x176" }
    ];

    const initialDirectors = [
        { title: "Director 1", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 2", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 3", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 4", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 5", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 6", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 7", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 8", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 9", poster: "https://via.placeholder.com/108x176" },
        { title: "Director 10", poster: "https://via.placeholder.com/108x176" }
    ];

    const initialActors = [
        { title: "Actor 1", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 2", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 3", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 4", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 5", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 6", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 7", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 8", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 9", poster: "https://via.placeholder.com/108x176" },
        { title: "Actor 10", poster: "https://via.placeholder.com/108x176" }
    ];

    const [currentVODIndex, setCurrentVODIndex] = useState(0);
    const [currentDirectorsIndex, setCurrentDirectorsIndex] = useState(0);
    const [currentActorsIndex, setCurrentActorsIndex] = useState(0);

    const handleNext = (setCurrentIndex, currentIndex, list) => {
        setCurrentIndex((currentIndex + 1) % list.length);
    };

    const handlePrev = (setCurrentIndex, currentIndex, list) => {
        setCurrentIndex((currentIndex - 1 + list.length) % list.length);
    };

    const getBoxClassName = (index, currentIndex, list) => {
        const offset = (index - currentIndex + list.length) % list.length;
        if (offset === 0) return "bread-content-box front";
        if (offset === 1) return "bread-content-box right1";
        if (offset === 2) return "bread-content-box right2";
        if (offset === list.length - 1) return "bread-content-box left1";
        if (offset === list.length - 2) return "bread-content-box left2";
        return "bread-content-box";
    };

    return (
        <div className="bread-list-page">
            <div className="bread-list-page-container">
                <div className="bread-list-section">
                    <h2>VOD</h2>
                    <div className="bread-content-container">
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentVODIndex, currentVODIndex, initialVOD)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {initialVOD.map((vod, index) => (
                                <div key={index} className={getBoxClassName(index, currentVODIndex, initialVOD)}>
                                    <img src={vod.poster} alt={vod.title} />
                                </div>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentVODIndex, currentVODIndex, initialVOD)}>
                            ▶
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>감독</h2>
                    <div className="bread-content-container">
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentDirectorsIndex, currentDirectorsIndex, initialDirectors)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {initialDirectors.map((director, index) => (
                                <div key={index} className={getBoxClassName(index, currentDirectorsIndex, initialDirectors)}>
                                    <img src={director.poster} alt={director.title} />
                                </div>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentDirectorsIndex, currentDirectorsIndex, initialDirectors)}>
                            ▶
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>출연진</h2>
                    <div className="bread-content-container">
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentActorsIndex, currentActorsIndex, initialActors)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {initialActors.map((actor, index) => (
                                <div key={index} className={getBoxClassName(index, currentActorsIndex, initialActors)}>
                                    <img src={actor.poster} alt={actor.title} />
                                </div>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentActorsIndex, currentActorsIndex, initialActors)}>
                            ▶
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadListPage;
