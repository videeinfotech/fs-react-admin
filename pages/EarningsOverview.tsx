import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DataTable } from '../components/ui/DataTable';
import { IconProps } from '../components/ui/icons/Icon';
import { RevenueIcon } from '../components/ui/icons/OtherIcons';
import { WalletIcon } from '../components/ui/icons/WalletIcon';
import { PayoutCycleIcon } from '../components/ui/icons/PayoutCycleIcon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';
import { Transaction } from '../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-8 h-8 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

// Mock Data
const weeklyPayoutData = [
    { name: 'Week 1', amount: 241600 },
    { name: 'Week 2', amount: 198300 },
    { name: 'Week 3', amount: 312500 },
    { name: 'Week 4', amount: 289400 },
];

const earningsGrowthData = [
    { name: 'Jan', earnings: 450000 },
    { name: 'Feb', earnings: 480000 },
    { name: 'Mar', earnings: 530000 },
    { name: 'Apr', earnings: 610000 },
    { name: 'May', earnings: 680000 },
    { name: 'Jun', earnings: 750000 },
];

const gatewayData = [
    { name: 'Razorpay', value: 400 },
    { name: 'PayPal', value: 300 },
    { name: 'Payoneer', value: 200 },
    { name: 'PhonePe', value: 100 },
];
const COLORS = ['#059669', '#34d399', '#6ee7b7', '#a7f3d0'];

// FIX: The `method` property for transactions was updated to align with the `Transaction` type definition. 'Razorpay' and 'PayPal' are categorized as 'Payment Gateway', and 'Manual' is corrected to 'Manual Adjustment'.
const mockTransactions: Transaction[] = [
    { id: 101, date: '2023-10-17', userOrListener: 'Ananya Mehta', userId: 1, description: 'Weekly Payout', type: 'Debit', amount: 2350, method: 'Payment Gateway', status: 'Completed' },
    { id: 102, date: '2023-10-17', userOrListener: 'Sameer Verma', userId: 2, description: 'Weekly Payout', type: 'Debit', amount: 1980, method: 'Payment Gateway', status: 'Completed' },
    { id: 103, date: '2023-10-16', userOrListener: 'Sunita Rao', userId: 3, description: 'Bonus Payout', type: 'Debit', amount: 500, method: 'Manual Adjustment', status: 'Completed' },
];

const EarningsOverview: React.FC = () => {
    const transactionColumns = [
        { header: 'Date', accessor: 'date' as keyof Transaction, sortable: true },
        { header: 'Listener', accessor: 'userOrListener' as keyof Transaction, sortable: true },
        { header: 'Amount', accessor: 'amount' as keyof Transaction, sortable: true, render: (t: Transaction) => `₹${t.amount.toLocaleString()}`},
        { header: 'Gateway', accessor: 'method' as keyof Transaction, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Transaction, sortable: true },
    ];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Earnings Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Platform Earnings" value="₹85,23,400" icon={<RevenueIcon />} />
                <StatCard title="Pending Payouts" value="₹2,41,600" icon={<WalletIcon />} />
                <StatCard title="Next Payout Date" value="Oct 24, 2025" icon={<PayoutCycleIcon />} />
                <StatCard title="Paid Listeners (MTD)" value="802" icon={<ListenersIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Payout Summary (₹)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyPayoutData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis dataKey="name" className="text-xs" />
                            <YAxis className="text-xs" tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} />
                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Bar dataKey="amount" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Gateway Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={gatewayData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                                {gatewayData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Listener Earnings Growth</h2>
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={earningsGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} />
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="earnings" stroke="#34d399" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
             <div>
                <h2 className="text-2xl font-bold mb-4">Recent Payout Transactions</h2>
                <DataTable columns={transactionColumns} data={mockTransactions} />
            </div>

        </div>
    );
};

export default EarningsOverview;