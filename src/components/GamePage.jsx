import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import questionsData from '../components/questions/questions.json';
import QuestionBox from '../components/QuestionBox';
import { UnlockedDifficultiesContext } from '../components/UnlockedDifficultiesContext';

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUnlockedDifficulties } = useContext(UnlockedDifficultiesContext); 
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const difficulty = location.state?.difficulty;


  if (!difficulty) {
    console.error("Difficulty value is missing. Redirecting to home page.");
    navigate('/');
    return null;
  }


  if (!questionsData || questionsData.length === 0) {
    console.error("Questions data is empty or missing.");
    navigate('/');
    return null;
  }

  // Difficulty mapping
  const difficultyMapping = {
    Easy: [
      { round: 1, difficulty: 1, count: 3 },
      { round: 2, difficulty: 2, count: 3 },
      { round: 3, difficulty: 3, count: 3 },
      { round: 4, difficulty: 4, count: 3 },
      { round: 5, difficulty: 5, count: 3 },
    ],
    Medium: [
      { round: 1, difficulty: 3, count: 3 },
      { round: 2, difficulty: 4, count: 3 },
      { round: 3, difficulty: 5, count: 3 },
      { round: 4, difficulty: 6, count: 3 },
      { round: 5, difficulty: 7, count: 3 },
    ],
    Hard: [
      { round: 1, difficulty: 5, count: 3 },
      { round: 2, difficulty: 6, count: 3 },
      { round: 3, difficulty: 7, count: 3 },
      { round: 4, difficulty: 8, count: 3 },
      { round: 5, difficulty: 9, count: 3 },
    ],
  };


  const currentDifficulty = difficultyMapping[difficulty]?.find(
    (group) => group.round === currentRound
  );


  if (!currentDifficulty) {
    console.error("Current difficulty mapping is missing. Redirecting to home page.");
    navigate('/');
    return null;
  }


  const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5); 
    return shuffled.slice(0, count);
  };


  useEffect(() => {
    const availableQuestions = questionsData.filter(
      (q) =>
        q.difficulty_rating === currentDifficulty.difficulty &&
        !usedQuestions.includes(q.id)
    );

    if (availableQuestions.length < currentDifficulty.count) {
      console.error("Not enough questions available for the current difficulty.");
      return;
    }

    const randomQuestions = getRandomQuestions(
      availableQuestions,
      currentDifficulty.count
    );

    setSelectedQuestions(randomQuestions);
    setUsedQuestions((prev) => [...prev, ...randomQuestions.map((q) => q.id)]);
  }, [currentRound, currentDifficulty, usedQuestions]);


  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);

      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentRound < 5) {
        setCurrentRound((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else {

        if (difficulty === 'Easy') {
          setUnlockedDifficulties((prev) => [...prev, 'Medium']);
        } else if (difficulty === 'Medium') {
          setUnlockedDifficulties((prev) => [...prev, 'Hard']);
        } else if (difficulty === 'Hard') {
          alert("Congratulations! You have successfully become a cyber security specialist!");
          navigate('/');
        }
        setGameOver(true);
      }
    } else {

        setTimeout(() => setGameOver(true), 2000);
    }
  };


  const handlePlayAgain = () => {
    navigate('/');
  };


  if (gameOver) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Game Over! Your final score: {score}
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    );
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Round {currentRound}</h1>
      {selectedQuestions.length > 0 ? (
        <QuestionBox
          question={selectedQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default GamePage;