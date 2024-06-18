import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/SchedulePage.css';
import axios from 'axios';

const SchedulePage = () => {
  // 개봉일자 캘린더
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [vods, setVods] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);

  // 생일에 나온 영화
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const navigate = useNavigate(); // useNavigate 훅 사용하여 navigate 정의

  useEffect(() => {
    fetchVodsForMonth(currentMonth);
  }, [currentMonth]);

  const handleDateChange = (date) => {
    setCurrentMonth(date);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  const fetchVodsForMonth = async (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();
    try {
      const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/contents/calender?start=${startOfMonth}&end=${endOfMonth}`);
      setVods(response.data);
    } catch (error) {
      console.error('There was an error fetching the VODs!', error);
    }
  };

  const handleCheckMovie = async () => {
    const date = new Date(`${year}-${month}-${day}`);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();
    
    try {
      const response = await axios.get(`https://hxsx04ukq3.execute-api.ap-northeast-2.amazonaws.com/bbanggoood-stage/contents/calender?start=${startOfDay}&end=${endOfDay}`);
      if (response.data.length > 0) {
        const movie = response.data[0];
        setMovieInfo({
          date: `${year}년 ${month}월 ${day}일`,
          movie: movie.vodName,
          director: `감독: ${movie.vodDirector}`,
          cast: `출연진: ${movie.vodCast}`,
          // synopsis: `줄거리: ${movie.vodSummary}`,
          poster: movie.vodPoster,
          vodId: movie.vodId, // vodId 추가
        });
      } else {
        alert('해당 날짜에 개봉한 영화가 없습니다.');
      }
    } catch (error) {
      console.error('There was an error fetching the movie info!', error);
      alert('영화 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      let className = '';
  
      const day = date.getDay();
      if (day === 0) {
        className += 'sunday ';
      } else if (day === 6) {
        className += 'saturday ';
      }
  
      // Check if there's a movie on this date
      const vod = vods.find(vod => {
        const vodDate = new Date(vod.vodOpenAt);
        return vodDate.toDateString() === date.toDateString();
      });
  
      if (vod) {
        className += 'movie-date';
      }
  
      return className.trim();
    }
    return null;
  };  

  const tileContent = ({ date, view }) => {
    if (view === 'month' && vods.length > 0) {
      const vod = vods.find(vod => {
        const vodDate = new Date(vod.vodOpenAt);
        return vodDate.toDateString() === date.toDateString();
      });

      if (vod) {
        return (
          <div className="date-tile">
            <div className="date-text">{vod.vodName}</div>
          </div>
        );
      }
    }
    return null;
  };

  const handlePosterClick = (vodId) => {
    navigate(`/vod-detail/${vodId}`);
  };

  return (
    <div className="schedule-page">
      <div className="schedule-page-container">
        <div className="schedule-page-calendar-section">
          <h2>개봉 예정 캘린더</h2>
          <div className="schedule-page-calendar">
            <Calendar
              value={currentMonth}
              onChange={handleDateChange}
              onActiveStartDateChange={handleActiveStartDateChange}
              className="react-calendar"
              showNeighboringMonth={false}
              tileClassName={tileClassName}
              tileContent={tileContent}
              locale="ko-KR" // 달력을 한글로 설정
            />
          </div>
        </div>
        {/* <div className="schedule-page-timetable">
          <h2>편성표</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
                <th>일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
                <td>콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div> */}
<div className="schedule-page-birthday-movie">
          <h2>내 생일에 개봉한 영화는?</h2>
          <div className="birthday-movie-inputs">
            <input type="text" placeholder="년" value={year} onChange={(e) => setYear(e.target.value)} />
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button onClick={handleCheckMovie}>확인</button>
          </div>
          <div className="birthday-movie-info-container">
            {movieInfo && (
              <div className="birthday-movie-info">
                <div>{movieInfo.date}에 개봉한 영화는 <br /><span className="highlighted">{movieInfo.movie}</span><br />입니다.</div>
                <div>{movieInfo.director}</div>
                <div>{movieInfo.cast}</div>
                <div>{movieInfo.synopsis}</div>
              </div>
            )}
            {movieInfo && movieInfo.poster && (
              <div className="movie-poster" onClick={() => handlePosterClick(movieInfo.vodId)}>
                <img src={movieInfo.poster} alt="포스터" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
