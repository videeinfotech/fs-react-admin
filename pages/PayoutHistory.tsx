import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { DataTable } from '../components/ui/DataTable';
import { Payout } from '../types';

// Expanded Mock Data
const mockHistory: Payout[] = [
    { id: 'PO-001', listenerId: 102, listenerName: 'Riya Sharma', earnings: 7200, commissionPercent: 15, payableAmount: 6120, gateway: 'Razorpay', status: 'Completed', date: '2023-10-19' },
    { id: 'PO-002', listenerId: 209, listenerName: 'Aman Gupta', earnings: 4000, commissionPercent: 10, payableAmount: 3600, gateway: 'Payoneer', status: 'Completed', date: '2023-10-18' },
    { id: 'PO-003', listenerId: 305, listenerName: 'Priya Patel', earnings: 9500, commissionPercent: 12, payableAmount: 8360, gateway: 'PayPal', status: 'Failed', date: '2023-10-18' },
    { id: 'PO-004', listenerId: 411, listenerName: 'Karan Singh', earnings: 2200, commissionPercent: 15, payableAmount: 1870, gateway: 'PhonePe', status: 'Completed', date: '2023-10-15' },
    { id: 'PO-005', listenerId: 102, listenerName: 'Riya Sharma', earnings: 8000, commissionPercent: 15, payableAmount: 6800, gateway: 'Razorpay', status: 'Completed', date: '2023-09-28' },
    { id: 'PO-006', listenerId: 209, listenerName: 'Aman Gupta', earnings: 5000, commissionPercent: 10, payableAmount: 4500, gateway: 'Payoneer', status: 'Completed', date: '2023-09-25' },
    { id: 'PO-007', listenerId: 305, listenerName: 'Priya Patel', earnings: 11000, commissionPercent: 12, payableAmount: 9680, gateway: 'PayPal', status: 'Completed', date: '2023-09-22' },
    { id: 'PO-008', listenerId: 411, listenerName: 'Karan Singh', earnings: 3000, commissionPercent: 15, payableAmount: 2550, gateway: 'PhonePe', status: 'Completed', date: '2023-09-19' },
    { id: 'PO-009', listenerId: 102, listenerName: 'Riya Sharma', earnings: 6500, commissionPercent: 15, payableAmount: 5525, gateway: 'Razorpay', status: 'Completed', date: '2023-08-28' },
    { id: 'PO-010', listenerId: 209, listenerName: 'Aman Gupta', earnings: 4200, commissionPercent: 10, payableAmount: 3780, gateway: 'Payoneer', status: 'Completed', date: '2023-08-25' },
];

const PayoutHistory: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredHistory = useMemo(() => {
        return mockHistory.filter(payout => {
            if (!startDate && !endDate) {
                return true;
            }
            const payoutDate = new Date(payout.date);
            let passesDateFilter = true;

            if (startDate) {
                const start = new Date(startDate);
                if (payoutDate < start) {
                    passesDateFilter = false;
                }
            }
            
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // To include the whole end day
                if (payoutDate >= end) {
                    passesDateFilter = false;
                }
            }

            return passesDateFilter;
        });
    }, [startDate, endDate]);
    
    const payoutTrendData = useMemo(() => {
        if (filteredHistory.length === 0) return [];
        
        const monthlyTotals = filteredHistory.reduce((acc, payout) => {
            if (payout.status === 'Completed') {
                const date = new Date(payout.date);
                // Using a parseable YYYY-MM format as a key for reliable sorting.
                const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                acc[monthKey] = (acc[monthKey] || 0) + payout.payableAmount;
            }
            return acc;
        }, {} as Record<string, number>);

        const sortedMonthKeys = Object.keys(monthlyTotals).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            // FIX: The arithmetic operation error is resolved by using .getTime() to convert Date objects
            // to numbers before subtraction, which is required for sorting in TypeScript.
            return dateA.getTime() - dateB.getTime();
        });

        return sortedMonthKeys.map(monthKey => {
            const [year, month] = monthKey.split('-');
            const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
            const displayName = dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
            return {
                name: displayName,
                amount: monthlyTotals[monthKey],
            };
        });
    }, [filteredHistory]);

    const topListenersData = useMemo(() => {
        if (filteredHistory.length === 0) return [];

        const listenerTotals = filteredHistory.reduce((acc, payout) => {
            if (payout.status === 'Completed') {
                acc[payout.listenerName] = (acc[payout.listenerName] || 0) + payout.payableAmount;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(listenerTotals)
            .map(([name, earnings]) => ({ name, earnings }))
            .sort((a, b) => b.earnings - a.earnings)
            .slice(0, 10);
    }, [filteredHistory]);

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
            
             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                        <input 
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                        <input 
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div className="self-end">
                        <button 
                            onClick={() => { setStartDate(''); setEndDate(''); }}
                            className="w-full p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                            Reset Filters
                        </button>
                    </div>
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
                data={filteredHistory} 
                renderActions={renderActions}
            />
        </div>
    );
};

export default PayoutHistory;
