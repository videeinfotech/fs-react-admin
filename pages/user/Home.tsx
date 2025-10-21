import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BellIcon, HeartIcon } from '../../components/ui/icons/OtherIcons';
import { mockListeners } from '../Listeners';

const moodEmojis = ['😔', '😟', '😐', '😌', '😊'];

const ListenerShimmerCard: React.FC = () => (
    <div className="flex-shrink-0 w-32 text-center animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mt-3 w-24 mx-auto"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mt-2 w-16 mx-auto"></div>
    </div>
);

const ActiveListenerCard: React.FC<{ listener: typeof mockListeners[0] }> = ({ listener }) => (
     <ReactRouterDOM.Link to={`/user/listener/${listener.id}`} className="flex-shrink-0 w-32 text-center group">
        <div className="relative">
            <img src={listener.avatarUrl} alt={listener.name} className="w-20 h-20 rounded-full mx-auto border-2 border-transparent group-hover:border-primary-400 transition" />
            <span className="absolute bottom-1 right-6 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </div>
        <h3 className="mt-2 font-semibold text-sm truncate">{listener.name}</h3>
        <p className="text-xs text-gray-500">{listener.skills[0]}</p>
        <button className="mt-2 px-4 py-1 text-xs text-white bg-primary-600 rounded-full">Call</button>
    </ReactRouterDOM.Link>
);


const Home: React.FC = () => {
    const [mood, setMood] = useState(2); // Index for '😐'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4 space-y-8 relative">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back!</h1>
                    <p className="text-gray-500 dark:text-gray-400">Ready to find your peace?</p>
                </div>
                <div className="flex items-center space-x-4">
                     <div className="text-right">
                        <span className="text-xs text-gray-500">Balance</span>
                        <p className="font-bold text-primary-600">₹5,250</p>
                    </div>
                    <button className="relative">
                        <BellIcon />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </header>
            
            {/* Mood Tracker */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2 text-center">How are you feeling today?</h2>
                <div className="text-5xl text-center mb-4">{moodEmojis[mood]}</div>
                <input
                    type="range"
                    min="0"
                    max="4"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                 <textarea className="mt-4 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm" placeholder="Write what’s on your mind…"></textarea>
            </section>
            
             {/* Active Listeners Section */}
            <section>
                 <h2 className="text-lg font-semibold mb-4">Active Listeners</h2>
                 <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                     {loading ? (
                         Array.from({ length: 5 }).map((_, i) => <ListenerShimmerCard key={i} />)
                     ) : (
                         mockListeners.map(l => <ActiveListenerCard key={l.id} listener={l} />)
                     )}
                 </div>
            </section>
            
            {/* Floating Action Button */}
             <ReactRouterDOM.Link to="/user/find" className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition transform hover:scale-110">
                <HeartIcon className="w-7 h-7" />
                <span className="sr-only">New Session</span>
            </ReactRouterDOM.Link>

        </div>
    );
};

export default Home;