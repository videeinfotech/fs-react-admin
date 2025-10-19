import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { DataTable } from '../components/ui/DataTable';
import { Payout } from '../types';

// Mock Data
const mockHistory: Payout[] = [
    { id: 'PO-002', listenerId: 209, listenerName: 'Aman Gupta', earnings: 4000, commissionPercent: 10, payableAmount: 3600, gateway: 'Payoneer', status: 'Completed', date: '2023-10-18' },
    { id: 'PO-001', listenerId: 102, listenerName: 'Riya Sharma', earnings: 7200, commissionPercent: 15, payableAmount: 6120, gateway: 'Razorpay', status: 'Completed', date: '2023-10-19' },
    { id: 'PO-003', listenerId: 305, listenerName: 'Priya Patel', earnings: 9500, commissionPercent: 12, payableAmount: 8360, gateway: 'PayPal', status: 'Failed', date: '2023-10-18' },
];

const payoutTrendData = [
    { name: 'Jan', amount: 450000 },
    { name: 'Feb', amount: 480000 },
    { name: 'Mar', amount: 530000 },
    { name: 'Apr', amount: 610000 },
];

const topListenersData = [
    { name: 'Priya Patel', earnings: 85000 },
    { name: 'Aman Gupta', earnings: 78000 },
    { name: 'Riya Sharma', earnings: 72000 },
];


const PayoutHistory: React.FC = () => {
    const historyColumns = [
        { header: 'Date', accessor: 'date' as keyof Payout, sortable: true },
        { header: 'Listener', accessor: 'listenerName' as keyof Payout, sortable: true },
        { header: 'Amount', accessor: 'payableAmount' as keyof Payout, sortable: true, render: (p: Payout) => `₹${p.payableAmount.toLocaleString()}` },
        { header: 'Gateway', accessor: 'gateway' as keyof Payout, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Payout, sortable: true },
    ];
    
    const renderActions = (payout: Payout) => (
        <div className="space-x-2">
            <button className="text-primary-600 hover:underline">Invoice</button>
            <button className="text-blue-600 hover:underline">Receipt</button>
        </div>
    );
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Payout History & Reports</h1>
                <div className="space-x-2">
                    <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg">Export PDF</button>
                    <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg">Export CSV</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Total Payout Trend</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={payoutTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(v) => `₹${(v as number / 1000)}k`} />
                            <Tooltip formatter={(v) => `₹${(v as number).toLocaleString()}`} />
                            <Line type="monotone" dataKey="amount" stroke="#10b981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top 10 Listeners by Earnings</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topListenersData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} />
                            <Tooltip formatter={(v) => `₹${(v as number).toLocaleString()}`} />
                            <Bar dataKey="earnings" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <DataTable 
                columns={historyColumns} 
                data={mockHistory} 
                renderActions={renderActions}
            />
        </div>
    );
};

export default PayoutHistory;
