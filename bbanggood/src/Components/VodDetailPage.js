import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

        // VOD별로 로컬 스토리지에서 찜 상태 불러오기
        const storedIsAdded = localStorage.getItem(`isAddedToBreadList_${vodId}`);
        console.log('Stored isAddedToBreadList:', storedIsAdded); // 로컬 스토리지 값 확인
        setIsAddedToBreadList(storedIsAdded === 'true');
        console.log('State isAddedToBreadList:', storedIsAdded === 'true'); // 상태 업데이트 확인

        // vodId를 사용하여 VOD 상세 정보를 요청
        if (vodId) {
            fetch(`http://localhost:7200/contents/detail/vod/${vodId}`)
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

    const handleAddToBreadList = async () => {
        const setbxId = localStorage.getItem('setbxId'); // localStorage에서 setbxId를 가져옴
        if (!setbxId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        if (!isAddedToBreadList) {
            try {
                console.log("시도");
                const response = await axios.post('https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/vod', {
                    setbxId: parseInt(setbxId, 10),
                    vodId: vodId,
                    vodPoster: vodData.vodPoster
                });
                console.log('VOD added to BreadList:', response.data);
                setIsAddedToBreadList(true);
                localStorage.setItem(`isAddedToBreadList_${vodId}`, 'true'); // 로컬 스토리지에 찜 상태 저장
                console.log("로그 저장 시도");

                const confirmation = window.confirm('[VOD] 빵 목록에 추가되었습니다. 빵 목록으로 이동하시겠습니까?');
                if (confirmation) {    
                    navigate('/bread-list');
                }
            } catch (error) {
                console.error('Error adding VOD to BreadList:', error.response ? error.response.data : error.message);
                alert('빵 목록에 추가하는 중 오류가 발생했습니다.');
            }
        } else {
            try {
                const response = await axios.delete('https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/bbang/vod', {
                    data: {
                        setbxId: parseInt(setbxId, 10),
                        vodId: vodId
                    }
                });
                console.log('VOD removed from BreadList:', response.data);
                setIsAddedToBreadList(false);
                localStorage.setItem(`isAddedToBreadList_${vodId}`, 'false'); // 로컬 스토리지에 찜 상태 저장

                window.confirm('[VOD] 빵 목록에서 제거되었습니다.');
            } catch (error) {
                console.error('Error removing VOD from BreadList:', error.response ? error.response.data : error.message);
                alert('빵 목록에서 제거하는 중 오류가 발생했습니다.');
            }
        }
    };

    const handleDirectorClick = (directorName) => {
        navigate(`/director-detail/${encodeURIComponent(directorName)}`);
    };

    const handleCastClick = (actorName) => {
        navigate(`/actor-detail/${encodeURIComponent(actorName)}`);
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
                            {vodData.vodDirector.split(',').reduce((acc, director, index) => {
                                if (index === 0) {
                                    return [
                                        <span key={index} className="clickable" onClick={() => handleDirectorClick(director.trim())}>
                                            {director.trim()}
                                        </span>
                                    ];
                                }
                                return acc.concat(
                                    ' ',
                                    <span key={index} className="clickable" onClick={() => handleDirectorClick(director.trim())}>
                                        {director.trim()}
                                    </span>
                                );
                            }, [])}
                        </div>
                        <div className="vod-cast">
                            [출연진] 
                            {vodData.vodCast.split(',').reduce((acc, cast, index) => {
                                if (index === 0) {
                                    return [
                                        <span key={index} className="clickable" onClick={() => handleCastClick(cast.trim())}>
                                            {cast.trim()}
                                        </span>
                                    ];
                                }
                                return acc.concat(
                                    ' ',
                                    <span key={index} className="clickable" onClick={() => handleCastClick(cast.trim())}>
                                        {cast.trim()}
                                    </span>
                                );
                            }, [])}
                        </div>
                        <div className="vod-summary">[줄거리] {vodData.vodSummary}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VodDetailPage;
