import React, { useState } from 'react';
import { GatewaySetting, Gateway } from '../types';
import { useToast } from '../hooks/useToast';

// Mock Data
const mockSettings: GatewaySetting[] = [
    { id: 'Razorpay', name: 'Razorpay', clientId: 'rzp_test_12345', secretKey: 'secret_abc123', webhookUrl: 'https://api.findsukoon.com/webhooks/razorpay', mode: 'Test', connected: true, lastUpdated: '2023-10-15' },
    { id: 'PayPal', name: 'PayPal', clientId: 'paypal_client_id', secretKey: 'paypal_secret', webhookUrl: 'https://api.findsukoon.com/webhooks/paypal', mode: 'Live', connected: true, lastUpdated: '2023-10-10' },
    { id: 'Payoneer', name: 'Payoneer', clientId: '', secretKey: '', webhookUrl: '', mode: 'Live', connected: false, lastUpdated: '' },
    { id: 'PhonePe', name: 'PhonePe', clientId: '', secretKey: '', webhookUrl: '', mode: 'Live', connected: false, lastUpdated: '' },
];

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (e: boolean) => void; labels: [string, string] }> = ({ enabled, setEnabled, labels }) => (
    <div className="flex items-center">
        <span className="mr-3 text-sm font-medium">{labels[0]}</span>
        <button type="button" onClick={() => setEnabled(!enabled)} className={`${enabled ? 'bg-primary-600' : 'bg-gray-400'} relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
        </button>
        <span className="ml-3 text-sm font-medium">{labels[1]}</span>
    </div>
);

const GatewaySettings: React.FC = () => {
    const [settings, setSettings] = useState<Record<Gateway, GatewaySetting>>(
        mockSettings.reduce((acc, s) => ({ ...acc, [s.id]: s }), {} as Record<Gateway, GatewaySetting>)
    );
    const [activeTab, setActiveTab] = useState<Gateway>('Razorpay');
    const { addToast } = useToast();

    const handleInputChange = (gateway: Gateway, field: keyof GatewaySetting, value: string) => {
        setSettings(prev => ({ ...prev, [gateway]: { ...prev[gateway], [field]: value } }));
    };

    const handleToggle = (gateway: Gateway, field: keyof GatewaySetting, value: boolean) => {
        const key = field as 'mode'; // Assuming only mode is a boolean toggle for now
        setSettings(prev => ({ ...prev, [gateway]: { ...prev[gateway], [key]: value ? 'Live' : 'Test' } }));
    };

    const handleSave = (gateway: Gateway) => {
        addToast(`${gateway} settings saved successfully!`, 'success');
    };
    
    const handleTestConnection = (gateway: Gateway) => {
        addToast(`Testing ${gateway} connection...`, 'info');
        setTimeout(() => {
            if (settings[gateway].connected) {
                addToast(`${gateway} connection successful!`, 'success');
            } else {
                addToast(`${gateway} connection failed.`, 'error');
            }
        }, 1500);
    };

    const activeSetting = settings[activeTab];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gateway Settings</h1>

            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <aside className="lg:w-1/4 mb-6 lg:mb-0">
                    <nav className="flex flex-col space-y-2">
                        {(['Razorpay', 'PayPal', 'Payoneer', 'PhonePe'] as Gateway[]).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-left text-sm font-medium rounded-md ${activeTab === tab ? 'bg-primary-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="lg:w-3/4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center border-b pb-4 mb-6 dark:border-gray-700">
                            <div>
                                <h2 className="text-xl font-bold">{activeSetting.name}</h2>
                                <span className={`px-2 py-1 text-xs rounded-full ${activeSetting.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {activeSetting.connected ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>
                            <ToggleSwitch enabled={activeSetting.mode === 'Live'} setEnabled={(val) => handleToggle(activeTab, 'mode', val)} labels={['Test', 'Live']} />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Merchant / Client ID</label>
                                <input type="text" value={activeSetting.clientId} onChange={(e) => handleInputChange(activeTab, 'clientId', e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Secret Key</label>
                                <input type="password" value={activeSetting.secretKey} onChange={(e) => handleInputChange(activeTab, 'secretKey', e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Webhook URL</label>
                                <input type="text" value={activeSetting.webhookUrl} onChange={(e) => handleInputChange(activeTab, 'webhookUrl', e.target.value)} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-6 mt-6 border-t dark:border-gray-700">
                            <button onClick={() => handleTestConnection(activeTab)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Test Connection</button>
                            <button onClick={() => handleSave(activeTab)} className="px-4 py-2 text-white bg-primary-600 rounded-lg">Save Settings</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GatewaySettings;
