import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { IconProps } from '../components/ui/icons/Icon';
import { UsersIcon } from '../components/ui/icons/UsersIcon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';
import { ClockIcon, PhoneVideoIcon, RevenueIcon, WalletRechargeIcon, BellIcon, RatingIcon } from '../components/ui/icons/OtherIcons';
import { DataTable } from '../components/ui/DataTable';
import { useToast } from '../hooks/useToast';

// --- MOCK DATA ---
const userLoginData = Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, logins: Math.floor(Math.random() * 100) + 10 }));
const dauMauData = [
  { name: 'Jan', dau: 400, mau: 2400 },
  { name: 'Feb', dau: 300, mau: 2210 },
  { name: 'Mar', dau: 200, mau: 2290 },
  { name: 'Apr', dau: 278, mau: 2000 },
  { name: 'May', dau: 189, mau: 2181 },
  { name: 'Jun', dau: 239, mau: 2500 },
];
const engagementData = [{ name: 'Chat', value: 400 }, { name: 'Voice', value: 300 }, { name: 'Video', value: 150 }, { name: 'Idle', value: 150 }];
const mockUserActivity = [
    { id: 1, name: 'Riya Sharma', email: 'riya@example.com', status: 'Online', currentSessionId: null, lastActive: '1 min ago', totalSessions: 12, totalSpent: 45000, avgRating: 4.5, walletBalance: 5025.50 },
    { id: 2, name: 'Aman Gupta', email: 'aman@example.com', status: 'In Call', currentSessionId: 'sess_live_1', lastActive: 'Now', totalSessions: 5, totalSpent: 15000, avgRating: 4.8, walletBalance: 2500.00 },
    { id: 3, name: 'Priya Patel', email: 'priya@example.com', status: 'Chatting', currentSessionId: 'sess_live_2', lastActive: 'Now', totalSessions: 25, totalSpent: 80000, avgRating: 4.9, walletBalance: 30000.00 },
    { id: 4, name: 'Karan Singh', email: 'karan@example.com', status: 'Offline', currentSessionId: null, lastActive: '2 hours ago', totalSessions: 2, totalSpent: 5000, avgRating: 4.2, walletBalance: 0.00 },
];

const listenerOnlineData = Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, online: Math.floor(Math.random() * 50) + 5 }));
const ratingTrendData = [ { name: 'Jan', rating: 4.5 }, { name: 'Feb', rating: 4.6 }, { name: 'Mar', rating: 4.5 }, { name: 'Apr', rating: 4.7 }, { name: 'May', rating: 4.8 }, { name: 'Jun', rating: 4.85 }];
const topListenersData = [
    { id: 1, name: 'Dr. Ananya Mehta', expertise: 'Relationship', currentStatus: 'In Call', currentSessionId: 'sess_live_1', ongoingUser: 'Riya Sharma', totalSessions: 150, avgRating: 4.8, earningsToday: 2350, availability: 95 },
    { id: 2, name: 'Mr. Sameer Verma', expertise: 'Emotional Healing', currentStatus: 'Chatting', currentSessionId: 'sess_live_2', ongoingUser: 'Aman Gupta', totalSessions: 120, avgRating: 4.9, earningsToday: 1540, availability: 92 },
    { id: 3, name: 'Ms. Sunita Rao', expertise: 'Stress Relief', currentStatus: 'Online', currentSessionId: null, ongoingUser: null, totalSessions: 110, avgRating: 4.7, earningsToday: 0, availability: 88 },
];
const liveUserActivity = [ mockUserActivity[1], mockUserActivity[2] ];
const liveListenerActivity = [ topListenersData[0], topListenersData[1] ];

