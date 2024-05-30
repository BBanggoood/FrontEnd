import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ContentsSelectionPage.css'; // 선호 컨텐츠 선택 페이지용 CSS 파일 import

const contents = Array.from({ length: 20 }, (_, i) => `콘텐츠 ${i + 1}`);

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
        if (selectedContents.length >= 5) {
            navigate('/initial2');
        }
    };

    return (
        <div className="contents-selection-page">
            <div className="contents-outer-rectangle">
                <div className="contents-sidebar">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <div className="contents-inner-rectangle">
                    <h1 style={{ fontSize: '1.7em' }}>좋아하는 컨텐츠를 선택해주세요 (5개 이상)</h1>
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
                        className="contents-next-button"
                        onClick={handleNextClick}
                        disabled={selectedContents.length < 5}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentsSelectionPage;
