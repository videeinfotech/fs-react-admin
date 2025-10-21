

import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { Ticket } from '../types';

export const mockTickets: Ticket[] = [
    { id: 101, userId: 1, user: 'John Doe', subject: 'Billing Issue', description: 'I was overcharged for my last session.', status: 'Open', createdAt: '2023-10-26', history: [{ author: 'User', timestamp: '2023-10-26 09:00 AM', message: 'I was overcharged for my last session.' }] },
    { id: 102, userId: 2, user: 'Jane Smith', subject: 'Technical Problem', description: 'The app crashed during my call.', status: 'Closed', createdAt: '2023-10-22', history: [{ author: 'User', timestamp: '2023-10-22 01:00 PM', message: 'The app crashed during my call.' }, {author: 'Admin', timestamp: '2023-10-23 10:00 AM', message: 'We have resolved the issue.'}] },
    // Add more mock tickets
];

const Tickets: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();

    const columns = [
        { header: 'Ticket ID', accessor: 'id' as keyof Ticket, sortable: true },
        { header: 'User', accessor: 'user' as keyof Ticket, sortable: true },
        { header: 'Subject', accessor: 'subject' as keyof Ticket, sortable: true },
        { header: 'Status', accessor: 'status' as keyof Ticket, sortable: true },
        { header: 'Created At', accessor: 'createdAt' as keyof Ticket, sortable: true },
    ];

    const handleViewDetails = (ticket: Ticket) => {
        navigate(`/admin/tickets/${ticket.id}`);
    };

    const renderActions = (ticket: Ticket) => (
        <button onClick={() => handleViewDetails(ticket)} className="text-primary-600 hover:underline">
            View Details
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
            <DataTable columns={columns} data={mockTickets} renderActions={renderActions} />
        </div>
    );
};

export default Tickets;