// --- REUSABLE COMPONENTS ---
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const Heatmap: React.FC<{ title: string }> = ({ title }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 12 }, (_, i) => `${(i * 2)}h`);
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <div>
                <div className="flex ml-8">
                    {hours.map(hour => <div key={hour} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">{hour}</div>)}
                </div>
                {days.map(day => (
                    <div key={day} className="flex items-center mt-1">
                        <div className="w-8 text-right text-xs text-gray-500 dark:text-gray-400 pr-1">{day}</div>
                        <div className="flex-1 grid grid-cols-12 gap-1">
                            {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`h-4 rounded-sm bg-primary-500`} style={{ opacity: Math.random() }} title={`${Math.floor(Math.random()*100)}% activity`} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- VIEW COMPONENTS ---
const UserMonitoringView: React.FC = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const userColumns = useMemo(() => [
        { header: 'User', accessor: 'name' as const, sortable: true, render: (item: any) => <div className="font-medium text-gray-900 dark:text-white">{item.name}</div> },
        { header: 'Status', accessor: 'status' as const, sortable: true, render: (item: any) => {
            const colors: Record<string, string> = { Online: 'bg-green-500', 'In Call': 'bg-blue-500', Chatting: 'bg-blue-500', Idle: 'bg-yellow-500', Offline: 'bg-gray-400' };
            const pulse = item.status === 'In Call' || item.status === 'Chatting' || item.status === 'Online' ? 'animate-pulse' : '';
            return <div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${colors[item.status]} ${pulse}`}></span>{item.status}</div>
        }},
        { header: 'Last Active', accessor: 'lastActive' as const, sortable: true },
        { header: 'Wallet', accessor: 'walletBalance' as const, sortable: true, render: (item: any) => `₹${item.walletBalance.toFixed(2)}` },
        { header: 'Avg Rating', accessor: 'avgRating' as const, sortable: true },
    ], []);
    
    const renderUserActions = (user: any) => (
        <div className="space-x-2">
            <button onClick={() => navigate(`/users/${user.id}`)} className="text-primary-600 hover:underline text-sm">View</button>
            <button onClick={() => addToast(`Suspended user ${user.name}`, 'info')} className="text-red-600 hover:underline text-sm">Suspend</button>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard title="Users Online Now" value="345" icon={<UsersIcon />} />
                <StatCard title="Chats Active (Live)" value="102" icon={<ListenersIcon />} />
                <StatCard title="Calls in Progress" value="57" icon={<PhoneVideoIcon />} />
                <StatCard title="Avg Session (Today)" value="18 min" icon={<ClockIcon />} />
                <StatCard title="Wallet Recharges (Today)" value="₹1,92,345" icon={<WalletRechargeIcon />} />
                <StatCard title="New Signups (24h)" value="42" icon={<UsersIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Login Frequency (24h)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={userLoginData}><CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" /><XAxis dataKey="name" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Area type="monotone" dataKey="logins" stroke="#10b981" fill="#10b981" fillOpacity={0.3} /></AreaChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Engagement Breakdown</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={engagementData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{['#059669', '#34d399', '#a7f3d0', '#6b7280'].map(color => <Cell key={color} fill={color} />)}</Pie>
                            <Tooltip /><Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Retention (DAU vs MAU)</h2>
                    <ResponsiveContainer width="100%" height={300}><LineChart data={dauMauData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="dau" name="Daily Active Users" stroke="#8884d8" /><Line type="monotone" dataKey="mau" name="Monthly Active Users" stroke="#82ca9d" /></LineChart></ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Active vs Inactive Users</h2>
                    <ResponsiveContainer width="100%" height={300}><BarChart data={[{name: 'Users', active: 850, inactive: 384}]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="active" fill="#34d399" /><Bar dataKey="inactive" fill="#ef4444" /></BarChart></ResponsiveContainer>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">User Monitoring Table</h2>
                <DataTable columns={userColumns} data={mockUserActivity} renderActions={renderUserActions} />
            </div>
        </div>
    );
};

const ListenerMonitoringView: React.FC = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const listenerColumns = useMemo(() => [
        { header: 'Listener', accessor: 'name' as const, sortable: true },
        { header: 'Status', accessor: 'currentStatus' as const, sortable: true, render: (item: any) => {
            const colors: Record<string, string> = { Online: 'bg-green-500', 'In Call': 'bg-blue-500', Chatting: 'bg-blue-500', Offline: 'bg-gray-400' };
            const pulse = item.currentStatus !== 'Offline' ? 'animate-pulse' : '';
            return <div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${colors[item.currentStatus]} ${pulse}`}></span>{item.currentStatus}</div>
        }},
        { header: 'Earnings (Today)', accessor: 'earningsToday' as const, sortable: true, render: (item: any) => `₹${item.earningsToday.toFixed(2)}` },
        { header: 'Avg Rating', accessor: 'avgRating' as const, sortable: true },
        { header: 'Availability %', accessor: 'availability' as const, sortable: true, render: (item: any) => `${item.availability}%` },
    ], []);

    const renderListenerActions = (listener: any) => (
         <div className="space-x-2">
            <button onClick={() => navigate(`/listeners/${listener.id}`)} className="text-primary-600 hover:underline text-sm">View</button>
            <button onClick={() => addToast(`Suspended listener ${listener.name}`, 'info')} className="text-red-600 hover:underline text-sm">Suspend</button>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard title="Listeners Online" value="45" icon={<ListenersIcon />} />
                <StatCard title="Active Sessions" value="28" icon={<PhoneVideoIcon />} />
                <StatCard title="Avg Session (Today)" value="22 min" icon={<ClockIcon />} />
                <StatCard title="Earnings (Today)" value="₹4,65,789" icon={<RevenueIcon />} />
                <StatCard title="Average Rating" value="4.85" icon={<RatingIcon />} />
                <StatCard title="Pending Requests" value="3" icon={<BellIcon />} />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Listener Online Hours (24h)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={listenerOnlineData}><CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" /><XAxis dataKey="name" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Bar dataKey="online" fill="#10b981" /></BarChart>
                    </ResponsiveContainer>
                </div>
                <Heatmap title="Listener Availability Heatmap" />
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rating Trend</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={ratingTrendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis domain={[4, 5]} /><Tooltip /><Line type="monotone" dataKey="rating" stroke="#ffc658" /></LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Session Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={[{ name: 'Chat', value: 550 }, { name: 'Voice', value: 350 }, { name: 'Video', value: 100 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{['#059669', '#34d399', '#a7f3d0'].map(color => <Cell key={color} fill={color} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-4">Top Performing Listeners Leaderboard</h2>
                <DataTable columns={listenerColumns} data={topListenersData} renderActions={renderListenerActions} />
            </div>
        </div>
    );
};

const LiveDashboardView: React.FC = () => (
    <div className="space-y-6 animate-fade-in">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><p className="text-sm text-gray-500">Users Online</p><p className="text-2xl font-bold">345</p></div>
                <div><p className="text-sm text-gray-500">Listeners Online</p><p className="text-2xl font-bold">45</p></div>
                <div><p className="text-sm text-gray-500">Active Calls</p><p className="text-2xl font-bold">57</p></div>
                <div><p className="text-sm text-gray-500">Active Chats</p><p className="text-2xl font-bold">102</p></div>
            </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                 <h2 className="text-2xl font-bold mb-4">Live Users</h2>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-2">User</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Listener</th><th className="px-4 py-2">Duration</th></tr></thead>
                            <tbody>{liveUserActivity.map(user => <tr key={user.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-2 font-medium">{user.name}</td>
                                <td className="px-4 py-2">{user.status}</td>
                                <td className="px-4 py-2">{user.status !== 'Offline' ? topListenersData.find(l=>l.currentSessionId === user.currentSessionId)?.name : 'N/A'}</td>
                                <td className="px-4 py-2">{user.status !== 'Offline' ? `${Math.floor(Math.random()*20)}:${Math.floor(Math.random()*60).toString().padStart(2,'0')}` : 'N/A'}</td>
                            </tr>)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
             <div>
                 <h2 className="text-2xl font-bold mb-4">Live Listeners</h2>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-2">Listener</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Current User</th><th className="px-4 py-2">Earnings (Today)</th></tr></thead>
                            <tbody>{liveListenerActivity.map(l => <tr key={l.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-2 font-medium">{l.name}</td>
                                <td className="px-4 py-2">{l.currentStatus}</td>
                                <td className="px-4 py-2">{l.ongoingUser}</td>
                                <td className="px-4 py-2">₹{l.earningsToday.toFixed(2)}</td>
                            </tr>)}</tbody>
                        </table>
                    </div>
                 </div>
            </div>
         </div>
    </div>
);


const Monitoring: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'listeners' | 'live'>('users');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Users & Listeners Monitoring</h1>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('users')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Users Overview</button>
                    <button onClick={() => setActiveTab('listeners')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'listeners' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Listeners Overview</button>
                    <button onClick={() => setActiveTab('live')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'live' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Live Dashboard</button>
                </nav>
            </div>
            <div>
                {activeTab === 'users' && <UserMonitoringView />}
                {activeTab === 'listeners' && <ListenerMonitoringView />}
                {activeTab === 'live' && <LiveDashboardView />}
            </div>
        </div>
    );
};

export default Monitoring;