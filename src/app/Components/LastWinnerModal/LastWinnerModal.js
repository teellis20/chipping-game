import { useState } from "react";

const LastWinnerModal = ({ isOpen, onClose, winner }) => {


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-green-300/70" onClick={onClose}>
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full items-center justify-center flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Last Game Winner</h2>
                {winner && (
                    <div className="text-center">
                        <p>🏆</p>
                        <p>The winner is: <span className='font-semibold'>{winner.name}</span></p>
                        <p>Score: <span className='font-semibold'>{winner.totalScore}</span></p>
                        <p>Percentage: <span className='font-semibold'>{winner.percent}</span></p>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    )

}

export default LastWinnerModal;