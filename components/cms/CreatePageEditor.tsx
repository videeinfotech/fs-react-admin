import React, { useState } from 'react';
import { InputField, TextareaField, SaveBar } from './CmsComponents';
import { useToast } from '../../hooks/useToast';
import ReactQuill from 'react-quill';

const CreatePageEditor = () => {
    const { addToast } = useToast();
    const [content, setContent] = useState('');

    return (
        <div className="p-6 space-y-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Create a New Page</h3>
                <div className="space-y-4">
                    <InputField label="Page Title" value="" onChange={() => {}} />
                    <InputField label="Page Slug (e.g., /my-new-page)" value="" onChange={() => {}} />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                        <div className="bg-white rounded-md">
                           <ReactQuill 
                                theme="snow" 
                                value={content} 
                                onChange={setContent}
                           />
                        </div>
                    </div>
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