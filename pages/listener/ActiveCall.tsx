import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useCall } from '../../context/CallContext';
import { mockUsers } from '../Users';

const ActiveCall: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const { status, user, endCall, isMuted, isVideoOn, toggleMute, toggleVideo } = useCall();
    
    // In a real app, user details would be part of call context or fetched.
    const callingUser = user || mockUsers[0];

    useEffect(() => {
        if (status === 'idle') {
            navigate('/listener');
        }
    }, [status, navigate]);

    const handleEndCall = () => {
        endCall('listener', sessionId || '');
    };

    if (!user) {
        return <div className="flex items-center justify-center h-screen">Loading call...</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white items-center justify-between p-8">
            <div className="text-center">
                <img src={`https://i.pravatar.cc/150?u=${callingUser.id}`} alt={callingUser.name} className="w-32 h-32 rounded-full mx-auto border-4 border-primary-400" />
                <h1 className="mt-4 text-3xl font-bold">{callingUser.name}</h1>
                <p className="text-gray-300">In Call</p>
                <p className="text-lg font-mono mt-2">00:23</p>
            </div>

            <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg">
                {/* Local video feed */}
            </div>

            <div className="flex items-center space-x-6">
                <button onClick={toggleMute} className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
                <button onClick={handleEndCall} className="p-5 bg-red-600 rounded-full hover:bg-red-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2 2m-2-2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8" /></svg>
                </button>
                <button onClick={toggleVideo} className={`p-4 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default ActiveCall;
