'use client';
import React, { useState, useEffect, use} from 'react';
import PlayerRow from '../PlayerRow/PlayerRow';
import './Leaderboard.css'; // Assume CSS file for styling


const Leaderboard = ({ players }) => {
  const [playersState, setPlayersState] = useState(players || []);

  useEffect(() => {
    const playersSorted = [...players].sort((a, b) => b.totalScore - a.totalScore);
    setPlayersState(playersSorted);

  }, [players]);



  return (
    <div className="leaderboard-container bg-green-400">
      <div className="leaderboard-header">
        <div>POS</div>
        <div>PLAYER</div>
        <div>TOTAL</div>
        <div>PERCENT</div>
      </div>
      { playersState.map((player, index) => (
        <PlayerRow key={player._id} player={player} rank={index + 1} />
      ))}
    </div>
  );
};

export default Leaderboard;
