import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PhoneIcon, PhoneVideoIcon } from '../../components/ui/icons/OtherIcons';

const StatusBadge: React.FC<{ status: 'Completed' | 'Missed' | 'Canceled' }> = ({ status }) => {
    const classes = {
        Completed: 'bg-green-100 text-green-800',
        Missed: 'bg-red-100 text-red-800',
        Canceled: 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>{status}</span>;
}

const CallItem: React.FC<{ user: { name: string, avatarUrl: string }, type: 'Voice' | 'Video', duration: string, earnings: number, status: 'Completed' | 'Missed' | 'Canceled' }> = ({ user, type, duration, earnings, status }) => (
    <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4 flex-1">
            <h3 className="font-bold">{user.name}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
                {type === 'Voice' ? <PhoneIcon className="w-3 h-3" /> : <PhoneVideoIcon className="w-3 h-3" />}
                <span>{type} Call</span>
                <span>&bull;</span>
                <span>{duration}</span>
                 <span>&bull;</span>
                <span className="font-semibold text-green-600">₹{earnings}</span>
            </div>
        </div>
        <StatusBadge status={status} />
    </div>
);

const Calls: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'voice' | 'video'>('voice');
    const calls = [
        { user: { name: 'Riya Sharma', avatarUrl: 'https://i.pravatar.cc/150?u=1' }, type: 'Voice', duration: '15:23', earnings: 150, status: 'Completed' },
        { user: { name: 'Aman Gupta', avatarUrl: 'https://i.pravatar.cc/150?u=2' }, type: 'Video', duration: '05:10', earnings: 100, status: 'Canceled' },
    ];

    return (
        <div className="p-4 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Session Calls</h1>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Start Call</button>
            </header>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('voice')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'voice' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Voice</button>
                    <button onClick={() => setActiveTab('video')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'video' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Video</button>
                </nav>
            </div>
            
             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Total Call Duration (This Week)</p>
                <p className="text-2xl font-bold">4h 32m</p>
            </div>

            <div className="space-y-2">
                {calls.filter(c => c.type.toLowerCase() === activeTab).map((call, i) => (
                    <CallItem key={i} {...call} />
                ))}
            </div>
        </div>
    );
};

export default Calls;