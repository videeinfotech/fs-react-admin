import React, { useState, useMemo } from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { mockListeners } from './Listeners';
import { mockSessions } from './Sessions';
import { mockFeedback } from './Feedback';
import { Listener, Session, Feedback as FeedbackType } from '../types';
import { DataTable } from '../components/ui/DataTable';
import { IconProps } from '../components/ui/icons/Icon';
import { ResponsiveContainer, LineChart, BarChart, RadarChart, PieChart, Line, Bar, Radar, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
// FIX: Added ClockIcon to the import to resolve a 'Cannot find name' error.
import { SessionsTotalIcon, PayBonusIcon, MessageIcon, SuspendIcon, BrainIcon, PdfIcon, SentimentPositiveIcon, SentimentNeutralIcon, SentimentNegativeIcon, ClockIcon } from '../components/ui/icons/OtherIcons';
import { WalletIcon } from '../components/ui/icons/WalletIcon';


// --- MOCK DATA ---
const detailedMockListeners = mockListeners.map(l => ({
    ...l,
    id: l.id,
    gender: 'Female',
    experience: '2 years',
    availability: 'Online',
    pendingPayout: 3200,
    walletBalance: 1000,
    avgSessionDuration: '28 mins'
}));

const mockListenerPayouts = [
    { id: 'P-2101', date: '2023-10-17', amount: 6120, gateway: 'Razorpay', status: 'Completed' },
    { id: 'P-2089', date: '2023-10-10', amount: 3200, gateway: 'Payoneer', status: 'Completed' },
    { id: 'P-2075', date: '2023-10-03', amount: 2750, gateway: 'PayPal', status: 'Failed' },
];

const mockListenerBonuses = [
    { date: '2023-10-18', reason: 'Top Performer Bonus', amount: 500, type: 'Credit', admin: 'Admin' },
    { date: '2023-10-14', reason: 'Late Session Penalty', amount: 200, type: 'Debit', admin: 'System' },
];

const earningsGrowthData = [{ name: 'Jan', earnings: 4500 }, { name: 'Feb', earnings: 4800 }, { name: 'Mar', earnings: 5300 }, { name: 'Apr', earnings: 6100 }];
const sessionCountData = [{ name: 'Chat', count: 120 }, { name: 'Call', count: 90 }, { name: 'Video', count: 32 }];
const skillStrengthData = [{ subject: 'Empathy', A: 120, fullMark: 150 }, { subject: 'Communication', A: 98, fullMark: 150 }, { subject: 'Patience', A: 86, fullMark: 150 }, { subject: 'Rating', A: 139, fullMark: 150 }];
const ratingDistributionData = [{ name: '5 Stars', value: 230 }, { name: '4 Stars', value: 20 }, { name: '3 Stars', value: 5 }, { name: '2 Stars', value: 1 }, { name: '1 Star', value: 0 }];


// --- HELPER COMPONENTS ---

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement<IconProps> }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-3">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const SentimentDisplay: React.FC<{ comment: string }> = ({ comment }) => {
    // Dummy sentiment analysis
    const isPositive = /amazing|great|helpful|calming|patient/i.test(comment);
    const isNegative = /rushed|didn't understand|unprofessional/i.test(comment);
    
    if(isPositive) return <span className="flex items-center gap-1 text-green-600"><SentimentPositiveIcon /> Positive</span>;
    if(isNegative) return <span className="flex items-center gap-1 text-red-600"><SentimentNegativeIcon /> Negative</span>;
    return <span className="flex items-center gap-1 text-yellow-600"><SentimentNeutralIcon /> Neutral</span>;
}


