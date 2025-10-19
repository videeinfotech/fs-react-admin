import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { useToast } from '../hooks/useToast';
import { DataTable } from '../components/ui/DataTable';

// --- SHARED COMPONENTS ---
const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void; size?: 'sm' | 'md' }> = ({ enabled, setEnabled, size = 'md' }) => (
    <button type="button" onClick={() => setEnabled(!enabled)} className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${size === 'sm' ? 'h-5 w-10' : 'h-6 w-11'}`}>
        <span className={`pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? (size === 'sm' ? 'translate-x-5' : 'translate-x-5') : 'translate-x-0'} ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}`} />
    </button>
);

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'up' | 'down' }> = ({ title, value, change, changeType }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {change && (
            <div className={`mt-1 flex items-center text-sm ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {changeType === 'up' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                )}
                {change}
            </div>
        )}
    </div>
);


// --- 1. SEND CUSTOM NOTIFICATIONS VIEW ---

const SendCustomNotificationView: React.FC = () => {
    const { addToast } = useToast();
    const [title, setTitle] = useState('Get 20% Off!');
    const [message, setMessage] = useState('Recharge now and get 20% bonus credit on your next session.');
    const [target, setTarget] = useState('users');

    const handleSend = (type: 'test' | 'now' | 'schedule') => {
        addToast(`Notification sent (${type})!`, 'success');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Compose Notification</h2>
                    <div className="flex space-x-2 border-b dark:border-gray-700 mb-4">
                        {['Users', 'Listeners', 'Both'].map(t => (
                            <button key={t} onClick={() => setTarget(t.toLowerCase())} className={`px-4 py-2 text-sm font-medium rounded-t-lg ${target === t.toLowerCase() ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Notification Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Notification Type</label>
                        <select className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>Offer</option>
                            <option>Info</option>
                            <option>Reminder</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Message Body</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium">Deep Link (CTA)</label>
                    <input type="text" placeholder="/recharge" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                     <h3 className="text-lg font-semibold mb-2">Scheduling</h3>
                    <input type="datetime-local" className="w-full md:w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-700">
                    <button onClick={() => handleSend('test')} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-md">Send Test</button>
                    <button onClick={() => handleSend('schedule')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md">Schedule</button>
                    <button onClick={() => handleSend('now')} className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Send Now</button>
                </div>
            </div>

            <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                <div className="bg-gray-200 dark:bg-black p-4 rounded-2xl border-4 border-gray-700 dark:border-gray-600 w-full max-w-sm mx-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3">
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-primary-500 rounded-full text-white flex items-center justify-center text-xs font-bold">FS</span>
                            <span className="text-xs font-semibold dark:text-gray-300">Find Sukoon</span>
                            <span className="text-xs text-gray-400">· now</span>
                        </div>
                        <p className="font-bold mt-2 text-sm dark:text-white">{title}</p>
                        <p className="text-xs mt-1 dark:text-gray-400">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. AUTOMATIC NOTIFICATIONS VIEW ---

const AutomaticNotificationsView: React.FC = () => {
    const mockAutomations = [
        { id: 1, name: "Welcome Notification", trigger: "User Registration", audience: "User", active: true },
        { id: 2, name: "Low Wallet Balance Alert", trigger: "Wallet < ₹100", audience: "User", active: true },
        { id: 3, name: "Post-Session Feedback", trigger: "Session Completed", audience: "User", active: true },
        { id: 4, name: "Inactive User Win-back", trigger: "7 days idle", audience: "User", active: false },
        { id: 5, name: "Listener Inactivity Reminder", trigger: "3 days idle", audience: "Listener", active: true },
    ];
    const [automations, setAutomations] = useState(mockAutomations);

    const toggleAutomation = (id: number) => {
        setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Automation Rules</h2>
            <div className="space-y-4">
                {automations.map(auto => (
                    <div key={auto.id} className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-md">
                        <div>
                            <p className="font-semibold">{auto.name}</p>
                            <p className="text-sm text-gray-500">Trigger: {auto.trigger} | Audience: {auto.audience}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                             <span className={`px-2 py-1 text-xs font-medium rounded-full ${auto.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {auto.active ? 'Active' : 'Paused'}
                             </span>
                            <ToggleSwitch enabled={auto.active} setEnabled={() => toggleAutomation(auto.id)} size="sm" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 3. NOTIFICATION ANALYTICS VIEW ---
const NotificationAnalyticsView: React.FC = () => {
    const deliveryData = Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i+1}`, sent: 5000 + i*200, delivered: 4800 + i*150 }));
    const ctrData = [{ name: 'Welcome', ctr: 15.2 }, { name: 'Low Balance', ctr: 25.8 }, { name: 'Win-back', ctr: 8.1 }];
    const campaignColumns = [
        { header: 'Campaign', accessor: 'name' as const },
        { header: 'Type', accessor: 'type' as const },
        { header: 'Sent', accessor: 'sent' as const },
        { header: 'Delivered', accessor: 'delivered' as const },
        { header: 'CTR', accessor: 'ctr' as const, render: (item: any) => `${item.ctr}%` },
    ];
    const mockCampaigns = [
        { id: 1, name: "Welcome Series", type: "Automatic", sent: 1250, delivered: 1200, ctr: 15.2 },
        { id: 2, name: "Diwali Offer", type: "Custom", sent: 8500, delivered: 8250, ctr: 18.5 },
        { id: 3, name: "Low Balance Alert", type: "Automatic", sent: 4200, delivered: 4150, ctr: 25.8 },
    ];
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Sent (7d)" value="35,700" change="+10%" changeType="up" />
                <StatCard title="Delivery Rate" value="98.2%" change="-0.2%" changeType="down" />
                <StatCard title="Click-Through Rate" value="17.8%" change="+1.5%" changeType="up" />
                <StatCard title="Conversions" value="1,234" change="+120" changeType="up" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Delivery Trend (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={deliveryData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="sent" stroke="#8884d8" /><Line type="monotone" dataKey="delivered" stroke="#82ca9d" /></LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Engagement Rate (CTR by Campaign)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ctrData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis unit="%" /><Tooltip /><Bar dataKey="ctr" fill="#10b981" /></BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-4">Campaign Performance</h2>
                <DataTable columns={campaignColumns} data={mockCampaigns} />
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const PushNotifications: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'custom' | 'automatic' | 'analytics'>('custom');

    const renderContent = () => {
        switch(activeTab) {
            case 'custom': return <SendCustomNotificationView />;
            case 'automatic': return <AutomaticNotificationsView />;
            case 'analytics': return <NotificationAnalyticsView />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Push Notifications</h1>
            
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('custom')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'custom' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Send Custom Notification</button>
                    <button onClick={() => setActiveTab('automatic')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'automatic' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Automatic Notifications</button>
                    <button onClick={() => setActiveTab('analytics')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Notification Analytics</button>
                </nav>
            </div>
            
            <div className="animate-fade-in">
                {renderContent()}
            </div>
        </div>
    );
};

export default PushNotifications;
