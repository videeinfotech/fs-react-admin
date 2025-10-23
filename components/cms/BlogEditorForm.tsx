import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useToast } from '../../hooks/useToast';
import { InputField, TextareaField, ImageUpload, SaveBar } from './CmsComponents';

const newPostTemplate = {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: { name: "Admin", avatar: "" },
    date: new Date().toLocaleDateString('en-CA'),
    readTime: "5 min read",
    category: "",
    status: "Draft"
};


interface BlogEditorFormProps {
    post: typeof newPostTemplate | null;
    onSave: (postData: typeof newPostTemplate) => void;
    onCancel: () => void;
}

const BlogEditorForm: React.FC<BlogEditorFormProps> = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState(post || newPostTemplate);
    const { addToast } = useToast();

    useEffect(() => {
        setFormData(post || newPostTemplate);
    }, [post]);

    const handleChange = (field: keyof typeof newPostTemplate, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTitleChange = (value: string) => {
        const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setFormData(prev => ({ ...prev, title: value, slug }));
    };

    const handleSave = (status: 'Draft' | 'Published') => {
        const finalData = { ...formData, status };
        onSave(finalData);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{post ? 'Edit Post' : 'Create New Post'}</h2>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-800">
                    &larr; Back to Posts
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <InputField label="Post Title" value={formData.title} onChange={handleTitleChange} />
                    </div>
                     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                        <div className="bg-white rounded-md">
                            <ReactQuill 
                                theme="snow" 
                                value={formData.content} 
                                onChange={(value) => handleChange('content', value)}
                                className="h-96 mb-12"
                           />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Post Settings</h3>
                        <div className="space-y-4">
                            <InputField label="Slug" value={formData.slug} onChange={val => handleChange('slug', val)} />
                             <TextareaField label="Excerpt" value={formData.excerpt} onChange={val => handleChange('excerpt', val)} />
                             <InputField label="Category" value={formData.category} onChange={val => handleChange('category', val)} />
                             <InputField label="Author" value={formData.author.name} onChange={val => handleChange('author', { ...formData.author, name: val })} />
                        </div>
                    </div>
                     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Featured Image</h3>
                        <ImageUpload label="" />
                    </div>
                </div>
            </div>
            
             <SaveBar onSave={() => handleSave('Draft')} onPublish={() => handleSave('Published')} />
        </div>
    );
};

export default BlogEditorForm;