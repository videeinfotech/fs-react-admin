import React from 'react';
import { LogoutIcon } from '../../components/ui/icons/OtherIcons';

const SettingsLink: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="font-medium">{children}</span>
        <span className="text-gray-400">&gt;</span>
    </div>
);

const SettingsToggle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="font-medium">{children}</span>
        {/* Placeholder for a toggle switch component */}
        <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
    </div>
);


const Settings: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Settings</h1>
            </header>

            <div className="space-y-3">
                <SettingsToggle>Push Notifications</SettingsToggle>
                <SettingsToggle>Dark Mode</SettingsToggle>
                <SettingsLink>Privacy Policy</SettingsLink>
                <SettingsLink>Terms of Service</SettingsLink>
                <SettingsLink>Support</SettingsLink>
            </div>
            
             <div className="pt-4">
                 <button className="w-full flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-red-500 font-bold">
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Logout
                 </button>
            </div>
        </div>
    );
};

export default Settings;
