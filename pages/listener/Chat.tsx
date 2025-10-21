import React, { useState } from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';

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
    const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');

    const user = { name: 'Riya Sharma', avatarUrl: 'https://i.pravatar.cc/150?u=1' };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 rounded-t-lg">
                <div className="flex items-center">
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h1 className="font-bold text-lg">{user.name}</h1>
                        <p className="text-xs text-green-500">Chatting...</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-md">End Session</button>
            </header>

            {/* Tab Navigation */}
            <div className="border-b dark:border-gray-700">
                <nav className="flex space-x-4 px-4">
                    <button onClick={() => setActiveTab('chat')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'chat' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Chat</button>
                    <button onClick={() => setActiveTab('notes')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'notes' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Session Notes (Private)</button>
                </nav>
            </div>
            
            {/* Body */}
            <main className="flex-1 overflow-y-auto p-4">
                {activeTab === 'chat' ? (
                    <div className="space-y-4">
                        <ChatBubble message="Hello! I'm feeling a bit overwhelmed today." isSender={false} time="10:30 AM" />
                        <ChatBubble message="Hi there, I'm here to listen. Tell me what's on your mind." isSender={true} time="10:31 AM" />
                    </div>
                ) : (
                    <div>
                        <textarea className="w-full h-64 p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="Type your private notes here..."></textarea>
                    </div>
                )}
            </main>

            {/* Input Form */}
            {activeTab === 'chat' && (
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 rounded-b-lg">
                    <form className="flex items-center space-x-2">
                        <input type="text" placeholder="Type a message..." className="w-full p-3 border rounded-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        <button type="submit" className="p-3 bg-primary-600 text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </form>
                </footer>
            )}
        </div>
    );
};

export default Chat;
