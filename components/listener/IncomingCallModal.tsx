import React from 'react';
import { PhoneIcon } from '../ui/icons/OtherIcons';

interface IncomingCallModalProps {
    user: string;
    onAccept: () => void;
    onReject: () => void;
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({ user, onAccept, onReject }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center w-full max-w-sm">
                <h2 className="text-2xl font-bold">Incoming Call</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">from</p>
                <p className="text-3xl font-bold text-primary-600 my-4">{user}</p>
                <div className="flex justify-center space-x-6 mt-8">
                    <button onClick={onReject} className="flex flex-col items-center space-y-2 text-red-500">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                           <PhoneIcon className="w-8 h-8 text-white transform rotate-[135deg]" />
                        </div>
                        <span>Decline</span>
                    </button>
                    <button onClick={onAccept} className="flex flex-col items-center space-y-2 text-green-500">
                         <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                           <PhoneIcon className="w-8 h-8 text-white" />
                        </div>
                        <span>Accept</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCallModal;
