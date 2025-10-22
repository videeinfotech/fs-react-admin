import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// FIX: Corrected the import for `UsersIcon`. It is in its own file, not in OtherIcons.
import { DownloadIcon, SearchIcon, PhoneIcon, PlusIcon, MinusIcon, QrCodeIcon } from '../../components/ui/icons/OtherIcons';
import { UsersIcon } from '../../components/ui/icons/UsersIcon';

const playStoreLink = "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN";

const Hero = () => (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Learn in 3 Easy Steps</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Getting started with Find Sukoon is simple. Follow these steps to begin your language learning journey.
            </p>
        </div>
    </section>
);

const StepsSection = () => {
    const steps = [
        {
            icon: <DownloadIcon className="w-10 h-10 text-blue-600" />,
            title: "Step 1: Download the App",
            description: "Visit the Google Play Store to download the Find Sukoon app. You can also scan the QR code for a direct link.",
            visual: (
                <div className="flex flex-col items-center gap-4">
                    <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                        <div>
                            <p className="text-xs">GET IT ON</p>
                            <p className="text-xl font-semibold">Google Play</p>
                        </div>
                    </a>
                    <div className="p-2 bg-white rounded-lg">
                        <QrCodeIcon className="w-24 h-24 text-black"/>
                    </div>
                </div>
            )
        },
        {
            icon: <UsersIcon className="w-10 h-10 text-blue-600" />,
            title: "Step 2: Sign Up & Choose",
            description: "Create your learner profile in just a few taps. Once you're in, browse and select the local language you want to master.",
            visual: <img src="https://storage.googleapis.com/aistudio-hosting/find-sukoon/step2.png" alt="Sign up and choose language" className="rounded-lg shadow-lg" />
        },
        {
            icon: <PhoneIcon className="w-10 h-10 text-blue-600" />,
            title: "Step 3: Pick a Listener & Call",
            description: "Explore profiles of our verified local listeners. See their ratings and expertise, then start a voice or video call instantly.",
            visual: <img src="https://storage.googleapis.com/aistudio-hosting/find-sukoon/step3.png" alt="Pick a listener and call" className="rounded-lg shadow-lg" />
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6 max-w-5xl space-y-16">
                {steps.map((step, index) => (
                    <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                        <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                                    {step.icon}
                                </div>
                                <h2 className="text-3xl font-bold">{step.title}</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                        </div>
                         <div className={`flex justify-center ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                            {step.visual}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b dark:border-gray-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4">
                <span className="font-semibold text-lg">{question}</span>
                {isOpen ? <MinusIcon className="w-6 h-6"/> : <PlusIcon className="w-6 h-6"/>}
            </button>
            {isOpen && <div className="pb-4 text-gray-600 dark:text-gray-300">{children}</div>}
        </div>
    );
};

const FAQSection = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <FAQItem question="Is Find Sukoon free to use?">
                    <p>Downloading the app and creating an account is completely free. You only pay for the time you spend talking to a listener, with affordable per-minute rates.</p>
                </FAQItem>
                <FAQItem question="How are listeners verified?">
                    <p>Every listener goes through a verification process where we check their language fluency and communication skills to ensure a high-quality, safe, and positive learning experience for you.</p>
                </FAQItem>
                <FAQItem question="Can I choose who I talk to?">
                    <p>Absolutely! You can browse through profiles of all available listeners, see their ratings, expertise, and choose the person you feel most comfortable talking with.</p>
                </FAQItem>
            </div>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-lg text-blue-100">Your first conversation is just a download away. Join our community and start speaking with confidence.</p>
            <div className="mt-8 flex justify-center space-x-4">
                 <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-blue-600 font-semibold bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Download the App
                </a>
                <Link to="/login" className="px-8 py-3 text-white font-semibold border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    Become a Listener
                </Link>
            </div>
        </div>
    </section>
);

const HowItWorks: React.FC = () => {
    return (
        <>
            <Hero />
            <StepsSection />
            <FAQSection />
            <FinalCTA />
        </>
    );
};

export default HowItWorks;
