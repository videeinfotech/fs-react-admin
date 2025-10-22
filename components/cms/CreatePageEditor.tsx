import React from 'react';
import { InputField, TextareaField, SaveBar } from './CmsComponents';
import { useToast } from '../../hooks/useToast';

const CreatePageEditor = () => {
    const { addToast } = useToast();
    return (
        <div className="p-6 space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Create a New Page</h3>
                <div className="space-y-4">
                    <InputField label="Page Title" value="" onChange={() => {}} />
                    <InputField label="Page Slug (e.g., /my-new-page)" value="" onChange={() => {}} />
                    <TextareaField label="Content (HTML or Markdown)" value="" onChange={() => {}} />
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">SEO Settings for this page</h3>
                <div className="space-y-4">
                     <InputField label="Meta Title" value="" onChange={() => {}} />
                     <TextareaField label="Meta Description" value="" onChange={() => {}} />
                </div>
            </div>
             <SaveBar onSave={() => addToast('Saved page as draft!', 'info')} onPublish={() => addToast('New page published!', 'success')} />
        </div>
    );
};
export default CreatePageEditor;
