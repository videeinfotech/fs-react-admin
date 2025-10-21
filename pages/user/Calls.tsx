import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PhoneIcon, PhoneVideoIcon } from '../../components/ui/icons/OtherIcons';
import { mockListeners } from '../Listeners';

const StatusBadge: React.FC<{ status: 'Completed' | 'Missed' | 'Ongoing' }> = ({ status }) => {
    const classes = {
        Completed: 'bg-green-100 text-green-800',
        Missed: 'bg-red-100 text-red-800',
        Ongoing: 'bg-blue-100 text-blue-800 animate-pulse',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>{status}</span>;
}

const CallItem: React.FC<{ listener: any, type: 'Voice' | 'Video', duration: string, status: 'Completed' | 'Missed' | 'Ongoing' }> = ({ listener, type, duration, status }) => (
    <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <img src={listener.avatarUrl} alt={listener.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4 flex-1">
            <h3 className="font-bold">{listener.name}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
                {type === 'Voice' ? <PhoneIcon className="w-3 h-3" /> : <PhoneVideoIcon className="w-3 h-3" />}
                <span>{type} Call</span>
                <span>&bull;</span>
                <span>{duration}</span>
            </div>
        </div>
        <StatusBadge status={status} />
    </div>
);

const Calls: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'voice' | 'video'>('voice');
    const calls = [
        { listener: mockListeners[0], type: 'Voice' as const, duration: '15:23', status: 'Completed' as const },
        { listener: mockListeners[1], type: 'Video' as const, duration: '05:10', status: 'Missed' as const },
        { listener: mockListeners[1], type: 'Voice' as const, duration: '25:40', status: 'Completed' as const },
        { listener: mockListeners[0], type: 'Video' as const, duration: '30:00', status: 'Completed' as const },
        { listener: mockListeners[0], type: 'Voice' as const, duration: '02:15', status: 'Missed' as const },
        { listener: mockListeners[1], type: 'Voice' as const, duration: '45:11', status: 'Completed' as const },
        { listener: mockListeners[0], type: 'Video' as const, duration: '22:05', status: 'Completed' as const },
    ];

    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Your Calls</h1>
            </header>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('voice')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'voice' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Voice Calls</button>
                    <button onClick={() => setActiveTab('video')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'video' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Video Calls</button>
                </nav>
            </div>
            
             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Total Calls This Week</p>
                <p className="text-2xl font-bold">12 Calls</p>
            </div>

            {/* Call List */}
            <div className="space-y-2">
                {calls.filter(c => c.type.toLowerCase() === activeTab).map((call, i) => (
                    <CallItem key={i} {...call} />
                ))}
                 {calls.filter(c => c.type.toLowerCase() === activeTab).length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p>No {activeTab} calls found.</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <ReactRouterDOM.Link to="/user/find" className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition transform hover:scale-110">
                <PhoneIcon className="w-6 h-6" />
                <span className="sr-only">New Call</span>
            </ReactRouterDOM.Link>
        </div>
    );
};

export default Calls;
