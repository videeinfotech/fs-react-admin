import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const WebsiteLayout: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 antialiased">
            <Header />
            <main>
                <ReactRouterDOM.Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default WebsiteLayout;
