import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { mockListeners } from './Listeners';
import { mockSessions } from './Sessions';
import { mockFeedback } from './Feedback'; // Assuming mockFeedback is exported

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{rating.toFixed(1)}</span>
    </div>
);

const ListenerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToast } = useToast();
    const listenerId = parseInt(id || '0', 10);
    const listener = mockListeners.find(l => l.id === listenerId);

    const listenerSessions = mockSessions.filter(s => s.listenerId === listenerId);
    const listenerFeedback = mockFeedback.filter(f => f.listener === listener?.name);

    if (!listener) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">Listener not found.</h1>
                <Link to="/listeners" className="text-primary-600 hover:underline">Back to Listener List</Link>
            </div>
        );
    }
    
    const handleAction = (action: string) => {
        addToast(`${action} listener ${listener.id}`, 'info');
    };

    return (
        <div className="space-y-6">
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <Link to="/listeners" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Listeners</Link>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-700 dark:text-white font-medium">{listener.name}</span>
                    </li>
                </ol>
            </nav>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{listener.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{listener.email}</p>
                        <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${listener.status === 'Active' ? 'bg-green-100 text-green-800' : listener.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {listener.status}
                        </span>
                    </div>
                    <div className="mt-4 md:mt-0 space-x-2">
                        {listener.status === 'Pending' && <button onClick={() => handleAction('Approving')} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Approve</button>}
                        {listener.status !== 'Blocked' && <button onClick={() => handleAction('Blocking')} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Block</button>}
                    </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{listener.bio}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Performance</h2>
                         <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li><strong>Average Rating:</strong> <StarRating rating={listener.avgRating} /></li>
                            <li><strong>Session Rate:</strong> ₹{listener.rate.toFixed(2)} / minute</li>
                            <li><strong>Total Sessions:</strong> {listener.totalSessions}</li>
                            <li><strong>Total Earnings:</strong> ₹{listener.totalEarnings.toFixed(2)}</li>
                            <li><strong>Joined:</strong> {listener.createdAt}</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                           {listener.expertise.map(exp => (
                               <span key={exp} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{exp}</span>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Feedback</h2>
                        <ul className="space-y-4">
                            {listenerFeedback.length > 0 ? listenerFeedback.map(f => (
                                <li key={f.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{f.user}</p>
                                        <StarRating rating={f.rating} />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">"{f.comment}"</p>
                                </li>
                            )) : <p className="text-sm text-gray-500">No feedback found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListenerDetails;