import React, { useState, useEffect } from 'react';
import "./QuestionBox.css";

const QuestionBox = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

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
    <div className="question-box-border">
      <div className="question-box">
        <h2 className="question-title">{question.question}</h2>
        <div className="answer-grid">
          {allAnswers.map((answer) => (
            <div className="answer-button-border" key={answer}> {/* Wrap the button with a div */}
              <button
                className={`answer-button ${selectedAnswer === answer
                  ? answer === question.correct_answer
                    ? "correct-answer"
                    : "wrong-answer"
                  : showCorrectAnswer && answer === question.correct_answer
                    ? "correct-answer-light"
                    : "default-answer"
                }`}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswer}
              >
                {answer}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;