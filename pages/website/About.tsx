import React from 'react';
// FIX: Import GlobeAltIcon to resolve 'Cannot find name' error.
import { TargetIcon, UsersGroupIcon, SparklesIcon, CheckBadgeIcon, SessionsTotalIcon, GlobeAltIcon } from '../../components/ui/icons/OtherIcons';
import { UsersIcon } from '../../components/ui/icons/UsersIcon';

const Hero = () => (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">About Find Sukoon</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Empowering India to connect through the beauty of language and culture.
            </p>
        </div>
    </section>
);

const Mission = () => (
    <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
                "Our mission is to make language learning personal, local, and authentic. We believe the best way to learn is by connecting with real people, sharing stories, and understanding culture, one conversation at a time."
            </p>
             <div className="mt-8">
                <a href="#" className="px-8 py-3 text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Learning
                </a>
            </div>
        </div>
    </section>
);

const Vision = () => {
    const values = [
        { icon: <TargetIcon className="w-8 h-8 text-teal-600" />, title: "Authenticity", description: "Fostering genuine conversations over scripted lessons." },
        { icon: <UsersGroupIcon className="w-8 h-8 text-teal-600" />, title: "Community", description: "Building a supportive network of learners and listeners." },
        { icon: <SparklesIcon className="w-8 h-8 text-teal-600" />, title: "Empowerment", description: "Giving people the confidence to speak and connect." },
    ];
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                 <h2 className="text-3xl font-bold text-center mb-4">Our Vision</h2>
                 <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">To become India’s #1 platform for learning languages through real conversations, breaking down barriers and bringing people closer.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map(value => (
                         <div key={value.title} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Timeline = () => {
    const events = [
        { year: "2022", title: "The Idea", description: "Find Sukoon was born from a simple idea: to connect people through language in the most natural way possible." },
        { year: "2023", title: "App Launch", description: "We launched the first version of the Find Sukoon app on the Google Play Store, connecting our first 100 users." },
        { year: "2024", title: "1,000+ Listeners", description: "Our community grew rapidly, with over a thousand verified listeners joining from across India." },
        { year: "2025", title: "Future Vision", description: "We aim to introduce more languages, expand to iOS, and launch community features to enhance learning." },
    ];
    return (
         <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
                <div className="relative">
                    <div className="border-l-2 border-primary-300 absolute h-full top-0 left-1/2 -ml-px"></div>
                    {events.map((event, index) => (
                        <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            <div className="w-5/12"></div>
                            <div className="z-10 flex items-center bg-primary-600 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-sm text-white">{index + 1}</h1>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md w-5/12 px-6 py-4">
                                <div className="font-bold text-primary-600">{event.year}</div>
                                <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ImpactStats = () => {
    const stats = [
        { icon: <UsersIcon className="w-8 h-8"/>, value: "50,000+", label: "Happy Learners" },
        { icon: <SessionsTotalIcon className="w-8 h-8"/>, value: "200,000+", label: "Sessions Completed" },
        { icon: <CheckBadgeIcon className="w-8 h-8"/>, value: "1,500+", label: "Verified Listeners" },
        { icon: <GlobeAltIcon className="w-8 h-8"/>, value: "15+", label: "Languages Available" },
    ];
    return (
         <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map(stat => (
                        <div key={stat.label} className="text-center">
                            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-primary-100 text-primary-600 rounded-full">
                                {stat.icon}
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Team = () => {
    const team = [
        { name: "Aarav Sharma", role: "Founder & CEO", avatar: "https://i.pravatar.cc/150?u=20" },
        { name: "Diya Mehta", role: "Head of Product", avatar: "https://i.pravatar.cc/150?u=21" },
        { name: "Rohan Kapoor", role: "Lead Engineer", avatar: "https://i.pravatar.cc/150?u=22" },
        { name: "Priya Singh", role: "Community Manager", avatar: "https://i.pravatar.cc/150?u=23" },
    ];
    return (
        <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                     {team.map(member => (
                         <div key={member.name} className="text-center">
                             <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto shadow-lg" />
                             <h4 className="mt-4 font-bold text-lg">{member.name}</h4>
                             <p className="text-sm text-primary-600">{member.role}</p>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
    );
};

const CTA = () => (
    <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Join Our Mission</h2>
            <p className="mt-4 text-lg text-blue-100">Become a part of the Find Sukoon community. Start your journey of learning or teaching today.</p>
            <div className="mt-8 flex justify-center space-x-4">
                 <a href="#" className="px-8 py-3 text-blue-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Become a Listener
                </a>
                <a href="#" className="px-8 py-3 text-white font-semibold bg-teal-500 rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Download App
                </a>
            </div>
        </div>
    </section>
);


const About: React.FC = () => {
    return (
        <>
            <Hero />
            <Mission />
            <Vision />
            <Timeline />
            <ImpactStats />
            <Team />
            <CTA />
        </>
    );
};

export default About;