'use client';
import Image from "next/image";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import ScoreInput from "./Components/ScoreInput/ScoreInput";

export default function Home() {
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


  return (
    <>
    <div className="flex flex-col min-h-screen items-center font-sans dark:bg-black bg-green-300">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200 mt-5">Chipping Game</h1>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">({getMondayofWeek()} - {getSundayofWeek()})</h2>

      <Leaderboard />
      <ScoreInput onSubmit={(data) => console.log("Score submitted:", data)} />
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
