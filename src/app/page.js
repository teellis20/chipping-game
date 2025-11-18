'use client';
import { useState, useEffect } from "react";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import ScoreInput from "./Components/ScoreInput/ScoreInput";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
        // fetch here to get player data
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.players);
        setPlayers(data.players);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    }

    fetchPlayers();
  }, []);

  const checkIfBetterThanCurrentBest = (newData) => {
    console.log('Checking new data against current best:', newData);
    const player = players.find(p => p.name === newData.name);
    console.log('Current player data:', player);
    if (!player) return false;
    const newScore = newData.totalScore > player.totalScore ? newData.totalScore : player.totalScore;
    const newPercent = newData.percent > player.percent ? newData.percent : player.percent;
    console.log('Updating player with new score and percent:', newScore, newPercent);

    const updatedPlayers = players.map(p => {
      if (p.name === newData.name) {
        return { ...p, totalScore: newScore, percent: newPercent };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    return true;  
  }

  const getMondayofWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(today.setDate(diff));
    return monday.toLocaleDateString();
  }

  const getSundayofWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? 0 : 7); // adjust when day is sunday
    const sunday = new Date(today.setDate(diff));
    return sunday.toLocaleDateString();
  }

  const getLastWeeksWinner = () => {
    // Placeholder logic for last week's winner
    alert("Last week's winner was T with a score of 66!");
  }

  const handleScoreSubmit = async (data) => {
    console.log("Score submitted:", data);
    // Here you would typically send the data to your backend API
    try {
      const response = await fetch('/api/post-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Score submission response:', result);
      checkIfBetterThanCurrentBest(result.data);
      console.log('Updated players after submission:', players);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }


  return (
    <>
    <div className="flex flex-col min-h-screen items-center font-sans dark:bg-black bg-green-300">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200 mt-5">Chipping Game</h1>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">({getMondayofWeek()} - {getSundayofWeek()})</h2>

      <Leaderboard players={players}/>
      <ScoreInput onSubmit={handleScoreSubmit} />
        <button
          className="mb-6 mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            getLastWeeksWinner();
          }}
        >
          Last Week's Winner
        </button>
    </div>
    </>
  );
}
