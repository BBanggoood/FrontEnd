import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ContentsSelectionPage.css'; // 선호 컨텐츠 선택 페이지용 CSS 파일 import

const contents = [
    '컨텐츠 1', '컨텐츠 2', '컨텐츠 3', '컨텐츠 4',
    '컨텐츠 5', '컨텐츠 6', '컨텐츠 7', '컨텐츠 8'
];

const ContentsSelectionPage = () => {
    const [selectedContents, setSelectedContents] = useState([]);
    const navigate = useNavigate();

    const handleContentClick = (content) => {
        if (selectedContents.includes(content)) {
            setSelectedContents(selectedContents.filter(item => item !== content));
        } else {
            setSelectedContents([...selectedContents, content]);
        }
    };

    const handleNextClick = () => {
        if (selectedContents.length >= 3) {
            navigate('/initial2');
        }
    };

    return (
        <div className="contents-selection-page">
            <div className="contents-container">
                <div className="sidebar">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <div className="contents-content">
                    <h2>좋아하는 컨텐츠를 선택해주세요 (3개 이상)</h2>
                    <div className="contents-grid">
                        {contents.map((content, index) => (
                            <div
                                key={index}
                                className={`contents-box ${selectedContents.includes(content) ? 'selected' : ''}`}
                                onClick={() => handleContentClick(content)}
                            >
                                {content}
                            </div>
                        ))}
                    </div>
                    <button
                        className="next-button"
                        onClick={handleNextClick}
                        disabled={selectedContents.length < 3}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentsSelectionPage;
