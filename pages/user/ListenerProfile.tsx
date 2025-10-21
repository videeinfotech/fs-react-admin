import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { mockListeners } from '../Listeners';
import { mockFeedback } from '../Feedback';
import { RatingIcon } from '../../components/ui/icons/OtherIcons';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const ListenerProfile: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const navigate = ReactRouterDOM.useNavigate();
    const listener = mockListeners.find(l => l.id === parseInt(id || '0'));

    if (!listener) {
        return <div className="p-4">Listener not found</div>;
    }

    const startSession = (type: string) => {
        // Mock session creation and navigation
        const sessionId = `sess_${Date.now()}`;
        navigate(`/user/${type}/${sessionId}`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 min-h-screen">
            {/* Profile Header */}
            <div className="p-6 text-center">
                <img src={listener.avatarUrl} alt={listener.name} className="w-32 h-32 rounded-full mx-auto border-4 border-primary-200" />
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{listener.name}</h1>
                <div className="flex items-center justify-center mt-2">
                    <RatingIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 text-lg font-semibold">{listener.avgRating.toFixed(1)}</span>
                    <span className="ml-2 text-gray-500">({mockFeedback.length} reviews)</span>
                </div>
                 <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {listener.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">{skill}</span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 grid grid-cols-3 gap-2 p-2 border-y dark:border-gray-700">
                <button onClick={() => startSession('chat')} className="p-3 bg-primary-600 text-white rounded-lg font-semibold">Chat (₹{listener.rate * 10}/10m)</button>
                <button onClick={() => startSession('call')} className="p-3 bg-teal-600 text-white rounded-lg font-semibold">Voice (₹{listener.rate * 20}/10m)</button>
                <button onClick={() => startSession('call')} className="p-3 bg-blue-600 text-white rounded-lg font-semibold">Video (₹{listener.rate * 30}/10m)</button>
            </div>

            {/* Details & Reviews */}
            <div className="p-6 space-y-8">
                <section>
                    <h2 className="text-xl font-bold mb-2">About Me</h2>
                    <p className="text-gray-600 dark:text-gray-300">{listener.bio}</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-4">Reviews from Users</h2>
                    <div className="space-y-4">
                        {mockFeedback.map(fb => (
                            <div key={fb.id} className="border-b dark:border-gray-700 pb-4">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{fb.user}</p>
                                    <StarRating rating={fb.rating} />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">"{fb.comment}"</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ListenerProfile;
