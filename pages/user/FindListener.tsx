import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { RatingIcon, FilterIcon } from '../../components/ui/icons/OtherIcons';

const ListenerCard: React.FC<{ listener: typeof mockListeners[0] }> = ({ listener }) => (
    <ReactRouterDOM.Link to={`/user/listener/${listener.id}`} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
        <img src={listener.avatarUrl} alt={listener.name} className="w-24 h-24 rounded-full mx-auto border-4 border-gray-200 dark:border-gray-700" />
        <h3 className="mt-4 font-bold text-lg text-gray-900 dark:text-white">{listener.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{listener.skills[0]}</p>
        <div className="flex items-center justify-center mt-2">
            <RatingIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm ml-1 text-gray-600 dark:text-gray-300">{listener.avgRating.toFixed(1)}</span>
        </div>
    </ReactRouterDOM.Link>
);

const FindListener: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Find a Listener</h1>
                <p className="text-gray-500 dark:text-gray-400">Browse and connect with a listener who's right for you.</p>
            </header>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
                 <h2 className="font-semibold flex items-center gap-2"><FilterIcon /> Filter & Sort</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>All Topics</option>
                        <option>Relationships</option>
                        <option>Anxiety</option>
                        <option>Grief</option>
                    </select>
                     <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>All Languages</option>
                        <option>English</option>
                        <option>Spanish</option>
                    </select>
                     <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>Sort by Rating</option>
                        <option>Sort by Price</option>
                    </select>
                </div>
            </div>

            {/* Listener Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockListeners.map(listener => (
                    <ListenerCard key={listener.id} listener={listener} />
                ))}
                 {/* Add more for display */}
                 {mockListeners.map(listener => (
                    <ListenerCard key={listener.id + 10} listener={{...listener, id: listener.id+10}} />
                ))}
            </div>
        </div>
    );
};

export default FindListener;
