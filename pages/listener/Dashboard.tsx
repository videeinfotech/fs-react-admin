import React from 'react';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { RatingIcon, SessionsTotalIcon } from '../../components/ui/icons/OtherIcons';
import { EarningsIcon } from '../../components/ui/icons/EarningsIcon';
// FIX: Add IconProps to fix cloneElement typing issue
import { IconProps } from '../../components/ui/icons/Icon';

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
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

const Dashboard: React.FC = () => {
    const earningsData = [{ name: 'Mon', earnings: 1200 }, { name: 'Tue', earnings: 1800 }, { name: 'Wed', earnings: 1500 }, { name: 'Thu', earnings: 2500 }, { name: 'Fri', earnings: 2200 }];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Earnings (Today)" value="₹2,500" icon={<EarningsIcon />} />
                <StatCard title="Overall Rating" value="4.8" icon={<RatingIcon />} />
                <StatCard title="Sessions (Today)" value="5" icon={<SessionsTotalIcon />} />
            </div>

            {/* Charts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Weekly Earnings</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            {/* Active/Upcoming Sessions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Active & Upcoming Sessions</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/50 rounded-md">
                        <div>
                            <p className="font-semibold">Chat with Riya S.</p>
                            <p className="text-sm text-blue-600 dark:text-blue-300">Ongoing...</p>
                        </div>
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md">Join</button>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-md">
                        <div>
                            <p className="font-semibold">Call with Aman G.</p>
                            <p className="text-sm text-gray-500">Starts in 15 minutes</p>
                        </div>
                         <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-md">View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;