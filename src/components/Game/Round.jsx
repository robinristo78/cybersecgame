import React, { useState, useEffect } from "react";
import RoundTimer from "./RoundTimer";
import QuestionBox from "../Questions/QuestionBox";

const Round = ({
    difficultyRating,
    roundNumber,
    isActive,
    onCorrectAnswer,
    onWrongAnswer,
    onTimeUp,
    renderQuestion
}) => {
    // Adapt onAnswer to work with GameController's callbacks
    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            onCorrectAnswer();
        } else {
            onWrongAnswer();
        }
    };

    return (
        <div>
            <RoundTimer duration={60} isActive={isActive} onTimeUp={onTimeUp} />
            {renderQuestion ? (
                renderQuestion(handleAnswer) // Pass handleAnswer to renderQuestion
            ) : (
                <p>No question provided</p> // Fallback if no question is passed
            )}


            {/* <button onClick={onCorrectAnswer}>Correct</button> */}
            {/* <button onClick={onWrongAnswer}>Wrong</button> */}
        </div>
    );
};

export default Round;