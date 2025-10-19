import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useToast } from '../hooks/useToast';
import { DataTable } from '../components/ui/DataTable';
import { BrainIcon } from '../components/ui/icons/OtherIcons';

// --- MOCK DATA ---
const mockQuestions = [
    { id: 1, question: "A user says they feel hopeless. What is the most empathetic response?", category: "Empathy", difficulty: "Medium", status: "Active", createdBy: "Admin", date: "2023-10-20" },
    { id: 2, question: "What is the first step in active listening?", category: "Communication", difficulty: "Easy", status: "Active", createdBy: "AI", date: "2023-10-19" },
    { id: 3, question: "How do you handle a user who is angry and blaming you?", category: "Conflict Resolution", difficulty: "Hard", status: "Inactive", createdBy: "Admin", date: "2023-10-18" },
];
const mockAssignments = [
    { id: 1, title: "Daily Empathy Check", type: "Daily", listeners: 560, questions: 5, schedule: "Every Day 9AM", status: "Active" },
    { id: 2, title: "New Listener Onboarding Test", type: "Onboarding", listeners: 22, questions: 10, schedule: "One-time", status: "Completed" },
];
const mockReports = [
    { id: 'L-0123', name: "Ananya Mehta", quizType: "Daily", score: 90, attempts: 15, avgDifficulty: "Medium", weakArea: "None", lastTaken: "2023-10-19" },
    { id: 'L-0450', name: "Sameer Verma", quizType: "Onboarding", score: 68, attempts: 1, avgDifficulty: "Easy", weakArea: "Conflict Resolution", lastTaken: "2023-10-17" },
    { id: 'L-0712', name: "Sunita Rao", quizType: "Daily", score: 55, attempts: 8, avgDifficulty: "Medium", weakArea: "Empathy", lastTaken: "2023-10-18" },
    { id: 'L-0899', name: "Rohan Desai", quizType: "Daily", score: 82, attempts: 12, avgDifficulty: "Medium", weakArea: "Communication", lastTaken: "2023-10-20" },

];
const aiInsightsData = {
    categoryPerformance: [{ name: 'Empathy', score: 82 }, { name: 'Communication', score: 74 }, { name: 'Stress Handling', score: 68 }],
    scoreTrend: [{ name: 'W1', score: 72 }, { name: 'W2', score: 75 }, { name: 'W3', score: 74 }, { name: 'W4', score: 78 }],
    skillStrength: [{ subject: 'Empathy', A: 120, fullMark: 150 }, { subject: 'Communication', A: 98, fullMark: 150 }, { subject: 'Conflict Res.', A: 86, fullMark: 150 }, { subject: 'Professionalism', A: 99, fullMark: 150 }, { subject: 'Active Listening', A: 110, fullMark: 150 }],
};


// --- VIEWS / TABS ---

// 1. Question Bank View
const QuestionBankView = () => {
    const { addToast } = useToast();
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isAIGeneratorOpen, setAIGeneratorOpen] = useState(false);
    
    const columns = useMemo(() => [
        { header: 'Question', accessor: 'question' as const, sortable: true },
        { header: 'Category', accessor: 'category' as const, sortable: true },
        { header: 'Difficulty', accessor: 'difficulty' as const, sortable: true },
        { header: 'Status', accessor: 'status' as const, sortable: true },
        { header: 'Created By', accessor: 'createdBy' as const, sortable: true },
    ], []);
    
    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        addToast('Question added!', 'success'); 
        setAddModalOpen(false);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Manage Questions</h2>
                <div className="space-x-2">
                    <button onClick={() => setAIGeneratorOpen(true)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md flex items-center gap-2"><BrainIcon className="w-4 h-4" /> Generate via AI</button>
                    <button onClick={() => setAddModalOpen(true)} className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">+ Add New Question</button>
                </div>
            </div>
            <DataTable columns={columns} data={mockQuestions} />

            {/* Add Question Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in">
                    <form onSubmit={handleAddQuestion} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Question</h3>
                            <button type="button" onClick={() => setAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl">&times;</button>
                        </div>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            <div>
                                <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question Text</label>
                                <textarea id="question" rows={3} placeholder="e.g., A user says they feel hopeless..." required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Options & Correct Answer</label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Select the radio button for the correct answer.</p>
                                <div className="mt-2 space-y-2">
                                    {[0, 1, 2, 3].map(index => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input type="radio" name="correctAnswer" value={index} defaultChecked={index === 0} className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                                            <input type="text" placeholder={`Option ${index + 1}`} required className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <input type="text" id="category" placeholder="e.g., Empathy" required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                                    <select id="difficulty" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500">
                                        <option>Easy</option>
                                        <option>Medium</option>
                                        <option>Hard</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t dark:border-gray-700">
                            <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Save Question</button>
                        </div>
                    </form>
                </div>
            )}
             {/* AI Generator Side Panel */}
            {isAIGeneratorOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 transform transition-transform duration-300 ease-in-out translate-x-0">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="text-lg font-bold">AI Question Generator</h3>
                            <button onClick={() => setAIGeneratorOpen(false)} className="text-2xl">&times;</button>
                        </div>
                        <p>AI Generator form and preview...</p>
                         <div className="absolute bottom-6 right-6 flex space-x-2">
                            <button onClick={() => addToast('Questions added to bank!', 'success')} className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">Add to Bank</button>
                        </div>
                    </div>
                 </div>
            )}
        </div>
    );
};

// 2. Quiz Assignment View
const QuizAssignmentView = () => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Quiz Assignments</h2>
            <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md">+ Assign New Quiz</button>
        </div>
        <DataTable 
            columns={useMemo(() => [
                { header: 'Quiz Title', accessor: 'title' as const, sortable: true },
                { header: 'Type', accessor: 'type' as const, sortable: true },
                { header: 'Listeners Assigned', accessor: 'listeners' as const, sortable: true },
                { header: 'Schedule', accessor: 'schedule' as const, sortable: true },
                { header: 'Status', accessor: 'status' as const, sortable: true },
            ], [])} 
            data={mockAssignments} 
        />
    </div>
);

