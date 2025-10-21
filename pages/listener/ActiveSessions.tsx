import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';

const ActiveSessions: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const sessions = [
        { id: 'sess_123', user: 'Riya Sharma', type: 'Chat', status: 'Ongoing' },
        { id: 'sess_124', user: 'Aman Gupta', type: 'Call', status: 'Upcoming (15 mins)' },
        { id: 'sess_125', user: 'Priya Patel', type: 'Video', status: 'Upcoming (1 hour)' },
    ];
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Active & Upcoming Sessions</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                    {sessions.map(session => (
                        <div key={session.id} className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-lg">
                            <div>
                                <p className="font-bold text-lg">{session.type} with {session.user}</p>
                                <p className={`text-sm ${session.status === 'Ongoing' ? 'text-green-500' : 'text-gray-500'}`}>{session.status}</p>
                            </div>
                             <button onClick={() => navigate(`/listener/chat/${session.id}`)} className="px-5 py-2 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                {session.status === 'Ongoing' ? 'Join Now' : 'View'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActiveSessions;
