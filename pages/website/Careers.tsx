import React from 'react';
import { BriefcaseIcon, MapPinIcon } from '../../components/ui/icons/OtherIcons';

const JobOpening: React.FC<{ title: string; location: string; type: string }> = ({ title, location, type }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center space-x-4 mt-2 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 text-sm"><BriefcaseIcon className="w-4 h-4" /> {type}</span>
            <span className="flex items-center gap-1 text-sm"><MapPinIcon className="w-4 h-4" /> {location}</span>
        </div>
        <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">Apply Now</button>
    </div>
);

const Careers: React.FC = () => {
    const jobOpenings = [
        { title: 'Senior Frontend Engineer', location: 'Remote', type: 'Full-time' },
        { title: 'Product Manager', location: 'Mumbai, IN', type: 'Full-time' },
        { title: 'Community Manager', location: 'Remote', type: 'Part-time' },
    ];

    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900/50 py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Join Our Mission</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We're building a team of passionate individuals dedicated to connecting people through language.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
                    {jobOpenings.length > 0 ? (
                        <div className="space-y-6">
                            {jobOpenings.map((job, index) => (
                                <JobOpening key={index} {...job} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No open positions at the moment. Check back soon!</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Careers;
