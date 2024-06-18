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
        const setbxId = localStorage.getItem('setbxId');
        if (!setbxId) {
            console.error('setbxId not found in local storage');
            return;
        }

        // 출연진별로 로컬 스토리지에서 찜 상태 불러오기
        const storedIsAdded = localStorage.getItem(`isAddedToBreadList_cast_${name}`);
        setIsAddedToBreadList(storedIsAdded === 'true');

        // 출연진 이름을 사용하여 VOD 정보를 요청
        fetch(`http://localhost:7200/contents/detail/cast/${encodeURIComponent(name)}`)
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
                const response = await axios.post('http://localhost:7100/bbang/cast', {
                    setbxId: parseInt(setbxId, 10),
                    vodCast: name,
                    vodCastPoster: vodData.length > 0 ? vodData[0].vodPoster : ''
                });
                console.log('Cast added to BreadList:', response.data);
                setIsAddedToBreadList(true);
                localStorage.setItem(`isAddedToBreadList_cast_${name}`, 'true'); // 로컬 스토리지에 찜 상태 저장

                const confirmation = window.confirm('[출연진] 빵 목록에 추가되었습니다. 빵 목록으로 이동하시겠습니까?');
                if (confirmation) {    
                    navigate('/bread-list');
                }
            } catch (error) {
                console.error('Error adding cast to BreadList:', error.response ? error.response.data : error.message);
                alert('빵 목록에 추가하는 중 오류가 발생했습니다.');
            }
        } else {
            try {
                const response = await axios.delete('http://localhost:7100/bbang/cast', {
                    data: {
                        setbxId: parseInt(setbxId, 10),
                        vodCast: name
                    }
                });
                console.log('Cast removed from BreadList:', response.data);
                setIsAddedToBreadList(false);
                localStorage.setItem(`isAddedToBreadList_cast_${name}`, 'false'); // 로컬 스토리지에 찜 상태 저장

                window.confirm('[출연진] 빵 목록에서 제거되었습니다.');
            } catch (error) {
                console.error('Error removing cast from BreadList:', error.response ? error.response.data : error.message);
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
