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
        const data = Array(9).fill().map((_, index) => ({ id: index, title: `Result ${index + 1}` }));
        setResults(data);
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
    // 여기에 음성 검색 API를 호출하는 로직을 추가하세요
    console.log('음성 검색 시작'); // 이 부분을 실제 음성 검색 API로 대체하세요
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
            <div key={result.id} className="search-result-box">
              <div className="result-poster">포스터</div>
              <div className="result-title">{result.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
