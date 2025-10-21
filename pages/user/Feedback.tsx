import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const Star: React.FC<{ selected: boolean, onSelect: () => void }> = ({ selected, onSelect }) => (
    <svg onClick={onSelect} className={`w-10 h-10 cursor-pointer ${selected ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const FeedbackTag: React.FC<{ label: string, selected: boolean, onSelect: () => void }> = ({ label, selected, onSelect }) => (
    <button onClick={onSelect} className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${selected ? 'bg-primary-600 text-white border-primary-600' : 'bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
        {label}
    </button>
);


const Feedback: React.FC = () => {
    const { sessionId } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

    const handleTagSelect = (tag: string) => {
        setSelectedTags(prev => {
            const newTags = new Set(prev);
            if (newTags.has(tag)) {
                newTags.delete(tag);
            } else {
                newTags.add(tag);
            }
            return newTags;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would submit the feedback
        alert('Thank you for your feedback!');
        navigate('/user');
    };

    return (
        <div className="p-6 min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Rate Your Session</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your feedback helps us improve.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="block text-center font-medium mb-2">How was your experience?</label>
                        <div className="flex justify-center space-x-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} selected={rating >= star} onSelect={() => setRating(star)} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Feedback Tags */}
                    <div>
                         <label className="block text-center font-medium mb-3">What went well?</label>
                         <div className="flex flex-wrap justify-center gap-2">
                            <FeedbackTag label="Empathetic" selected={selectedTags.has("Empathetic")} onSelect={() => handleTagSelect("Empathetic")} />
                            <FeedbackTag label="Good Listener" selected={selectedTags.has("Good Listener")} onSelect={() => handleTagSelect("Good Listener")} />
                            <FeedbackTag label="Helpful Advice" selected={selectedTags.has("Helpful Advice")} onSelect={() => handleTagSelect("Helpful Advice")} />
                            <FeedbackTag label="Patient" selected={selectedTags.has("Patient")} onSelect={() => handleTagSelect("Patient")} />
                         </div>
                    </div>
                    
                    {/* Comment Box */}
                    <div>
                        <label htmlFor="comment" className="block text-center font-medium mb-2">Any other comments?</label>
                        <textarea id="comment" rows={4} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="Tell us more..."></textarea>
                    </div>

                    <button type="submit" className="w-full p-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
