import React from 'react';
import { EditIcon, LogoutIcon } from '../../components/ui/icons/OtherIcons';
import { mockFeedback } from '../Feedback';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const StatCard: React.FC<{ title: string, value: string }> = ({ title, value }) => (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
    </div>
);

const Profile: React.FC = () => {
    const listener = { name: 'Ananya Mehta', avatarUrl: 'https://i.pravatar.cc/150?u=1' };
    const { logout } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">My Profile</h1>

            {/* Editable Profile Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <img src={listener.avatarUrl} alt={listener.name} className="w-20 h-20 rounded-full" />
                        <div>
                            <h2 className="text-xl font-bold">{listener.name}</h2>
                            <p className="text-gray-500">Relationship Expert</p>
                        </div>
                    </div>
                    <button><EditIcon /></button>
                </div>
                <div className="mt-4 space-y-2">
                    <p><strong>Bio:</strong> Experienced listener specializing in relationship advice...</p>
                    <p><strong>Price/min:</strong> ₹10</p>
                    <p><strong>Languages:</strong> English, Hindi</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard title="Earnings (Month)" value="₹7,800" />
                <StatCard title="Total Sessions" value="150" />
                <StatCard title="Avg. Rating" value="4.8" />
            </div>

            {/* My Reviews */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">My Reviews</h3>
                <div className="space-y-4">
                    {mockFeedback.slice(0, 3).map(fb => (
                        <div key={fb.id} className="border-b dark:border-gray-700 pb-2">
                            <div className="flex justify-between">
                                <p className="font-semibold">{fb.user}</p>
                                <StarRating rating={fb.rating} />
                            </div>
                            <p className="text-sm text-gray-500 italic">"{fb.comment}"</p>
                        </div>
                    ))}
                </div>
                <button className="text-primary-600 mt-4 text-sm font-semibold">View All Reviews &rarr;</button>
            </div>
            
            {/* Availability */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Availability Hours</h3>
                {/* Simplified view of availability slots */}
                <p>Mon-Fri: 9 AM - 5 PM</p>
                <button className="text-primary-600 mt-2 text-sm font-semibold">Edit Availability &rarr;</button>
            </div>
            
            <button className="w-full p-3 bg-primary-600 text-white font-bold rounded-lg shadow-md">Withdraw Funds</button>
            
            <div className="pt-4">
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-red-500 font-bold hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                 >
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Logout
                 </button>
            </div>
        </div>
    );
};

export default Profile;