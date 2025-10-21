import React, { useState, useMemo } from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DataTable } from '../components/ui/DataTable';
import { IconProps } from '../components/ui/icons/Icon';
import { RevenueIcon, DownloadIcon, FilterIcon, ResetIcon, TrendingUpIcon, BrainIcon, PdfIcon } from '../components/ui/icons/OtherIcons';
import { WalletIcon } from '../components/ui/icons/WalletIcon';
import { PayoutCycleIcon } from '../components/ui/icons/PayoutCycleIcon';
import { Payout, PayoutStatus, Gateway } from '../types';

// --- ENHANCED MOCK DATA ---
interface PayoutTransaction extends Payout {
  sessionCount: number;
  commission: number;
  listenerCategory: string;
  region: string;
}

const mockPayoutTransactions: PayoutTransaction[] = [
    { id: 'PO-101', listenerId: 101, listenerName: 'Riya Sharma', earnings: 6800, commissionPercent: 10, payableAmount: 6120, gateway: 'Razorpay', status: 'Completed', date: '2023-10-18', sessionCount: 8, commission: 680, listenerCategory: 'Relationship', region: 'India' },
    { id: 'PO-102', listenerId: 220, listenerName: 'Aman Gupta', earnings: 3777, commissionPercent: 10, payableAmount: 3400, gateway: 'Payoneer', status: 'Pending', date: '2023-10-18', sessionCount: 4, commission: 377, listenerCategory: 'Stress', region: 'USA' },
    { id: 'PO-103', listenerId: 330, listenerName: 'Neha Patel', earnings: 4555, commissionPercent: 10, payableAmount: 4100, gateway: 'PayPal', status: 'Failed', date: '2023-10-17', sessionCount: 6, commission: 455, listenerCategory: 'Anxiety', region: 'UK' },
    { id: 'PO-104', listenerId: 412, listenerName: 'Karan Singh', earnings: 8200, commissionPercent: 12, payableAmount: 7216, gateway: 'Razorpay', status: 'Completed', date: '2023-10-11', sessionCount: 10, commission: 984, listenerCategory: 'Relationship', region: 'India' },
    { id: 'PO-105', listenerId: 501, listenerName: 'Priya Desai', earnings: 3100, commissionPercent: 10, payableAmount: 2790, gateway: 'PhonePe', status: 'Pending', date: '2023-10-18', sessionCount: 5, commission: 310, listenerCategory: 'Emotional Wellness', region: 'India' },
];
const earningsGrowthData = [{ name: 'Jan', earnings: 450000 }, { name: 'Feb', earnings: 480000 }, { name: 'Mar', earnings: 530000 }, { name: 'Apr', earnings: 610000 }];
const sparklineData = [{ name: 'W1', v: 100 }, { name: 'W2', v: 200 }, { name: 'W3', v: 150 }, { name: 'W4', v: 250 }];


