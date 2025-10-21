import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { RatingIcon } from '../../components/ui/icons/OtherIcons';
import { mockFeedback } from '../Feedback';

const StarRating: React.FC<{ rating: number, reviewCount?: number }> = ({ rating, reviewCount }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
        {reviewCount && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({reviewCount} reviews)</span>}
    </div>
);

const ListenerProfile: React.FC = () => {
    const { id } = ReactRouterDOM.useParams();
    const navigate = ReactRouterDOM.useNavigate();
    const listener = mockListeners.find(l => l.id.toString() === id);

    if (!listener) {
        return <div>Listener not found</div>;
    }

    const startChat = () => {
        // In a real app, this would create a session and then navigate
        navigate(`/user/chat/sess_${listener.id}`);
    };
    
    const startCall = () => {
        navigate(`/user/calling/${listener.id}`);
    }

    return (
        <div className="p-4 space-y-6">
            <header className="relative">
                <button onClick={() => navigate(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-gray-800/50">&larr;</button>
                <div className="flex flex-col items-center pt-8">
                    <img src={listener.avatarUrl} alt={listener.name} className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                    <h1 className="mt-4 text-3xl font-bold">{listener.name}</h1>
                    <StarRating rating={listener.avgRating} reviewCount={listener.totalSessions} />
                </div>
            </header>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">About Me</h2>
                <p className="text-gray-600 dark:text-gray-400">{listener.bio}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {listener.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Recent Feedback</h2>
                <div className="space-y-4">
                    {mockFeedback.filter(fb => fb.listener === listener.name).slice(0, 2).map(fb => (
                        <div key={fb.id} className="border-t pt-2 dark:border-gray-700">
                             <div className="flex justify-between items-center">
                                <p className="font-semibold">{fb.user}</p>
                                <StarRating rating={fb.rating} />
                            </div>
                            <p className="text-sm text-gray-500 italic">"{fb.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-20 md:bottom-4 grid grid-cols-2 gap-4">
                <button onClick={startChat} className="p-4 bg-primary-600 text-white font-bold rounded-lg shadow-lg">Start Chat (₹{listener.rate * 10}/10min)</button>
                <button onClick={startCall} className="p-4 bg-green-600 text-white font-bold rounded-lg shadow-lg">Start Call (₹{listener.rate * 15}/15min)</button>
            </div>
        </div>
    );
};

export default ListenerProfile;
