import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { User } from '../types';
import { mockUsers } from './Users';
import { IconProps } from '../components/ui/icons/Icon';
import { UsersIcon } from '../components/ui/icons/UsersIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-8 h-8 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
    const statusClasses = {
        'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Suspended': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Deleted': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const UsersList: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const columns = useMemo(() => [
        { header: 'Name', accessor: 'name' as keyof User, sortable: true, render: (user: User) => (
            <div>
                <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
            </div>
        )},
        { header: 'Status', accessor: 'status' as keyof User, sortable: true, render: (user: User) => <StatusBadge status={user.status} />},
        { header: 'Joined Date', accessor: 'createdAt' as keyof User, sortable: true },
        { header: 'Wallet Balance', accessor: 'wallet' as keyof User, sortable: true, render: (user: User) => `₹${user.wallet.toFixed(2)}` },
        { header: 'Total Spent', accessor: 'totalSpent' as keyof User, sortable: true, render: (user: User) => `₹${user.totalSpent.toFixed(2)}` },
    ], []);

    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const statusMatch = statusFilter === 'all' || user.status === statusFilter;
            
            if (!startDate && !endDate) {
                return statusMatch;
            }
            
            const userDate = new Date(user.createdAt);
            let passesDateFilter = true;

            if (startDate) {
                const start = new Date(startDate);
                if (userDate < start) passesDateFilter = false;
            }
            
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);
                if (userDate >= end) passesDateFilter = false;
            }

            return statusMatch && passesDateFilter;
        });
    }, [statusFilter, startDate, endDate]);

    const stats = useMemo(() => ({
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'Active').length,
        suspended: mockUsers.filter(u => u.status === 'Suspended').length,
    }), []);

    const renderActions = (user: User) => (
        <button onClick={() => navigate(`/users/${user.id}`)} className="text-primary-600 hover:underline font-medium">
            View Details
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">User Management</h1>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">+ Add New User</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={stats.total.toLocaleString()} icon={<UsersIcon />} />
                <StatCard title="Active Users" value={stats.active.toLocaleString()} icon={<UsersIcon />} />
                <StatCard title="Suspended Users" value={stats.suspended.toLocaleString()} icon={<UsersIcon />} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                 <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <select 
                            id="status-filter" 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
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
                            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                     <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Joined Before</label>
                        <input 
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={filteredUsers} renderActions={renderActions} />
        </div>
    );
};

export default UsersList;