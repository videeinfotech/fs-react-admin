import React, { useState } from 'react';

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ enabled, setEnabled }) => (
  <button
    type="button"
    className={`${
      enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
    onClick={() => setEnabled(!enabled)}
  >
    <span className="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);


const GeneralSettings = () => (
    <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Platform Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                    <label htmlFor="platform-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Name</label>
                    <input type="text" id="platform-name" defaultValue="Find Sukoon" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                    <input type="email" id="support-email" defaultValue="support@findsukoon.com" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label htmlFor="support-contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Support Contact</label>
                    <input type="tel" id="support-contact" defaultValue="+1 (123) 456-7890" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Zone</label>
                     <select id="timezone" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option> (GMT-12:00) International Date Line West</option>
                        <option> (GMT-11:00) Midway Island, Samoa</option>
                        <option> (GMT-05:00) Eastern Time (US & Canada)</option>
                        <option selected> (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                    </select>
                </div>
            </div>
        </div>
         <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Financial Settings</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                <div>
                    <label htmlFor="call-rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Call Rate (/min)</label>
                    <input type="number" id="call-rate" defaultValue="80.00" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label htmlFor="min-balance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Wallet Balance</label>
                    <input type="number" id="min-balance" defaultValue="500.00" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Currency</label>
                    <select id="currency" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option selected>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
);

const PaymentGateways = () => {
    const [phonePeEnabled, setPhonePeEnabled] = useState(true);
    const [razorpayMode, setRazorpayMode] = useState(true); // true for Live
    const [payPalMode, setPayPalMode] = useState(false); // false for Sandbox
    const [payoneerEnabled, setPayoneerEnabled] = useState(false);
    
    return (
        <div className="space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm">
                <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4 mb-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">PhonePe Integration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage PhonePe payment settings.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${phonePeEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                           {phonePeEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <ToggleSwitch enabled={phonePeEnabled} setEnabled={setPhonePeEnabled} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Merchant ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="password" placeholder="Merchant Key" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="text" placeholder="Redirect URL" className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                     <input type="text" placeholder="Webhook URL" className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Test Connection</button>
                </div>
            </div>
            
             <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm">
                <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4 mb-4">
                     <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Razorpay Integration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage Razorpay payment settings.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">{razorpayMode ? 'Live Mode' : 'Test Mode'}</span>
                        <ToggleSwitch enabled={razorpayMode} setEnabled={setRazorpayMode} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Razorpay Key ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="password" placeholder="Razorpay Secret Key" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                     <input type="password" placeholder="Webhook Secret" className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">View Logs</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Test Transaction</button>
                </div>
            </div>

             <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm">
                <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4 mb-4">
                     <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">PayPal Integration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage PayPal settings.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">{payPalMode ? 'Live Mode' : 'Sandbox Mode'}</span>
                        <ToggleSwitch enabled={payPalMode} setEnabled={setPayPalMode} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Client ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="password" placeholder="Secret Key" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                     <input type="text" placeholder="Webhook URL" className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div className="mt-4 flex justify-end space-x-2">
                    <a href="#" className="px-4 py-2 text-sm font-medium text-primary-600 hover:underline">View PayPal Dashboard</a>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Connect</button>
                </div>
            </div>

             <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm">
                <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4 mb-4">
                     <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payoneer Integration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage Payoneer payout settings.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${payoneerEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                           {payoneerEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <ToggleSwitch enabled={payoneerEnabled} setEnabled={setPayoneerEnabled} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Client ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="password" placeholder="Client Secret" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                     <input type="email" placeholder="Account Email" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="password" placeholder="Access Token" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                     <input type="text" placeholder="Payout Callback URL" className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Sync Balance</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Validate Credentials</button>
                </div>
            </div>
        </div>
    );
};

const SystemConfiguration = () => (
    <div className="space-y-8">
         <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Core URLs</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                    <label className="block text-sm font-medium">API Base URL</label>
                    <input type="text" defaultValue="https://api.findsukoon.com/v1" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Frontend URL</label>
                    <input type="text" defaultValue="https://findsukoon.com" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">SMTP Settings (Email)</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <input type="text" placeholder="SMTP Host" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" placeholder="SMTP Port" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" placeholder="Username" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="password" placeholder="Password" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <select className="sm:col-span-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option>None</option>
                    <option>SSL</option>
                    <option>TLS</option>
                </select>
            </div>
        </div>
         <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Firebase (FCM)</h3>
            <textarea rows={4} className="mt-4 w-full p-2 font-mono text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="Paste your Firebase JSON config here..."></textarea>
        </div>
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Agora (Voice/Video)</h3>
             <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <input type="text" placeholder="App ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="password" placeholder="App Certificate" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
        </div>
         <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">File Storage (S3)</h3>
             <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <input type="text" placeholder="Bucket Name" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" placeholder="Region" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" placeholder="Access Key ID" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="password" placeholder="Secret Access Key" className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
        </div>
    </div>
);


const PlaceholderTab: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-gray-500 dark:text-gray-400">This section is under construction.</p>
  </div>
);


const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    
    const tabs = [
        { id: 'general', name: 'General' },
        { id: 'payment', name: 'Payment Gateways' },
        { id: 'system', name: 'System' },
        { id: 'security', name: 'Security' },
    ];
    
    const renderContent = () => {
        switch(activeTab) {
            case 'general':
                return <GeneralSettings />;
            case 'payment':
                return <PaymentGateways />;
            case 'system':
                return <SystemConfiguration />;
            case 'security':
                 return <PlaceholderTab title="Security Settings" />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <aside className="lg:w-1/4 mb-6 lg:mb-0">
                    <nav className="flex flex-col space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-left text-sm font-medium rounded-md ${
                                    activeTab === tab.id
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className="lg:w-3/4">
                    {renderContent()}
                    <div className="sticky bottom-0 mt-8 py-4 bg-gray-100 dark:bg-gray-900 flex justify-end space-x-3 border-t-2 border-gray-200 dark:border-gray-700 -mx-4 px-4 rounded-b-lg">
                        <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                            Reset
                        </button>
                        <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700">
                            Save Changes
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;