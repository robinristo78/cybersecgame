import React from 'react'
import "./Logo.css";
import CyberLogo from '../../../assets/img/Cybersec.webp'; 

const MainLogo = () => {
  return (
    <div className='img-logo'>
         <img src={CyberLogo} alt="logo" />
    </div>
  )
}

export default MainLogo