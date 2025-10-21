import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
            <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8">
                <ReactRouterDOM.Link 
                    to="/" 
                    className="px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 transition"
                >
                    Go to Homepage
                </ReactRouterDOM.Link>
            </div>
        </div>
    );
};

export default NotFound;
