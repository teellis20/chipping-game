'use client';
import { useEffect, useState } from "react";
import './ScoreInput.css';

const ScoreInput = ({ onSubmit, players }) => {
  const [score, setScore] = useState(0);
  const [percent, setPercent] = useState(0);
  const [player, setPlayer] = useState("");

  const validate = () => {
    if (player === "") {
      alert("Please select a player.");
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (percent > 24) {
      console.log("Percent cannot be greater than 24. Setting to 24.");
      setPercent(24);
    }}, [percent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const percentage = (percent / 24) * 100;
    onSubmit({ name: player, totalScore: score, percent: parseInt(percentage.toFixed(0)) });
    setScore(0);
    setPercent(0);
    setPlayer("");
  };
  return (
    <div className="container">
        <select className="player-select" name="player" id="player-select" value={player} onChange={(e) => setPlayer(e.target.value)}>
            <option disabled value="">Select Player</option>
            {players?.map((p) => (
                <option key={p._id} value={p.name}>{p.name}</option>
            ))}
        </select>
      <div className="input-container">
        <label htmlFor="score">Enter Score:</label>
        <input
            id="score"
            name="score"
            type="number"
            value={score}
            min={0}
            onChange={(e) => setScore(Number(e.target.value))}
            />
        <label htmlFor="percent">Enter No. Out of 24:</label>
        <input
            id="percent"
            name="percent"
            type="number"
            value={percent}
            min={0}
            max={24}
            onChange={(e) => setPercent(Number(e.target.value))}
            />
      </div>
      <button type="button" onClick={handleSubmit}>Submit Score</button>
    </div>
  );
};

export default ScoreInput;