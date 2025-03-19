import React from "react";
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
    return (
        <div>
            <RoundTimer duration={60} isActive={isActive} onTimeUp={onTimeUp} />
            {/* renderQuestion() / küsimuse funktsioon */}
            <button onClick={onCorrectAnswer}>Correct</button>
            <button onClick={onWrongAnswer}>Wrong</button>
        </div>
    )
};

export default Round;