import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const Terms: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
             <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-5xl">
                    <ReactRouterDOM.Link to="/" className="text-2xl font-bold text-primary-600">Find Sukoon</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to="/" className="text-primary-600 hover:underline">← Back to Home</ReactRouterDOM.Link>
                </div>
            </header>
            <main className="container mx-auto px-6 py-12 max-w-3xl">
                <article className="prose dark:prose-invert lg:prose-lg mx-auto">
                    <h1>Terms and Conditions</h1>
                    <p className="lead">Last updated: October 29, 2023</p>
                    <p>
                        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Find Sukoon mobile application (the "Service") operated by Find Sukoon ("us", "we", or "our").
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>

                    <h2>1. Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>

                    <h2>2. User Conduct</h2>
                    <p>
                        You agree not to use the Service to:
                    </p>
                    <ul>
                        <li>Violate any local, state, national, or international law.</li>
                        <li>Harass, abuse, or harm another person.</li>
                        <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
                    </ul>
                    
                    <h2>3. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>

                    <h2>4. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                    </p>

                     <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us: legal@findsukoon.com
                    </p>
                </article>
            </main>
        </div>
    );
};

export default Terms;
