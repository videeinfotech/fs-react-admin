import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { HomeIcon, SearchIcon } from '../ui/icons/OtherIcons';
import { WalletIcon } from '../ui/icons/WalletIcon';
import { UsersIcon } from '../ui/icons/UsersIcon';
// FIX: Add IconProps to fix cloneElement typing issue
import { IconProps } from '../ui/icons/Icon';

const navLinks = [
    { name: 'Home', path: '/user', icon: <HomeIcon /> },
    { name: 'Find', path: '/user/find', icon: <SearchIcon /> },
    { name: 'Wallet', path: '/user/wallet', icon: <WalletIcon /> },
    { name: 'Profile', path: '/user/profile', icon: <UsersIcon /> },
];

const NavItem: React.FC<{ name: string; path: string; icon: React.ReactElement<IconProps> }> = ({ name, path, icon }) => {
    const location = ReactRouterDOM.useLocation();
    const isActive = location.pathname === path;
    return (
        <ReactRouterDOM.NavLink to={path} className="flex flex-col items-center justify-center flex-1 text-center group">
            {React.cloneElement(icon, { className: `w-6 h-6 mb-1 transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}` })}
            <span className={`text-xs font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-500'}`}>
                {name}
            </span>
        </ReactRouterDOM.NavLink>
    );
};

export const BottomNav: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {navLinks.map(link => <NavItem key={link.name} {...link} />)}
            </div>
        </div>
    );
};