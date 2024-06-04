import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/SchedulePage.css';

const SchedulePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [movieInfo, setMovieInfo] = useState(null);

  const handleDateChange = (date) => {
    console.log(date);
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
      const day = date.getDay();
      if (day === 0) {
        return 'sunday';
      } else if (day === 6) {
        return 'saturday';
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      return (
        <div className="date-tile">
          <div className="date-text">영화/프로그램 정보</div>
        </div>
      );
    }
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
