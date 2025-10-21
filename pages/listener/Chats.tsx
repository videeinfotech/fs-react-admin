import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { SearchIcon } from '../../components/ui/icons/OtherIcons';

const ChatItem: React.FC<{ user: { name: string, avatarUrl: string }, lastMessage: string, unread: number, isOngoing: boolean }> = ({ user, lastMessage, unread, isOngoing }) => (
    <ReactRouterDOM.Link to={`/listener/chat/sess_${user.name.split(' ')[0]}`} className={`flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${isOngoing ? 'border-l-4 border-green-500' : ''}`}>
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-xs text-gray-500">10:45 AM</p>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
                {unread > 0 && <span className="text-xs text-white bg-primary-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">{unread}</span>}
            </div>
        </div>
    </ReactRouterDOM.Link>
);

const Chats: React.FC = () => {
    const chats = [
        { user: { name: 'Riya Sharma', avatarUrl: 'https://i.pravatar.cc/150?u=1' }, lastMessage: "Thank you so much!", unread: 2, isOngoing: true },
        { user: { name: 'Aman Gupta', avatarUrl: 'https://i.pravatar.cc/150?u=2' }, lastMessage: "That makes sense.", unread: 0, isOngoing: false },
    ];

    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Your Chats</h1>
            </header>

            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search by user name..." className="w-full p-3 pl-10 border rounded-full bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>

            <div className="space-y-2">
                {chats.map((chat, i) => <ChatItem key={i} {...chat} />)}
            </div>
            
            <button className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <span className="sr-only">New Chat</span>
            </button>
        </div>
    );
};

export default Chats;