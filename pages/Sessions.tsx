

import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { Session } from '../types';

export const mockSessions: Session[] = [
    { id: 'sess_1', user: 'John Doe', userId: 1, listener: 'Alice Johnson', listenerId: 1, type: 'Chat', status: 'Completed', duration: '30 mins', cost: 30.00, startedAt: '2023-10-25 10:00 AM', transcript: [{sender: 'John Doe', message: 'Hello', timestamp: '10:01 AM'}, {sender: 'Alice Johnson', message: 'Hi, how can I help?', timestamp: '10:02 AM'}] },
    { id: 'sess_2', user: 'Jane Smith', userId: 2, listener: 'Alice Johnson', listenerId: 1, type: 'Call', status: 'Completed', duration: '15 mins', cost: 15.00, startedAt: '2023-10-24 02:30 PM' },
    // Add more mock sessions
];

const Sessions: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();

    const columns = [
        { header: 'Session ID', accessor: 'id' as keyof Session, sortable: true },
        { header: 'User', accessor: 'user' as keyof Session, sortable: true },
        { header: 'Listener', accessor: 'listener' as keyof Session, sortable: true },
        { header: 'Type', accessor: 'type' as keyof Session, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Session, sortable: true },
        { header: 'Date', accessor: 'startedAt' as keyof Session, sortable: true },
    ];
    
    const handleViewDetails = (session: Session) => {
        navigate(`/sessions/${session.id}`);
    };

    const renderActions = (session: Session) => (
        <button onClick={() => handleViewDetails(session)} className="text-primary-600 hover:underline">
            View Details
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Session History</h1>
            <DataTable columns={columns} data={mockSessions} renderActions={renderActions} />
        </div>
    );
};

export default Sessions;
