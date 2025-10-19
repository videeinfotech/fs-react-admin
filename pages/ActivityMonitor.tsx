import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { IconProps } from '../components/ui/icons/Icon';
import { UsersIcon } from '../components/ui/icons/UsersIcon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';
import { ClockIcon, PhoneVideoIcon, RevenueIcon, WalletRechargeIcon, BellIcon, RatingIcon } from '../components/ui/icons/OtherIcons';
import { DataTable } from '../components/ui/DataTable';

// --- MOCK DATA ---
const userLoginData = Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, logins: Math.floor(Math.random() * 100) + 10 }));
const engagementData = [{ name: 'Chat', value: 400 }, { name: 'Voice', value: 300 }, { name: 'Video', value: 300 }];
const funnelData = [{ stage: 'App Open', value: 10000 }, { stage: 'Login', value: 8500 }, { stage: 'Chat Started', value: 5100 }, { stage: 'Call Made', value: 2550 }, { stage: 'Feedback Submitted', value: 1275 }];
const mockUserActivity = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Online', lastActive: '1 min ago', sessions: 12, wallet: 50.25, spent: 450, rating: 4.5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'In Call', lastActive: 'Now', sessions: 5, wallet: 25.00, spent: 150, rating: 4.8 },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', status: 'Idle', lastActive: '15 mins ago', sessions: 25, wallet: 300.00, spent: 800, rating: 4.9 },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', status: 'Offline', lastActive: '2 hours ago', sessions: 2, wallet: 0.00, spent: 50, rating: 4.2 },
];

const listenerOnlineData = Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, online: Math.floor(Math.random() * 50) + 5 }));
const topListenersData = [
    { name: 'Alice J.', sessions: 150, rating: 4.8, earnings: 3000, availability: '95%', status: 'Online' },
    { name: 'Charles D.', sessions: 120, rating: 4.9, earnings: 2500, availability: '92%', status: 'Offline' },
    { name: 'Eva G.', sessions: 110, rating: 4.7, earnings: 2200, availability: '88%', status: 'In Call' },
];
const revenuePerListenerData = topListenersData.map(l => ({ name: l.name, revenue: l.earnings })).sort((a,b) => b.revenue - a.revenue);
const mockListenerActivity = topListenersData.map((l, i) => ({ id: i + 1, ...l }));


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

