// src/RequestCard.jsx
import React from 'react';
import DinerHeader from './DinerHeader';

const RequestCard = ({ name, numberOfPeople, timing, onAccept, onReject }) => {
    return (
        <div className="max-w-5xl mx-auto relative left-32 top-5 bg-white shadow-lg rounded-lg overflow-hidden mt-5">
            <DinerHeader />
            <div className="p-5">
                <h2 className="text-xl font-bold">{name}</h2>
                <div className='mt-6 max-w-sm w-full'>
                    <p className="text-gray-700">Number of People: {numberOfPeople}</p>
                    <p className="text-gray-700">Timing: {timing}</p>

                </div>
                <div className="grid  w-full justify-end">
                    <button
                        onClick={onAccept}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 mb-3 rounded hover:bg-blue-700"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onReject}
                        className="bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;