// 3. Quiz Reports View
const QuizReportsView = () => {
    const [weakAreaFilter, setWeakAreaFilter] = useState('All');
    const [quizTypeFilter, setQuizTypeFilter] = useState('All');

    const uniqueWeakAreas = useMemo(() => ['All', ...new Set(mockReports.map(r => r.weakArea).filter(Boolean))], []);
    const uniqueQuizTypes = useMemo(() => ['All', ...new Set(mockReports.map(r => r.quizType))], []);

    const filteredReports = useMemo(() => {
        return mockReports.filter(report => {
            const weakAreaMatch = weakAreaFilter === 'All' || report.weakArea === weakAreaFilter;
            const quizTypeMatch = quizTypeFilter === 'All' || report.quizType === quizTypeFilter;
            return weakAreaMatch && quizTypeMatch;
        });
    }, [weakAreaFilter, quizTypeFilter]);

    const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    );
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Avg. Score" value="78%" />
                <StatCard title="Participation Rate" value="92%" />
                <StatCard title="Improvement (WoW)" value="+3%" />
                <StatCard title="Quizzes Completed" value="1,234" />
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2 text-center">Listener Skill Strength</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aiInsightsData.skillStrength}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Tooltip />
                            <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2 text-center">Average Score Trend (Last 4 Weeks)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={aiInsightsData.scoreTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[60, 90]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                     <h3 className="text-lg font-bold md:col-span-1">Listener Reports</h3>
                    <select value={quizTypeFilter} onChange={e => setQuizTypeFilter(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {uniqueQuizTypes.map(type => <option key={type} value={type}>{type === 'All' ? 'All Quiz Types' : type}</option>)}
                    </select>
                     <select value={weakAreaFilter} onChange={e => setWeakAreaFilter(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {uniqueWeakAreas.map(area => <option key={area} value={area}>{area === 'All' ? 'All Weak Areas' : area}</option>)}
                    </select>
                </div>
                <DataTable 
                     columns={useMemo(() => [
                        { header: 'Listener', accessor: 'name' as const, sortable: true },
                        { header: 'Quiz Type', accessor: 'quizType' as const, sortable: true },
                        { header: 'Score (%)', accessor: 'score' as const, sortable: true },
                        { header: 'Weak Area', accessor: 'weakArea' as const, sortable: true },
                        { header: 'Last Taken', accessor: 'lastTaken' as const, sortable: true },
                    ], [])}
                    data={filteredReports}
                />
            </div>
        </div>
    );
};

// 4. AI Insights View
const AIInsightsView = () => {
     const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    );
    return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Avg Listener Score" value="78%" />
                    <StatCard title="Active Listeners Today" value="89" />
                    <StatCard title="Lowest Category" value="Stress Handling" />
                    <StatCard title="Improvement Trend" value="+3.1%" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-semibold mb-2">Category Performance</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={aiInsightsData.categoryPerformance} layout="vertical"><CartesianGrid /><XAxis type="number" /><YAxis type="category" dataKey="name" width={100} /><Tooltip /><Bar dataKey="score" fill="#10b981" /></BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-semibold mb-2">Average Score Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={aiInsightsData.scoreTrend}><CartesianGrid /><XAxis dataKey="name" /><YAxis domain={[60, 90]} /><Tooltip /><Line type="monotone" dataKey="score" stroke="#8884d8" /></LineChart>
                        </ResponsiveContainer>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
                        <h3 className="font-semibold mb-2 text-center">Skill Strength Distribution</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aiInsightsData.skillStrength}><PolarGrid /><PolarAngleAxis dataKey="subject" /><PolarRadiusAxis /><Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} /></RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><BrainIcon className="w-6 h-6 text-primary-500" /> AI Suggestions</h3>
                 <div className="space-y-4 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-md">
                        <p className="font-semibold">Performance Dip</p>
                        <p className="text-gray-600 dark:text-gray-300">Scores in 'Empathy' dropped 12% this week.</p>
                        <button className="text-blue-600 hover:underline mt-1 text-xs">Generate 5 new Empathy questions</button>
                    </div>
                     <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-md">
                        <p className="font-semibold">Top Improvers</p>
                        <p className="text-gray-600 dark:text-gray-300">Listeners L-0712 and L-0899 improved their scores by over 20%.</p>
                    </div>
                     <div className="bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-md">
                        <p className="font-semibold">Listeners to Re-evaluate</p>
                        <p className="text-gray-600 dark:text-gray-300">3 listeners have failed the last 2 daily quizzes.</p>
                         <button className="text-yellow-700 hover:underline mt-1 text-xs">View Listeners</button>
                    </div>
                 </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const QuizEvaluation: React.FC = () => {
    type Tab = 'bank' | 'assign' | 'reports' | 'insights';
    const [activeTab, setActiveTab] = useState<Tab>('bank');
    
    const tabs: { id: Tab, name: string }[] = [
        { id: 'bank', name: 'Question Bank' },
        { id: 'assign', name: 'Assign & Schedule' },
        { id: 'reports', name: 'Quiz Reports' },
        { id: 'insights', name: 'AI Insights' },
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'bank': return <QuestionBankView />;
            case 'assign': return <QuizAssignmentView />;
            case 'reports': return <QuizReportsView />;
            case 'insights': return <AIInsightsView />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Listener Quiz & Evaluation</h1>
            
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="animate-fade-in">
                {renderContent()}
            </div>
        </div>
    );
};

export default QuizEvaluation;