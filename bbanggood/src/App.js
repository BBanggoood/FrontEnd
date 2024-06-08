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
import SchedulePage from './Components/SchedulePage';
import PersonalInfoEdit from './Components/PersonalInfoEdit';
import VodDetailPage from './Components/VodDetailPage';
import DirectorDetailPage from './Components/DirectorDetailPage';
import ActorDetailPage from './Components/ActorDetailPage';
import AdultVerificationPinPage from './Components/AdultVerificationPinPage';
import AdultAccess from './Components/AdultAccess';
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
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/adult-verification-pin" element={<AdultVerificationPinPage />} />
                    <Route path="/personal-info-edit" element={<PersonalInfoEdit />} />
                    <Route path="/vod-detail/:vodId" element={<VodDetailPage />} /> {/* VOD 상세 페이지 경로 수정 */}
                    <Route path="/director-detail" element={<DirectorDetailPage />} />
                    <Route path="/actor-detail" element={<ActorDetailPage />} />
                    <Route path="/adult-access" element={<AdultAccess />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;