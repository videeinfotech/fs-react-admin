import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BottomNav } from '../../components/user/BottomNav';
import FloatingCallWidget from '../../components/FloatingCallWidget';

const UserLayout: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <main className="pb-20">
                <ReactRouterDOM.Outlet />
            </main>
            <FloatingCallWidget />
            <BottomNav />
        </div>
    );
};

export default UserLayout;
