import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { User } from '../types';
import { mockSessions } from './Sessions';
import { mockTransactions } from './Wallet'; // Assuming mockTransactions is exported from Wallet.tsx

// This data will eventually be fetched from the API based on the user ID
const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.d@example.com', phone: '123-456-7890', status: 'Active', createdAt: '2023-01-15', lastLogin: '2023-10-25', address: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' }, wallet: 12500.50, totalSessions: 12, totalSpent: 35000.00 },
    { id: 2, name: 'Jane Smith', email: 'jane.s@example.com', phone: '987-654-3210', status: 'Suspended', createdAt: '2023-02-20', lastLogin: '2023-09-15', address: { street: '456 Oak Ave', city: 'Someville', state: 'NY', zip: '67890' }, wallet: 2000.00, totalSessions: 5, totalSpent: 12000.00 },
    { id: 3, name: 'Sam Wilson', email: 'sam.w@example.com', phone: '555-123-4567', status: 'Active', createdAt: '2023-05-10', lastLogin: '2023-10-26', address: { street: '789 Pine Ln', city: 'Forestown', state: 'TX', zip: '54321' }, wallet: 25000.00, totalSessions: 25, totalSpent: 65000.00 },
    { id: 4, name: 'Emily Brown', email: 'emily.b@example.com', phone: '555-987-6543', status: 'Deleted', createdAt: '2022-11-30', lastLogin: '2023-01-01', address: { street: '101 Maple Dr', city: 'Riverdale', state: 'FL', zip: '13579' }, wallet: 0.00, totalSessions: 2, totalSpent: 4000.00 },
    { id: 5, name: 'Michael Clark', email: 'michael.c@example.com', phone: '555-555-5555', status: 'Active', createdAt: '2023-08-01', lastLogin: '2023-10-24', address: { street: '222 Birch St', city: 'Lakeside', state: 'WA', zip: '97531' }, wallet: 6000.00, totalSessions: 8, totalSpent: 18000.00 },
    { id: 6, name: 'Sarah Davis', email: 'sarah.d@example.com', phone: '555-444-3333', status: 'Suspended', createdAt: '2022-12-25', lastLogin: '2023-08-15', address: { street: '333 Elm Rd', city: 'Hilltop', state: 'GA', zip: '86420' }, wallet: 800.00, totalSessions: 3, totalSpent: 7500.00 },
];


const UserDetails: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const { addToast } = useToast();
    const userId = parseInt(id || '0', 10);
    const user = mockUsers.find(u => u.id === userId);

    const userSessions = mockSessions.filter(s => s.userId === userId);
    const userTransactions = mockTransactions.filter(t => t.userOrListener === user?.name);

    if (!user) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">User not found.</h1>
                <ReactRouterDOM.Link to="/users" className="text-primary-600 hover:underline">Back to User List</ReactRouterDOM.Link>
            </div>
        );
    }
    
    const handleAction = (action: string) => {
        addToast(`${action} user ${user.id}`, 'info');
    };

    return (
        <div className="space-y-6">
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <ReactRouterDOM.Link to="/users" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Users</ReactRouterDOM.Link>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-700 dark:text-white font-medium">{user.name}</span>
                    </li>
                </ol>
            </nav>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                        <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.status}
                        </span>
                    </div>
                    <div className="mt-4 md:mt-0 space-x-2">
                        <button onClick={() => handleAction(user.status === 'Active' ? 'Suspending' : 'Activating')} className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">
                           {user.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button onClick={() => handleAction('Deleting')} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Delete User</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">User Info</h2>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li><strong>Phone:</strong> {user.phone}</li>
                            <li><strong>Joined:</strong> {user.createdAt}</li>
                            <li><strong>Last Login:</strong> {user.lastLogin}</li>
                            <li><strong>Address:</strong> {`${user.address.street}, ${user.address.city}, ${user.address.state}`}</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wallet & Stats</h2>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li><strong>Wallet Balance:</strong> ₹{user.wallet.toFixed(2)}</li>
                            <li><strong>Total Sessions:</strong> {user.totalSessions}</li>
                            <li><strong>Total Spent:</strong> ₹{user.totalSpent.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Sessions</h2>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userSessions.length > 0 ? userSessions.map(s => (
                                <li key={s.id} className="py-3">
                                    <ReactRouterDOM.Link to={`/sessions/${s.id}`} className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-200">Session with {s.listener}</p>
                                            <p className="text-sm text-gray-500">{s.startedAt}</p>
                                        </div>
                                        <span className="text-sm font-semibold">₹{s.cost.toFixed(2)}</span>
                                    </ReactRouterDOM.Link>
                                </li>
                            )) : <p className="text-sm text-gray-500">No sessions found.</p>}
                        </ul>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Transaction History</h2>
                         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userTransactions.length > 0 ? userTransactions.map(t => (
                                <li key={t.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{t.description}</p>
                                        <p className="text-sm text-gray-500">{t.date}</p>
                                    </div>
                                    <span className={`font-semibold ${t.type === 'Credit' ? 'text-green-500' : 'text-red-500'}`}>
                                        {t.type === 'Credit' ? '+' : '-'}₹{t.amount.toFixed(2)}
                                    </span>
                                </li>
                            )) : <p className="text-sm text-gray-500">No transactions found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
