import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';

const Call: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const listener = mockListeners[0];

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white items-center justify-between p-8">
            {/* Remote User Video/Avatar */}
            <div className="text-center">
                <img src={listener.avatarUrl} alt={listener.name} className="w-32 h-32 rounded-full mx-auto border-4 border-primary-400" />
                <h1 className="mt-4 text-3xl font-bold">{listener.name}</h1>
                <p className="text-gray-300">Connecting...</p>
                <p className="text-lg font-mono mt-2">00:23</p>
            </div>

            {/* Local User Preview */}
            <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg">
                {/* Local video feed would go here */}
            </div>

            {/* Call Controls */}
            <div className="flex items-center space-x-6">
                <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
                    {/* Mute Icon */}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
                <button onClick={() => navigate(`/user/feedback/${sessionId}`)} className="p-5 bg-red-600 rounded-full hover:bg-red-700">
                    {/* End Call Icon */}
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2 2m-2-2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8" /></svg>
                </button>
                 <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600">
                    {/* Video On/Off Icon */}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Call;
