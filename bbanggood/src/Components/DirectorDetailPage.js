import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/DirectorDetailPage.css';
import { FaChevronDown } from "react-icons/fa";
// import { FaRegCircle } from "react-icons/fa"; // react-icon 원형 아이콘
import { FaGun } from "react-icons/fa6";

const DirectorDetailPage = () => {
    const navigate = useNavigate();
    const { name } = useParams(); // URL 파라미터에서 감독 이름 추출
    const [isAddedToBreadList, setIsAddedToBreadList] = useState(false);
    const [sortOption, setSortOption] = useState('최신순');
    const [showDropdown, setShowDropdown] = useState(false);
    const [vodData, setVodData] = useState([]); // VOD 데이터를 저장할 상태

    useEffect(() => {
        const savedState = localStorage.getItem('directorAddedToBreadList');
        if (savedState) {
            setIsAddedToBreadList(JSON.parse(savedState));
        }

        // 감독 이름을 사용하여 VOD 정보를 요청
        fetch(`http://localhost:8080/contents/detail/director/${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched director VOD details:', data); // 데이터 확인을 위한 콘솔 로그
                setVodData(data);
            })
            .catch(error => console.error('Error fetching director VOD details:', error));
    }, [name]);

    const handleAddToBreadList = () => {
        if (!isAddedToBreadList) {
            if (window.confirm(`[감독] ${name} 빵 목록에 추가되었습니다. 빵 목록으로 이동하시겠습니까?`)) {
                setIsAddedToBreadList(true);
                localStorage.setItem('directorAddedToBreadList', 'true');
                navigate('/bread-list');
            }
        } else {
            if (window.confirm(`[감독] ${name} 빵 목록에서 제거되었습니다.`)) {
                setIsAddedToBreadList(false);
                localStorage.setItem('directorAddedToBreadList', 'false');
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
        <div className="director-detail-page">
            <div className="director-detail-container">
                <div className="director-header">
                    <h2 className="director-name">{name}</h2>
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
                <div className="sort-option" onClick={() => setShowDropdown(!showDropdown)}>
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

export default DirectorDetailPage;
