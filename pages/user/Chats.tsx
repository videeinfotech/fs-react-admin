import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { SearchIcon } from '../../components/ui/icons/OtherIcons';
import { mockListeners } from '../Listeners';

const ChatItem: React.FC<{ listener: typeof mockListeners[0], lastMessage: string, unread: number }> = ({ listener, lastMessage, unread }) => (
    <ReactRouterDOM.Link to={`/user/chat/sess_${listener.id}`} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <div className="relative">
            <img src={listener.avatarUrl} alt={listener.name} className="w-12 h-12 rounded-full" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </div>
        <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">{listener.name}</h3>
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
        { listener: mockListeners[0], lastMessage: "Sounds good, talk to you then!", unread: 2 },
        { listener: mockListeners[1], lastMessage: "You're welcome!", unread: 0 },
    ];

    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Your Conversations</h1>
            </header>

            {/* Search Bar */}
            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search by listener name..." className="w-full p-3 pl-10 border rounded-full bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>

            {/* Chat List */}
            <div className="space-y-2">
                {chats.length > 0 ? (
                    chats.map(chat => <ChatItem key={chat.listener.id} {...chat} />)
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No chats yet.</p>
                        <p className="text-gray-400 text-sm">Find a listener to start a conversation.</p>
                    </div>
                )}
            </div>
            
            {/* Floating Action Button */}
            <ReactRouterDOM.Link to="/user/find" className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <span className="sr-only">New Chat</span>
            </ReactRouterDOM.Link>
        </div>
    );
};

export default Chats;