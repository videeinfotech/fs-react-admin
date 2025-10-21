import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { mockUsers } from '../Users';

const CallSummary: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const user = mockUsers[0];

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center p-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold">Call Completed</h1>
                <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="w-24 h-24 rounded-full mx-auto my-6" />
                
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500">User:</span>
                        <span className="font-semibold">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-semibold">15:23</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span className="text-gray-500">Your Earnings:</span>
                        <span className="font-bold text-green-500">₹150.25</span>
                    </div>
                </div>

                <div className="mt-8">
                    <button onClick={() => navigate('/listener')} className="w-full p-3 bg-primary-600 text-white font-semibold rounded-lg">Back to Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default CallSummary;
