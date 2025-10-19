
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockSessions } from './Sessions';

const SessionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const session = mockSessions.find(s => s.id === id);

    if (!session) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">Session not found.</h1>
                <Link to="/sessions" className="text-primary-600 hover:underline">Back to Session List</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <Link to="/sessions" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Sessions</Link>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-700 dark:text-white font-medium">{session.id}</span>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Session Details</h2>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li><strong>User:</strong> <Link to={`/users/${session.userId}`} className="text-primary-600 hover:underline">{session.user}</Link></li>
                            <li><strong>Listener:</strong> <Link to={`/listeners/${session.listenerId}`} className="text-primary-600 hover:underline">{session.listener}</Link></li>
                            <hr className="dark:border-gray-600"/>
                            <li><strong>Type:</strong> {session.type}</li>
                            <li><strong>Status:</strong> {session.status}</li>
                            <li><strong>Duration:</strong> {session.duration}</li>
                            <li><strong>Cost:</strong> ${session.cost.toFixed(2)}</li>
                             <hr className="dark:border-gray-600"/>
                            <li><strong>Started:</strong> {session.startedAt}</li>
                            <li><strong>Ended:</strong> {session.endedAt || 'N/A'}</li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Transcript</h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                            {session.transcript && session.transcript.length > 0 ? (
                                session.transcript.map((msg, index) => (
                                    <div key={index} className={`flex items-end gap-2 ${msg.sender === session.user ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${msg.sender === session.user ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary-600 text-white'}`}>
                                            <p className="text-sm">{msg.message}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === session.user ? 'text-gray-500' : 'text-primary-200'}`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session.type === 'Call' ? 'No transcript available for call sessions.' : 'No messages in this session.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;
