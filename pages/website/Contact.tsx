
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// FIX: Changed EnvelopeIcon to MessageIcon as it is exported from OtherIcons.tsx.
import { MessageIcon, PhoneIcon, MapPinIcon, PlusIcon, MinusIcon } from '../../components/ui/icons/OtherIcons';
import { useToast } from '../../hooks/useToast';

const Hero = () => (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Get in Touch</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We'd love to hear from you. Whether you have a question, feedback, or a business inquiry, our team is ready to answer all your questions.
            </p>
        </div>
    </section>
);

const ContactForm = () => {
    const { addToast } = useToast();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would POST to /api/contact
        addToast("Your message has been sent successfully!", "success");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" id="name" required className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" required className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" id="phone" required className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" required className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a... (Optional)</label>
                        <select id="role" className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500">
                            <option>Learner</option>
                            <option>Listener</option>
                            <option>Business</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea id="message" rows={5} required className="mt-1 block w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"></textarea>
                </div>
                
                {/* reCAPTCHA Placeholder */}
                <div className="h-20 w-72 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm text-gray-400">
                    reCAPTCHA placeholder
                </div>

                <div>
                    <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

const ContactInfo = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <div className="space-y-4">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                    <MessageIcon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our support team will get back to you within 24 hours.</p>
                    <a href="mailto:support@findsukoon.com" className="text-teal-600 hover:underline">support@findsukoon.com</a>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">Mon-Fri from 9am to 5pm.</p>
                    <a href="tel:+911234567890" className="text-teal-600 hover:underline">+91 123-456-7890</a>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Our Office</h3>
                    <p className="text-gray-600 dark:text-gray-300">123 Learning Lane, Knowledge City, IN</p>
                </div>
            </div>
        </div>
         {/* Map Embed Placeholder */}
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
            Map Placeholder
        </div>
    </div>
);

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
            <h2 className="text-3xl font-bold text-center mb-8">Quick Answers</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <FAQItem question="How do I become a listener?">
                    <p>You can apply to become a listener by navigating to our <Link to="/signup" className="text-blue-600 hover:underline">Signup page</Link> and selecting the "Join as Listener" option. You will need to complete an application and a verification process.</p>
                </FAQItem>
                <FAQItem question="What are the payment options?">
                    <p>We accept all major credit cards, UPI, and various digital wallets for recharging your in-app balance. All payments are processed securely.</p>
                </FAQItem>
                <FAQItem question="How do I report an issue with a session?">
                    <p>If you encounter any issues during a session, you can use the in-app reporting feature or contact our support team directly through the form on this page or via email.</p>
                </FAQItem>
            </div>
        </div>
    </section>
);


const ContactPage: React.FC = () => {
    return (
        <>
            <Hero />
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3">
                           <ContactForm />
                        </div>
                        <div className="lg:col-span-2">
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </section>
            <FAQSection />
        </>
    );
};

export default ContactPage;
