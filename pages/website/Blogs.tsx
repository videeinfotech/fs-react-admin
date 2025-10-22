import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, EnvelopeIcon } from '../../components/ui/icons/OtherIcons';

const mockBlogs = [
    { slug: "5-tips-to-overcome-fear", title: "5 Tips to Overcome the Fear of Speaking a New Language", excerpt: "Feeling nervous? You're not alone. Here are five practical tips to boost your confidence and start speaking...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog1.jpg", author: "Priya Singh", date: "Oct 22, 2023", readTime: "5 min read", category: "Learning Tips" },
    { slug: "culture-through-dialects", title: "Understanding Culture Through Local Dialects", excerpt: "Language is more than just words; it's a window into culture. Discover how learning local dialects can deepen your understanding...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog2.jpg", author: "Rohan Kapoor", date: "Oct 15, 2023", readTime: "7 min read", category: "Culture" },
    { slug: "why-1-on-1-is-fastest", title: "Why 1-on-1 Conversation is the Fastest Way to Learn", excerpt: "Forget boring drills. We explore the science behind conversational learning and why it's so effective for fluency...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog3.jpg", author: "Diya Mehta", date: "Oct 08, 2023", readTime: "6 min read", category: "App Updates" },
    // Add more for pagination
    { slug: "common-mistakes-in-hindi", title: "Common Mistakes English Speakers Make in Hindi", excerpt: "Avoid these common pitfalls when learning Hindi to sound more like a native speaker from day one.", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog4.jpg", author: "Priya Singh", date: "Oct 01, 2023", readTime: "4 min read", category: "Learning Tips" },
];

const BlogCard: React.FC<{ post: typeof mockBlogs[0] }> = ({ post }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
        <Link to={`/website/blogs/${post.slug}`}>
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity" />
        </Link>
        <div className="p-6">
            <p className="text-sm text-primary-600 font-semibold mb-1">{post.category}</p>
            <h2 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors">
                <Link to={`/website/blogs/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500">
                <span>{post.author}</span>
                <span className="mx-2">&bull;</span>
                <span>{post.date}</span>
                <span className="mx-2">&bull;</span>
                <span>{post.readTime}</span>
            </div>
        </div>
    </div>
);

const Sidebar = () => (
    <aside className="space-y-8">
        {/* Search */}
        <div className="relative">
            <input type="text" placeholder="Search blog..." className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        {/* Categories */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-primary-600">Learning Tips (2)</a></li>
                <li><a href="#" className="hover:text-primary-600">Culture (1)</a></li>
                <li><a href="#" className="hover:text-primary-600">App Updates (1)</a></li>
            </ul>
        </div>
        {/* Popular Posts */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
            <ul className="space-y-3">
                {mockBlogs.slice(0, 2).map(post => (
                    <li key={post.slug} className="flex items-start space-x-3">
                        <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                            <Link to={`/website/blogs/${post.slug}`} className="font-semibold text-sm hover:text-primary-600 leading-tight">{post.title}</Link>
                            <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        {/* Newsletter */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest language tips and updates from Find Sukoon.</p>
            <form className="flex">
                <input type="email" placeholder="Your email" className="w-full p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 text-sm" />
                <button className="p-2 bg-primary-600 text-white rounded-r-md"><EnvelopeIcon className="w-5 h-5"/></button>
            </form>
        </div>
    </aside>
);

const BlogsPage: React.FC = () => {
    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Language Tips & Culture</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore articles on language learning, cultural insights, and stories from our community.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Blog Posts */}
                        <div className="lg:col-span-2 space-y-8">
                            {mockBlogs.map(post => <BlogCard key={post.slug} post={post} />)}
                            
                            {/* Pagination */}
                            <div className="flex justify-center items-center mt-8 pt-8 border-t dark:border-gray-700">
                                <button className="px-4 py-2 mx-1 bg-white dark:bg-gray-800 rounded-md disabled:opacity-50">&larr; Newer</button>
                                <span className="text-gray-600 dark:text-gray-300 mx-2">Page 1 of 1</span>
                                <button className="px-4 py-2 mx-1 bg-white dark:bg-gray-800 rounded-md disabled:opacity-50">Older &rarr;</button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                           <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogsPage;