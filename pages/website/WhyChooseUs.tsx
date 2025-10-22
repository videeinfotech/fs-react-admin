import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// FIX: Removed unused `UsersIcon` import from `OtherIcons` to fix the error. `UsersIcon` is not exported from `OtherIcons` and was not used in this file.
import { 
    BoltIcon, 
    CheckBadgeIcon, 
    GlobeAltIcon, 
    HeartIcon, 
    CurrencyRupeeIcon, 
    ShieldCheckIcon
} from '../../components/ui/icons/OtherIcons';

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

const Hero = () => (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Why Learners Love Find Sukoon</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover a modern, effective, and heartfelt way to learn local languages through real, human connection.
            </p>
        </div>
    </section>
);

const FeaturesGrid = () => {
    const features = [
        { icon: <BoltIcon className="w-8 h-8 text-blue-600" />, title: "Instant 1-on-1 Calls", description: "No scheduling needed. Find an available listener and start talking within minutes, anytime you feel like practicing." },
        { icon: <CheckBadgeIcon className="w-8 h-8 text-blue-600" />, title: "Verified & Friendly Listeners", description: "Every listener is vetted for their communication skills and friendliness, ensuring a safe and positive experience." },
        { icon: <CurrencyRupeeIcon className="w-8 h-8 text-blue-600" />, title: "Affordable Per-Minute Rates", description: "Pay only for the time you talk. Our flexible pricing makes language practice accessible to everyone." },
        { icon: <GlobeAltIcon className="w-8 h-8 text-blue-600" />, title: "Multilingual Coverage", description: "From Hindi and Marathi to Bengali and Tamil, access a wide variety of local Indian languages and dialects." },
        { icon: <HeartIcon className="w-8 h-8 text-blue-600" />, title: "Emotional Comfort Learning", description: "Learn at your own pace in a judgment-free environment, building confidence with every conversation." },
        { icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />, title: "Data Privacy & Protection", description: "Your privacy is our priority. We ensure all your data and conversations are secure and confidential." },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(feature => (
                         <div key={feature.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ComparisonTable = () => {
    const Checkmark = () => <span className="text-green-500 font-bold text-2xl">✓</span>;
    const Cross = () => <span className="text-red-500 font-bold text-2xl">✗</span>;

    const comparisonData = [
        { feature: "Learning Method", findSukoon: "Live Conversations", traditional: "Recorded Lessons" },
        { feature: "Speaker Type", findSukoon: "Verified Native Speakers", traditional: "Tutors or AI Voices" },
        { feature: "Practice Style", findSukoon: "Spontaneous & Real", traditional: "Scripted Drills" },
        { feature: "Cost Model", findSukoon: "Pay-per-minute", traditional: "Fixed Subscription" },
        { feature: "Dialect Focus", findSukoon: <Checkmark />, traditional: <Cross /> },
    ];
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">How We Compare</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-left font-semibold">Feature</th>
                                <th className="p-4 font-semibold text-primary-600">Find Sukoon</th>
                                <th className="p-4 font-semibold">Traditional Apps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map(item => (
                                <tr key={item.feature} className="border-b dark:border-gray-700">
                                    <td className="p-4 text-left font-medium">{item.feature}</td>
                                    <td className="p-4">{item.findSukoon}</td>
                                    <td className="p-4">{item.traditional}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

const StatsSection = () => (
    <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <p className="text-5xl font-bold">50,000+</p>
                    <p className="mt-2 text-blue-100">Learners Joined</p>
                </div>
                <div>
                    <p className="text-5xl font-bold">4.8/5</p>
                    <p className="mt-2 text-blue-100">Average Session Rating</p>
                </div>
                <div>
                    <p className="text-5xl font-bold">95%</p>
                    <p className="mt-2 text-blue-100">Improved Speaking Confidence</p>
                </div>
            </div>
        </div>
    </section>
);

const VerificationSection = () => (
    <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
             <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-teal-100 text-teal-600 rounded-full">
                <ShieldCheckIcon className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                We are committed to creating a secure and respectful community. Every listener on Find Sukoon goes through a multi-step verification process, including identity checks and communication skill assessments, to ensure you can learn with peace of mind.
            </p>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Start Speaking with Confidence Today</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Stop waiting for the perfect moment. Download the app, find a friendly listener, and start your language learning journey now.
            </p>
            <div className="mt-8">
                <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-10 py-4 text-lg text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Download the App
                </a>
            </div>
        </div>
    </section>
);

const WhyChooseUs: React.FC = () => {
    return (
        <>
            <Hero />
            <FeaturesGrid />
            <ComparisonTable />
            <StatsSection />
            <VerificationSection />
            <FinalCTA />
        </>
    );
};

export default WhyChooseUs;
