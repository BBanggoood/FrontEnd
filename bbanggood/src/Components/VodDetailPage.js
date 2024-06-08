import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/VodDetailPage.css';
import { FaPlayCircle } from "react-icons/fa";
import { FaGun } from "react-icons/fa6";

const VodDetailPage = () => {
    const navigate = useNavigate();
    const { vodId } = useParams(); // URL 파라미터에서 vodId 추출
    const [isAddedToBreadList, setIsAddedToBreadList] = useState(false);
    const [vodData, setVodData] = useState(null); // 초기값을 null로 설정

    useEffect(() => {
        console.log('vodId from URL:', vodId); // vodId가 제대로 설정되는지 확인

        // 페이지 로드 시 로컬 스토리지에서 찜 상태 불러오기
        const storedIsAdded = localStorage.getItem('isAddedToBreadList');
        if (storedIsAdded === 'true') {
            setIsAddedToBreadList(true);
        }

        // vodId를 사용하여 VOD 상세 정보를 요청
        if (vodId) {
            fetch(`http://localhost:8080/contents/detail/vod/${vodId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Fetched VOD details:', data); // 데이터 확인을 위한 콘솔 로그
                    setVodData(data);
                })
                .catch(error => console.error('Error fetching VOD details:', error));
        }
    }, [vodId]);

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

    if (!vodData) {
        return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 표시
    }

    return (
        <div className="vod-detail-page">
            <div className="vod-detail-container">
                <div className="vod-info-container">
                    <div className="vod-image-container">
                        <img src={vodData.vodPoster} alt="VOD 이미지" className="vod-image" />
                    </div>
                    <div className="vod-text-container">
                        <h2 className="vod-title">
                            {vodData.vodName}
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
                            <span className="clickable" onClick={handleDirectorClick}>{vodData.vodDirector}</span>
                        </div>
                        <div className="vod-cast">
                            [출연진] 
                            {vodData.vodCast.split(',').map((cast, index) => (
                                <span key={index} className="clickable" onClick={() => handleCastClick(cast.trim())}> {cast.trim()}</span>
                            ))}
                        </div>
                        <div className="vod-summary">[줄거리] {vodData.vodSummary}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VodDetailPage;