import React, { useEffect, useState } from 'react';
import HistoryButton from '../UI/HistoryButton/HistoryButton';

const LOCAL_STORAGE_KEY = 'gameHistory';

const GameHistory = ({ gameStatus, gameData }) => {
    const [history, setHistory] = useState([]);
    const clientId = localStorage.getItem("clientId"); // Get ClientId from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status
    
    const [showPopup, setShowPopup] = useState(false);
      
    const togglePopup = () => {
        setShowPopup((prev) => !prev);
        };

    // laeb history LocalStorage'ist
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

        console.log("Client ID:", clientId);
        console.log("Is Logged In:", isLoggedIn);
        console.log("Stored History:", storedHistory);

        // Filtreeri ainult praeguse kasutaja mängud
        const filteredHistory = isLoggedIn
        ? storedHistory.filter((game) => game.clientId === clientId) // Show only logged-in user's games
        : storedHistory.filter((game) => !game.clientId); // Show only games with no ClientId for logged-out users
        
        console.log("Filtered History:", filteredHistory);
        
        setHistory(filteredHistory);
        
    }, [clientId, isLoggedIn]);

    useEffect(() => {
        if (gameStatus === 'over' && gameData) {
            saveGameHistory(gameData);
        }
    }, [gameStatus, gameData]); 

    const saveGameHistory = (game) => {
        const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

        // Lisa uus mängu kirje koos ClientId'ga
        const updatedHistory = [
            ...storedHistory,
            {
                ...game,
                clientId: clientId || null, // Lisa ClientId või "Unknown", kui puudub
                played_at: new Date().toISOString(), // Lisa mängu aeg
            },
        ];

        // Salvesta uuendatud ajalugu LocalStorage'i
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
    };

    return (
        <div className="game-history">
            <HistoryButton>
                  <h2>Game History</h2>
                    {history.length > 0 ? (
                        <ul>
                            {history.map((game, index) => (
                                <li key={index}>
                                    <strong>{new Date(game.played_at).toLocaleString()}</strong> - {game.difficulty} - {game.score} points
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            {isLoggedIn
                                ? "No games found for your account."
                                : "No games found. Log in to see your game history."}
                        </p>
                )}
            </HistoryButton>
        </div>
    );
};
    
export default GameHistory;