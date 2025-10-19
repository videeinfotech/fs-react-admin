import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { useToast } from '../hooks/useToast';
import { DataTable } from '../components/ui/DataTable';

// --- SHARED COMPONENTS & ICONS ---
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
                {changeType === 'up' ? ( <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> ) : ( <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> )}
                {change}
            </div>
        )}
    </div>
);

const FunnelChart: React.FC<{ data: { stage: string, value: number }[] }> = ({ data }) => {
    const maxValue = data[0]?.value || 1;
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Notification Funnel</h2>
            <div className="flex flex-col items-center space-y-1">
                {data.map((item, index) => {
                    const percentageOfMax = (item.value / maxValue) * 100;
                    const conversionRate = index > 0 ? ((item.value / data[index - 1].value) * 100).toFixed(1) + '%' : null;
                    return (
                        <div key={item.stage} className="w-full flex flex-col items-center">
                            {conversionRate && (
                                <div className="text-center text-xs my-1 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                    {conversionRate}
                                </div>
                            )}
                            <div className="bg-primary-500 text-white text-center py-2 rounded-sm transition-all duration-300" style={{ width: `${Math.max(percentageOfMax, 10)}%` }}>
                                <p className="font-bold text-sm">{item.stage}</p>
                                <p className="text-xs">{item.value.toLocaleString()}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- 1. CAMPAIGNS VIEW ---

const CampaignsView: React.FC = () => {
    const { addToast } = useToast();
    const [isABTesting, setIsABTesting] = useState(false);
    
    const handleSend = (type: 'test' | 'now' | 'schedule') => {
        addToast(`Campaign sent (${type})!`, 'success');
    };

    const SegmentBuilder = () => (
        <div>
             <label className="block text-sm font-medium mb-2">Audience Segments</label>
             <div className="flex flex-wrap gap-2 p-2 border rounded-md dark:border-gray-600 min-h-[40px]">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">Last Active {'>'} 7 days <button className="ml-1 font-bold">x</button></span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">Wallet Balance {'<'} ₹100 <button className="ml-1 font-bold">x</button></span>
                <button className="text-sm text-primary-600 hover:underline">+ Add Filter</button>
             </div>
        </div>
    );

    const PersonalizationHelper = () => (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
            <strong>Tokens:</strong> <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded-sm">{`{username}`}</code> <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded-sm">{`{wallet_balance}`}</code>
        </div>
    );

    const NotificationForm: React.FC<{ variant?: 'A' | 'B' }> = ({ variant }) => (
        <div className={`space-y-4 p-4 border rounded-md ${variant ? 'border-dashed' : 'border-transparent'}`}>
            {variant && <h3 className="font-semibold">Variant {variant}</h3>}
            <div>
                <label className="block text-sm font-medium">Notification Title</label>
                <input type="text" defaultValue={variant === 'B' ? "Your Wallet is Waiting!" : "Get 20% Off!"} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label className="block text-sm font-medium">Message Body</label>
                <textarea rows={3} defaultValue={variant === 'B' ? "We've missed you! Come back and see what's new." : "Recharge now and get 20% bonus credit on your next session."} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create a Campaign</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">A/B Testing</span>
                        <ToggleSwitch enabled={isABTesting} setEnabled={setIsABTesting} />
                    </div>
                </div>
                
                {isABTesting ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NotificationForm variant="A" />
                        <NotificationForm variant="B" />
                    </div>
                ) : (
                    <NotificationForm />
                )}
                
                <div className="space-y-4">
                    <SegmentBuilder />
                    <PersonalizationHelper />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Channels</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 border-gray-300 rounded"/> <span className="ml-2">Push</span></label>
                        <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded"/> <span className="ml-2">Email</span></label>
                        <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded"/> <span className="ml-2">SMS</span></label>
                    </div>
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
                        </div>
                        <p className="font-bold mt-2 text-sm dark:text-white">Get 20% Off!</p>
                        <p className="text-xs mt-1 dark:text-gray-400">Recharge now and get 20% bonus credit on your next session.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. AUTOMATIONS VIEW ---

const AutomationsView: React.FC = () => {
    const mockAutomations = [
        { id: 1, name: "Welcome Drip Campaign", type: "Drip Sequence", trigger: "User Registration", audience: "User", active: true },
        { id: 2, name: "Low Wallet Balance Alert", type: "Single Event", trigger: "Wallet < ₹100", audience: "User", active: true },
        { id: 3, name: "Post-Session Feedback", type: "Single Event", trigger: "Session Completed", audience: "User", active: true },
        { id: 4, name: "Inactive User Win-back", type: "Drip Sequence", trigger: "7 days idle", audience: "User", active: false },
    ];
    const [automations, setAutomations] = useState(mockAutomations);

    const toggleAutomation = (id: number) => {
        setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Automation Rules</h2>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Create New Automation</button>
            </div>
            <div className="space-y-4">
                {automations.map(auto => (
                    <div key={auto.id} className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-md">
                        <div>
                            <p className="font-semibold">{auto.name} <span className="ml-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{auto.type}</span></p>
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

// --- 3. TEMPLATES VIEW ---

const TemplatesView: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notification Templates</h2>
            <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Create New Template</button>
        </div>
        <div className="space-y-4">
            <div className="p-4 border dark:border-gray-700 rounded-md">
                <p className="font-semibold">Recharge Offer</p>
                <p className="text-sm text-gray-500 italic mt-1">"💸 Recharge now for ₹{`{amount}`} and get {`{bonus_percent}`}% bonus credit!"</p>
            </div>
            <div className="p-4 border dark:border-gray-700 rounded-md">
                <p className="font-semibold">Session Reminder</p>
                <p className="text-sm text-gray-500 italic mt-1">"Hey {`{username}`}, just a friendly reminder that your session with {`{listener_name}`} is in 15 minutes."</p>
            </div>
        </div>
    </div>
);

// --- 4. ANALYTICS VIEW ---
const AnalyticsView: React.FC = () => {
    const deliveryData = Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i+1}`, sent: 5000 + i*200, delivered: 4800 + i*150 }));
    const funnelChartData = [ { stage: 'Sent', value: 35700 }, { stage: 'Delivered', value: 35058 }, { stage: 'Opened', value: 12510 }, { stage: 'Clicked', value: 6340 }, { stage: 'Converted', value: 1234 } ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Sent (7d)" value="35,700" change="+10%" changeType="up" />
                <StatCard title="Delivery Rate" value="98.2%" change="-0.2%" changeType="down" />
                <StatCard title="Click-Through Rate" value="17.8%" change="+1.5%" changeType="up" />
                <StatCard title="Conversions" value="1,234" change="+120" changeType="up" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FunnelChart data={funnelChartData} />
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Delivery Trend (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={deliveryData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="sent" stroke="#8884d8" /><Line type="monotone" dataKey="delivered" stroke="#82ca9d" /></LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// --- 5. AUDIT LOG VIEW ---
const AuditLogView: React.FC = () => {
    const auditColumns = [
        { header: 'Campaign', accessor: 'campaign' as const, sortable: true },
        { header: 'Sent By', accessor: 'admin' as const, sortable: true },
        { header: 'Target', accessor: 'target' as const, sortable: true },
        { header: 'Sent At', accessor: 'date' as const, sortable: true },
        { header: 'Status', accessor: 'status' as const, sortable: true },
    ];
    const mockAuditLogs = [
        { id: 1, campaign: "Diwali Offer", admin: "admin@findsukoon.com", target: "8,500 Users", date: "2023-10-22 10:00 AM", status: "Success" },
        { id: 2, campaign: "Welcome Drip - Day 1", admin: "System", target: "New Users", date: "2023-10-22 09:30 AM", status: "Success" },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
            <DataTable columns={auditColumns} data={mockAuditLogs} />
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const PushNotifications: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'automations' | 'templates' | 'analytics' | 'log'>('campaigns');
    
    const renderContent = () => {
        switch(activeTab) {
            case 'campaigns': return <CampaignsView />;
            case 'automations': return <AutomationsView />;
            case 'templates': return <TemplatesView />;
            case 'analytics': return <AnalyticsView />;
            case 'log': return <AuditLogView />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Push Notifications</h1>
            
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('campaigns')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'campaigns' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Campaigns</button>
                    <button onClick={() => setActiveTab('automations')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'automations' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Automations</button>
                    <button onClick={() => setActiveTab('templates')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Templates</button>
                    <button onClick={() => setActiveTab('analytics')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Analytics</button>
                    <button onClick={() => setActiveTab('log')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'log' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Audit Log</button>
                </nav>
            </div>
            
            <div className="animate-fade-in">
                {renderContent()}
            </div>
        </div>
    );
};

export default PushNotifications;
