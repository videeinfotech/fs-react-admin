import React, { useState } from 'react';
import { EditIcon, LogoutIcon } from '../../components/ui/icons/OtherIcons';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const ToggleSwitch: React.FC<{ label: string, enabled: boolean, setEnabled: () => void }> = ({ label, enabled, setEnabled }) => (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="font-medium">{label}</span>
        <button
            type="button"
            className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            onClick={setEnabled}
        >
            <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
        </button>
    </div>
);

const Profile: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [showJournal, setShowJournal] = useState(true);
    const { logout } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const user = {
        name: 'Riya Sharma',
        email: 'riya@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=1'
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="p-4 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Profile</h1>
            </header>

            {/* Profile Info */}
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="relative">
                    <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full" />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full">
                        <EditIcon className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>

            {/* Wallet Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">My Wallet</h3>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500">Balance</p>
                        <p className="text-2xl font-bold">₹5,250.00</p>
                    </div>
                    <ReactRouterDOM.Link to="/user/wallet" className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg">Recharge</ReactRouterDOM.Link>
                </div>
                <ReactRouterDOM.Link to="/user/wallet" className="text-sm text-primary-600 mt-4 block">View Transaction History &rarr;</ReactRouterDOM.Link>
            </div>

            {/* My Sessions Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">My Sessions</h3>
                <div className="grid grid-cols-3 text-center">
                    <div><p className="font-bold text-lg">12</p><p className="text-xs text-gray-500">Total Sessions</p></div>
                    <div><p className="font-bold text-lg">342</p><p className="text-xs text-gray-500">Minutes Spent</p></div>
                    <div><p className="font-bold text-lg">Alice J.</p><p className="text-xs text-gray-500">Favorite Listener</p></div>
                </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
                <ToggleSwitch label="Dark Mode" enabled={theme === 'dark'} setEnabled={toggleTheme} />
                <ToggleSwitch label="Notifications" enabled={notifications} setEnabled={() => setNotifications(p => !p)} />
                <ToggleSwitch label="Show Mood Journal" enabled={showJournal} setEnabled={() => setShowJournal(p => !p)} />
            </div>

            {/* Help & Support */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Help & Support</h3>
                <div className="space-y-2">
                    <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Contact Support</button>
                    <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">FAQs</button>
                </div>
            </div>

             <div className="pt-4">
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-red-500 font-bold hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                 >
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Logout
                 </button>
            </div>
        </div>
    );
};

export default Profile;
