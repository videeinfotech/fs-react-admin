import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { Listener } from '../../types';
import { FilterIcon } from '../../components/ui/icons/OtherIcons';

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const ListenerCard: React.FC<{ listener: Listener }> = ({ listener }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="p-6 text-center">
            <img src={listener.avatarUrl} alt={listener.name} className="w-28 h-28 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-md" />
            <h3 className="mt-4 font-bold text-lg text-gray-900 dark:text-white">{listener.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{listener.city}</p>
            <div className="flex items-center justify-center mt-2">
                <StarRating rating={listener.avgRating} />
                <span className="text-xs ml-2 text-gray-500">({listener.totalSessions})</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 h-8 overflow-hidden">{listener.skills.join(', ')}</p>
            <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition">
                Call Now
            </a>
        </div>
    </div>
);

const ListenersPage: React.FC = () => {
    const [filters, setFilters] = useState({ language: 'All', location: 'All', rating: '0' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const languages = useMemo(() => ['All', ...new Set(mockListeners.flatMap(l => l.language))], []);
    const locations = useMemo(() => ['All', ...new Set(mockListeners.map(l => l.city))], []);

    const filteredListeners = useMemo(() => {
        return mockListeners.filter(listener => {
            const langMatch = filters.language === 'All' || listener.language.includes(filters.language);
            const locMatch = filters.location === 'All' || listener.city === filters.location;
            const ratingMatch = listener.avgRating >= parseInt(filters.rating);
            return langMatch && locMatch && ratingMatch;
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredListeners.length / itemsPerPage);
    const paginatedListeners = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredListeners.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredListeners, currentPage]);

    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Meet Our Local Listeners</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Learn from real people, not bots. Find a verified listener that fits your needs.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Filter Bar */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                             <h2 className="font-semibold flex items-center gap-2 text-lg"><FilterIcon /> Filters</h2>
                            <select value={filters.language} onChange={e => setFilters({...filters, language: e.target.value})} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                {languages.map(lang => <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>)}
                            </select>
                            <select value={filters.location} onChange={e => setFilters({...filters, location: e.target.value})} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>)}
                            </select>
                            <select value={filters.rating} onChange={e => setFilters({...filters, rating: e.target.value})} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                <option value="0">Any Rating</option>
                                <option value="4">4 Stars & Up</option>
                                <option value="3">3 Stars & Up</option>
                            </select>
                        </div>
                    </div>

                    {/* Listener Grid */}
                    {paginatedListeners.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {paginatedListeners.map(listener => <ListenerCard key={listener.id} listener={listener} />)}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-500">
                            <h3 className="text-xl font-semibold">No Listeners Found</h3>
                            <p>Try adjusting your filters to find more results.</p>
                        </div>
                    )}


                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 mx-1 bg-white dark:bg-gray-800 rounded-md disabled:opacity-50">
                                &larr; Previous
                            </button>
                            <span className="text-gray-600 dark:text-gray-300 mx-2">Page {currentPage} of {totalPages}</span>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 bg-white dark:bg-gray-800 rounded-md disabled:opacity-50">
                                Next &rarr;
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            <section className="py-20 bg-teal-500 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold">Want to teach your language?</h2>
                    <p className="mt-4 text-lg text-teal-100">If you are a fluent speaker and a great communicator, join our community of listeners and start earning.</p>
                    <div className="mt-8">
                        <ReactRouterDOM.Link to="/login" className="px-8 py-3 text-teal-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Join as a Listener
                        </ReactRouterDOM.Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ListenersPage;
