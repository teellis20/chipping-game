'use client';
import { useState, useEffect, use } from "react";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import ScoreInput from "./Components/ScoreInput/ScoreInput";

// import io from 'socket.io-client';
import { socket } from '../socket';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const response = await fetch('/api/set-up');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        const data = await response.json();
        console.log('Database connection status:', data);
        setDbConnected(true);
      } catch (error) {
        console.error('Failed to check database connection:', error);
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkDbConnection();
  }, []);

  useEffect(() => {
        // fetch here to get player data
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data.players);
        setPlayers(data.players);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    }

    if (dbConnected) { 
      fetchPlayers();
    }
  }, [dbConnected]);

  // useEffect(() => {
    if (socket.connected) {
      socket.on('scoreUpdate', (data) => {
        console.log('Received score update via Socket.io:');
        setPlayers((prevPlayers) => {
          return prevPlayers.map((p) => {
            if (p.name === data.name) {
              return { ...p, totalScore: data.totalScore, percent: data.percent };
            }
            return p;
          });
        });
      });

      socket.on('connect', () => {
        console.log('Socket connected to server');
      })
    }

  // }, []);

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

  const getLastWeeksWinner = async () => {
    try {
      const response = await fetch('/api/last-winner');
      const data = await response.json();
      alert(`Last week's winner was ${data.winner[0].name} with a score of ${data.winner[0].totalScore} and a percentage of ${data.winner[0].percent}%!`);
    } catch (error) {
      console.error('Failed to fetch last week\'s winner:', error);
      alert("Failed to fetch last week's winner.");
    }
  }

  const checkIfBetterThanCurrentBest = (newData) => {
    // console.log('Checking new data against current best:', newData);
    let playerToSend = null;
    const player = players.find(p => p.name === newData.name);
    if (!player) return false;
    if (newData.totalScore <= player.totalScore && newData.percent <= player.percent) {
      console.log('No update needed, current best is better or equal.');
      return false;
    }
      
    const newScore = newData.totalScore > player.totalScore ? newData.totalScore : player.totalScore;
    const newPercent = newData.percent > player.percent ? newData.percent : player.percent;
    // console.log('Updating player with new score and percent:', newScore, newPercent);

    const updatedPlayers = players.map(p => {
      if (p.name === newData.name) {
        playerToSend = { ...p, totalScore: newScore, percent: newPercent };
        return playerToSend;
      }
      return p;
    });
    setPlayers(updatedPlayers);
    return playerToSend;  
  }

  const handleScoreSubmit = async (data) => {
    // console.log("Score submitted:", data);
    const playerToSend = checkIfBetterThanCurrentBest(data);
    if (!playerToSend) {
      console.log('Submitted score was not better than current best, not sending to backend.');
      return;
    }
    // Here you would typically send the data to your backend API
    try {
      const response = await fetch('/api/post-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerToSend),
      });
      const result = await response.json();
      // console.log('Score submission response:', result.message);
      socket.emit('scoreUpdate', playerToSend);

    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }

  if (loading) {
    return <div className="flex flex-col min-h-screen items-center font-sans bg-green-300"><h1>Loading...</h1></div>;
  }

  if (!dbConnected) {
    return <div className="flex flex-col min-h-screen items-center font-sans bg-green-300"><h1>Database connection failed. Please try again later.</h1></div>;
  }


  return (
    <>
    <div className="flex flex-col min-h-screen items-center font-sans bg-green-300">
      <h1 className="text-4xl font-bold text-zinc-800 mt-5">Chipping Game</h1>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-800">({getMondayofWeek()} - {getSundayofWeek()})</h2>

      <Leaderboard players={players}/>
      <ScoreInput onSubmit={handleScoreSubmit} players={players} />
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
