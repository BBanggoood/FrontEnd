import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/BreadListPage.css';
import axios from 'axios';

const BreadListPage = () => {
    const [vodList, setVodList] = useState([]);
    const [directorsList, setDirectorsList] = useState([]);
    const [actorsList, setActorsList] = useState([]);

    const [currentVODIndex, setCurrentVODIndex] = useState(0);
    const [currentDirectorsIndex, setCurrentDirectorsIndex] = useState(0);
    const [currentActorsIndex, setCurrentActorsIndex] = useState(0);

    useEffect(() => {
        const setbxId = localStorage.getItem('setbxId');
        
        if (!setbxId) {
            console.error('setbxId not found in local storage');
            return;
        }

        const fetchVOD = async () => {
            try {
                const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/vod/${setbxId}`);
                setVodList(response.data);
            } catch (error) {
                console.error('Error fetching VOD data:', error);
            }
        };

        const fetchDirectors = async () => {
            try {
                const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/director/${setbxId}`);
                setDirectorsList(response.data);
            } catch (error) {
                console.error('Error fetching directors data:', error);
            }
        };

        const fetchActors = async () => {
            try {
                const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/cast/${setbxId}`);
                setActorsList(response.data);
            } catch (error) {
                console.error('Error fetching actors data:', error);
            }
        };

        fetchVOD();
        fetchDirectors();
        fetchActors();
    }, []);

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
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentVODIndex, currentVODIndex, vodList)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {vodList.map((vod, index) => (
                                <Link to={`/detail/vod/${vod.vodId}`} key={index} className={getBoxClassName(index, currentVODIndex, vodList)}>
                                    <img src={vod.vodPoster} alt={vod.title} onError={(e) => console.error(`Error loading image: ${vod.vodPoster}`, e)} />
                                </Link>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentVODIndex, currentVODIndex, vodList)}>
                            ▶
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>감독</h2>
                    <div className="bread-content-container">
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentDirectorsIndex, currentDirectorsIndex, directorsList)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {directorsList.map((director, index) => (
                                <Link to={`/detail/director/${director.vodDirector}`} key={index} className={getBoxClassName(index, currentDirectorsIndex, directorsList)}>
                                    <img src={director.vodDirectorPoster} alt={director.vodDirector} onError={(e) => console.error(`Error loading image: ${director.vodDirectorPoster}`, e)} />
                                </Link>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentDirectorsIndex, currentDirectorsIndex, directorsList)}>
                            ▶
                        </div>
                    </div>
                </div>
                <div className="bread-list-section">
                    <h2>출연진</h2>
                    <div className="bread-content-container">
                        <div className="content-arrow-container left" onClick={() => handlePrev(setCurrentActorsIndex, currentActorsIndex, actorsList)}>
                            ◀
                        </div>
                        <div className="bread-content-box-container">
                            {actorsList.map((actor, index) => (
                                <Link to={`/detail/cast/${actor.vodCast}`} key={index} className={getBoxClassName(index, currentActorsIndex, actorsList)}>
                                    <img src={actor.vodCastPoster} alt={actor.vodCast} onError={(e) => console.error(`Error loading image: ${actor.vodCastPoster}`, e)} />
                                </Link>
                            ))}
                        </div>
                        <div className="content-arrow-container right" onClick={() => handleNext(setCurrentActorsIndex, currentActorsIndex, actorsList)}>
                            ▶
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadListPage;
