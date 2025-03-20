import React from 'react';
import backgroundMusic from '../assets/music/music.mp3'; // Adjust the path to your music file

const GameMusic = () => {
  return (
    <div>
      <audio src={backgroundMusic} autoPlay loop>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default GameMusic;