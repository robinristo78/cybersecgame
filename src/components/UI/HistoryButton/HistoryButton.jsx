import React, { useState } from 'react';
import Popup from '../Popup/Popup'; // Adjust the import path as necessary
import './HistoryButton.css';

const HistoryButton = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
        setShowPopup((prev) => !prev);
      };

    return (
        <div>
            <button onClick={togglePopup}>Show History</button>
            <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                    {children}
            </Popup>
        </div>
    );
};

export default HistoryButton;