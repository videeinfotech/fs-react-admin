import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { PhoneIcon } from '../../components/ui/icons/OtherIcons';

const Calling: React.FC = () => {
    const { listenerId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const listener = mockListeners.find(l => l.id.toString() === listenerId);

    useEffect(() => {
        // Simulate call being answered after a few seconds
        const timer = setTimeout(() => {
            navigate(`/user/call/sess_${listenerId}`);
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate, listenerId]);

    if (!listener) {
        return <div className="flex h-screen items-center justify-center">Listener not found</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white items-center justify-between p-8">
            <div className="flex-1 flex flex-col items-center justify-center">
                <img src={listener.avatarUrl} alt={listener.name} className="w-32 h-32 rounded-full mx-auto border-4 border-primary-400 animate-pulse" />
                <h1 className="mt-4 text-3xl font-bold">Calling {listener.name}...</h1>
                <p className="text-gray-300 mt-2">Please wait while we connect you.</p>
            </div>

            <button onClick={() => navigate(-1)} className="p-5 bg-red-600 rounded-full hover:bg-red-700">
                <PhoneIcon className="w-8 h-8 text-white transform rotate-[135deg]" />
            </button>
        </div>
    );
};

export default Calling;
