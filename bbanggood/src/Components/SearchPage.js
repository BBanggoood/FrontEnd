import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdSettingsVoice } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import CustomKeyboard from './CustomKeyboard';
import '../CSS/SearchPage.css';
import logo from '../images/BBanggood_logo_white_line.png'; // 로고 이미지 import

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [tempTerm, setTempTerm] = useState(searchTerm);
  const [showKeyboard, setShowKeyboard] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/contents/search/${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

      fetchData();
    }
  }, [query]);

  const handleSearchIconClick = useCallback(() => {
    setSearchTerm(tempTerm);
    navigate(`?q=${tempTerm}`);
  }, [tempTerm, navigate]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearchIconClick();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSearchIconClick]);

  const handleSearchChange = (e) => {
    setTempTerm(e.target.value);
  };

  const handleSearchFocus = () => {
    setShowKeyboard(true);
  };

  const handleLogoClick = () => {
    navigate('/mainpage');
  };

  const handleVoiceSearchClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('음성 검색을 지원하지 않는 브라우저입니다.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko-KR'; // 언어 설정
    recognition.interimResults = false; // 중간 결과를 반환하지 않음
    recognition.maxAlternatives = 1; // 최대 대안 개수

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTempTerm(speechResult);
      setSearchTerm(speechResult);
      navigate(`?q=${speechResult}`);
    };

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error);
    };

    recognition.onend = () => {
      console.log('음성 인식 종료');
    };

    recognition.start();
    console.log('음성 검색 시작');
  };

  const handlePosterClick = (vodId) => {
    navigate(`/vod-detail/${vodId}`);
  };

  return (
    <div className="search-page">
      <div className="search-area">
        <img src={logo} alt="BBanggood Logo" className="logo" onClick={handleLogoClick} /> {/* 로고 추가 */}
        <div className="search-input-container">
          <MdSettingsVoice
            size={36}
            className="voice-search-icon"
            onClick={handleVoiceSearchClick}
          />
          <input
            type="text"
            className="search-input"
            value={tempTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearchIconClick(); }}
            placeholder="검색어를 입력하세요"
          />
          <IoSearchSharp
            size={36}
            className="search-icon"
            onClick={handleSearchIconClick}
          />
        </div>
        {showKeyboard && <CustomKeyboard text={tempTerm} setText={setTempTerm} onEnterPress={handleSearchIconClick} />}
      </div>
      <div className="display-area">
        <h1 className="search-page-title">검색 결과</h1>
        <p className="search-query">"{searchTerm}"에 대한 검색 결과</p>
        <div className="search-results">
          {results.map((result) => (
            <div key={result.vodId} className="search-result-box" onClick={() => handlePosterClick(result.vodId)}>
              <img src={result.vodPoster} alt={result.vodName} className="result-poster" />
              <div className="result-title">{result.vodName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;