import React, { useState, useEffect } from "react";
import RoundTimer from "./RoundTimer";

const Round = ({
    difficultyRating,
    roundNumber,
    isActive,
    onCorrectAnswer,
    onWrongAnswer,
    onTimeUp,
    renderQuestion
}) => {
    const [resetTimer, setResetTimer] = useState(0);

    // Adapt onAnswer to work with GameController's callbacks
    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setResetTimer((prev) => prev + 1);
            onCorrectAnswer();
        } else {
            onWrongAnswer();
        }
    };

    return (
        <div>
            <RoundTimer duration={60} isActive={isActive} onTimeUp={onTimeUp} resetTrigger={resetTimer} />
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