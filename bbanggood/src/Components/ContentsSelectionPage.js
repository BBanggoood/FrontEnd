import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ContentsSelectionPage.css'; // 선호 컨텐츠 선택 페이지용 CSS 파일 import

const contentUrls = {
    '액션': [
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/kPtNokhBtgwSp3MHaR3X4O0SPbF.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/wXNihLltMCGR7XepN39syIlCt5X.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/WqgLrAbPnEfgn7WP7J2IvL1Z9V.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/h3LsdSBzhRnBebz4BTpAhh63PD3.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/x0PHh4LH5pvp2PeG3qInrfWlG9q.jpg"
    ],
    '스릴러': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/iqTyxjbtWImvdXysxqvLzTF2sHB.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/dIcLgXA6R54EZ0XPSMKW4XDNCAA.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/l4uFpWyUVzmXLEbKdijpmbu4jqW.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/uGYnClpynAYQAzy3rQBPWpEkHf1.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/pWpTToZ32bG09PaZ1rvYG5mpOyV.jpg"
    ],
    '코미디': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/7BeMHBgS6nUaxj6w0hGhsiK827c.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/jbHNkNydiZstlqhhBSvG19lm4NL.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/ArntYxWZXArwegRh9IaOq2KD1JR.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/44CeavkZLqW9Z7SkOffxLNJtAv9.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/lQ4cwauq2jeTkka9RvdMBTVPLMH.jpg"
    ],
    '로맨스': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/f9CQblm419ysGBS697WUfGN0FoI.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/132KjhVrWUqKFVfMAKKNkherytA.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/2DJCufz3Oa703PbLjNX1pM6MCG2.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/rXEJ28XDQsogIGqwVEgwM2oDdpl.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/am6EX9djPcPeQMMBwn2mUfckeDF.jpg"
    ],
    '음악': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/xrlVhwi6OKMyQuDebpgaqU2LGju.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/ad9ndytwOckyShSc0A6tx1rZRkW.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/xVXC1mDkjJ1pK9tTFgO2DGPavJj.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/t0TmIy5LfKvU6qDoBXPTvvQm4oM.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/9fnWov6Mb7LJKA2dJLV9h1mcSnF.jpg"
    ],
    '미스터리': [
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tw0i3kkmOTjDjGFZTLHKhoeXVvA.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/xioEsadWyXEN6RDcAFCaIe71bIw.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/cah6iIYQBctvCmBjsKGb1NCiygr.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/3zYZ5hZUNHwgObdqbDYlS8l24FE.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg"
    ],
    'SF': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/zDNAeWU0PxKolEX1D8Vn1qWhGjH.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/z7ilT5rNN9kDo8JZmgyhM6ej2xv.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/ik3cempRee837ETSXUYCGpDyzN7.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/z56bVX93oRG6uDeMACR7cXCnAbh.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uH8q40cjMAjrRHyPJMbQwAIJATb.jpg"
    ],
    '모험': [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/a9B0PGRIhmOGRmpKdNR46id30Pt.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/kmoScy628A6JWv8mmd2ofrYv16T.jpg",
        "https://media.themoviedb.org/t/p/w220_and_h330_face/fZcab1yiKXsjx3S8D4KRHZsnMGC.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/upGiyJeCbG61899TXiY01mxdjEF.jpg",
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/3ovejwQO4fKOWx4VgGBJeT8CKCn.jpg"
    ]
};

const ContentsSelectionPage = () => {
    const [selectedContents, setSelectedContents] = useState([]);
    const [availableContents, setAvailableContents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedGenres = JSON.parse(localStorage.getItem('selectedGenres'));
        if (!selectedGenres) {
            navigate('/'); // 장르가 선택되지 않았으면 초기 페이지로 이동
            return;
        }

        const allContents = selectedGenres.flatMap(genre => contentUrls[genre]);
        const shuffledContents = allContents.sort(() => 0.5 - Math.random()).slice(0, 15);
        setAvailableContents(shuffledContents);
    }, [navigate]);

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
                        {availableContents.map((content, index) => (
                            <div
                                key={index}
                                className="contents-box"
                                onClick={() => handleContentClick(content)}
                            >
                                <img src={content} alt={`Content ${index + 1}`} style={{ width: '100%', height: '100%', borderRadius: '20px' }} />
                                <div className={`overlay ${selectedContents.includes(content) ? 'selected' : ''}`}></div>
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
