import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/SearchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    return (
        <div className="search-page">
            <div className="search-page-container">
                <h1 className="search-page-title">검색 결과</h1>
                <p className="search-query">"{query}"에 대한 검색 결과</p>
                <div className="search-results">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="search-result-box">
                            검색 결과 {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
