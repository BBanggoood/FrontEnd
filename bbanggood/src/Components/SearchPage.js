import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdSettingsVoice } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa'; // 마이크 아이콘 import
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
  const [isListening, setIsListening] = useState(false); // 음성 검색 상태 추가
  const [micSize, setMicSize] = useState(100); // 마이크 아이콘 크기 상태 추가

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const javascriptNodeRef = useRef(null);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:7200/contents/search/${encodeURIComponent(query)}`);
          setResults(response.data);
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

    recognition.onstart = () => {
      setIsListening(true); // 음성 검색 시작 시 상태 업데이트
      startVolumeDetection(); // 음성 크기 감지 시작
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTempTerm(speechResult);
      setSearchTerm(speechResult);
      navigate(`?q=${speechResult}`);
      setIsListening(false); // 음성 검색 종료 시 상태 업데이트
      stopVolumeDetection(); // 음성 크기 감지 종료
    };

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error);
      setIsListening(false); // 오류 시 상태 업데이트
      stopVolumeDetection(); // 음성 크기 감지 종료
    };

    recognition.onend = () => {
      console.log('음성 인식 종료');
      setIsListening(false); // 음성 인식 종료 시 상태 업데이트
      stopVolumeDetection(); // 음성 크기 감지 종료
    };

    recognition.start();
    console.log('음성 검색 시작');
  };

  const handlePosterClick = (vodId) => {
    navigate(`/vod-detail/${vodId}`);
  };

  const startVolumeDetection = async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const microphone = audioContext.createMediaStreamSource(stream);
    microphoneRef.current = microphone;
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    javascriptNodeRef.current = javascriptNode;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = () => {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setMicSize(Math.min(Math.max(volume * 10, 250), 350)); // 최소 100, 최대 2000 크기로 설정
    };
  };

  const stopVolumeDetection = () => {
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (javascriptNodeRef.current) {
      javascriptNodeRef.current.disconnect();
      javascriptNodeRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
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
      {isListening && (
        <div className="listening-indicator" style={{ width: `${micSize}px`, height: `${micSize}px` }}>
          <FaMicrophone size={micSize * 0.6} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
