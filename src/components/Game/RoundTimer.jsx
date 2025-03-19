import React, { useState, useEffect } from 'react';

const RoundTimer = ({ duration = 60, isActive, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // kontroll: kas mäng runnib
        if (!isActive) return;

        // resetib timeri kui isActive on true ehk uue mängu alguses
        setTimeLeft(duration);

        // kordub iga 1000ms. Countib alla iga sekund kuni nullini.
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer)
    }, [isActive]);

    return <div className="round-timer">Time Left: {timeLeft}s</div>
}

export default RoundTimer;