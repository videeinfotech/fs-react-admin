import React, { useState } from 'react';
import HomepageEditor from '../components/cms/HomepageEditor';
import AboutUsEditor from '../components/cms/AboutUsEditor';
import SeoEditor from '../components/cms/SeoEditor';
import FooterEditor from '../components/cms/FooterEditor';
import CreatePageEditor from '../components/cms/CreatePageEditor';

type Tab = 'homepage' | 'about' | 'why-choose-us' | 'listeners' | 'testimonials' | 'blogs' | 'contact' | 'careers' | 'how-it-works' | 'app-info' | 'seo' | 'footer' | 'create-page';

const tabs: { id: Tab, name: string }[] = [
    { id: 'homepage', name: 'Homepage' },
    { id: 'about', name: 'About Us' },
    { id: 'why-choose-us', name: 'Why Choose Us' },
    { id: 'listeners', name: 'Listeners' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'blogs', name: 'Blogs' },
    { id: 'contact', name: 'Contact Us' },
    { id: 'careers', name: 'Careers' },
    { id: 'how-it-works', name: 'How It Works' },
    { id: 'app-info', name: 'App Info' },
    { id: 'seo', name: 'SEO Settings' },
    { id: 'footer', name: 'Footer' },
    { id: 'create-page', name: 'Create Page' },
];

const PlaceholderEditor: React.FC<{ pageName: string }> = ({ pageName }) => (
    <div className="p-6 text-center text-gray-500">
        <h2 className="text-2xl font-bold">Manage {pageName}</h2>
        <p>This editor is under construction.</p>
    </div>
);

const WebsiteCMS: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('homepage');

    const renderContent = () => {
        switch(activeTab) {
            case 'homepage': return <HomepageEditor />;
            case 'about': return <AboutUsEditor />;
            case 'seo': return <SeoEditor />;
            case 'footer': return <FooterEditor />;
            case 'create-page': return <CreatePageEditor />;
            default:
                const tab = tabs.find(t => t.id === activeTab);
                return <PlaceholderEditor pageName={tab?.name || 'Page'} />;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Website CMS</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage all website content and pages directly from here.</p>
            
            <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:border-gray-300'}`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-inner -mx-4 -mb-14">
                {renderContent()}
            </div>
        </div>
    );
};

export default WebsiteCMS;
