import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';

const ChatBubble: React.FC<{ message: string, isSender: boolean, time: string }> = ({ message, isSender, time }) => (
    <div className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-4 py-2 rounded-lg max-w-[80%] ${isSender ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'}`}>
            <p className="text-sm">{message}</p>
            <p className={`text-xs mt-1 text-right ${isSender ? 'text-primary-200' : 'text-gray-500'}`}>{time}</p>
        </div>
    </div>
);

const Chat: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    // In a real app, you'd fetch session details based on sessionId
    const listener = mockListeners[0];

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="flex items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
                <ReactRouterDOM.Link to="/user/find" className="text-gray-500 mr-4">&larr;</ReactRouterDOM.Link>
                <img src={listener.avatarUrl} alt={listener.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h1 className="font-bold text-lg">{listener.name}</h1>
                    <p className="text-xs text-green-500">Online</p>
                </div>
            </header>

            {/* Chat Body */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <ChatBubble message="Hello! I'm feeling a bit overwhelmed today." isSender={true} time="10:30 AM" />
                <ChatBubble message="Hi there, I'm here to listen. Tell me what's on your mind." isSender={false} time="10:31 AM" />
                <ChatBubble message="It's just work stress piling up. I don't know where to start." isSender={true} time="10:32 AM" />
            </main>

            {/* Input Form */}
            <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 sticky bottom-0">
                <form className="flex items-center space-x-2">
                    <input type="text" placeholder="Type a message..." className="w-full p-3 border rounded-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <button type="submit" className="p-3 bg-primary-600 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;
