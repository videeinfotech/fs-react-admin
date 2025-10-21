import React from 'react';
import { useCall } from '../context/CallContext';
import * as ReactRouterDOM from 'react-router-dom';
import { PhoneIcon } from './ui/icons/OtherIcons';

const FloatingCallWidget: React.FC = () => {
    const { status, user } = useCall();
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();

    if (status !== 'in-call' || !user) {
        return null;
    }
    
    // Don't show if we are already on a call screen
    if (location.pathname.includes('/active-call/')) {
        return null;
    }

    const handleReturnToCall = () => {
        const role = location.pathname.split('/')[1]; // 'user' or 'listener'
        navigate(`/${role}/active-call/sess_${user.id}`);
    };

    return (
        <div 
            onClick={handleReturnToCall}
            className="fixed bottom-24 right-4 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg cursor-pointer animate-pulse flex items-center space-x-2"
        >
            <PhoneIcon className="w-6 h-6" />
            <span className="text-sm font-semibold pr-2">Return to call</span>
        </div>
    );
};

export default FloatingCallWidget;
