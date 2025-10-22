import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// FIX: Corrected the import path for mockListeners. It is exported from './Listeners.tsx', not './ListenersList.tsx'.
import { mockListeners } from './Listeners';
import { 
    DownloadIcon, 
    SearchIcon, 
    PhoneIcon, 
    ChatBubbleIcon, 
    FacebookIcon, 
    InstagramIcon, 
    LinkedInIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
    BoltIcon,
    PlayStoreIcon,
    AppStoreIcon,
    QrCodeIcon
} from '../components/ui/icons/OtherIcons';
import { UsersIcon } from '../components/ui/icons/UsersIcon';

const navLinks = [
    { name: 'Home', path: '/website' },
    { name: 'About', path: '#' },
    { name: 'Why Choose Us', path: '#' },
    { name: 'Listeners', path: '#' },
    { name: 'Blogs', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Careers', path: '#' },
];

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-3 max-w-7xl">
                <div className="flex justify-between items-center">
                    <ReactRouterDOM.Link to="/website" className="text-2xl font-bold text-primary-600">Find Sukoon</ReactRouterDOM.Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a href={link.path} key={link.name} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-medium">{link.name}</a>
                        ))}
                         <ReactRouterDOM.Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-medium">Login</ReactRouterDOM.Link>
                    </div>
                    <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="hidden md:block px-5 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                        Download App
                    </a>
                    <div className="md:hidden">
                        <button className="text-gray-600 dark:text-gray-300 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const HeroSection: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 pt-20 pb-28 md:pt-24 md:pb-32">
             <div className="absolute inset-0 bg-grid-slate-200/20 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="container mx-auto px-6 max-w-7xl relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            Learn Local Languages from Local People
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
                            1-on-1 Live Calls with Real Speakers in your city — improve your speaking confidence.
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start space-x-4">
                            <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Download App
                            </a>
                            <ReactRouterDOM.Link to="/login" className="px-8 py-3 text-blue-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                                Join as Listener
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                         <div className="absolute w-72 h-72 bg-teal-200/50 dark:bg-teal-500/20 rounded-full blur-3xl -z-10"></div>
                         <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200/50 dark:bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                        <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-3xl shadow-2xl transform md:rotate-3">
                             <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                                <img src="https://storage.googleapis.com/aistudio-hosting/find-sukoon/app-mockup.png" alt="Find Sukoon App Mockup" className="w-full h-full object-cover rounded-2xl" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection: React.FC = () => {
    const steps = [
        { icon: <DownloadIcon className="w-8 h-8"/>, title: "Download App", description: "Get the Find Sukoon app from the Play Store." },
        { icon: <UsersIcon className="w-8 h-8"/>, title: "Sign Up", description: "Create your account as a learner in seconds." },
        { icon: <SearchIcon className="w-8 h-8"/>, title: "Select a Listener", description: "Choose a language and a local speaker you like." },
        { icon: <PhoneIcon className="w-8 h-8"/>, title: "Start Calling", description: "Connect instantly via 1-on-1 voice or video calls." },
    ];
    return (
        <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12">How to Start Learning</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-primary-100 text-primary-600 rounded-full">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Start Learning Today
                    </a>
                </div>
            </div>
        </section>
    );
};

