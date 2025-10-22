import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FilterIcon, PlayCircleIcon } from '../../components/ui/icons/OtherIcons';

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

// --- MOCK DATA ---
const mockTestimonials = [
    { id: 1, name: "Priya K.", avatar: "https://i.pravatar.cc/150?u=10", language: "Hindi", rating: 5, comment: "I finally feel confident speaking Hindi! My listener was so patient and encouraging. It feels like talking to a friend.", featured: true },
    { id: 2, name: "Rohan S.", avatar: "https://i.pravatar.cc/150?u=11", language: "Marathi", rating: 5, comment: "Find Sukoon is the best app for practical language learning. I improved my Marathi speaking skills in just a few weeks.", featured: true },
    { id: 3, name: "Anjali M.", avatar: "https://i.pravatar.cc/150?u=12", language: "Bengali", rating: 4, comment: "A great way to connect with native speakers. The per-minute pricing is very affordable.", featured: true },
    { id: 4, name: "Vikram N.", avatar: "https://i.pravatar.cc/150?u=13", language: "Tamil", rating: 5, comment: "This app is revolutionary. I can practice anytime I want without any pressure. Highly recommended!", featured: false },
    { id: 5, name: "Sneha B.", avatar: "https://i.pravatar.cc/150?u=14", language: "Hindi", rating: 4, comment: "The listeners are very friendly and make you feel comfortable. It's much better than learning from a book.", featured: false },
    { id: 6, name: "Karan P.", avatar: "https://i.pravatar.cc/150?u=15", language: "Kannada", rating: 5, comment: "Fantastic! I've learned more in a month here than in a year of using other apps.", featured: false },
];

const videoTestimonials = [
    { id: 1, name: "Aisha's Story", thumbnail: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/video1.jpg" },
    { id: 2, name: "Suresh's Journey", thumbnail: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/video2.jpg" },
];

// --- COMPONENTS ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const TestimonialCard: React.FC<{ testimonial: typeof mockTestimonials[0] }> = ({ testimonial }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
        <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.comment}"</p>
        <div className="flex items-center">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">Learned {testimonial.language}</p>
                <StarRating rating={testimonial.rating} />
            </div>
        </div>
    </div>
);

const TestimonialsPage: React.FC = () => {
    const [filters, setFilters] = useState({ language: 'All', rating: '0' });
    const languages = useMemo(() => ['All', ...new Set(mockTestimonials.map(t => t.language))], []);

    const filteredTestimonials = useMemo(() => {
        return mockTestimonials.filter(t => {
            const langMatch = filters.language === 'All' || t.language === filters.language;
            const ratingMatch = t.rating >= parseInt(filters.rating);
            return langMatch && ratingMatch;
        });
    }, [filters]);

    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">What Our Learners Say</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Real stories from real people who transformed their language skills with Find Sukoon.
                    </p>
                </div>
            </section>
            
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {mockTestimonials.filter(t => t.featured).map(t => (
                            <TestimonialCard key={t.id} testimonial={t} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                             <h2 className="font-semibold flex items-center gap-2 text-lg"><FilterIcon /> Filter Reviews</h2>
                            <select value={filters.language} onChange={e => setFilters({...filters, language: e.target.value})} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                {languages.map(lang => <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>)}
                            </select>
                            <select value={filters.rating} onChange={e => setFilters({...filters, rating: e.target.value})} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                                <option value="0">Any Rating</option>
                                <option value="5">5 Stars Only</option>
                                <option value="4">4 Stars & Up</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTestimonials.map(testimonial => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-3xl font-bold mb-12">See it to Believe It</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {videoTestimonials.map(video => (
                            <div key={video.id} className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                                <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <PlayCircleIcon className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-white font-bold text-lg">{video.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-blue-600 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold">Start Your Own Language Journey</h2>
                    <p className="mt-4 text-lg text-blue-100">Join thousands of happy learners. Download the app and find the perfect listener for you today.</p>
                    <div className="mt-8">
                        <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-10 py-4 text-lg text-blue-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Download the App
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsPage;