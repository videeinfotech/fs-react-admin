import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
                    <h1>Privacy Policy</h1>
                    <p className="lead">Last updated: October 29, 2023</p>
                    <p>
                        Find Sukoon ("us", "we", or "our") operates the Find Sukoon mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                    </p>

                    <h2>Information Collection and Use</h2>
                    <p>
                        We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>
                    <h3>Types of Data Collected</h3>
                    <h4>Personal Data</h4>
                    <p>
                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                    </p>
                    <ul>
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Phone number</li>
                        <li>Usage Data</li>
                    </ul>

                    <h2>Use of Data</h2>
                    <p>Find Sukoon uses the collected data for various purposes:</p>
                    <ul>
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer care and support</li>
                        <li>To provide analysis or valuable information so that we can improve the Service</li>
                        <li>To monitor the usage of the Service</li>
                        <li>To detect, prevent and address technical issues</li>
                    </ul>

                    <h2>Data Security</h2>
                    <p>
                        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us by email: privacy@findsukoon.com
                    </p>
                </article>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
