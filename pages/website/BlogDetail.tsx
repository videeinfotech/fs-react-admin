import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FacebookIcon, LinkedInIcon, TwitterIcon, EnvelopeIcon } from '../../components/ui/icons/OtherIcons';
import NotFound from '../NotFound';

const mockBlogs = [
    { slug: "5-tips-to-overcome-fear", title: "5 Tips to Overcome the Fear of Speaking a New Language", content: "Feeling nervous? You're not alone. Here are five practical tips to boost your confidence and start speaking...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog1.jpg", author: { name: "Priya Singh", avatar: "https://i.pravatar.cc/150?u=23" }, date: "Oct 22, 2023", readTime: "5 min read", category: "Learning Tips" },
    { slug: "culture-through-dialects", title: "Understanding Culture Through Local Dialects", content: "Language is more than just words; it's a window into culture. Discover how learning local dialects can deepen your understanding...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog2.jpg", author: { name: "Rohan Kapoor", avatar: "https://i.pravatar.cc/150?u=22" }, date: "Oct 15, 2023", readTime: "7 min read", category: "Culture" },
    { slug: "why-1-on-1-is-fastest", title: "Why 1-on-1 Conversation is the Fastest Way to Learn", content: "Forget boring drills. We explore the science behind conversational learning and why it's so effective for fluency...", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog3.jpg", author: { name: "Diya Mehta", avatar: "https://i.pravatar.cc/150?u=21" }, date: "Oct 08, 2023", readTime: "6 min read", category: "App Updates" },
    { slug: "common-mistakes-in-hindi", title: "Common Mistakes English Speakers Make in Hindi", content: "Avoid these common pitfalls when learning Hindi to sound more like a native speaker from day one.", image: "https://storage.googleapis.com/aistudio-hosting/find-sukoon/blog4.jpg", author: { name: "Priya Singh", avatar: "https://i.pravatar.cc/150?u=23" }, date: "Oct 01, 2023", readTime: "4 min read", category: "Learning Tips" },
];

const BlogDetail: React.FC = () => {
    const { slug } = useParams();
    const post = mockBlogs.find(p => p.slug === slug);

    if (!post) {
        return <NotFound />;
    }

    const relatedPosts = mockBlogs.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 2);

    return (
        <div className="bg-white dark:bg-gray-800">
            <article className="container mx-auto px-6 max-w-4xl py-12">
                <header className="mb-8 text-center">
                    <p className="text-primary-600 font-semibold">{post.category}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">{post.title}</h1>
                    <div className="flex items-center justify-center space-x-4 mt-6 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                        <span className="text-sm">{post.date} &bull; {post.readTime}</span>
                    </div>
                </header>

                <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
                
                <div className="prose dark:prose-invert lg:prose-xl max-w-none mx-auto text-gray-700 dark:text-gray-300">
                    <p>{post.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
                    <h2>A Deeper Dive</h2>
                    <p>Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.</p>
                </div>

                <footer className="mt-12 pt-8 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <span className="font-semibold">Share:</span>
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><FacebookIcon className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><TwitterIcon className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><LinkedInIcon className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><EnvelopeIcon className="w-5 h-5" /></a>
                        </div>
                    </div>
                    {/* Author Bio */}
                    <div className="mt-8 flex items-start space-x-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                        <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full"/>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{post.author.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Priya is a language enthusiast and community manager at Find Sukoon, passionate about connecting people through culture and conversation.</p>
                        </div>
                    </div>
                </footer>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-8">Related Posts</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedPosts.map(p => (
                                <div key={p.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
                                    <Link to={`/website/blogs/${p.slug}`}>
                                        <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600">{p.title}</h3>
                                            <p className="text-xs text-gray-500">{p.date}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogDetail;