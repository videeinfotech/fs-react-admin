
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { User } from '../types';
import { mockUsers } from './Users';
import { mockSessions } from './Sessions';
import { mockTransactions } from './Wallet'; // Assuming mockTransactions is exported from Wallet.tsx

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToast } = useToast();
    const userId = parseInt(id || '0', 10);
    const user = mockUsers.find(u => u.id === userId);

    const userSessions = mockSessions.filter(s => s.userId === userId);
    const userTransactions = mockTransactions.filter(t => t.userOrListener === user?.name);

    if (!user) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">User not found.</h1>
                <Link to="/users" className="text-primary-600 hover:underline">Back to User List</Link>
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
                        <Link to="/users" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Users</Link>
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
                            <li><strong>Wallet Balance:</strong> ${user.wallet.toFixed(2)}</li>
                            <li><strong>Total Sessions:</strong> {user.totalSessions}</li>
                            <li><strong>Total Spent:</strong> ${user.totalSpent.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Sessions</h2>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userSessions.length > 0 ? userSessions.map(s => (
                                <li key={s.id} className="py-3">
                                    <Link to={`/sessions/${s.id}`} className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-200">Session with {s.listener}</p>
                                            <p className="text-sm text-gray-500">{s.startedAt}</p>
                                        </div>
                                        <span className="text-sm font-semibold">${s.cost.toFixed(2)}</span>
                                    </Link>
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
                                        {t.type === 'Credit' ? '+' : '-'}${t.amount.toFixed(2)}
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