const WhyChooseUsSection: React.FC = () => {
    const features = [
        { icon: <ChatBubbleIcon className="w-8 h-8"/>, title: "Real People, Real Conversations", description: "Move beyond textbooks and have authentic conversations that build fluency." },
        { icon: <GlobeAltIcon className="w-8 h-8"/>, title: "Learn Regional Dialects", description: "Connect with locals to understand the nuances and dialects of your city." },
        { icon: <CheckBadgeIcon className="w-8 h-8"/>, title: "Safe & Verified Listeners", description: "Every listener is vetted to ensure a safe, respectful, and positive learning environment." },
        { icon: <BoltIcon className="w-8 h-8"/>, title: "Instant Connect Anytime", description: "Find available listeners online and start a conversation within minutes, 24/7." },
    ];
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Find Sukoon?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                         <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-100 text-teal-600 rounded-full">
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

const OurListenersSection: React.FC = () => (
    <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Local Listeners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {mockListeners.slice(0, 6).map(listener => (
                    <div key={listener.id} className="text-center group">
                        <img src={listener.avatarUrl} alt={listener.name} className="w-24 h-24 rounded-full mx-auto shadow-md group-hover:shadow-xl transition-shadow" />
                        <h4 className="mt-3 font-semibold">{listener.name}</h4>
                        <p className="text-sm text-gray-500">{listener.city}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12 space-x-4">
                <ReactRouterDOM.Link to="#" className="px-6 py-3 text-primary-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">View More</ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/login" className="px-6 py-3 text-white font-semibold bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg">Become a Listener</ReactRouterDOM.Link>
            </div>
        </div>
    </section>
);

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        { name: "Priya K.", rating: 5, comment: "I finally feel confident speaking Hindi! My listener was so patient and encouraging. It feels like talking to a friend.", avatar: "https://i.pravatar.cc/150?u=10" },
        { name: "Rohan S.", rating: 5, comment: "Find Sukoon is the best app for practical language learning. I improved my Marathi speaking skills in just a few weeks.", avatar: "https://i.pravatar.cc/150?u=11" },
        { name: "Anjali M.", rating: 4, comment: "A great way to connect with native speakers. The per-minute pricing is very affordable.", avatar: "https://i.pravatar.cc/150?u=12" },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Learners Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-semibold">{t.name}</h4>
                                    <div className="flex">{"⭐".repeat(t.rating)}</div>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic">"{t.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BlogsPreviewSection: React.FC = () => {
    const blogs = [
        { title: "5 Tips to Overcome the Fear of Speaking a New Language", snippet: "Feeling nervous? You're not alone. Here are five practical tips to boost your confidence and start speaking...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog1.jpg" },
        { title: "Understanding Culture Through Local Dialects", snippet: "Language is more than just words; it's a window into culture. Discover how learning local dialects can deepen your understanding...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog2.jpg" },
        { title: "Why 1-on-1 Conversation is the Fastest Way to Learn", snippet: "Forget boring drills. We explore the science behind conversational learning and why it's so effective for fluency...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog3.jpg" },
    ];
    return (
        <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-7xl">
                 <h2 className="text-3xl font-bold text-center mb-12">From Our Blog</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors">{blog.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{blog.snippet}</p>
                                <a href="#" className="font-semibold text-primary-600">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AppDownloadSection: React.FC = () => {
    return (
        <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-6 max-w-7xl text-center">
                 <h2 className="text-3xl font-bold">Get Started Today</h2>
                 <p className="mt-4 max-w-2xl mx-auto">Download the Find Sukoon app now and take the first step towards speaking a new language with confidence.</p>
                <div className="mt-8 flex justify-center items-center flex-wrap gap-6">
                    <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                        <PlayStoreIcon className="w-7 h-7" />
                        <div>
                            <p className="text-xs">GET IT ON</p>
                            <p className="text-xl font-semibold">Google Play</p>
                        </div>
                    </a>
                     <a href="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed">
                        <AppStoreIcon className="w-7 h-7" />
                        <div>
                            <p className="text-xs">Download on the</p>
                            <p className="text-xl font-semibold">App Store</p>
                        </div>
                    </a>
                    <div className="p-2 bg-white rounded-lg">
                        <QrCodeIcon className="w-24 h-24 text-black"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Find Sukoon</h3>
                        <p className="mt-2 text-sm">Learn local languages from local people.</p>
                         <div className="flex space-x-4 mt-4">
                           <a href="#" className="hover:text-primary-600"><FacebookIcon /></a>
                           <a href="#" className="hover:text-primary-600"><InstagramIcon /></a>
                           <a href="#" className="hover:text-primary-600"><LinkedInIcon /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><a href="#" className="hover:text-primary-600">About</a></li>
                            <li><a href="#" className="hover:text-primary-600">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-600">Blog</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><a href="#" className="hover:text-primary-600">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary-600">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Find Sukoon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const Website: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 antialiased">
            <Header />
            <main>
                <HeroSection />
                <HowItWorksSection />
                <WhyChooseUsSection />
                <OurListenersSection />
                <TestimonialsSection />
                <BlogsPreviewSection />
                <AppDownloadSection />
            </main>
            <Footer />
        </div>
    );
};

export default Website;