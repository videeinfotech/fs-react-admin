import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// FIX: Corrected icon imports to point to their respective files instead of DashboardIcon.
import { DashboardIcon } from '../ui/icons/DashboardIcon';
import { WalletIcon } from '../ui/icons/WalletIcon';
import { ListenersIcon } from '../ui/icons/ListenersIcon';
import { AnalyticsIcon } from '../ui/icons/AnalyticsIcon';
import { SessionsTotalIcon } from '../ui/icons/OtherIcons';
import { QuizIcon } from '../ui/icons/QuizIcon';

const listenerNavLinks = [
    { name: 'Dashboard', path: '/listener', icon: <DashboardIcon /> },
    { name: 'Active Sessions', path: '/listener/sessions', icon: <ListenersIcon /> },
    { name: 'Earnings', path: '/listener/earnings', icon: <WalletIcon /> },
    { name: 'Reviews', path: '/listener/reviews', icon: <SessionsTotalIcon /> },
    { name: 'Analytics', path: '/listener/analytics', icon: <AnalyticsIcon /> },
    { name: 'Quiz', path: '/listener/quiz', icon: <QuizIcon /> },
];

interface SidebarProps {
  isSidebarOpen: boolean;
}

export const ListenerSidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-white dark:bg-gray-800`}>
            <div className="h-full px-3 py-4 overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pl-2">Listener Portal</h1>
                <ul className="space-y-2">
                    {listenerNavLinks.map(link => (
                        <li key={link.name}>
                            <ReactRouterDOM.NavLink
                                to={link.path}
                                end
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
                                }
                            >
                                {React.cloneElement(link.icon, { className: 'w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' })}
                                <span className="ml-3">{link.name}</span>
                            </ReactRouterDOM.NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};