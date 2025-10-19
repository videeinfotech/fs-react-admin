import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { User } from '../types';

export const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.d@example.com', phone: '123-456-7890', status: 'Active', createdAt: '2023-01-15', lastLogin: '2023-10-25', address: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }, wallet: 150.75, totalSessions: 12, totalSpent: 450.00 },
    { id: 2, name: 'Jane Smith', email: 'jane.s@example.com', phone: '987-654-3210', status: 'Suspended', createdAt: '2023-02-20', lastLogin: '2023-09-15', address: { street: '456 Oak Ave', city: 'Someville', state: 'NY', zip: '67890' }, wallet: 25.00, totalSessions: 5, totalSpent: 150.50 },
    { id: 3, name: 'Sam Wilson', email: 'sam.w@example.com', phone: '555-123-4567', status: 'Active', createdAt: '2023-05-10', lastLogin: '2023-10-26', address: { street: '789 Pine Ln', city: 'Forestown', state: 'TX', zip: '54321' }, wallet: 300.00, totalSessions: 25, totalSpent: 800.00 },
    { id: 4, name: 'Emily Brown', email: 'emily.b@example.com', phone: '555-987-6543', status: 'Deleted', createdAt: '2022-11-30', lastLogin: '2023-01-01', address: { street: '101 Maple Dr', city: 'Riverdale', state: 'FL', zip: '13579' }, wallet: 0.00, totalSessions: 2, totalSpent: 50.00 },
    { id: 5, name: 'Michael Clark', email: 'michael.c@example.com', phone: '555-555-5555', status: 'Active', createdAt: '2023-08-01', lastLogin: '2023-10-24', address: { street: '222 Birch St', city: 'Lakeside', state: 'WA', zip: '97531' }, wallet: 75.50, totalSessions: 8, totalSpent: 220.00 },
    { id: 6, name: 'Sarah Davis', email: 'sarah.d@example.com', phone: '555-444-3333', status: 'Suspended', createdAt: '2022-12-25', lastLogin: '2023-08-15', address: { street: '333 Elm Rd', city: 'Hilltop', state: 'GA', zip: '86420' }, wallet: 10.00, totalSessions: 3, totalSpent: 90.00 },
];


const Users: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const columns = [
        { header: 'Name', accessor: 'name' as keyof User, sortable: true },
        { header: 'Email', accessor: 'email' as keyof User, sortable: true },
        { header: 'Status', accessor: 'status' as keyof User, sortable: true },
        { header: 'Joined Date', accessor: 'createdAt' as keyof User, sortable: true },
        { header: 'Wallet Balance', accessor: 'wallet' as keyof User, sortable: true },
    ];

    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const statusMatch = statusFilter === 'all' || user.status === statusFilter;
            
            // Date filtering
            if (!startDate && !endDate) {
                return statusMatch;
            }
            
            const userDate = new Date(user.createdAt);
            let passesDateFilter = true;

            if (startDate) {
                const start = new Date(startDate);
                if (userDate < start) {
                    passesDateFilter = false;
                }
            }
            
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // To include the whole end day
                if (userDate >= end) {
                    passesDateFilter = false;
                }
            }

            return statusMatch && passesDateFilter;
        });
    }, [statusFilter, startDate, endDate]);

    const handleViewDetails = (user: User) => {
        navigate(`/users/${user.id}`);
    };

    const renderActions = (user: User) => (
        <button onClick={() => handleViewDetails(user)} className="text-primary-600 hover:underline">
            View Details
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users Management</h1>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <select 
                            id="status-filter" 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Deleted">Deleted</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Joined After</label>
                        <input 
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                     <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Joined Before</label>
                        <input 
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={filteredUsers} renderActions={renderActions} />
        </div>
    );
};

export default Users;