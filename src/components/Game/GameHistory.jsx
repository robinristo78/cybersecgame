import React, { useEffect, useState } from 'react';
import HistoryButton from '../UI/HistoryButton/HistoryButton';

const LOCAL_STORAGE_KEY = 'gameHistory';

const GameHistory = ({ gameStatus }) => {
    const [history, setHistory] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
      
    const togglePopup = () => {
        setShowPopup((prev) => !prev);
        };

    // laeb history LocalStorage'ist
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        setHistory(storedHistory);
    }, [gameStatus]);

    return (
        <div className="game-history">
            <HistoryButton>
                <h2>Game History</h2>
                <ul>
                    {history.map((game, index) => (
                        <li key={index}>
                            <strong>{new Date(game.played_at).toLocaleString()}</strong> - {game.difficulty} - {game.score} points
                        </li>
                    ))}
                </ul>
            </HistoryButton>
        </div>
      );
};
    
export default GameHistory;