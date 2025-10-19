import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { Listener } from '../types';
import { mockListeners } from './Listeners';
import { IconProps } from '../components/ui/icons/Icon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';

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

const StatusBadge: React.FC<{ status: Listener['status'] }> = ({ status }) => {
    const statusClasses = {
        'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Blocked': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{rating > 0 ? rating.toFixed(1) : 'N/A'}</span>
    </div>
);


const ListenersList: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');
    
    const columns = useMemo(() => [
        { header: 'Name', accessor: 'name' as keyof Listener, sortable: true, render: (listener: Listener) => (
            <div className="flex items-center space-x-3">
                <img src={listener.avatarUrl} alt={listener.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">{listener.name}</div>
                    <div className="text-xs text-gray-500">{listener.email}</div>
                </div>
            </div>
        )},
        { header: 'Status', accessor: 'status' as keyof Listener, sortable: true, render: (listener: Listener) => <StatusBadge status={listener.status} /> },
        { header: 'Avg. Rating', accessor: 'avgRating' as keyof Listener, sortable: true, render: (listener: Listener) => <StarRating rating={listener.avgRating} /> },
        { header: 'Total Sessions', accessor: 'totalSessions' as keyof Listener, sortable: true },
        { header: 'Joined Date', accessor: 'createdAt' as keyof Listener, sortable: true },
    ], []);
    
    const filteredListeners = useMemo(() => {
        return mockListeners.filter(listener => {
            return statusFilter === 'all' || listener.status === statusFilter;
        });
    }, [statusFilter]);

    const stats = useMemo(() => ({
        total: mockListeners.length,
        pending: mockListeners.filter(l => l.status === 'Pending').length,
        active: mockListeners.filter(l => l.status === 'Active').length,
    }), []);

    const renderActions = (listener: Listener) => (
        <button onClick={() => navigate(`/listeners/${listener.id}`)} className="text-primary-600 hover:underline font-medium">
            View Details
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Listener Management</h1>
                 <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">+ Add New Listener</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Listeners" value={stats.total.toLocaleString()} icon={<ListenersIcon />} />
                <StatCard title="Pending Approval" value={stats.pending.toLocaleString()} icon={<ListenersIcon />} />
                <StatCard title="Active Listeners" value={stats.active.toLocaleString()} icon={<ListenersIcon />} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                     <div>
                        <label htmlFor="status-filter" className="sr-only">Status</label>
                        <select 
                            id="status-filter" 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={filteredListeners} renderActions={renderActions} />
        </div>
    );
};

export default ListenersList;