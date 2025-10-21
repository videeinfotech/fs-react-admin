import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { RatingIcon, SessionsTotalIcon, BellIcon } from '../../components/ui/icons/OtherIcons';
import { EarningsIcon } from '../../components/ui/icons/EarningsIcon';
import { IconProps } from '../../components/ui/icons/Icon';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-5 h-5 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (e: boolean) => void; }> = ({ enabled, setEnabled }) => (
    <button type="button" onClick={() => setEnabled(!enabled)} className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 items-center rounded-full`}>
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
    </button>
);

interface SessionRequest {
    id: number;
    user: string;
    category: string;
    mode: 'Chat' | 'Call' | 'Video';
    price: string;
    isRemoving?: boolean;
}

const Dashboard: React.FC = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [requests, setRequests] = useState<SessionRequest[]>([
        { id: 1, user: 'Riya S.', category: 'Anxiety', mode: 'Chat', price: '₹150' },
        { id: 2, user: 'Aman G.', category: 'Relationship', mode: 'Call', price: '₹300' },
        { id: 3, user: 'Priya P.', category: 'Stress', mode: 'Video', price: '₹500' },
    ]);
    const [activeSessions, setActiveSessions] = useState<SessionRequest[]>([]);
    
    const earningsData = [{ name: 'Mon', sessions: 4 }, { name: 'Tue', sessions: 6 }, { name: 'Wed', sessions: 5 }, { name: 'Thu', sessions: 8 }, { name: 'Fri', sessions: 7 }];

    const handleRequest = (id: number, accepted: boolean) => {
        const requestToHandle = requests.find(r => r.id === id);
        if (!requestToHandle) return;

        // Animate removal
        setRequests(prev => prev.map(r => r.id === id ? { ...r, isRemoving: true } : r));
        
        setTimeout(() => {
            setRequests(prev => prev.filter(r => r.id !== id));
            if (accepted) {
                // Move to active sessions
                setActiveSessions(prev => [{ ...requestToHandle, isRemoving: false }, ...prev]);
            }
        }, 300); // Duration should match animation
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Welcome, Ananya!</h1>
                    <div className="flex items-center space-x-2 mt-1">
                        <ToggleSwitch enabled={isOnline} setEnabled={setIsOnline} />
                        <span className={`text-sm font-semibold ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>{isOnline ? 'You are Online' : 'You are Offline'}</span>
                    </div>
                </div>
                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BellIcon />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-50 dark:border-gray-900"></span>
                </button>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Sessions" value="5" icon={<SessionsTotalIcon />} />
                <StatCard title="Active Chats" value={activeSessions.length.toString()} icon={<SessionsTotalIcon />} />
                <StatCard title="Weekly Earnings" value="₹8,200" icon={<EarningsIcon />} />
                <StatCard title="Average Rating" value="4.8" icon={<RatingIcon />} />
            </div>
            
            {/* New Session Requests */}
            <section>
                <h2 className="text-xl font-semibold mb-4">New Session Requests</h2>
                <div className="space-y-4">
                    {requests.length > 0 ? requests.map(req => (
                        <div key={req.id} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 ${req.isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            <div>
                                <p className="font-bold">{req.user}</p>
                                <p className="text-sm text-gray-500">{req.category} &bull; {req.mode} &bull; {req.price}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleRequest(req.id, false)} className="w-full sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Reject</button>
                                <button onClick={() => handleRequest(req.id, true)} className="w-full sm:w-auto px-4 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">Accept</button>
                            </div>
                        </div>
                    )) : <p className="text-gray-500 dark:text-gray-400 text-center py-4">No new requests right now.</p>}
                </div>
            </section>

            {/* Active Sessions */}
            {activeSessions.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
                    <div className="space-y-4">
                        {activeSessions.map(session => (
                            <ReactRouterDOM.Link key={session.id} to={`/listener/chat/sess_${session.id}`} className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{session.user}</p>
                                        <p className="text-sm text-gray-500">{session.category} &bull; {session.mode}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 text-green-500">
                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                                        <span>Ongoing</span>
                                    </div>
                                </div>
                            </ReactRouterDOM.Link>
                        ))}
                    </div>
                </section>
            )}
            
            {/* Daily Performance Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Daily Performance</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
