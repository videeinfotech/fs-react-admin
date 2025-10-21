

import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { Listener } from '../types';

export const mockListeners: Listener[] = [
    { 
        id: 1, 
        name: 'Alice Johnson', 
        email: 'alice.j@example.com', 
        status: 'Active', 
        avgRating: 4.8, 
        totalSessions: 150, 
        totalEarnings: 3000, 
        rate: 1.0, 
        createdAt: '2023-01-10', 
        bio: 'Experienced listener specializing in relationship advice. Compassionate and dedicated to helping others find clarity.', 
        skills: ['Relationships', 'Anxiety', 'Grief Counseling'],
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
        language: ['English', 'Spanish'],
        dob: '1985-06-22',
        age: 38,
        city: 'New York'
    },
    { 
        id: 2, 
        name: 'Bob Williams', 
        email: 'bob.w@example.com', 
        status: 'Pending', 
        avgRating: 0, 
        totalSessions: 0, 
        totalEarnings: 0, 
        rate: 0.75, 
        createdAt: '2023-10-20', 
        bio: 'New listener eager to help people navigate stress and work-related challenges.', 
        skills: ['Stress Management', 'Work-Life Balance', 'Mindfulness'],
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
        language: ['English'],
        dob: '1992-11-10',
        age: 31,
        city: 'Chicago'
    },
    // Add more mock listeners
];

const Listeners: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    
    const columns = [
        { header: 'Name', accessor: 'name' as keyof Listener, sortable: true },
        { header: 'Email', accessor: 'email' as keyof Listener, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Listener, sortable: true },
        { header: 'Avg. Rating', accessor: 'avgRating' as keyof Listener, sortable: true },
        { header: 'Total Sessions', accessor: 'totalSessions' as keyof Listener, sortable: true },
    ];
    
    const handleViewDetails = (listener: Listener) => {
        // FIX: The navigation path should be prefixed with /admin for the admin panel routes.
        navigate(`/admin/listeners/${listener.id}`);
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