import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/VodDetailPage.css';
import vodImage from '../images/선재.png';
import { FaPlayCircle } from "react-icons/fa";
import { FaGun } from "react-icons/fa6";

const VodDetailPage = () => {
    const navigate = useNavigate();
    const [isAddedToBreadList, setIsAddedToBreadList] = useState(false);

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 찜 상태 불러오기
        const storedIsAdded = localStorage.getItem('isAddedToBreadList');
        if (storedIsAdded === 'true') {
            setIsAddedToBreadList(true);
        }
    }, []);

    const handlePlayClick = () => {
        alert('VOD 영상을 재생합니다.');
        // 여기에 VOD 영상을 재생하는 로직을 추가하세요.
    };

    const handleAddToBreadList = () => {
        if (!isAddedToBreadList) {
            if (window.confirm('[VOD] 빵 목록에 추가되었습니다. 빵 목록으로 이동하시겠습니까?')) {
                setIsAddedToBreadList(true);
                localStorage.setItem('isAddedToBreadList', 'true'); // 로컬 스토리지에 찜 상태 저장
                navigate('/bread-list');
            }
        } else {
            if (window.confirm('[VOD] 빵 목록에서 제거되었습니다.')) {
                setIsAddedToBreadList(false);
                localStorage.setItem('isAddedToBreadList', 'false'); // 로컬 스토리지에 찜 상태 저장
            }
        }
    };

    const handleDirectorClick = () => {
        navigate('/director-detail');
    };

    const handleCastClick = (name) => {
        navigate(`/actor-detail`);
    };

    return (
        <div className="vod-detail-page">
            <div className="vod-detail-container">
                <div className="vod-info-container">
                    <div className="vod-image-container">
                        <img src={vodImage} alt="VOD 이미지" className="vod-image" />
                    </div>
                    <div className="vod-text-container">
                        <h2 className="vod-title">
                            VOD 제목
                            <div>
                                <FaPlayCircle 
                                    style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '0.75em' }} 
                                    onClick={handlePlayClick}
                                />
                                <FaGun  
                                    style={{ 
                                        marginLeft: '15px', 
                                        cursor: 'pointer', 
                                        fontSize: '0.8em', 
                                        color: isAddedToBreadList ? '#FF7D37' : 'white' 
                                    }} 
                                    onClick={handleAddToBreadList}
                                />
                            </div>
                        </h2>
                        <div className="vod-director">
                            [감독]
                            <span className="clickable" onClick={() => handleDirectorClick('이주원')}> 이주원</span>
                        </div>
                        <div className="vod-cast">
                            [출연진] 
                            <span className="clickable" onClick={() => handleCastClick('이주원')}> 이주원</span>, 
                            <span className="clickable" onClick={() => handleCastClick('일주원')}> 일주원</span>, 
                            <span className="clickable" onClick={() => handleCastClick('삼주원')}> 삼주원</span>
                        </div>
                        <div className="vod-summary">[줄거리] Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VodDetailPage;
