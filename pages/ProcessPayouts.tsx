import React, { useState, useMemo } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { Payout, PayoutStatus, Gateway } from '../types';
import { useToast } from '../hooks/useToast';

// Mock Data
const mockPayouts: Payout[] = [
    { id: 'PO-001', listenerId: 102, listenerName: 'Riya Sharma', earnings: 7200, commissionPercent: 15, payableAmount: 6120, gateway: 'Razorpay', status: 'Pending', date: '2023-10-19' },
    { id: 'PO-002', listenerId: 209, listenerName: 'Aman Gupta', earnings: 4000, commissionPercent: 10, payableAmount: 3600, gateway: 'Payoneer', status: 'Completed', date: '2023-10-18' },
    { id: 'PO-003', listenerId: 305, listenerName: 'Priya Patel', earnings: 9500, commissionPercent: 12, payableAmount: 8360, gateway: 'PayPal', status: 'Failed', date: '2023-10-18' },
    { id: 'PO-004', listenerId: 411, listenerName: 'Karan Singh', earnings: 2200, commissionPercent: 15, payableAmount: 1870, gateway: 'PhonePe', status: 'Pending', date: '2023-10-19' },
];

const StatusBadge: React.FC<{ status: PayoutStatus }> = ({ status }) => {
    const classes = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Processing: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Failed: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes[status]}`}>{status}</span>;
};

const ProcessPayouts: React.FC = () => {
    const { addToast } = useToast();
    const [payouts, setPayouts] = useState(mockPayouts);
    const [selectedPayouts, setSelectedPayouts] = useState<Set<string>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePayout, setActivePayout] = useState<Payout | null>(null);

    const columns = useMemo(() => [
        { header: 'Listener', accessor: 'listenerName' as keyof Payout, sortable: true },
        { header: 'Earnings', accessor: 'earnings' as keyof Payout, sortable: true, render: (p: Payout) => `₹${p.earnings.toLocaleString()}` },
        { header: 'Payable', accessor: 'payableAmount' as keyof Payout, sortable: true, render: (p: Payout) => `₹${p.payableAmount.toLocaleString()}` },
        { header: 'Gateway', accessor: 'gateway' as keyof Payout, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Payout, sortable: true, render: (p: Payout) => <StatusBadge status={p.status} /> },
    ], []);

    const handleSelectRow = (payoutId: string) => {
        setSelectedPayouts(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(payoutId)) {
                newSelection.delete(payoutId);
            } else {
                newSelection.add(payoutId);
            }
            return newSelection;
        });
    };
    
    const handlePayNow = (payout: Payout) => {
        setActivePayout(payout);
        setIsModalOpen(true);
    };

    const confirmPayment = () => {
        if (activePayout) {
            setPayouts(prev => prev.map(p => p.id === activePayout.id ? { ...p, status: 'Completed' } : p));
            addToast(`Payout for ${activePayout.listenerName} successful!`, 'success');
            setIsModalOpen(false);
            setActivePayout(null);
        }
    };
    
    const renderActions = (payout: Payout) => (
        <div className="space-x-2">
            {payout.status === 'Pending' && <button onClick={() => handlePayNow(payout)} className="text-primary-600 hover:underline font-medium">Pay Now</button>}
            {payout.status === 'Failed' && <button onClick={() => handlePayNow(payout)} className="text-red-600 hover:underline font-medium">Retry</button>}
            {payout.status === 'Completed' && <button className="text-gray-500">View</button>}
        </div>
    );
    
    const ProcessModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">Confirm Payout</h3>
                    <p className="text-gray-500 mt-2">You are about to pay <span className="font-bold">₹{activePayout?.payableAmount.toLocaleString()}</span> to <span className="font-bold">{activePayout?.listenerName}</span> via {activePayout?.gateway}.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-2 rounded-b-lg">
                    <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-200 rounded-md">Cancel</button>
                    <button onClick={confirmPayment} className="px-6 py-2 bg-primary-600 text-white rounded-md">Pay Now</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Process Payouts</h1>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" placeholder="Search Listener..." className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 col-span-2" />
                    <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>All Gateways</option>
                        <option>Razorpay</option><option>PayPal</option>
                    </select>
                    <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>All Statuses</option>
                        <option>Pending</option><option>Failed</option>
                    </select>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{selectedPayouts.size} payouts selected</h2>
                    <div className="space-x-2">
                        <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg">Export CSV</button>
                        <button className="px-4 py-2 text-sm text-white bg-primary-600 rounded-lg">Pay Selected</button>
                    </div>
                </div>
                 <DataTable 
                    columns={columns} 
                    data={payouts} 
                    renderActions={renderActions}
                 />
            </div>

            {isModalOpen && <ProcessModal />}
        </div>
    );
};

export default ProcessPayouts;
