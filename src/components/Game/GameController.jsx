import React, { useEffect, useState } from 'react';
import Round from './Round';
import RewardSystem from './RewardSystem.jsx';
import REWARDS from './RewardMap.jsx';
import QuestionBox from '../Questions/QuestionBox.jsx';
import questionsData from '../Questions/questions.json';
import './GameController.css';

const LOCAL_STORAGE_KEY = 'gameHistory';

const GameController = ({ selectedDifficulty, setSelectedDifficulty, gameStatus, setGameStatus, handleGameEnd }) => {
    const baseDifficulty = 1;

    const difficultyModifiers = {
        easy: 0,
        medium: 2,
        hard: 4,
    };

    const initialDifficulty = baseDifficulty + (difficultyModifiers[selectedDifficulty] || 0);

    const [difficultyRating, setDifficultyRating] = useState(initialDifficulty);
    const [questionCount, setQuestionCount] = useState(0);
    const [gameResult, setGameResult] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [usedQuestionIds, setUsedQuestionIds] = useState([]);

    const getRandomQuestions = (questions) => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        return shuffled;
    };


    // Load a new question when difficultyRating or questionCount changes
    useEffect(() => {
        if (!questionsData || questionsData.length === 0) {
            console.error("Questions data is empty or missing.");
            return;
        }


        const availableQuestions = questionsData.filter(
            q => q.difficulty_rating === difficultyRating && !usedQuestionIds.includes(q.id)
        );


        if (availableQuestions.length === 0) {
            console.error("No unused questions available for difficulty:", difficultyRating);
            // Reset usedQuestionIds to recycle questions, or end game
            setUsedQuestionIds([]);
            const fallbackQuestions = questionsData.filter((q) => q.difficulty_rating === difficultyRating);

            if (fallbackQuestions.length === 0) {
                console.error("No questions available for this difficulty.");
                setGameStatus('over');
                setGameResult('noQuestions');
                return;
            }

            const shuffledQuestions = getRandomQuestions(fallbackQuestions); // Shuffle all questions of the same difficulty
            const newQuestion = shuffledQuestions[0];
            setCurrentQuestion(newQuestion);
            if (newQuestion) setUsedQuestionIds([newQuestion.id]);
            return;
        }

        const shuffledAvailableQuestions = getRandomQuestions(availableQuestions); // Shuffle available questions
        const newQuestion = shuffledAvailableQuestions[0]; // Select the first shuffled question
        setCurrentQuestion(newQuestion);
        setUsedQuestionIds(prev => [...prev, newQuestion.id]);

        console.log(`Picked question ID: ${newQuestion.id}, Difficulty: ${newQuestion.difficulty_rating}`);
    }, [difficultyRating, questionCount]);

    const saveGameHistory = (result, newCount) => {
        const history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const clientId = localStorage.getItem('clientId');
        const newEntry = {
            played_at: new Date().toISOString(),
            difficulty: selectedDifficulty,
            questionCount: newCount,
            score: newCount === 15 ? 1000000 : (REWARDS[newCount] || 0), // Ensure 1M reward at 15
            clientId: clientId || null,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...history, newEntry]));
        return newEntry.score;
    };


    const startGame = () => {
        setGameStatus('active');
        setGameResult(null);
        setQuestionCount(0);
        setDifficultyRating(initialDifficulty);
    };

    const endGame = (result, finalQuestionCount = questionCount) => {
        setGameStatus('over');
        setGameResult(result);
        const score = saveGameHistory(result, finalQuestionCount);
        handleGameEnd(result, finalQuestionCount, score);
    };

    const handleCorrectAnswer = () => {
        const newCount = questionCount + 1;
        setQuestionCount(newCount);

        if (newCount === 15) {
            setTimeout(() => endGame('victory', newCount), 0); // Pass newCount
        } else if (newCount % 3 === 0) {
            setDifficultyRating((prev) => prev + 1);
        }

        // console.log(difficultyRating, questionCount, newCount);
    };

    const handleWrongAnswer = () => endGame('loss');
    const handleTimeUp = () => endGame('loss');

    return (
        <div className="game-controller">
            {(gameStatus === 'notStarted' || gameStatus === 'over') && (
                <>
                    {gameStatus === 'over' && (
                        <div>
                            {gameResult === 'victory' ? (
                                <h1>Congratulations! You won the game!</h1>
                            ) : (
                                <h1>Game Over!</h1>
                            )}
                        </div>
                    )}
                    <div className="difficulty-buttons">

                        <div className="difficulty-border">
                            <button className="difficulty" onClick={() => setSelectedDifficulty('easy')}>Easy</button>
                        </div>


                        <div className="difficulty-border">
                            <button className="difficulty" onClick={() => setSelectedDifficulty('medium')}>Medium</button>
                        </div>

                        <div className="difficulty-border">
                            <button className="difficulty" onClick={() => setSelectedDifficulty('hard')}>Hard</button>
                        </div>
                    </div>
                    <div className='Start-button-border'>
                        <button className='Start-button' onClick={startGame}>{gameStatus === 'over' ? 'Play Again' : 'Start Game'}</button>
                    </div>

                </>
            )
            }

            {
                gameStatus === 'active' && (
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
                        {/* <button onClick={handleCorrectAnswer}>Correct</button> */}
                    </>
                )
            }
            <div className='Reward'>
                <RewardSystem level={questionCount} />
            </div>
        </div >
    );
};

export default GameController;