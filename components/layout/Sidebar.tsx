
import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

interface SidebarProps {
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-white dark:bg-gray-800`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 pl-2">Find Sukoon</h1>
        <ul className="space-y-2 font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <ReactRouterDOM.NavLink
                to={link.path}
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
