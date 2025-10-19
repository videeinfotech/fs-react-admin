
import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Users</h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Active Sessions</h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">56</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Revenue</h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$15,678</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Open Tickets</h2>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
