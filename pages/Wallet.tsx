import React, { useState, useMemo } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { Transaction } from '../types';
import { useToast } from '../hooks/useToast';

// More detailed mock transactions
export const mockTransactions: Transaction[] = [
    { id: 1, userId: 1, userOrListener: 'John Doe', description: 'Wallet Top-up', date: '2023-10-25', type: 'Credit', method: 'Payment Gateway', amount: 50.00, status: 'Completed' },
    { id: 2, userId: 2, userOrListener: 'Jane Smith', description: 'Session with Alice', date: '2023-10-24', type: 'Debit', method: 'Session Fee', amount: 15.00, status: 'Completed' },
    { id: 3, userId: 1, userOrListener: 'John Doe', description: 'Session with Bob', date: '2023-10-23', type: 'Debit', method: 'Session Fee', amount: 22.50, status: 'Completed' },
    { id: 4, userId: 3, userOrListener: 'Sam Wilson', description: 'Wallet Top-up', date: '2023-10-22', type: 'Credit', method: 'Payment Gateway', amount: 100.00, status: 'Completed' },
    { id: 5, userId: 1, userOrListener: 'John Doe', description: 'Refund for failed session', date: '2023-10-21', type: 'Refund', method: 'Manual Adjustment', amount: 10.00, status: 'Completed' },
    { id: 6, userId: 4, userOrListener: 'Emily Brown', description: 'Wallet Top-up', date: '2023-10-20', type: 'Credit', method: 'Payment Gateway', amount: 25.00, status: 'Failed' },
    { id: 7, userId: 5, userOrListener: 'Michael Clark', description: 'Admin Credit', date: '2023-10-19', type: 'Credit', method: 'Manual Adjustment', amount: 5.00, status: 'Completed' },
    { id: 8, userId: 2, userOrListener: 'Jane Smith', description: 'Wallet Top-up', date: '2023-10-18', type: 'Credit', method: 'Payment Gateway', amount: 30.00, status: 'Pending' },
];


const Wallet: React.FC = () => {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState<'All' | 'Credits' | 'Debits' | 'Refunds'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Manual Adjustment Modal State
    const [adjustment, setAdjustment] = useState({
        userId: '',
        amount: '',
        type: 'Credit',
        reason: '',
    });

    const summary = useMemo(() => {
        const inflow = mockTransactions
            .filter(t => t.type === 'Credit' && t.status === 'Completed')
            .reduce((sum, t) => sum + t.amount, 0);
        const outflow = mockTransactions
            .filter(t => (t.type === 'Debit' || t.type === 'Refund') && t.status === 'Completed')
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            inflow,
            outflow,
            netRevenue: inflow - outflow,
        };
    }, []);

    const filteredData = useMemo(() => {
        return mockTransactions.filter(t => {
            const tabMatch = activeTab === 'All' || 
                (activeTab === 'Credits' && t.type === 'Credit') ||
                (activeTab === 'Debits' && t.type === 'Debit') ||
                (activeTab === 'Refunds' && t.type === 'Refund');
            
            const searchMatch = searchTerm === '' ||
                t.userOrListener.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.id.toString().includes(searchTerm);

            const typeMatch = typeFilter === 'all' || t.type === typeFilter;
            const statusMatch = statusFilter === 'all' || t.status === statusFilter;
            
            return tabMatch && searchMatch && typeMatch && statusMatch;
        });
    }, [activeTab, searchTerm, typeFilter, statusFilter]);

    const columns = [
        { header: 'Transaction ID', accessor: 'id' as keyof Transaction, sortable: true },
        { header: 'User/Listener', accessor: 'userOrListener' as keyof Transaction, sortable: true },
        { header: 'Amount', accessor: 'amount' as keyof Transaction, sortable: true },
        { header: 'Type', accessor: 'type' as keyof Transaction, sortable: true },
        { header: 'Method', accessor: 'method' as keyof Transaction, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Transaction, sortable: true },
        { header: 'Date', accessor: 'date' as keyof Transaction, sortable: true },
    ];
    
    const handleAdjustmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setAdjustment({ ...adjustment, [e.target.name]: e.target.value });
    };

    const handleAdjustmentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!adjustment.userId || !adjustment.amount || !adjustment.reason) {
            addToast('Please fill all fields.', 'error');
            return;
        }
        addToast(`Successfully adjusted wallet for user ${adjustment.userId}.`, 'success');
        setIsModalOpen(false);
        setAdjustment({ userId: '', amount: '', type: 'Credit', reason: '' });
    };

    const renderTabs = () => {
        const tabs: typeof activeTab[] = ['All', 'Credits', 'Debits', 'Refunds'];
        return (
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {`${tab} Transactions`}
                        </button>
                    ))}
                </nav>
            </div>
        );
    };

    const ManualAdjustmentModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manual Wallet Adjustment</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl">&times;</button>
                </div>
                <form onSubmit={handleAdjustmentSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
                        <input type="number" name="userId" id="userId" value={adjustment.userId} onChange={handleAdjustmentChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount ($)</label>
                        <input type="number" name="amount" id="amount" value={adjustment.amount} onChange={handleAdjustmentChange} step="0.01" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adjustment Type</label>
                        <select name="type" id="type" value={adjustment.type} onChange={handleAdjustmentChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required>
                            <option value="Credit">Credit (Add to wallet)</option>
                            <option value="Debit">Debit (Remove from wallet)</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                        <textarea name="reason" id="reason" value={adjustment.reason} onChange={handleAdjustmentChange} rows={3} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Submit Adjustment</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Wallet & Transactions</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Manual Adjustment
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Inflow</h2>
                    <p className="text-3xl font-bold text-green-500 mt-2">${summary.inflow.toFixed(2)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Outflow</h2>
                    <p className="text-3xl font-bold text-red-500 mt-2">${summary.outflow.toFixed(2)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Net Revenue</h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${summary.netRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4">
                    {renderTabs()}
                </div>
                 {/* Filters */}
                <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-b dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Search by User or ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white md:col-span-2"
                    />
                     <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="all">All Types</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                        <option value="Refund">Refund</option>
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="all">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
                <DataTable columns={columns} data={filteredData} />
            </div>

            {isModalOpen && <ManualAdjustmentModal />}
        </div>
    );
};

export default Wallet;