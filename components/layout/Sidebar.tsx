
import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-white dark:bg-gray-800`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white pl-2">Find Sukoon</h1>
            <button onClick={toggleSidebar} className="sm:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1.5">
                <span className="sr-only">Close sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
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