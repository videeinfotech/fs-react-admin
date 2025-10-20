import React, { useState, useMemo } from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { Session, TranscriptMessage } from '../types';
import { useToast } from '../hooks/useToast';

export const mockLiveSessions: Session[] = [
    { id: 'sess_live_1', user: 'Michael Clark', userId: 5, listener: 'Alice Johnson', listenerId: 1, type: 'Video', status: 'Ongoing', duration: '12:34', cost: 12.56, startedAt: '2023-10-26 11:00 AM' },
    { id: 'sess_live_2', user: 'Sam Wilson', userId: 3, listener: 'Bob Williams', listenerId: 2, type: 'Chat', status: 'Ongoing', duration: '05:12', cost: 3.89, startedAt: '2023-10-26 11:10 AM', transcript: [{sender: 'Sam Wilson', message: 'I\'m having a tough day.', timestamp: '11:11 AM'}, {sender: 'Bob Williams', message: 'I\'m here to listen. What\'s on your mind?', timestamp: '11:12 AM'}] },
    { id: 'sess_live_3', user: 'Jane Smith', userId: 2, listener: 'Alice Johnson', listenerId: 1, type: 'Call', status: 'Completed', duration: '15:00', cost: 15.00, startedAt: '2023-10-26 09:30 AM', endedAt: '2023-10-26 09:45 AM' },
    { id: 'sess_live_4', user: 'John Doe', userId: 1, listener: 'Alice Johnson', listenerId: 1, type: 'Chat', status: 'Cancelled', duration: '01:05', cost: 1.08, startedAt: '2023-10-26 08:00 AM', endedAt: '2023-10-26 08:01 AM' },
];


const LiveSessions: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>(mockLiveSessions);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [statusFilter, setStatusFilter] = useState<'All' | 'Ongoing' | 'Completed' | 'Cancelled'>('All');
    const { addToast } = useToast();

    const filteredSessions = useMemo(() => {
        if (statusFilter === 'All') return sessions;
        return sessions.filter(s => s.status === statusFilter);
    }, [sessions, statusFilter]);

    const handleEndSession = (sessionId: string) => {
        setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'Completed', endedAt: new Date().toLocaleTimeString() } : s));
        addToast(`Session ${sessionId} has been terminated.`, 'success');
        if (selectedSession?.id === sessionId) {
            setSelectedSession(null);
        }
    };
    
    const StatusPill: React.FC<{ status: Session['status'] }> = ({ status }) => {
        const base = "px-2 py-1 text-xs font-medium rounded-full inline-block";
        const styles = {
            Ongoing: "bg-blue-100 text-blue-800",
            Completed: "bg-green-100 text-green-800",
            Cancelled: "bg-red-100 text-red-800",
        };
        return <span className={`${base} ${styles[status]}`}>{status}</span>;
    };
    
    const SessionTypeIcon: React.FC<{ type: Session['type'] }> = ({ type }) => {
        const icons = {
            Chat: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>,
            Call: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>,
            Video: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>,
        }
        return <div className="flex items-center gap-2">{icons[type]} {type}</div>
    }

    const DetailPanel = () => (
        <aside className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-fade-in-left flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
                <h3 className="font-bold text-lg">Session Details</h3>
                <button onClick={() => setSelectedSession(null)} className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white">&times;</button>
            </div>
            {selectedSession && (
                <div className="mt-4 space-y-4 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <p><strong>Session ID:</strong> {selectedSession.id}</p>
                        <p><strong>User:</strong> <ReactRouterDOM.Link to={`/users/${selectedSession.userId}`} className="text-primary-600 hover:underline">{selectedSession.user}</ReactRouterDOM.Link></p>
                        <p><strong>Listener:</strong> <ReactRouterDOM.Link to={`/listeners/${selectedSession.listenerId}`} className="text-primary-600 hover:underline">{selectedSession.listener}</ReactRouterDOM.Link></p>
                        <p><strong>Status:</strong> <StatusPill status={selectedSession.status} /></p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <h4 className="font-semibold mb-2">Cost Summary</h4>
                        <p><strong>Current Cost:</strong> ${selectedSession.cost.toFixed(2)}</p>
                        <p><strong>Duration:</strong> {selectedSession.duration}</p>
                    </div>
                    
                     <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <h4 className="font-semibold mb-2">Activity Timeline</h4>
                        <ul className="text-sm space-y-2">
                           <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Session Started: {selectedSession.startedAt}</li>
                           {selectedSession.endedAt && <li className="flex items-center gap-2"><svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>Session Ended: {selectedSession.endedAt}</li>}
                        </ul>
                    </div>

                    {selectedSession.type === 'Chat' && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                            <h4 className="font-semibold mb-2">Chat Log Preview</h4>
                             <div className="space-y-2 text-sm">
                                {selectedSession.transcript?.map((msg, idx) => (
                                    <div key={idx}><span className="font-bold">{msg.sender}:</span> {msg.message}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </aside>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Live Sessions</h1>
            
            <div className="flex flex-col lg:flex-row gap-6">
                <main className={`w-full ${selectedSession ? 'lg:w-2/3' : 'lg:w-full'} transition-all duration-300`}>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                         <div className="flex items-center space-x-2 mb-4 border-b dark:border-gray-700 pb-3">
                            <span className="font-semibold">Filter by Status:</span>
                             {(['All', 'Ongoing', 'Completed', 'Cancelled'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${statusFilter === status ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                                >
                                    {status}
                                </button>
                             ))}
                        </div>

                         <div className="overflow-x-auto">
                             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Session ID</th>
                                        <th scope="col" className="px-6 py-3">User</th>
                                        <th scope="col" className="px-6 py-3">Listener</th>
                                        <th scope="col" className="px-6 py-3">Type</th>
                                        <th scope="col" className="px-6 py-3">Duration</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSessions.map(session => (
                                        <tr key={session.id} onClick={() => setSelectedSession(session)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                            <td className="px-6 py-4 font-mono text-xs">{session.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{session.user}</td>
                                            <td className="px-6 py-4">{session.listener}</td>
                                            <td className="px-6 py-4"><SessionTypeIcon type={session.type} /></td>
                                            <td className="px-6 py-4">{session.duration}</td>
                                            <td className="px-6 py-4"><StatusPill status={session.status} /></td>
                                            <td className="px-6 py-4">
                                                {session.status === 'Ongoing' && (
                                                    <button onClick={(e) => { e.stopPropagation(); handleEndSession(session.id); }} className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700">End Session</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                
                {selectedSession && <DetailPanel />}
            </div>
        </div>
    );
};

export default LiveSessions;
