import React from 'react';
import { InputField, TextareaField, ImageUpload, SaveBar } from './CmsComponents';
import { useToast } from '../../hooks/useToast';

const SeoEditor = () => {
    const { addToast } = useToast();
    return (
        <div className="p-6 space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Global SEO Settings</h3>
                <div className="space-y-4">
                    <InputField label="Global Meta Title" value="Find Sukoon - Learn Local Languages" onChange={() => {}} />
                    <TextareaField label="Global Meta Description" value="Find Sukoon helps you learn local languages via live 1-on-1 calls with real speakers." onChange={() => {}} />
                    <InputField label="Keywords (comma separated)" value="language learning, local language, hindi, marathi" onChange={() => {}} />
                    <ImageUpload label="Default OpenGraph Image" />
                </div>
            </div>
            <SaveBar onSave={() => addToast('Saved draft!', 'info')} onPublish={() => addToast('Published!', 'success')} />
        </div>
    );
};

export default SeoEditor;
