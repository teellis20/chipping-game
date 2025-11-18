'use client';
import React, { useState, useEffect, use} from 'react';
import PlayerRow from '../PlayerRow/PlayerRow';
import './Leaderboard.css'; // Assume CSS file for styling


const Leaderboard = ({ players }) => {
  const [playersState, setPlayersState] = useState(players || []);

  useEffect(() => {
    console.log("Leaderboard received players:", players);
    const playersSorted = [...players].sort((a, b) => b.totalScore - a.totalScore);
    setPlayersState(playersSorted);

    // Sort players by total score once on initial load
    // setPlayersState(prev => [...prev].sort((a, b) => b.totalScore - a.totalScore));
  }, [players]);

  // Demo trigger: every random 5-10 seconds update a random player's score
  // useEffect(() => {
  //   let mounted = true;
  //   let timer = null;

  //   const scheduleNext = () => {
  //     const delay = 5000 + Math.floor(Math.random() * 5000); // 5000-9999 ms
  //     timer = setTimeout(() => {
  //       // update a random player's score
  //       setPlayers(prev => {
  //         const next = prev.map(p => ({ ...p }));
  //         if (next.length === 0) return next;
  //         const idx = Math.floor(Math.random() * next.length);
  //         // change between -3 and +3, avoid 0 to force change
  //         let delta = Math.floor(Math.random() * 7) - 3; // -3..+3
  //         if (delta === 0) delta = Math.random() < 0.5 ? -1 : 1;
  //         next[idx].today = (Number(next[idx].today) || 0) + delta;
  //         next[idx].totalScore = (Number(next[idx].totalScore) || 0) + delta;
  //         // resort so ranks reflect new totals
  //         next.sort((a, b) => a.totalScore - b.totalScore);
  //         return next;
  //       });

  //       if (mounted) scheduleNext();
  //     }, delay);
  //   };

  //   scheduleNext();

  //   return () => {
  //     mounted = false;
  //     if (timer) clearTimeout(timer);
  //   };
  // }, []);

  return (
    <div className="leaderboard-container bg-green-400">
      <div className="leaderboard-header">
        <div>POS</div>
        <div>PLAYER</div>
        <div>TOTAL</div>
        <div>PERCENT</div>
      </div>
      { playersState.map((player, index) => (
        <PlayerRow key={player.id} player={player} rank={index + 1} />
      ))}
    </div>
  );
};

export default Leaderboard;
