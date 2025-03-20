import React from 'react'
import "./Logo.css";
import CyberLogo from '../../../assets/img/Cybersec.webp'; 

const MainLogo = () => {
  return (
    <div >
      <img className='img-logo' src={CyberLogo} alt="logo" />
    </div>
  )
}

export default MainLogo