// --- MAIN COMPONENT ---
const ListenerDetails: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const { addToast } = useToast();
    const listenerId = parseInt(id || '0', 10);

    const [financialTab, setFinancialTab] = useState('earnings');
    
    const listener = detailedMockListeners.find(l => l.id === listenerId);
    const listenerSessions = mockSessions.filter(s => s.listenerId === listenerId);
    const listenerFeedback = mockFeedback.filter(f => f.listener === listener?.name);

    if (!listener) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">Listener not found.</h1>
                <ReactRouterDOM.Link to="/listeners" className="text-primary-600 hover:underline">Back to Listener List</ReactRouterDOM.Link>
            </div>
        );
    }
    
    const sessionColumns = useMemo(() => [
        { header: 'Session ID', accessor: 'id' as keyof Session, sortable: true },
        { header: 'Date', accessor: 'startedAt' as keyof Session, sortable: true },
        { header: 'User', accessor: 'user' as keyof Session, sortable: true, render: (s: Session) => <ReactRouterDOM.Link to={`/users/${s.userId}`} className="text-primary-600 hover:underline">{s.user}</ReactRouterDOM.Link> },
        { header: 'Type', accessor: 'type' as keyof Session, sortable: true },
        { header: 'Duration', accessor: 'duration' as keyof Session, sortable: true },
        { header: 'Earning', accessor: 'cost' as keyof Session, sortable: true, render: (s: Session) => `₹${s.cost.toFixed(2)}` },
        { header: 'Status', accessor: 'status' as keyof Session, sortable: true },
    ], []);

    const reviewColumns = useMemo(() => [
        { header: 'Date', accessor: 'date' as keyof FeedbackType, sortable: true },
        { header: 'User', accessor: 'user' as keyof FeedbackType, sortable: true },
        { header: 'Rating', accessor: 'rating' as keyof FeedbackType, sortable: true, render: (f: FeedbackType) => <StarRating rating={f.rating} /> },
        { header: 'Review', accessor: 'comment' as keyof FeedbackType, sortable: false },
        { header: 'Sentiment', accessor: 'comment' as keyof FeedbackType, sortable: false, render: (f: FeedbackType) => <SentimentDisplay comment={f.comment} /> },
    ], []);

    const handleAction = (action: string) => addToast(action, 'info');

    return (
        <div className="space-y-8">
            {/* Breadcrumbs */}
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center"><ReactRouterDOM.Link to="/listeners" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Listeners</ReactRouterDOM.Link></li>
                    <li className="flex items-center"><span className="text-gray-400 mx-2">/</span><span className="text-gray-700 dark:text-white font-medium">{listener.name}</span></li>
                </ol>
            </nav>

            {/* Section 1: Profile & Summary Header */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <img src={listener.avatarUrl} alt={listener.name} className="w-24 h-24 rounded-full border-4 border-primary-200 object-cover flex-shrink-0" />
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{listener.name} (L-{listener.id})</h1>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{listener.gender}, {listener.age}</span><span>{listener.city}</span><span>{listener.language.join(', ')}</span><span>{listener.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${listener.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{listener.status}</span>
                            <span className="flex items-center gap-1"><StarRating rating={listener.avgRating} /> ({listenerFeedback.length} Reviews)</span>
                        </div>
                         <div className="flex flex-wrap gap-2 mt-4">
                            {listener.skills.map(skill => <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{skill}</span>)}
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-start gap-2 w-full md:w-auto">
                        <button onClick={() => handleAction('Editing profile...')} className="btn-primary text-sm">Edit Profile</button>
                        <button onClick={() => handleAction('Suspending listener...')} className="btn-secondary text-sm flex items-center gap-1"><SuspendIcon /> Suspend</button>
                        <button onClick={() => handleAction('Sending message...')} className="btn-secondary text-sm flex items-center gap-1"><MessageIcon /> Message</button>
                        <button onClick={() => handleAction('Paying bonus...')} className="btn-secondary text-sm flex items-center gap-1"><PayBonusIcon /> Pay Bonus</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Sessions" value={listener.totalSessions.toString()} icon={<SessionsTotalIcon />} />
                <StatCard title="Total Earnings" value={`₹${listener.totalEarnings.toLocaleString()}`} icon={<WalletIcon />} />
                <StatCard title="Pending Payout" value={`₹${listener.pendingPayout.toLocaleString()}`} icon={<WalletIcon />} />
                <StatCard title="Avg. Session Duration" value={listener.avgSessionDuration} icon={<ClockIcon />} />
            </div>

            {/* Section 2: Session History */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h2 className="text-2xl font-bold mb-4">Session History</h2>
                 <DataTable columns={sessionColumns} data={listenerSessions} />
            </div>
            
            {/* Section 3: Reviews & Ratings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div><DataTable columns={reviewColumns} data={listenerFeedback} /></div>
                    <div>
                         <h3 className="text-lg font-semibold mb-2 text-center">Ratings Distribution</h3>
                         <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={ratingDistributionData} layout="vertical"><CartesianGrid /><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={60} fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#34d399" /></BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
             {/* Section 4: Financial Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8">
                        <button onClick={() => setFinancialTab('earnings')} className={`tab ${financialTab === 'earnings' && 'tab-active'}`}>Earnings</button>
                        <button onClick={() => setFinancialTab('payouts')} className={`tab ${financialTab === 'payouts' && 'tab-active'}`}>Payout History</button>
                        <button onClick={() => setFinancialTab('bonus')} className={`tab ${financialTab === 'bonus' && 'tab-active'}`}>Bonus / Adjustments</button>
                    </nav>
                </div>
                <div className="mt-4">
                    {financialTab === 'earnings' && <DataTable columns={sessionColumns.filter(c => ['startedAt', 'id', 'type', 'duration', 'cost'].includes(c.accessor as string))} data={listenerSessions} />}
                    {financialTab === 'payouts' && <DataTable columns={useMemo(() => [{header: 'Payout ID', accessor: 'id'}, {header: 'Date', accessor: 'date'}, {header: 'Amount', accessor: 'amount', render: (p:any) => `₹${p.amount}`}, {header: 'Gateway', accessor: 'gateway'}, {header: 'Status', accessor: 'status'}],[])} data={mockListenerPayouts} renderActions={(p:any) => <button className="text-primary-600"><PdfIcon /></button>} />}
                    {financialTab === 'bonus' && <DataTable columns={useMemo(() => [{header: 'Date', accessor: 'date'}, {header: 'Reason', accessor: 'reason'}, {header: 'Amount', accessor: 'amount', render: (b:any) => `₹${b.amount}`}, {header: 'Type', accessor: 'type'}, {header: 'Admin', accessor: 'admin'}],[])} data={mockListenerBonuses} />}
                </div>
            </div>

            {/* Section 5: Analytics & Insights */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h2 className="text-2xl font-bold mb-4">Analytics & Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-2 border dark:border-gray-700 rounded-md">
                                <h3 className="font-semibold text-center text-sm mb-2">Earnings Over Time</h3>
                                <ResponsiveContainer width="100%" height={200}><LineChart data={earningsGrowthData}><CartesianGrid /><XAxis dataKey="name" fontSize={10}/><YAxis fontSize={10}/><Tooltip /><Line type="monotone" dataKey="earnings" stroke="#82ca9d" /></LineChart></ResponsiveContainer>
                            </div>
                             <div className="p-2 border dark:border-gray-700 rounded-md">
                                <h3 className="font-semibold text-center text-sm mb-2">Session Count by Type</h3>
                                <ResponsiveContainer width="100%" height={200}><BarChart data={sessionCountData}><CartesianGrid /><XAxis dataKey="name" fontSize={10}/><YAxis fontSize={10}/><Tooltip /><Bar dataKey="count" fill="#34d399" /></BarChart></ResponsiveContainer>
                            </div>
                         </div>
                         <div className="p-2 border dark:border-gray-700 rounded-md">
                            <h3 className="font-semibold text-center text-sm mb-2">Skill Strength</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillStrengthData}><PolarGrid /><PolarAngleAxis dataKey="subject" fontSize={12} /><PolarRadiusAxis /><Radar name={listener.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} /></RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                         <h3 className="text-lg font-bold flex items-center gap-2"><BrainIcon className="w-5 h-5 text-primary-500" /> AI Insights</h3>
                         <div className="space-y-3 text-sm">
                            <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-md">
                                <p className="font-semibold">Performance Dip</p>
                                <p className="text-gray-600 dark:text-gray-300">Average rating dropped by 0.2 this week.</p>
                            </div>
                             <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-md">
                                <p className="font-semibold">Top Skill</p>
                                <p className="text-gray-600 dark:text-gray-300">Scores highest in 'Empathy' based on user feedback sentiment.</p>
                            </div>
                             <div className="bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-md">
                                <p className="font-semibold">Recommendation</p>
                                <p className="text-gray-600 dark:text-gray-300">Recommend a ₹500 bonus for consistent 5-star feedback this month.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ListenerDetails;
