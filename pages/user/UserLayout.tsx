import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BottomNav } from '../../components/user/BottomNav';

export const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* You can add a top navbar for desktop or other elements here */}
            <main className="pb-20 md:pb-0">
                <ReactRouterDOM.Outlet />
            </main>
            <BottomNav />
        </div>
    );
};
