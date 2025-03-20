import React, { useEffect, useState } from 'react';
import Round from './Round';
import RewardSystem from './RewardSystem.jsx';
import REWARDS from './RewardMap.jsx';
import GameHistory from './GameHistory.jsx';
import QuestionBox from '../Questions/QuestionBox.jsx';
import questionsData from '../Questions/questions.json';
import './GameController.css';

const LOCAL_STORAGE_KEY = 'gameHistory';

const GameController = ({ selectedDifficulty }) => {
    const baseDifficulty = 1;
    
    const difficultyModifiers = {
        easy: 0,
        medium: 2,
        hard: 4,
    };

    const initialDifficulty = baseDifficulty + (difficultyModifiers[selectedDifficulty] || 0);

    const [difficultyRating, setDifficultyRating] = useState(initialDifficulty);
    const [questionCount, setQuestionCount] = useState(0);
    const [gameStatus, setGameStatus] = useState('notStarted');
    const [gameResult, setGameResult] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    // Load a new question when difficultyRating or questionCount changes
    useEffect(() => {
        if (!questionsData || questionsData.length === 0) {
            console.error("Questions data is empty or missing.");
            return;
        }
        const availableQuestions = questionsData.filter(q => q.difficulty_rating === difficultyRating);
        if (availableQuestions.length === 0) {
            console.error("No questions available for difficulty:", difficultyRating);
            return;
        }
        // Simple selection: cycle through questions or pick randomly
        const questionIndex = questionCount % availableQuestions.length;
        setCurrentQuestion(availableQuestions[questionIndex]);
    }, [difficultyRating, questionCount]);

    const saveGameHistory = (result) => {
        const history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const newEntry = {
            played_at: new Date().toISOString(),
            difficulty: selectedDifficulty,
            questionCount: questionCount + 1,
            score: REWARDS[questionCount + 1] || 0,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...history, newEntry]));
    };

    const startGame = () => {
        setGameStatus('active');
        setGameResult(null);
        setQuestionCount(0);
        setDifficultyRating(initialDifficulty);
    };

    const endGame = (result) => {
        setGameStatus('over');
        setGameResult(result);
        saveGameHistory(result);
    };

    const handleCorrectAnswer = () => {
        const newCount = questionCount + 1;
        setQuestionCount(newCount);
        if (newCount >= 15) {
            endGame('victory');
        } else if (newCount % 3 === 0) {
            setDifficultyRating((prev) => prev + 1);
        }
        console.log(difficultyRating);
    };

    const handleWrongAnswer = () => endGame('loss');
    const handleTimeUp = () => endGame('loss');

    return (
        <div className="game-controller">

            {gameStatus === 'notStarted' && <button onClick={startGame}>Start Game</button>}
            
            {gameStatus === 'active' && (
                <>
                    <Round
                        difficultyRating={difficultyRating}
                        roundNumber={questionCount + 1}
                        isActive={gameStatus === 'active'}
                        onCorrectAnswer={handleCorrectAnswer}
                        onWrongAnswer={handleWrongAnswer}
                        onTimeUp={handleTimeUp}
                        renderQuestion={(onAnswer) => (
                            currentQuestion ? (
                                <QuestionBox question={currentQuestion} onAnswer={onAnswer} />
                            ) : (
                                <p>Loading question...</p>
                            )
                        )}
                    />
                </>
            )}
            <div className="Reward">
            <RewardSystem  level={questionCount} />
            </div>
            {gameStatus === 'over' && (
            <div>
                {gameResult === 'victory' ? <p>Congratulations, you won!</p> : <p>Game Over.</p>}
                <button onClick={startGame}>Play Again</button>
            </div>
            )}
    
            <GameHistory gameStatus={gameStatus} />
        </div>
    );
};

export default GameController;