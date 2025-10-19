import React, { useState, useMemo } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { PayoutCycle } from '../types';
import { useToast } from '../hooks/useToast';

// Mock Data
const mockWeeklyCycles: PayoutCycle[] = [
    { id: 'PY-202510-W03', type: 'Weekly', period: 'Oct 10–16', listenerCount: 245, totalAmount: 241600, status: 'Pending' },
    { id: 'PY-202510-W02', type: 'Weekly', period: 'Oct 03–09', listenerCount: 230, totalAmount: 198300, status: 'Completed' },
];

const mockMonthlyCycles: PayoutCycle[] = [
    { id: 'PY-202509-M09', type: 'Monthly', period: 'Sep 1–30', listenerCount: 802, totalAmount: 852300, status: 'Completed' },
    { id: 'PY-202508-M08', type: 'Monthly', period: 'Aug 1–31', listenerCount: 795, totalAmount: 812900, status: 'Completed' },
];

const PayoutCycles: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToast } = useToast();

    const columns = useMemo(() => [
        { header: 'Cycle ID', accessor: 'id' as keyof PayoutCycle, sortable: true },
        { header: 'Period', accessor: 'period' as keyof PayoutCycle, sortable: true },
        { header: 'Listeners', accessor: 'listenerCount' as keyof PayoutCycle, sortable: true },
        { header: 'Total Amount', accessor: 'totalAmount' as keyof PayoutCycle, sortable: true, render: (cycle: PayoutCycle) => `₹${cycle.totalAmount.toLocaleString()}` },
        { header: 'Status', accessor: 'status' as keyof PayoutCycle, sortable: true },
    ], []);

    const renderActions = (cycle: PayoutCycle) => (
        <div className="space-x-2">
            <button className="text-primary-600 hover:underline">View</button>
            {cycle.status === 'Pending' && <button className="text-green-600 hover:underline">Process</button>}
        </div>
    );
    
    const CreateCycleModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={(e) => { e.preventDefault(); addToast('Payout cycle generated successfully!', 'success'); setIsModalOpen(false); }}>
                    <div className="p-6 border-b dark:border-gray-700">
                        <h3 className="text-xl font-bold">Create New Payout Cycle</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Cycle Type</label>
                            <select className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Start Date</label>
                                <input type="date" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">End Date</label>
                                <input type="date" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-primary-600"/> <span className="ml-2">Include Manual Adjustments</span></label>
                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-primary-600"/> <span className="ml-2">Include Performance Bonuses</span></label>
                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-primary-600"/> <span className="ml-2">Auto-approve payouts {"<"} ₹1,000</span></label>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-2 rounded-b-lg">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Generate Cycle</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Payout Cycles</h1>
                <div className="space-x-2">
                    <button onClick={() => addToast('Earnings recalculated!', 'info')} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg">Recalculate Earnings</button>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">+ Create New Cycle</button>
                </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('weekly')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'weekly' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Weekly Cycles</button>
                    <button onClick={() => setActiveTab('monthly')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'monthly' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Monthly Cycles</button>
                </nav>
            </div>
            
            <DataTable 
                columns={columns} 
                data={activeTab === 'weekly' ? mockWeeklyCycles : mockMonthlyCycles} 
                renderActions={renderActions}
            />
            
            {isModalOpen && <CreateCycleModal />}
        </div>
    );
};

export default PayoutCycles;
