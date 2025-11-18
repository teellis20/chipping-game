import React from 'react';
import NumberFlip from './NumberFlip';
import './PlayerRow.css';

const PlayerRow = ({ player, rank }) => {
  return (
    <div className="player-row">
      <div className="player-rank">{rank}</div>
      <div className="player-name">{player.name}</div>
      <div className='flex justify-center items-center'>
        <div className="player-total">
          <NumberFlip value={player.totalScore} duration={1500} />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className="player-percent">
          <NumberFlip value={player.percent} duration={1300} />
        </div>
      </div>
    </div>
  );
};

export default PlayerRow;
