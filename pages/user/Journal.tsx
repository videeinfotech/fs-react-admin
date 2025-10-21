import React from 'react';

const Journal: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">My Journal</h1>
                <p className="text-gray-500 dark:text-gray-400">A private space for your thoughts.</p>
            </header>

            {/* New Entry Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">New Entry for Today</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Today's Mood</label>
                        <div className="flex space-x-4">
                           {['😊', '😌', '😐', '😟', '😞'].map(emoji => (
                               <button key={emoji} type="button" className="text-3xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-primary-500">{emoji}</button>
                           ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="journal-text" className="block text-sm font-medium mb-2">Today's Thoughts</label>
                        <textarea id="journal-text" rows={5} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="What's on your mind?"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">
                        Save Entry
                    </button>
                </form>
            </div>

            {/* Past Entries */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Past Entries</h2>
                <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold">October 28, 2023</h4>
                            <span className="text-2xl">😊</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 truncate">Had a great day today, feeling productive and happy...</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold">October 27, 2023</h4>
                            <span className="text-2xl">😟</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 truncate">Felt a bit anxious about the upcoming deadline...</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Journal;
