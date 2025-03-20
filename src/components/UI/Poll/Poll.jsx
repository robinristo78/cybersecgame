import React from 'react'
import "./Poll.css";
import PollsActive from '../../../assets/img/Polls_active.png'; 

const Poll = () => {
  return (
    <div>
        <img src={PollsActive} alt="Polls Active" />  
    </div>
  )
}

export default Poll