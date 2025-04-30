import React from 'react';

const HomePage = () => {



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">Welcome to Your DnD App</h1>
            <p className="mb-6 text-lg">Choose a character, start an adventure, or create a new hero!</p>
            <div className="space-x-4">
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    My Characters
                </button>
                <button className="px-6 py-2 bg-white border border-green-600 text-green-700 rounded hover:bg-green-100">
                    Create New Character
                </button>
            </div>
        </div>
    );
};

export default HomePage;
