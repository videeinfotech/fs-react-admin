import React from 'react';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '../ui/icons/OtherIcons';

export const Footer: React.FC = () => {
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