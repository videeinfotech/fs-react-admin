import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { UsersIcon } from '../components/ui/icons/UsersIcon';
import { ListenersIcon } from '../components/ui/icons/ListenersIcon';
import { MonitoringIcon } from '../components/ui/icons/MonitoringIcon';
import { WebsiteIcon } from '../components/ui/icons/WebsiteIcon';
// FIX: Add IconProps to fix cloneElement typing issue
import { IconProps } from '../components/ui/icons/Icon';

const AppCard: React.FC<{ title: string; description: string; path: string; icon: React.ReactElement<IconProps> }> = ({ title, description, path, icon }) => {
    return (
        <ReactRouterDOM.Link 
            to={path}
            className="block bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center justify-center h-16 w-16 mb-6 bg-primary-100 dark:bg-primary-900/50 rounded-full">
                {React.cloneElement(icon, { className: 'w-8 h-8 text-primary-600 dark:text-primary-400' })}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
            <div className="mt-6">
                <span className="text-primary-600 font-semibold hover:underline">
                    Go to {title} &rarr;
                </span>
            </div>
        </ReactRouterDOM.Link>
    );
};


const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                    Find Sukoon Platform
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                    Select an application to view.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
                <AppCard 
                    title="Main Website" 
                    description="The public-facing marketing website to attract new users and listeners."
                    path="/website"
                    icon={<WebsiteIcon />}
                />
                <AppCard 
                    title="User App" 
                    description="The client-facing application for users seeking emotional support and wellness services."
                    path="/user"
                    icon={<UsersIcon />}
                />
                <AppCard 
                    title="Listener App" 
                    description="The dashboard for our certified listeners to manage sessions, earnings, and their profile."
                    path="/listener"
                    icon={<ListenersIcon />}
                />
                <AppCard 
                    title="Admin Panel" 
                    description="The central hub for administrators to manage the entire platform, users, and operations."
                    path="/admin"
                    icon={<MonitoringIcon />}
                />
            </div>
        </div>
    );
};

export default LandingPage;