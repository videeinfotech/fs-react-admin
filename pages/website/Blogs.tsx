import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { SearchIcon, EnvelopeIcon } from '../../components/ui/icons/OtherIcons';

export const mockBlogs = [
    { 
        slug: "5-tips-to-overcome-fear", 
        title: "5 Tips to Overcome the Fear of Speaking a New Language", 
        excerpt: "Feeling nervous? You're not alone. Here are five practical tips to boost your confidence and start speaking...",
        content: `<p>Feeling nervous about speaking a new language is completely normal. The fear of making mistakes can be paralyzing. However, the key to fluency is practice, and practice means speaking! Here are five practical tips to help you build confidence and start having conversations.</p><h3>1. Start Small</h3><p>You don't need to deliver a speech. Start with simple greetings or ordering a coffee. Small, successful interactions build a foundation of confidence that you can grow from. Celebrate these small wins!</p><h3>2. Find a Patient Partner</h3><p>Practice with someone who is supportive and patient. This could be a friend, a tutor, or a listener on an app like Find Sukoon. A friendly partner will correct you gently and encourage you to keep trying.</p><h3>3. Embrace Mistakes</h3><p>Every language learner makes mistakes. It's an essential part of the process. Instead of fearing them, view mistakes as learning opportunities. Laugh them off and remember that perfection isn't the goal—communication is.</p><h3>4. Prepare "Scripts" for Common Scenarios</h3><p>Think about conversations you're likely to have. Introducing yourself, talking about your hobbies, or asking for directions are great starting points. Prepare a few key phrases for these scenarios. This preparation can reduce anxiety and give you a smoother entry into conversations.</p><h3>5. Listen More Than You Speak</h3><p>A conversation is a two-way street. By focusing on listening, you take the pressure off yourself to speak perfectly. You'll also learn new vocabulary and sentence structures naturally. Don't be afraid to ask people to repeat themselves or speak more slowly.</p><p>Remember, consistency is key. A little bit of practice every day is more effective than a long session once a week. Be kind to yourself, and enjoy the journey of connecting with others through language!</p>`, 
        image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog1.jpg", 
        author: { name: "Priya Singh", avatar: "https://i.pravatar.cc/150?u=23" }, 
        date: "Oct 22, 2023", 
        readTime: "5 min read", 
        category: "Learning Tips" ,
        status: "Published"
    },
    { 
        slug: "culture-through-dialects", 
        title: "Understanding Culture Through Local Dialects", 
        excerpt: "Language is more than just words; it's a window into culture. Discover how learning local dialects can deepen your understanding...",
        content: `<p>When you learn a language, you're not just memorizing words; you're gaining access to a new culture. Local dialects, in particular, offer a rich, unfiltered view into the heart of a region. Here's why paying attention to dialects is so important.</p><h3>1. Dialects Reflect History and Geography</h3><p>The way people speak is shaped by centuries of history, migration, and geographical isolation. The slang in Mumbai's Hindi is different from Delhi's, reflecting the diverse influences on each city. Learning these differences is like a history lesson in itself.</p><h3>2. It Shows Respect and Builds Connection</h3><p>Making an effort to understand and use local phrases shows a deep respect for the people and their heritage. It's a powerful way to build rapport and move from being a 'tourist' to being a welcome guest. Locals will appreciate your effort, and it will open doors to more authentic interactions.</p><h3>3. You'll Understand the Nuances</h3><p>Textbooks teach a standardized form of a language, but real life is full of colloquialisms, idioms, and humor that you'll only find in local dialects. Understanding these nuances is the key to truly grasping the culture and connecting with people on a deeper level.</p>`, 
        image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog2.jpg", 
        author: { name: "Rohan Kapoor", avatar: "https://i.pravatar.cc/150?u=22" }, 
        date: "Oct 15, 2023", 
        readTime: "7 min read", 
        category: "Culture" ,
        status: "Published"
    },
    { 
        slug: "why-1-on-1-is-fastest", 
        title: "Why 1-on-1 Conversation is the Fastest Way to Learn", 
        excerpt: "Forget boring drills. We explore the science behind conversational learning and why it's so effective for fluency...",
        content: `<p>While flashcards and grammar apps have their place, nothing accelerates language acquisition like one-on-one conversation. Here's the science-backed reason why talking to another person is the most effective way to learn.</p><h3>Active Recall and Immediate Feedback</h3><p>In a conversation, you are constantly forced to actively recall vocabulary and grammar rules. This is far more powerful for memory retention than passive learning. Furthermore, your conversation partner provides immediate, contextual feedback, correcting your mistakes in real-time so you don't reinforce bad habits.</p><h3>Neuroplasticity and Engagement</h3><p>Real-time conversation is highly engaging for your brain. It activates multiple cognitive functions at once—listening, processing, formulating a response, and speaking. This intense engagement promotes neuroplasticity, essentially rewiring your brain to think in the new language.</p><h3>Reduces Speaking Anxiety</h3><p>Practicing in a low-stakes, one-on-one environment is the perfect way to build speaking confidence. Unlike a classroom setting, there's no fear of judgment from peers. This allows you to relax, experiment with the language, and learn more effectively.</p>`, 
        image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog3.jpg", 
        author: { name: "Diya Mehta", avatar: "https://i.pravatar.cc/150?u=21" }, 
        date: "Oct 08, 2023", 
        readTime: "6 min read", 
        category: "App Updates" ,
        status: "Draft"
    },
    { 
        slug: "common-mistakes-in-hindi", 
        title: "Common Mistakes English Speakers Make in Hindi", 
        excerpt: "Avoid these common pitfalls when learning Hindi to sound more like a native speaker from day one.",
        content: `<p>Learning Hindi can be a rewarding experience, but English speakers often stumble over a few common hurdles. By being aware of these, you can speed up your learning process and sound more natural.</p><h3>1. Gender Mismatches (लिंग)</h3><p>Unlike English, nouns in Hindi have a gender (masculine or feminine), and this affects adjectives and verbs. For example, "my car is big" is "meri gaadi badi hai" (feminine), not "mera gaadi bada hai." It takes practice, but paying attention to noun endings is key.</p><h3>2. The "Ne" Particle (ने)</h3><p>The "ne" particle is used with the subject in the past tense for transitive verbs. This is a concept that doesn't exist in English. For example, "I ate an apple" is "Maine seb khaya" (literally, "By me, apple was eaten"). It feels strange at first, but it's a fundamental rule of Hindi grammar.</p><h3>3. Word Order</h3><p>Hindi follows a Subject-Object-Verb (SOV) word order, whereas English is Subject-Verb-Object (SVO). "I am learning Hindi" becomes "Main Hindi seekh raha hoon" (I Hindi am learning). Thinking in this new structure is one of the biggest mental shifts for learners.</p>`, 
        image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog4.jpg", 
        author: { name: "Priya Singh", avatar: "https://i.pravatar.cc/150?u=23" }, 
        date: "Oct 01, 2023", 
        readTime: "4 min read", 
        category: "Learning Tips",
        status: "Published" 
    },
];

const BlogCard: React.FC<{ post: typeof mockBlogs[0] }> = ({ post }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
        <ReactRouterDOM.Link to={`/website/blogs/${post.slug}`}>
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity" />
        </ReactRouterDOM.Link>
        <div className="p-6">
            <p className="text-sm text-primary-600 font-semibold mb-1">{post.category}</p>
            <h2 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors">
                <ReactRouterDOM.Link to={`/website/blogs/${post.slug}`}>{post.title}</ReactRouterDOM.Link>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500">
                <span>{post.author.name}</span>
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
                            <ReactRouterDOM.Link to={`/website/blogs/${post.slug}`} className="font-semibold text-sm hover:text-primary-600 leading-tight">{post.title}</ReactRouterDOM.Link>
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