import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialScreen from './Components/InitialScreen';
import InitialScreen2 from './Components/InitialScreen2';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import GenreSelectionPage from './Components/GenreSelectionPage';
import ContentsSelectionPage from './Components/ContentsSelectionPage';
import MainPage from './Components/MainPage';
import BreadListPage from './Components/BreadListPage';
import Layout from './Components/Layout';
import MyPage from './Components/MyPage';
import Settings from './Components/Settings';
import Help from './Components/Help';
import Kids from './Components/Kids';
import Drama from './Components/Drama';
import Movie from './Components/Movie';
import TVShow from './Components/TVShow';
import Anime from './Components/Anime';
import AdultPage from './Components/AdultPage';
import AdultVerificationPage from './Components/AdultVerificationPage';
import AdultVerificationPinPage from './Components/AdultVerificationPinPage'; // 성인 인증 PIN 페이지 import
import SchedulePage from './Components/SchedulePage'; // 일정 페이지 import
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/initial2" element={<InitialScreen2 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/genre-selection" element={<GenreSelectionPage />} />
                <Route path="/contents-selection" element={<ContentsSelectionPage />} />
                <Route element={<Layout />}>
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/bread-list" element={<BreadListPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/drama" element={<Drama />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/tv" element={<TVShow />} />
                    <Route path="/anime" element={<Anime />} />
                    <Route path="/adult" element={<AdultPage />} />
                    <Route path="/adult-verification" element={<AdultVerificationPage />} />
                    <Route path="/schedule" element={<SchedulePage />} /> {/* 일정 페이지 경로 추가 */}
                    <Route path="/adult-verification-pin" element={<AdultVerificationPinPage />} /> {/* 성인 인증 PIN 페이지 경로 추가 */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
