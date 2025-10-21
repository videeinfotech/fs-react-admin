import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';

const CallSummary: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const listenerId = sessionId?.replace('sess_', '');
    const listener = mockListeners.find(l => l.id.toString() === listenerId);

    if (!listener) return <div>Call not found</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center p-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold">Call Ended</h1>
                <img src={listener.avatarUrl} alt={listener.name} className="w-24 h-24 rounded-full mx-auto my-6" />
                
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Listener:</span>
                        <span className="font-semibold">{listener.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-semibold">15:23</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span className="text-gray-500">Cost:</span>
                        <span className="font-bold text-primary-600">₹150.25</span>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <button onClick={() => navigate(`/user/feedback/${sessionId}`)} className="w-full p-3 bg-primary-600 text-white font-semibold rounded-lg">Rate this Session</button>
                    <button onClick={() => navigate('/user')} className="w-full p-3 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg">Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default CallSummary;
