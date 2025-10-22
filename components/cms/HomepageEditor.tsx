import React, { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import {
    InputField,
    TextareaField,
    ImageUpload,
    Repeater,
    SaveBar
} from './CmsComponents';

const initialData = {
    heroTitle: "Learn Local Languages from Local People",
    heroSubtitle: "1-on-1 Live Calls with Real Speakers in your city — improve your speaking confidence.",
    heroBanner: "",
    ctaText: "Download App",
    ctaLink: "https://play.google.com/store/apps/details?id=com.findsukoon.findsukoon&hl=en_IN",
    steps: [
        { id: 1, title: "Download App", description: "Get the Find Sukoon app from the Play Store.", icon: "DownloadIcon" },
        { id: 2, title: "Sign Up", description: "Create your account as a learner in seconds.", icon: "UsersIcon" },
        { id: 3, title: "Select a Listener", description: "Choose a language and a local speaker you like.", icon: "SearchIcon" },
        { id: 4, title: "Start Calling", description: "Connect instantly via 1-on-1 voice or video calls.", icon: "PhoneIcon" },
    ],
    whyChooseUs: [
        { id: 1, title: "Real People, Real Conversations", description: "Move beyond textbooks and have authentic conversations that build fluency.", icon: "ChatBubbleIcon" },
        { id: 2, title: "Learn Regional Dialects", description: "Connect with locals to understand the nuances and dialects of your city.", icon: "GlobeAltIcon" },
    ],
    appSectionTitle: "Start Learning Local Languages Today",
    appQrImage: "",
    footerNote: "Learn local languages from local people."
};

const HomepageEditor: React.FC = () => {
    const [data, setData] = useState(initialData);
    const { addToast } = useToast();

    const handleSave = () => {
        // In a real app, this would make an API call.
        console.log("Saving data:", data);
        addToast("Homepage content saved as draft!", "info");
    };

    const handlePublish = () => {
        console.log("Publishing data:", data);
        addToast("Homepage content published successfully!", "success");
    };

    return (
        <div className="p-6 space-y-8">
            {/* Hero Section */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Hero Section</h3>
                <div className="space-y-4">
                    <InputField label="Hero Title" value={data.heroTitle} onChange={val => setData({...data, heroTitle: val})} />
                    <TextareaField label="Hero Subtitle" value={data.heroSubtitle} onChange={val => setData({...data, heroSubtitle: val})} />
                    <ImageUpload label="Hero Banner Image" />
                    <InputField label="CTA Button Text" value={data.ctaText} onChange={val => setData({...data, ctaText: val})} />
                    <InputField label="CTA Button Link" value={data.ctaLink} onChange={val => setData({...data, ctaLink: val})} />
                </div>
            </div>

            {/* How It Works Section */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">"How It Works" Steps</h3>
                <Repeater
                    items={data.steps}
                    onItemsChange={newItems => setData({...data, steps: newItems})}
                    renderItem={(item, onChange) => (
                        <div className="space-y-2">
                            <InputField label="Title" value={item.title} onChange={val => onChange('title', val)} />
                            <InputField label="Description" value={item.description} onChange={val => onChange('description', val)} />
                            <InputField label="Icon Name" value={item.icon} onChange={val => onChange('icon', val)} />
                        </div>
                    )}
                    newItem={{ title: '', description: '', icon: '' }}
                />
            </div>

            {/* Why Choose Us Section */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">"Why Choose Us" Features</h3>
                <Repeater
                    items={data.whyChooseUs}
                    onItemsChange={newItems => setData({...data, whyChooseUs: newItems})}
                    renderItem={(item, onChange) => (
                        <div className="space-y-2">
                            <InputField label="Title" value={item.title} onChange={val => onChange('title', val)} />
                            <InputField label="Description" value={item.description} onChange={val => onChange('description', val)} />
                            <InputField label="Icon Name" value={item.icon} onChange={val => onChange('icon', val)} />
                        </div>
                    )}
                    newItem={{ title: '', description: '', icon: '' }}
                />
            </div>
            
            {/* App Download Section */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">App Download Section</h3>
                <div className="space-y-4">
                    <InputField label="Section Title" value={data.appSectionTitle} onChange={val => setData({...data, appSectionTitle: val})} />
                    <ImageUpload label="QR Code Image" />
                </div>
            </div>

            {/* Footer Note */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Footer Note</h3>
                <TextareaField label="Footer Note" value={data.footerNote} onChange={val => setData({...data, footerNote: val})} />
            </div>

            <SaveBar onSave={handleSave} onPublish={handlePublish} />
        </div>
    );
};

export default HomepageEditor;
