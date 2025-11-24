'use client';

import { set } from 'mongoose';
import { useEffect, useState } from 'react';

export default function DetermineWinnerPage() {
    const [winner, setWinner] = useState(null);


        const determineWinner = async () => {
            try {
                const response = await fetch('/api/determine-winner');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Winner determined:', data.winner);
                setWinner(data.winner);
            } catch (error) {
                console.error('Failed to determine winner:', error);
            }
        };


    if (winner) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-green-300">
                <h1 className="text-5xl font-bold mb-4">Winner</h1>
                <p>The winner is: <span className='font-semibold'>{winner.name}</span> with a score of <span className='font-semibold'>{winner.totalScore}</span> and a percentage of <span className='font-semibold'>{winner.percent}</span></p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-green-300">
            <h1 className="text-2xl font-bold mb-4">Determine Winner</h1>
            <p>This page triggers the winner determination process.</p>
            <button
                onClick={determineWinner}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Determine Winner
            </button>
        </div>
    );
}