const FunnelChart: React.FC<{ data: { stage: string, value: number }[] }> = ({ data }) => {
    const maxValue = data[0]?.value || 1;
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Funnel</h2>
            <div className="flex flex-col items-center space-y-1">
                {data.map((item, index) => {
                    const percentageOfMax = (item.value / maxValue) * 100;
                    const conversionRate = index > 0 ? ((item.value / data[index - 1].value) * 100).toFixed(1) + '%' : null;
                    return (
                        <div key={item.stage} className="w-full flex flex-col items-center">
                            {conversionRate && (
                                <div className="text-center text-xs my-1 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                    {conversionRate}
                                </div>
                            )}
                            <div className="bg-primary-500 text-white text-center py-2 rounded-sm transition-all duration-300" style={{ width: `${Math.max(percentageOfMax, 10)}%` }}>
                                <p className="font-bold text-sm">{item.stage}</p>
                                <p className="text-xs">{item.value.toLocaleString()}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

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
const UserActivityView: React.FC = () => {
    const userColumns = useMemo(() => [
        { header: 'User', accessor: 'name' as const, sortable: true, render: (item: any) => <div className="font-medium text-gray-900 dark:text-white">{item.name}</div> },
        { header: 'Status', accessor: 'status' as const, sortable: true, render: (item: any) => {
            const colors = { Online: 'bg-green-500', 'In Call': 'bg-blue-500', Idle: 'bg-yellow-500', Offline: 'bg-gray-400' };
            return <div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${colors[item.status]}`}></span>{item.status}</div>
        }},
        { header: 'Last Active', accessor: 'lastActive' as const, sortable: true },
        { header: 'Wallet', accessor: 'wallet' as const, sortable: true, render: (item: any) => `$${item.wallet.toFixed(2)}` },
        { header: 'Avg Rating', accessor: 'rating' as const, sortable: true },
    ], []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard title="Active Users Now" value="345" icon={<UsersIcon />} />
                <StatCard title="Total Users" value="1,234" icon={<UsersIcon />} />
                <StatCard title="Avg Session (Today)" value="18 min" icon={<ClockIcon />} />
                <StatCard title="Chats Started (Today)" value="456" icon={<ListenersIcon />} />
                <StatCard title="Calls (Today)" value="123" icon={<PhoneVideoIcon />} />
                <StatCard title="Recharges (Today)" value="$2,345" icon={<WalletRechargeIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Login Activity (24h)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userLoginData}><CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" /><XAxis dataKey="name" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Line type="monotone" dataKey="logins" stroke="#10b981" strokeWidth={2} dot={false} /></LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Engagement Breakdown</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={engagementData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{['#059669', '#34d399', '#a7f3d0'].map(color => <Cell key={color} fill={color} />)}</Pie>
                            <Tooltip /><Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <FunnelChart data={funnelData} />
                <Heatmap title="Session Activity Heatmap" />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">User Activity Table</h2>
                <DataTable columns={userColumns} data={mockUserActivity} />
            </div>
        </div>
    );
};

const ListenerActivityView: React.FC = () => {
    const listenerColumns = useMemo(() => [
        { header: 'Listener', accessor: 'name' as const, sortable: true, render: (item: any) => <div className="font-medium text-gray-900 dark:text-white">{item.name}</div> },
        { header: 'Status', accessor: 'status' as const, sortable: true, render: (item: any) => {
            const colors = { Online: 'bg-green-500', 'In Call': 'bg-blue-500', Offline: 'bg-gray-400' };
            return <div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${colors[item.status]}`}></span>{item.status}</div>
        }},
        { header: 'Earnings (Today)', accessor: 'earnings' as const, sortable: true, render: (item: any) => `$${(item.earnings/30).toFixed(2)}` },
        { header: 'Avg Rating', accessor: 'rating' as const, sortable: true },
        { header: 'Total Sessions', accessor: 'sessions' as const, sortable: true },
    ], []);

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard title="Listeners Online" value="45" icon={<ListenersIcon />} />
                <StatCard title="Active Sessions" value="28" icon={<PhoneVideoIcon />} />
                <StatCard title="Avg Session (Today)" value="22 min" icon={<ClockIcon />} />
                <StatCard title="Earnings (Today)" value="$5,678" icon={<RevenueIcon />} />
                <StatCard title="Avg Rating (7d)" value="4.85" icon={<RatingIcon />} />
                <StatCard title="Pending Requests" value="3" icon={<BellIcon />} />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Listeners Online (24h)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={listenerOnlineData}><CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" /><XAxis dataKey="name" className="text-xs" /><YAxis className="text-xs" /><Tooltip /><Bar dataKey="online" fill="#10b981" /></BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue per Listener (This Week)</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenuePerListenerData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} className="text-xs dark:fill-gray-400" />
                            <Tooltip /><Bar dataKey="revenue" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-4">Top Performing Listeners</h2>
                <DataTable columns={[...listenerColumns, { header: 'Availability', accessor: 'availability' as const, sortable: true }]} data={mockListenerActivity} />
            </div>
        </div>
    );
};


const ActivityMonitor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'user' | 'listener'>('user');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">User & Listener Activity Monitoring</h1>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('user')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'user' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>User Activity</button>
                    <button onClick={() => setActiveTab('listener')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'listener' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Listener Activity</button>
                </nav>
            </div>
            <div>
                {activeTab === 'user' ? <UserActivityView /> : <ListenerActivityView />}
            </div>
        </div>
    );
};

export default ActivityMonitor;