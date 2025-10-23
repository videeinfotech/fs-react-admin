import React, { useState, useMemo } from 'react';
import { DataTable } from '../ui/DataTable';
import { mockBlogs } from '../../pages/website/Blogs';
import { useToast } from '../../hooks/useToast';
import BlogEditorForm from './BlogEditorForm';

const BlogsEditor = () => {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [posts, setPosts] = useState(mockBlogs);
    const [currentPost, setCurrentPost] = useState<typeof mockBlogs[0] | null>(null);
    const { addToast } = useToast();

    const handleCreateNew = () => {
        setCurrentPost(null);
        setView('editor');
    };

    const handleEdit = (post: typeof mockBlogs[0]) => {
        setCurrentPost(post);
        setView('editor');
    };

    const handleDelete = (slug: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(prev => prev.filter(p => p.slug !== slug));
            addToast('Post deleted!', 'success');
        }
    };

    const handleSave = (postData: typeof mockBlogs[0]) => {
        if (currentPost) {
            // Update existing post
            setPosts(prev => prev.map(p => p.slug === currentPost.slug ? postData : p));
            addToast('Post updated successfully!', 'success');
        } else {
            // Create new post
            setPosts(prev => [postData, ...prev]);
            addToast('Post created successfully!', 'success');
        }
        setView('list');
        setCurrentPost(null);
    };

    const columns = useMemo(() => [
        { header: 'Title', accessor: 'title' as const, sortable: true },
        { header: 'Author', accessor: 'author' as const, sortable: true, render: (item: any) => item.author.name },
        { header: 'Category', accessor: 'category' as const, sortable: true },
        { header: 'Date', accessor: 'date' as const, sortable: true },
        { header: 'Status', accessor: 'status' as const, sortable: true, render: (item: any) => (
            <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.status}</span>
        ) },
    ], []);

    const renderActions = (post: typeof mockBlogs[0]) => (
        <div className="space-x-2">
            <button onClick={() => handleEdit(post)} className="text-primary-600 hover:underline">Edit</button>
            <button onClick={() => handleDelete(post.slug)} className="text-red-600 hover:underline">Delete</button>
        </div>
    );

    if (view === 'editor') {
        return <BlogEditorForm post={currentPost} onSave={handleSave} onCancel={() => setView('list')} />;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <button onClick={handleCreateNew} className="px-4 py-2 bg-primary-600 text-white rounded-md font-semibold">
                    + Create New Post
                </button>
            </div>
            <DataTable columns={columns} data={posts} renderActions={renderActions} />
        </div>
    );
};

export default BlogsEditor;