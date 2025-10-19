import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data
const cohortData = [
  { name: 'Week 0', 'Jan Cohort': 100, 'Feb Cohort': 100, 'Mar Cohort': 100 },
  { name: 'Week 1', 'Jan Cohort': 85, 'Feb Cohort': 88, 'Mar Cohort': 90 },
  { name: 'Week 2', 'Jan Cohort': 72, 'Feb Cohort': 75, 'Mar Cohort': 81 },
  { name: 'Week 3', 'Jan Cohort': 65, 'Feb Cohort': 68, 'Mar Cohort': 72 },
  { name: 'Week 4', 'Jan Cohort': 58, 'Feb Cohort': 62, 'Mar Cohort': 66 },
];

const funnelData = [
    { stage: 'User Signups', value: 10000, color: 'bg-primary-700' },
    { stage: 'First Session Booked', value: 6500, color: 'bg-primary-600' },
    { stage: 'Payment Made', value: 4200, color: 'bg-primary-500' },
    { stage: 'Feedback Submitted', value: 2100, color: 'bg-primary-400' },
];

// Components
const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void; label: string }> = ({ enabled, setEnabled, label }) => (
    <div className="flex items-center">
        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
        <button
            type="button"
            className={`${enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
            onClick={() => setEnabled(!enabled)}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    </div>
);


const PredictiveKpiCard: React.FC<{ title: string; value: string; trend: string; trendDirection: 'up' | 'down' }> = ({ title, value, trend, trendDirection }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        <div className="mt-2 flex items-center text-sm">
            {trendDirection === 'up' ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            )}
            <span className={`ml-1 ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
        </div>
    </div>
);

const FunnelChart: React.FC = () => {
    const maxValue = funnelData[0].value;
    const widthClasses = ['w-full', 'w-11/12', 'w-10/12', 'w-9/12', 'w-8/12', 'w-7/12', 'w-6/12', 'w-5/12', 'w-4/12', 'w-3/12', 'w-2/12', 'w-1/12'];
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Conversion Funnel</h2>
            <div className="flex flex-col items-center space-y-1">
                {funnelData.map((item, index) => {
                    const percentage = item.value / maxValue;
                    const widthClass = widthClasses[Math.floor((1 - percentage) * (widthClasses.length-1))];
                    const conversionRate = index > 0 ? ((item.value / funnelData[index-1].value) * 100).toFixed(1) + '%' : null;

                    return (
                        <div key={item.stage} className="w-full flex flex-col items-center">
                            {conversionRate && (
                                <div className="text-center text-xs my-1 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                    {conversionRate}
                                </div>
                            )}
                             <div className={`${item.color} ${widthClass} text-white text-center py-2 rounded-sm transition-all duration-300 min-w-[100px]`}>
                                <p className="font-bold text-sm">{item.stage}</p>
                                <p className="text-xs">{item.value.toLocaleString()}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

const EngagementHeatmap: React.FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 12 }, (_, i) => `${(i * 2)}h`);
    const opacityLevels = ['opacity-0', 'opacity-20', 'opacity-40', 'opacity-60', 'opacity-80', 'opacity-100'];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Engagement Heatmap</h2>
            <div>
                <div className="flex ml-8">
                    {hours.map(hour => (
                        <div key={hour} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">{hour}</div>
                    ))}
                </div>
                {days.map((day, dayIndex) => (
                    <div key={day} className="flex items-center mt-1">
                        <div className="w-8 text-right text-xs text-gray-500 dark:text-gray-400 pr-1">{day}</div>
                        <div className="flex-1 flex gap-1">
                            {Array.from({ length: 12 }).map((_, hourIndex) => {
                                const value = Math.floor(Math.random() * 100);
                                const opacityClass = opacityLevels[Math.floor((value/100) * (opacityLevels.length - 1))];
                                return (
                                    <div key={`${dayIndex}-${hourIndex}`} className={`flex-1 h-6 rounded-sm bg-primary-500 ${opacityClass}`} title={`${value}% activity`} />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Analytics: React.FC = () => {
    const [compare, setCompare] = useState(false);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Advanced Analytics Dashboard</h1>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                        <input type="date" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                        <select className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>All Countries</option>
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform</label>
                        <select className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>All Platforms</option>
                            <option>Web</option>
                            <option>Mobile App</option>
                        </select>
                    </div>
                    <ToggleSwitch enabled={compare} setEnabled={setCompare} label="Compare Metrics" />
                </div>
            </div>

            {/* Predictive KPI Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PredictiveKpiCard title="Predicted User Growth" value="~1,500" trend="+5.2%" trendDirection="up" />
                <PredictiveKpiCard title="Revenue Forecast (30d)" value="~$18,500" trend="+8.1%" trendDirection="up" />
                <PredictiveKpiCard title="Predicted Session Demand" value="~3,100" trend="-1.5%" trendDirection="down" />
            </div>

             {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <FunnelChart />
                 <EngagementHeatmap />
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cohort Analysis - User Retention</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cohortData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
                            <XAxis dataKey="name" className="text-xs dark:fill-gray-400" />
                            <YAxis unit="%" className="text-xs dark:fill-gray-400" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Jan Cohort" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="Feb Cohort" stroke="#82ca9d" strokeWidth={2} />
                            <Line type="monotone" dataKey="Mar Cohort" stroke="#ffc658" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
