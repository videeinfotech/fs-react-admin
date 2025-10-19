import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { DataTable } from '../components/ui/DataTable';
import { Transaction } from '../types';
import { mockTransactions } from './Wallet';
import { UsersIcon } from '../components/ui/icons/UsersIcon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';
import { RevenueIcon, RatingIcon, SessionsTotalIcon } from '../components/ui/icons/OtherIcons';
import { IconProps } from '../components/ui/icons/Icon';

// Mock data for charts
const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 780 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 800 },
];

const revenueData = [
  { name: 'Jan', revenue: 240000 },
  { name: 'Feb', revenue: 139800 },
  { name: 'Mar', revenue: 980000 },
  { name: 'Apr', revenue: 390800 },
  { name: 'May', revenue: 480000 },
  { name: 'Jun', revenue: 380000 },
];

const topListenersData = [
  { name: 'Alice J.', revenue: 120000 },
  { name: 'Charles D.', revenue: 98000 },
  { name: 'Eva G.', revenue: 85000 },
  { name: 'Frank H.', revenue: 70000 },
  { name: 'Grace I.', revenue: 60000 },
];

const sessionVolumeData = [
  { name: 'Mon', chat: 20, call: 12, video: 5 },
  { name: 'Tue', chat: 30, call: 22, video: 8 },
  { name: 'Wed', chat: 25, call: 15, video: 10 },
  { name: 'Thu', chat: 40, call: 25, video: 12 },
  { name: 'Fri', chat: 50, call: 30, video: 15 },
  { name: 'Sat', chat: 60, call: 40, video: 20 },
  { name: 'Sun', chat: 55, call: 35, video: 18 },
];

const paymentSourcesData = [
  { name: 'Razorpay', value: 400 },
  { name: 'PhonePe', value: 300 },
  { name: 'PayPal', value: 300 },
  { name: 'Payoneer', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const Reports: React.FC = () => {
    const transactionColumns = [
        { header: 'ID', accessor: 'id' as keyof Transaction, sortable: true },
        { header: 'User/Listener', accessor: 'userOrListener' as keyof Transaction, sortable: true },
        { header: 'Amount', accessor: 'amount' as keyof Transaction, sortable: true },
        { header: 'Method', accessor: 'method' as keyof Transaction, sortable: true },
        { header: 'Date', accessor: 'date' as keyof Transaction, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Transaction, sortable: true },
    ];
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>

            {/* Main Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard title="Total Users" value="1,234" icon={<UsersIcon />} />
                <StatCard title="Total Listeners" value="78" icon={<ListenersIcon />} />
                <StatCard title="Total Sessions" value="2,456" icon={<SessionsTotalIcon />} />
                <StatCard title="Revenue (30d)" value="₹12,98,760" icon={<RevenueIcon />} />
                <StatCard title="Avg. Rating" value="4.8" icon={<RatingIcon />} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Growth</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis dataKey="name" className="text-xs dark:fill-gray-400" />
                            <YAxis className="text-xs dark:fill-gray-400" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis dataKey="name" className="text-xs dark:fill-gray-400" />
                            <YAxis className="text-xs dark:fill-gray-400" />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                            <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Performing Listeners</h2>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={topListenersData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} className="text-xs dark:fill-gray-400" />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Bar dataKey="revenue" fill="#34d399" background={{ fill: '#4b5563' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Session Volume (This Week)</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sessionVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis dataKey="name" className="text-xs dark:fill-gray-400" />
                            <YAxis className="text-xs dark:fill-gray-400" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                            <Bar dataKey="chat" stackId="a" fill="#059669" />
                            <Bar dataKey="call" stackId="a" fill="#34d399" />
                            <Bar dataKey="video" stackId="a" fill="#a7f3d0" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md col-span-1 lg:col-span-2 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Payment Sources</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={paymentSourcesData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                                {paymentSourcesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tables Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                <DataTable columns={transactionColumns} data={mockTransactions.slice(0, 10)} />
            </div>
        </div>
    );
};

export default Reports;