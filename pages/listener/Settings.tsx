import React from 'react';
import { LogoutIcon } from '../../components/ui/icons/OtherIcons';

const Settings: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>

            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold border-b dark:border-gray-700 pb-4 mb-4">Profile Settings</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Your Name</label>
                        <input type="text" defaultValue="Ananya Mehta" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Your Bio</label>
                        <textarea rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">Experienced listener specializing in relationship advice.</textarea>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-primary-600 text-white rounded-lg">Save Profile</button>
                </form>
            </div>
            
            {/* Availability & Pricing */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold border-b dark:border-gray-700 pb-4 mb-4">Availability & Pricing</h2>
                 <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Set Your Status</label>
                         <select className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                             <option>Available</option>
                             <option>Unavailable</option>
                         </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Chat Rate (per 10 mins)</label>
                        <input type="number" defaultValue="10" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <button type="submit" className="px-5 py-2 bg-primary-600 text-white rounded-lg">Update Settings</button>
                </form>
            </div>
            
            {/* Logout */}
            <div className="pt-4">
                 <button className="w-full max-w-xs flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-red-500 font-bold">
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Logout
                 </button>
            </div>

        </div>
    );
};

export default Settings;
