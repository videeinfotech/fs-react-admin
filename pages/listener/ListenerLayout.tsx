import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ListenerSidebar } from '../../components/listener/Sidebar';
import { ListenerNavbar } from '../../components/listener/Navbar';

export const ListenerLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-full">
            <ListenerNavbar toggleSidebar={toggleSidebar} />
            <ListenerSidebar isSidebarOpen={isSidebarOpen} />
            <main className="p-4 sm:ml-64 mt-14">
                <ReactRouterDOM.Outlet />
            </main>
        </div>
    );
};