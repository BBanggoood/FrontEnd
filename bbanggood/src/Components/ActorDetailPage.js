import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ActorDetailPage.css';
import { FaChevronDown } from "react-icons/fa";
import { FaGun } from "react-icons/fa6";

const ActorDetailPage = () => {
    const navigate = useNavigate();
    const { name } = useParams(); // URL 파라미터에서 출연진 이름 추출
    const [isAddedToBreadList, setIsAddedToBreadList] = useState(false);
    const [sortOption, setSortOption] = useState('최신순');
    const [showDropdown, setShowDropdown] = useState(false);
    const [vodData, setVodData] = useState([]); // VOD 데이터를 저장할 상태

    useEffect(() => {
        const savedBreadListStatus = localStorage.getItem('actorIsAddedToBreadList');
        if (savedBreadListStatus === 'true') {
            setIsAddedToBreadList(true);
        }

        // 출연진 이름을 사용하여 VOD 정보를 요청
        fetch(`http://localhost:8080/contents/detail/cast/${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched actor VOD details:', data); // 데이터 확인을 위한 콘솔 로그
                setVodData(data);
            })
            .catch(error => console.error('Error fetching actor VOD details:', error));
    }, [name]);

    const handleAddToBreadList = async () => {
        const setbxId = localStorage.getItem('setbxId'); // localStorage에서 setbxId를 가져옴
        if (!setbxId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        if (!isAddedToBreadList) {
            try {
                const confirmation = window.confirm(`[출연진] ${name} 빵 목록에 추가되었습니다. 빵 목록으로 이동하시겠습니까?`);
                if (confirmation) {
                    const response = await axios.post('http://localhost:8080/bbang/cast', {
                        setbxId: parseInt(setbxId, 10),
                        vodCast: name,
                        vodCastPoster: vodData.length > 0 ? vodData[0].vodPoster : ''
                    });
                    console.log('Cast added to BreadList:', response.data);
                    setIsAddedToBreadList(true);
                    localStorage.setItem('actorIsAddedToBreadList', 'true'); // 로컬 스토리지에 찜 상태 저장
                    navigate('/bread-list');
                }
            } catch (error) {
                console.error('Error adding cast to BreadList:', error);
                alert('빵 목록에 추가하는 중 오류가 발생했습니다.');
            }
        } else {
            try {
                const confirmation = window.confirm(`[출연진] ${name} 빵 목록에서 제거되었습니다.`);
                if (confirmation) {
                    const response = await axios.delete('http://localhost:8080/bbang/cast', {
                        data: {
                            setbxId: parseInt(setbxId, 10),
                            vodCast: name
                        }
                    });
                    console.log('Cast removed from BreadList:', response.data);
                    setIsAddedToBreadList(false);
                    localStorage.setItem('actorIsAddedToBreadList', 'false'); // 로컬 스토리지에 찜 상태 저장
                }
            } catch (error) {
                console.error('Error removing cast from BreadList:', error);
                alert('빵 목록에서 제거하는 중 오류가 발생했습니다.');
            }
        }
    };

    const handleSortOptionChange = (option) => {
        setSortOption(option);
        setShowDropdown(false);
    };

    const handlePosterClick = (vodId) => {
        navigate(`/vod-detail/${vodId}`);
    };

    return (
        <div className="actor-detail-page">
            <div className="actor-detail-container">
                <div className="actor-header">
                    <h2 className="actor-name">{name}</h2>
                    <FaGun
                        style={{
                            marginLeft: '10px',
                            cursor: 'pointer',
                            fontSize: '36px',
                            color: isAddedToBreadList ? '#FF7D37' : '#541704'
                        }}
                        onClick={handleAddToBreadList}
                    />
                </div>
                <div className="actor-sort-option" onClick={() => setShowDropdown(!showDropdown)}>
                    <span>{sortOption}</span>
                    <FaChevronDown className="chevron-icon" />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => handleSortOptionChange('최신순')}>최신순</div>
                            <div className="dropdown-item" onClick={() => handleSortOptionChange('인기순')}>인기순</div>
                        </div>
                    )}
                </div>
                <div className="vod-list">
                    {vodData.map((vod, index) => (
                        <div className="vod-item" key={index} onClick={() => handlePosterClick(vod.vodId)}>
                            <img src={vod.vodPoster} alt={vod.vodName} className="vod-poster" />
                            <div className="vod-name">{vod.vodName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActorDetailPage;
