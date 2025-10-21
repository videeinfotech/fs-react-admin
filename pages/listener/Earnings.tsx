import React from 'react';
import { DataTable } from '../../components/ui/DataTable';

const Earnings: React.FC = () => {
    const payouts = [
        { id: 'P-123', date: '2023-10-15', amount: 5500, status: 'Completed' },
        { id: 'P-122', date: '2023-10-08', amount: 4800, status: 'Completed' },
    ];
    
    const columns = [
        { header: 'Payout ID', accessor: 'id' as const, sortable: true },
        { header: 'Date', accessor: 'date' as const, sortable: true },
        { header: 'Amount', accessor: 'amount' as const, sortable: true, render: (p: any) => `₹${p.amount.toLocaleString()}` },
        { header: 'Status', accessor: 'status' as const, sortable: true },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Earnings</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"><p className="text-sm">Total Earnings</p><p className="text-3xl font-bold">₹56,400</p></div>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"><p className="text-sm">Pending Payout</p><p className="text-3xl font-bold">₹3,200</p></div>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"><p className="text-sm">This Month</p><p className="text-3xl font-bold">₹7,800</p></div>
            </div>
            
            {/* Payout History */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Payout History</h2>
                <DataTable columns={columns} data={payouts} />
             </div>

             {/* Bonus Section */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h2 className="text-xl font-semibold mb-4">Bonuses & Rewards</h2>
                 <p>You received a "Top Performer" bonus of ₹500 this month!</p>
             </div>
        </div>
    );
};

export default Earnings;
