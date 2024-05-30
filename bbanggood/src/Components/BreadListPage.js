import React, { useState } from 'react';
import '../CSS/BreadListPage.css';

const BreadListPage = () => {
    const initialVOD = [
        "VOD 1", "VOD 2", "VOD 3", "VOD 4", "VOD 5",
        "VOD 6", "VOD 7", "VOD 8", "VOD 9", "VOD 10"
    ];

    const initialDirectors = [
        "Director 1", "Director 2", "Director 3", "Director 4", "Director 5",
        "Director 6", "Director 7", "Director 8", "Director 9", "Director 10"
    ];

    const initialActors = [
        "Actor 1", "Actor 2", "Actor 3", "Actor 4", "Actor 5",
        "Actor 6", "Actor 7", "Actor 8", "Actor 9", "Actor 10"
    ];

    const [displayedVOD, setDisplayedVOD] = useState(initialVOD.slice(0, 5));
    const [currentVODPage, setCurrentVODPage] = useState(1);

    const handleNextVOD = () => {
        if (currentVODPage === 1) {
            setDisplayedVOD(initialVOD.slice(5, 10));
            setCurrentVODPage(2);
        }
    };

    const handlePrevVOD = () => {
        if (currentVODPage === 2) {
            setDisplayedVOD(initialVOD.slice(0, 5));
            setCurrentVODPage(1);
        }
    };

    const [displayedDirectors, setDisplayedDirectors] = useState(initialDirectors.slice(0, 5));
    const [currentDirectorsPage, setCurrentDirectorsPage] = useState(1);

    const handleNextDirectors = () => {
        if (currentDirectorsPage === 1) {
            setDisplayedDirectors(initialDirectors.slice(5, 10));
            setCurrentDirectorsPage(2);
        }
    };

    const handlePrevDirectors = () => {
        if (currentDirectorsPage === 2) {
            setDisplayedDirectors(initialDirectors.slice(0, 5));
            setCurrentDirectorsPage(1);
        }
    };

    const [displayedActors, setDisplayedActors] = useState(initialActors.slice(0, 5));
    const [currentActorsPage, setCurrentActorsPage] = useState(1);

    const handleNextActors = () => {
        if (currentActorsPage === 1) {
            setDisplayedActors(initialActors.slice(5, 10));
            setCurrentActorsPage(2);
        }
    };

    const handlePrevActors = () => {
        if (currentActorsPage === 2) {
            setDisplayedActors(initialActors.slice(0, 5));
            setCurrentActorsPage(1);
        }
    };

    return (
        <div className="bread-list-page">
            <div className="bread-list-page-container">
                <div className="bread-list-section">
                    <h2>VOD</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {currentVODPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevVOD}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {displayedVOD.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {currentVODPage === 1 && (
                                <div className="content-arrow" onClick={handleNextVOD}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>감독</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {currentDirectorsPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevDirectors}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {displayedDirectors.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {currentDirectorsPage === 1 && (
                                <div className="content-arrow" onClick={handleNextDirectors}>
                                    ▶
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>출연진</h2>
                    <div className="content-container">
                        <div className="content-arrow-container left">
                            {currentActorsPage === 2 && (
                                <div className="content-arrow" onClick={handlePrevActors}>
                                    ◀
                                </div>
                            )}
                        </div>
                        {displayedActors.map((content, index) => (
                            <div key={index} className="content-box">
                                {content}
                            </div>
                        ))}
                        <div className="content-arrow-container right">
                            {currentActorsPage === 1 && (
                                <div className="content-arrow" onClick={handleNextActors}>
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

export default BreadListPage;
