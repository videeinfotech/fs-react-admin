
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { Listener } from '../types';

export const mockListeners: Listener[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', status: 'Active', avgRating: 4.8, totalSessions: 150, totalEarnings: 3000, rate: 1.0, createdAt: '2023-01-10', bio: 'Experienced listener specializing in relationship advice.', expertise: ['Relationships', 'Anxiety'] },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', status: 'Pending', avgRating: 0, totalSessions: 0, totalEarnings: 0, rate: 0.75, createdAt: '2023-10-20', bio: 'New listener eager to help.', expertise: ['Stress', 'Work'] },
    // Add more mock listeners
];

const Listeners: React.FC = () => {
    const navigate = useNavigate();
    
    const columns = [
        { header: 'Name', accessor: 'name' as keyof Listener, sortable: true },
        { header: 'Email', accessor: 'email' as keyof Listener, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Listener, sortable: true },
        { header: 'Avg. Rating', accessor: 'avgRating' as keyof Listener, sortable: true },
        { header: 'Total Sessions', accessor: 'totalSessions' as keyof Listener, sortable: true },
    ];
    
    const handleViewDetails = (listener: Listener) => {
        navigate(`/listeners/${listener.id}`);
    };

    const renderActions = (listener: Listener) => (
        <button onClick={() => handleViewDetails(listener)} className="text-primary-600 hover:underline">
            View Details
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Listeners Management</h1>
            <DataTable columns={columns} data={mockListeners} renderActions={renderActions} />
        </div>
    );
};

export default Listeners;
