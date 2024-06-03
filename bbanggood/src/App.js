import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialScreen from './Components/InitialScreen';
import InitialScreen2 from './Components/InitialScreen2';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import GenreSelectionPage from './Components/GenreSelectionPage';
import ContentsSelectionPage from './Components/ContentsSelectionPage';
import MainPage from './Components/MainPage';
import BreadListPage from './Components/BreadListPage'; // 빵 목록 페이지 import
import Layout from './Components/Layout';
import MyPage from './Components/MyPage'; // 마이페이지 import
import Settings from './Components/Settings';
import Help from './Components/Help';
import Kids from './Components/Kids';
import Drama from './Components/Drama'; // 드라마 페이지 import
import Movie from './Components/Movie'; // 영화 페이지 import
import TVShow from './Components/TVShow'; // TV/예능 페이지 import
import Anime from './Components/Anime'; // 애니 페이지 import
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
                    <Route path="/bread-list" element={<BreadListPage />} /> {/* 빵 목록 페이지 경로 추가 */}
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/drama" element={<Drama />} /> {/* 드라마 페이지 경로 추가 */}
                    <Route path="/movie" element={<Movie />} /> {/* 영화 페이지 경로 추가 */}
                    <Route path="/tv" element={<TVShow />} /> {/* TV/예능 페이지 경로 추가 */}
                    <Route path="/anime" element={<Anime />} /> {/* 애니 페이지 경로 추가 */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
