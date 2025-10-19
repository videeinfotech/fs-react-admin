import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { mockListeners } from './Listeners';
import { mockSessions } from './Sessions';
import { mockFeedback } from './Feedback';
import { Listener } from '../types';
import { AvatarPicker } from '../components/ui/AvatarPicker';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{rating.toFixed(1)}</span>
    </div>
);

const ListenerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToast } = useToast();
    const listenerId = parseInt(id || '0', 10);
    
    const [listeners, setListeners] = useState(mockListeners);
    const listener = listeners.find(l => l.id === listenerId);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editableListener, setEditableListener] = useState<Listener | null>(null);

    useEffect(() => {
        if (isEditModalOpen && listener) {
            setEditableListener(listener);
        } else {
            setEditableListener(null);
        }
    }, [isEditModalOpen, listener]);

    const listenerSessions = mockSessions.filter(s => s.listenerId === listenerId);
    const listenerFeedback = mockFeedback.filter(f => f.listener === listener?.name);

    if (!listener) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-2xl">Listener not found.</h1>
                <Link to="/listeners" className="text-primary-600 hover:underline">Back to Listener List</Link>
            </div>
        );
    }
    
    const handleAction = (action: string) => {
        addToast(`${action} listener ${listener.id}`, 'info');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editableListener) {
            const { name, value } = e.target;
            const isNumberField = ['age', 'rate', 'totalSessions', 'totalEarnings'].includes(name);
            setEditableListener({ ...editableListener, [name]: isNumberField ? Number(value) : value });
        }
    };
    
    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editableListener) {
            const { name, value } = e.target;
            setEditableListener({ ...editableListener, [name]: value.split(',').map(s => s.trim()) });
        }
    };

    const handleAvatarSelect = (url: string) => {
        if (editableListener) {
            setEditableListener({ ...editableListener, avatarUrl: url });
        }
    };

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        if (editableListener) {
            setListeners(prev => prev.map(l => l.id === editableListener.id ? editableListener : l));
            addToast('Listener profile updated successfully!', 'success');
            setIsEditModalOpen(false);
        }
    };

    const EditProfileModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in p-4">
            <form onSubmit={handleSaveChanges} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold">Edit Profile: {editableListener?.name}</h3>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <AvatarPicker selectedAvatar={editableListener!.avatarUrl} onSelectAvatar={handleAvatarSelect} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium">Name</label><input type="text" name="name" value={editableListener!.name} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Email</label><input type="email" name="email" value={editableListener!.email} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Age</label><input type="number" name="age" value={editableListener!.age} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Date of Birth</label><input type="date" name="dob" value={editableListener!.dob} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">City</label><input type="text" name="city" value={editableListener!.city} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Session Rate (/min)</label><input type="number" step="0.01" name="rate" value={editableListener!.rate} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Skills (comma-separated)</label><input type="text" name="skills" value={editableListener!.skills.join(', ')} onChange={handleArrayChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                        <div><label className="block text-sm font-medium">Languages (comma-separated)</label><input type="text" name="language" value={editableListener!.language.join(', ')} onChange={handleArrayChange} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" /></div>
                    </div>
                    <div><label className="block text-sm font-medium">Bio</label><textarea name="bio" value={editableListener!.bio} onChange={handleInputChange} rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea></div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-2 rounded-b-lg">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Save Changes</button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="space-y-6">
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <Link to="/listeners" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Listeners</Link>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-700 dark:text-white font-medium">{listener.name}</span>
                    </li>
                </ol>
            </nav>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row items-start">
                    <img src={listener.avatarUrl} alt={listener.name} className="w-24 h-24 rounded-full mr-6 mb-4 md:mb-0 border-4 border-primary-200 object-cover" />
                    <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                             <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{listener.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{listener.email}</p>
                                <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${listener.status === 'Active' ? 'bg-green-100 text-green-800' : listener.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                    {listener.status}
                                </span>
                            </div>
                            <div className="mt-4 md:mt-0 flex-shrink-0 flex space-x-2">
                                <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Edit Profile</button>
                                {listener.status === 'Pending' && <button onClick={() => handleAction('Approving')} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Approve</button>}
                                {listener.status !== 'Blocked' && <button onClick={() => handleAction('Blocking')} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Block</button>}
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{listener.bio}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Information</h2>
                         <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li><strong>Age:</strong> {listener.age}</li>
                            <li><strong>Date of Birth:</strong> {listener.dob}</li>
                            <li><strong>City:</strong> {listener.city}</li>
                            <li><strong>Languages:</strong> {listener.language.join(', ')}</li>
                            <li><strong>Joined:</strong> {listener.createdAt}</li>
                             <hr className="my-2 dark:border-gray-700"/>
                            <li><strong>Average Rating:</strong> <StarRating rating={listener.avgRating} /></li>
                            <li><strong>Session Rate:</strong> ₹{listener.rate.toFixed(2)} / minute</li>
                            <li><strong>Total Sessions:</strong> {listener.totalSessions}</li>
                            <li><strong>Total Earnings:</strong> ₹{listener.totalEarnings.toFixed(2)}</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                           {listener.skills.map(skill => (
                               <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{skill}</span>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Feedback</h2>
                        <ul className="space-y-4">
                            {listenerFeedback.length > 0 ? listenerFeedback.map(f => (
                                <li key={f.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{f.user}</p>
                                        <StarRating rating={f.rating} />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">"{f.comment}"</p>
                                </li>
                            )) : <p className="text-sm text-gray-500">No feedback found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
            {isEditModalOpen && editableListener && <EditProfileModal />}
        </div>
    );
};

export default ListenerDetails;