import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BrainIcon, HeartIcon } from '../../components/ui/icons/OtherIcons';
// FIX: Add IconProps to fix cloneElement typing issue
import { IconProps } from '../../components/ui/icons/Icon';

const MoodButton: React.FC<{ emoji: string, label: string }> = ({ emoji, label }) => (
    <button className="flex flex-col items-center space-y-2 text-center group">
        <div className="text-4xl p-3 bg-gray-100 dark:bg-gray-800 rounded-full group-hover:bg-primary-100 transition-all transform group-hover:scale-110">
            {emoji}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </button>
);

const ActionCard: React.FC<{ title: string, description: string, path: string, icon: React.ReactElement<IconProps> }> = ({ title, description, path, icon }) => (
    <ReactRouterDOM.Link to={path} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
        </div>
        <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    </ReactRouterDOM.Link>
);


const Home: React.FC = () => {
    return (
        <div className="p-4 space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold">Welcome back, User!</h1>
                <p className="text-gray-500 dark:text-gray-400">Ready to find your peace?</p>
            </header>
            
            {/* Mood Tracker */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-center">How are you feeling today?</h2>
                <div className="flex justify-around">
                    <MoodButton emoji="😊" label="Happy" />
                    <MoodButton emoji="😌" label="Calm" />
                    <MoodButton emoji="😐" label="Okay" />
                    <MoodButton emoji="😟" label="Worried" />
                    <MoodButton emoji="😞" label="Sad" />
                </div>
            </section>
            
            {/* Quick Actions */}
            <section className="space-y-4">
                 <ActionCard 
                    title="Find a Listener"
                    description="Connect with someone who understands."
                    path="/user/find"
                    icon={<HeartIcon />}
                />
                <ActionCard 
                    title="Start a Journal Entry"
                    description="Reflect on your thoughts and feelings."
                    path="/user/journal"
                    icon={<BrainIcon />}
                />
            </section>
            
             {/* Recommended Articles */}
            <section>
                <h2 className="text-lg font-semibold mb-4">For You</h2>
                <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold">5 Ways to Practice Mindfulness</h4>
                        <p className="text-sm text-gray-500">Read time: 3 min</p>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold">Understanding Anxiety</h4>
                        <p className="text-sm text-gray-500">Read time: 5 min</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;