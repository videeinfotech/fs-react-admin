import React from 'react';
import { EditIcon } from '../../components/ui/icons/OtherIcons';

const Profile: React.FC = () => {
    const user = {
        name: 'Riya Sharma',
        email: 'riya@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=1'
    };

    return (
        <div className="p-4 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <EditIcon />
                </button>
            </header>

            {/* Profile Info */}
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h3 className="text-lg font-semibold mb-4">My Badges</h3>
                 <div className="flex space-x-4">
                    <div className="text-center">
                        <div className="text-4xl p-2 bg-gray-100 rounded-full">🏅</div>
                        <p className="text-xs mt-1">First Session</p>
                    </div>
                     <div className="text-center">
                        <div className="text-4xl p-2 bg-gray-100 rounded-full">📝</div>
                        <p className="text-xs mt-1">Journal Streak</p>
                    </div>
                 </div>
            </div>

            {/* Account Management */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h3 className="text-lg font-semibold mb-4">Account</h3>
                 <div className="space-y-2">
                    <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Change Password</button>
                    <button className="w-full text-left p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md">Delete Account</button>
                 </div>
            </div>
        </div>
    );
};

export default Profile;
