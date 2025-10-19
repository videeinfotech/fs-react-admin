
import React from 'react';
import { DataTable } from '../components/ui/DataTable';
import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
    { id: 1, userName: 'John Doe', description: 'Wallet Top-up', date: '2023-10-25', type: 'Credit', amount: 50.00, status: 'Completed' },
    { id: 2, userName: 'Jane Smith', description: 'Session with Alice', date: '2023-10-24', type: 'Debit', amount: 15.00, status: 'Completed' },
    { id: 3, userName: 'John Doe', description: 'Session with Bob', date: '2023-10-23', type: 'Debit', amount: 22.50, status: 'Completed' },
    // Add more mock transactions
];

const Wallet: React.FC = () => {
    const columns = [
        { header: 'User', accessor: 'userName' as keyof Transaction, sortable: true },
        { header: 'Description', accessor: 'description' as keyof Transaction, sortable: false },
        { header: 'Date', accessor: 'date' as keyof Transaction, sortable: true },
        { header: 'Type', accessor: 'type' as keyof Transaction, sortable: true },
        { header: 'Amount', accessor: 'amount' as keyof Transaction, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Transaction, sortable: true },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Wallet & Transactions</h1>
            <DataTable columns={columns} data={mockTransactions} />
        </div>
    );
};

export default Wallet;
