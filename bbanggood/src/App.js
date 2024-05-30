import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialScreen from './Components/InitialScreen';
import InitialScreen2 from './Components/InitialScreen2';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import GenreSelectionPage from './Components/GenreSelectionPage';
import ContentsSelectionPage from './Components/ContentsSelectionPage';
import MainPage from './Components/MainPage';
import Layout from './Components/Layout';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Layout이 적용되지 않는 페이지들 */}
                <Route path="/" element={<InitialScreen />} />
                <Route path="/initial2" element={<InitialScreen2 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/genre-selection" element={<GenreSelectionPage />} />
                <Route path="/contents-selection" element={<ContentsSelectionPage />} />

                {/* Layout이 적용되는 페이지들 */}
                <Route element={<Layout />}>
                    <Route path="/mainpage" element={<MainPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
