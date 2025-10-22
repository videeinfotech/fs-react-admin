import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const navLinks = [
    { name: 'Home', path: '#' },
    { name: 'About', path: '#' },
    { name: 'Why Choose Us', path: '#' },
    { name: 'Listeners', path: '#' },
    { name: 'Blogs', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Careers', path: '#' },
];

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-3 max-w-6xl">
                <div className="flex justify-between items-center">
                    <ReactRouterDOM.Link to="/website" className="text-2xl font-bold text-primary-600">Find Sukoon</ReactRouterDOM.Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a href={link.path} key={link.name} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">{link.name}</a>
                        ))}
                         <ReactRouterDOM.Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">Login</ReactRouterDOM.Link>
                    </div>
                    <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="hidden md:block px-5 py-2 text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105">
                        Download App
                    </a>
                    {/* Mobile menu button */}
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

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            Learn Local Languages from Local People
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            1-on-1 Live Calls with Real Speakers in your city — improve your speaking confidence.
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start space-x-4">
                            <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-white font-semibold bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Download App
                            </a>
                            <ReactRouterDOM.Link to="/login" className="px-8 py-3 text-primary-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                                Join as Listener
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-2xl transform md:rotate-3">
                             <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                                <span className="text-gray-400">App Mockup Here</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <div className="container mx-auto px-6 py-8 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Find Sukoon</h3>
                        <p className="mt-2 text-sm">Learn local languages from local people.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Links</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-600">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-600">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h3>
                        <div className="flex space-x-4 mt-2">
                           {/* Social Icons Placeholder */}
                           <a href="#" className="hover:text-primary-600">FB</a>
                           <a href="#" className="hover:text-primary-600">IG</a>
                           <a href="#" className="hover:text-primary-600">LI</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Find Sukoon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const Website: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50">
            <Header />
            <main>
                <HeroSection />
                {/* Other sections will be added here */}
            </main>
            <Footer />
        </div>
    );
};

export default Website;