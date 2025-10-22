import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const navLinks = [
    { name: 'Home', path: '/website' },
    { name: 'About', path: '/website/about' },
    { name: 'Why Choose Us', path: '/website/why-choose-us' },
    { name: 'Listeners', path: '/website/listeners' },
    { name: 'How It Works', path: '/website/how-it-works' },
    { name: 'Testimonials', path: '/website/testimonials' },
    { name: 'Blogs', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Careers', path: '#' },
];

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

export const Header: React.FC = () => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-3 max-w-7xl">
                <div className="flex justify-between items-center">
                    <ReactRouterDOM.Link to="/website" className="text-2xl font-bold text-primary-600">Find Sukoon</ReactRouterDOM.Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <ReactRouterDOM.NavLink
                                to={link.path}
                                key={link.name}
                                className={({ isActive }) =>
                                    `transition-colors font-medium ${isActive ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`
                                }
                            >
                                {link.name}
                            </ReactRouterDOM.NavLink>
                        ))}
                         <ReactRouterDOM.Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-medium">Login</ReactRouterDOM.Link>
                    </div>
                    <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="hidden md:block px-5 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                        Download App
                    </a>
                    <div className="md:hidden">
                        <button className="text-gray-600 dark:text-gray-300 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};