// --- REUSABLE COMPONENTS ---
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps>; trend: string; sparklineData: any[] }> = ({ title, value, icon, trend, sparklineData }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-start justify-between">
        <div>
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full inline-block">
                {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-3">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className="flex items-center text-xs text-green-600">
                <TrendingUpIcon className="w-4 h-4" />
                <span>{trend} vs last month</span>
            </div>
        </div>
        <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const StatusChip: React.FC<{ status: PayoutStatus }> = ({ status }) => {
    const classes: Record<PayoutStatus, string> = {
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Failed: 'bg-red-100 text-red-800',
        Processing: 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>{status}</span>
};

// --- MAIN COMPONENT ---
const EarningsOverview: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const [filters, setFilters] = useState({ search: '', gateway: 'All', status: 'All' });
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);

    const filteredData = useMemo(() => {
        return mockPayoutTransactions.filter(p => {
            const searchLower = filters.search.toLowerCase();
            const searchMatch = !filters.search || p.listenerName.toLowerCase().includes(searchLower) || p.id.toLowerCase().includes(searchLower);
            const gatewayMatch = filters.gateway === 'All' || p.gateway === filters.gateway;
            const statusMatch = filters.status === 'All' || p.status === filters.status;
            return searchMatch && gatewayMatch && statusMatch;
        });
    }, [filters]);

    const kpiData = useMemo(() => {
        const totalEarnings = filteredData.reduce((sum, p) => sum + p.earnings, 0);
        const pendingPayouts = filteredData.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.payableAmount, 0);
        return { totalEarnings, pendingPayouts };
    }, [filteredData]);
    
    const gatewayDistribution = useMemo(() => {
        const counts = filteredData.reduce((acc, p) => {
            acc[p.gateway] = (acc[p.gateway] || 0) + p.payableAmount;
            return acc;
        }, {} as Record<Gateway, number>);
        return Object.entries(counts).map(([name, amount]) => ({ name, amount }));
    }, [filteredData]);

    const statusDistribution = useMemo(() => {
        const counts = filteredData.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<PayoutStatus, number>);
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [filteredData]);

    const transactionColumns = [
        { header: 'Date', accessor: 'date' as keyof PayoutTransaction, sortable: true },
        { header: 'Listener', accessor: 'listenerName' as keyof PayoutTransaction, sortable: true, render: (p: PayoutTransaction) => <button onClick={() => navigate(`/admin/listeners/${p.listenerId}`)} className="text-primary-600 hover:underline">{p.listenerName} (L-{p.listenerId})</button> },
        { header: 'Session Count', accessor: 'sessionCount' as keyof PayoutTransaction, sortable: true },
        { header: 'Gateway', accessor: 'gateway' as keyof PayoutTransaction, sortable: true },
        { header: 'Amount', accessor: 'payableAmount' as keyof PayoutTransaction, sortable: true, render: (p: PayoutTransaction) => `₹${p.payableAmount.toLocaleString()}`},
        { header: 'Commission', accessor: 'commission' as keyof PayoutTransaction, sortable: true, render: (p: PayoutTransaction) => `₹${p.commission.toLocaleString()}`},
        { header: 'Status', accessor: 'status' as keyof PayoutTransaction, sortable: true, render: (p: PayoutTransaction) => <StatusChip status={p.status} /> },
        { header: 'Invoice', accessor: 'id' as keyof PayoutTransaction, sortable: false, render: (p: PayoutTransaction) => <button className="text-gray-500 hover:text-primary-600 p-1"><PdfIcon /></button> },
    ];
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Earnings Overview</h1>

            {/* Filters */}
            <div className="sticky top-[70px] bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg shadow-sm z-20">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><FilterIcon /> Filters</h2>
                    <button onClick={() => setIsFiltersVisible(!isFiltersVisible)} className="lg:hidden text-sm text-primary-600">{isFiltersVisible ? 'Hide' : 'Show'}</button>
                </div>
                {isFiltersVisible && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end animate-fade-in">
                        <input type="text" placeholder="Search by Listener, ID..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 lg:col-span-2" />
                        <select value={filters.gateway} onChange={e => setFilters({...filters, gateway: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"><option>All Gateways</option><option>Razorpay</option><option>PayPal</option><option>Payoneer</option><option>PhonePe</option></select>
                        <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"><option>All Statuses</option><option>Completed</option><option>Pending</option><option>Failed</option></select>
                        <div className="flex gap-2 lg:col-span-4 justify-end">
                            <button onClick={() => setFilters({ search: '', gateway: 'All', status: 'All' })} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center gap-1"><ResetIcon /> Reset</button>
                            <button className="px-4 py-2 text-sm text-white bg-primary-600 rounded-lg flex items-center gap-1"><DownloadIcon /> Export</button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Earnings (Filtered)" value={`₹${kpiData.totalEarnings.toLocaleString()}`} icon={<RevenueIcon />} trend="+8%" sparklineData={sparklineData} />
                <StatCard title="Pending Payouts (Filtered)" value={`₹${kpiData.pendingPayouts.toLocaleString()}`} icon={<WalletIcon />} trend="+3%" sparklineData={sparklineData.slice().reverse()} />
                <StatCard title="Commission Earned" value="₹82,300" icon={<RevenueIcon />} trend="+12%" sparklineData={sparklineData} />
                <StatCard title="Upcoming Payout" value="Oct 24" icon={<PayoutCycleIcon />} trend="₹2.45L" sparklineData={sparklineData} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Charts */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Earnings Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}><LineChart data={earningsGrowthData}><CartesianGrid /><XAxis dataKey="name" /><YAxis tickFormatter={(v) => `₹${(v as number / 1000)}k`} /><Tooltip formatter={(v) => `₹${(v as number).toLocaleString()}`} /><Line type="monotone" dataKey="earnings" stroke="#34d399" /></LineChart></ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"><h2 className="text-lg font-semibold mb-4">Gateway Distribution</h2><ResponsiveContainer width="100%" height={250}><BarChart data={gatewayDistribution} layout="vertical"><CartesianGrid /><YAxis type="category" dataKey="name" width={70} fontSize={12} /><XAxis type="number" hide /><Tooltip formatter={(v) => `₹${(v as number).toLocaleString()}`} /><Bar dataKey="amount" fill="#10b981" /></BarChart></ResponsiveContainer></div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"><h2 className="text-lg font-semibold mb-4">Payout Status</h2><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{['#059669', '#f59e0b', '#ef4444', '#3b82f6'].map(c => <Cell key={c} fill={c} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>
                    </div>
                </div>
                {/* AI Insights Sidebar */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                     <h2 className="text-lg font-bold flex items-center gap-2"><BrainIcon className="w-6 h-6 text-primary-500" /> AI Smart Insights</h2>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-md text-sm"><p className="font-semibold">Payout Trend</p><p>Total payouts via Razorpay increased 12% compared to last week.</p></div>
                     <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-md text-sm"><p className="font-semibold">Top Earner</p><p>Highest earning listener this month: Riya Sharma (₹18,600).</p></div>
                     <div className="bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-md text-sm"><p className="font-semibold">Pending Alert</p><p>5 listeners have pending payouts above ₹10,000.</p></div>
                </div>
            </div>
            
            {/* Recent Transactions Table */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                <DataTable columns={transactionColumns} data={filteredData} />
            </div>
        </div>
    );
};

export default EarningsOverview;