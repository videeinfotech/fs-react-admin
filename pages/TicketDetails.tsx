
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { mockTickets } from './Tickets';

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToast } = useToast();
    const ticketId = parseInt(id || '0', 10);
    const ticket = mockTickets.find(t => t.id === ticketId);
    
    const [reply, setReply] = useState('');

    if (!ticket) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">Ticket not found.</h1>
                <Link to="/tickets" className="text-primary-600 hover:underline">Back to Ticket List</Link>
            </div>
        );
    }
    
    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        if(!reply.trim()) return;
        addToast('Reply sent!', 'success');
        // In a real app, you would update the ticket history state here.
        setReply('');
    };

    return (
        <div className="space-y-6">
             <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <Link to="/tickets" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Support Tickets</Link>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-700 dark:text-white font-medium">Ticket #{ticket.id}</span>
                    </li>
                </ol>
            </nav>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{ticket.subject}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>From: <Link to={`/users/${ticket.userId}`} className="text-primary-600 hover:underline">{ticket.user}</Link></span>
                    <span>Status: {ticket.status}</span>
                    <span>Created: {ticket.createdAt}</span>
                </div>
                 <p className="mt-4 text-gray-600 dark:text-gray-300 border-t pt-4 dark:border-gray-700">{ticket.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                 <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Conversation History</h2>
                 <div className="space-y-4">
                     {ticket.history.map((entry, index) => (
                         <div key={index} className={`p-4 rounded-lg ${entry.author === 'Admin' ? 'bg-primary-50 dark:bg-primary-900/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <div className="flex justify-between items-center">
                                 <p className="font-semibold text-gray-800 dark:text-gray-200">{entry.author}</p>
                                 <p className="text-xs text-gray-500">{entry.timestamp}</p>
                            </div>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{entry.message}</p>
                         </div>
                     ))}
                 </div>
            </div>

            {ticket.status === 'Open' && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Reply</h2>
                    <form onSubmit={handleReply}>
                        <textarea 
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                            rows={5}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Type your response here..."
                        />
                        <div className="flex justify-end mt-4">
                             <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Send Reply</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;
