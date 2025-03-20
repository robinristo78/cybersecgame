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

    // Load history from LocalStorage
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

        console.log("Client ID:", clientId);
        console.log("Is Logged In:", isLoggedIn);
        console.log("Stored History:", storedHistory);

        // Filter only the current user's games
        const filteredHistory = isLoggedIn
        ? storedHistory.filter((game) => game.clientId === clientId) // Show only logged-in user's games
        : storedHistory.filter((game) => !game.clientId); // Show only games with no ClientId for logged-out users
        
        console.log("Filtered History:", filteredHistory);
        
        setHistory(filteredHistory);
    }, [clientId, isLoggedIn]);

    // Save game history when the game ends
    useEffect(() => {
        if (gameStatus === 'over' && gameData) {
            saveGameHistory(gameData);
        }
    }, [gameStatus, gameData]);

    const saveGameHistory = (game) => {
        const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

        const existingEntry = storedHistory.find(
            (entry) => entry.played_at === game.played_at && entry.clientId === game.clientId);

        if (existingEntry) {
        // Add new game entry with ClientId
        const updatedHistory = [
            ...storedHistory,
            {
                ...game,
                clientId: clientId || null, // Add ClientId or null if missing
                played_at: new Date().toISOString(), // Add game time
            },
        ];

        // Save updated history to LocalStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
        setHistory(updatedHistory); // Update local state
        } 
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