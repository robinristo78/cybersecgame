import React, { useState, useEffect } from 'react';

const QuestionBox = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // If the question changes, reset the selected answer and correct answer display
  useEffect(() => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correct_answer;

    if (!isCorrect) {
      setShowCorrectAnswer(true);
    }

    onAnswer(isCorrect);
  };

  const allAnswers = [question.correct_answer, ...question.wrong_answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {allAnswers.map((answer) => (
          <button
            key={answer}
            className={`p-4 border rounded ${
              selectedAnswer === answer
                ? answer === question.correct_answer
                  ? "bg-green-500" 
                  : "bg-red-500"
                : showCorrectAnswer && answer === question.correct_answer
                ? "bg-green-300" 
                : "bg-gray-200"
            }`}
            onClick={() => handleAnswerClick(answer)}
            disabled={!!selectedAnswer} // Disable the buttons after an answer is selected
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;