import React from 'react';

const Quiz: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Daily Skill Quiz</h1>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <p className="text-sm text-gray-500">Question 1 of 5</p>
                <h2 className="text-xl font-semibold my-4">A user says they feel hopeless. What is the most empathetic first response?</h2>

                <div className="space-y-3">
                    <button className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">A) "Don't worry, it will get better."</button>
                    <button className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">B) "It sounds like you're going through a really tough time. I'm here to listen."</button>
                    <button className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">C) "Why do you feel that way?"</button>
                    <button className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">D) "You should try to be more positive."</button>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <button className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg">Next Question</button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
