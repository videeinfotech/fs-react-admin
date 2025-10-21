import React from 'react';
import { mockFeedback } from '../Feedback';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const Reviews: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Your Reviews</h1>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="space-y-6">
                    {mockFeedback.map(fb => (
                        <div key={fb.id} className="border-b dark:border-gray-700 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-lg">{fb.user}</p>
                                    <p className="text-sm text-gray-500">{fb.date}</p>
                                </div>
                                <StarRating rating={fb.rating} />
                            </div>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 italic">"{fb.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
