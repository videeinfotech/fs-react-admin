import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { useCall } from '../../context/CallContext';

const Calling: React.FC = () => {
    const { listenerId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const { acceptCall } = useCall();

    const listener = mockListeners.find(l => l.id.toString() === listenerId);

    useEffect(() => {
        // In a real app, this would be triggered by a WebSocket event from the listener
        // Here, we simulate the listener accepting after a few seconds
        const timer = setTimeout(() => {
            acceptCall('user');
        }, 3000);

        return () => clearTimeout(timer);
    }, [listenerId, acceptCall]);

    const handleCancel = () => {
        // In a real app, this would also notify the listener
        navigate(-1);
    };

    if (!listener) {
        return <div>Listener not found.</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white items-center justify-between p-8">
            <div className="text-center">
                <img src={listener.avatarUrl} alt={listener.name} className="w-32 h-32 rounded-full mx-auto border-4 border-primary-400 animate-pulse" />
                <h1 className="mt-4 text-3xl font-bold">{listener.name}</h1>
                <p className="text-gray-300 text-lg mt-2">Calling...</p>
            </div>
            
            <button onClick={handleCancel} className="p-5 bg-red-600 rounded-full hover:bg-red-700">
                {/* End Call Icon */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2 2m-2-2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8" /></svg>
            </button>
        </div>
    );
};

export default Calling;
