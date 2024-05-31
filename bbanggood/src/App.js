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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
