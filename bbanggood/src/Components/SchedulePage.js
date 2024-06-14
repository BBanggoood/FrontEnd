import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/SchedulePage.css';
import axios from 'axios';

const SchedulePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [vods, setVods] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);

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
      const response = await axios.get(`http://localhost:80/contents/calender?start=${startOfMonth}&end=${endOfMonth}`);
      setVods(response.data);
    } catch (error) {
      console.error('There was an error fetching the VODs!', error);
    }
  };

  const handleCheckMovie = () => {
    setMovieInfo({
      date: '0000년 00월 00일',
      movie: 'OOOO 영화',
      director: '감독: OOO',
      cast: '출연진: OOO, OOO, OOO',
      synopsis: '줄거리: 어쩌구저쩌구',
      poster: 'https://via.placeholder.com/300x400' // 포스터 URL 예시
    });
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
        <div className="schedule-page-timetable">
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
        </div>
        <div className="schedule-page-birthday-movie">
          <h2>내 생일에 개봉한 영화는?</h2>
          <div className="birthday-movie-inputs">
            <input type="text" placeholder="년" />
            <select>
              <option>월</option>
            </select>
            <select>
              <option>일</option>
            </select>
            <button onClick={handleCheckMovie}>확인</button>
          </div>
          <div className="birthday-movie-info-container">
            {movieInfo && (
              <div className="birthday-movie-info">
                <div>{movieInfo.date}에 개봉한 영화는 {movieInfo.movie}입니다.</div>
                <div>감독: {movieInfo.director}</div>
                <div>출연진: {movieInfo.cast}</div>
                <div>줄거리: {movieInfo.synopsis}</div>
              </div>
            )}
            {movieInfo && movieInfo.poster && (
              <div className="movie-poster">
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
