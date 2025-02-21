import React, { useState } from 'react';

const Welcome: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [routineName, setRoutineName] = useState('');

    const handleStartTracking = (e: React.FormEvent) => {
        e.preventDefault();
        if (routineName.trim()) {
            // We'll implement this functionality later
            console.log('Starting to track:', routineName);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to Logan's Activity Tracker
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Track your daily activities with my heatmap visualization!
                    </p>
                </div>
                {!showForm ? (
                    <button
                    onClick={() => setShowForm(true)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Start Tracking Now!
                    </button>
                ) : (
                    <form onSubmit={handleStartTracking} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="routine" className="sr-only">
                                What would you like to track?
                            </label>
                            <input
                            id="routine"
                            type="text"
                            value={routineName}
                            onChange={(e) => setRoutineName(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="What would you like to track?"
                            required
                            />
                        </div>
                        <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Tracker
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Welcome;
