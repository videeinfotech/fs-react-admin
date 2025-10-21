import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BellIcon, HeartIcon } from '../../components/ui/icons/OtherIcons';
import { mockListeners } from '../Listeners';

const moodEmojis = ['😔', '😟', '😐', '😌', '😊'];

// New shimmer card for a vertical list
const ListenerShimmerCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-20 h-9 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
);

// New listener card for a vertical list
const ActiveListenerCard: React.FC<{ listener: typeof mockListeners[0] }> = ({ listener }) => {
    const navigate = ReactRouterDOM.useNavigate();
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <ReactRouterDOM.Link to={`/user/listener/${listener.id}`} className="flex-shrink-0 relative">
                <img src={listener.avatarUrl} alt={listener.name} className="w-16 h-16 rounded-full" />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </ReactRouterDOM.Link>
            <div className="flex-1 min-w-0">
                <ReactRouterDOM.Link to={`/user/listener/${listener.id}`}>
                    <h3 className="font-bold text-lg truncate">{listener.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{listener.skills.join(', ')}</p>
                </ReactRouterDOM.Link>
            </div>
            <button 
                onClick={() => navigate(`/user/calling/${listener.id}`)}
                className="flex-shrink-0 px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition">
                Call
            </button>
        </div>
    );
};


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
                <div className="text-5xl text-center my-4">{moodEmojis[mood]}</div>
                <input
                    type="range"
                    min="0"
                    max="4"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                />
                 <textarea className="mt-4 w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Write what’s on your mind…"></textarea>
            </section>
            
             {/* Active Listeners Section */}
            <section>
                 <h2 className="text-lg font-semibold mb-4">Available Listeners</h2>
                 <div className="space-y-4">
                     {loading ? (
                         <>
                            <ListenerShimmerCard />
                            <ListenerShimmerCard />
                            <ListenerShimmerCard />
                         </>
                     ) : (
                         mockListeners.slice(0, 3).map(l => <ActiveListenerCard key={l.id} listener={l} />)
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