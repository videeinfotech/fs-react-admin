import React from 'react';

const FeatureCard: React.FC<{ title: string; children: React.ReactNode; prompt: string }> = ({ title, children, prompt }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            {children}
        </div>
        <details>
            <summary className="cursor-pointer font-semibold text-primary-600 hover:text-primary-700">View Generative Prompt</summary>
            <blockquote className="mt-4 p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {prompt}
            </blockquote>
        </details>
    </div>
);


const AdminDoc: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Panel Documentation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                This document outlines the features of the Find Sukoon Admin Panel and the prompts used to generate them.
            </p>

            <FeatureCard title="Wallet & Transactions Page" prompt={`Purpose: Oversee all financial transactions and manual wallet controls.
Design elements:

Tabs:
All Transactions
Credits
Debits
Refunds

Table columns:
Transaction ID, User/Listener, Amount, Type, Method, Status, Date

Search bar + filters (Date, Type, Status)

“Manual Adjustment” button → opens modal to credit/debit wallet

Transaction summary cards (total inflow, outflow, net revenue)`}>
                <ul className="list-disc list-inside">
                    <li>Displays summary cards for total inflow, outflow, and net revenue.</li>
                    <li>Organizes transactions into tabs: All, Credits, Debits, and Refunds.</li>
                    <li>Includes a data table with sortable columns for all transaction details.</li>
                    <li>Features a "Manual Adjustment" button to credit or debit user wallets via a modal.</li>
                    <li>Provides search and filter functionality by user/ID, transaction type, and status.</li>
                </ul>
            </FeatureCard>
            
            <FeatureCard title="Live Sessions Page" prompt={`Purpose: Track and control chat/voice/video sessions in real time.
Design elements:

Table: Session ID, User, Listener, Type (Chat/Voice/Video), Duration, Cost, Status

Filter: Active / Completed / Disconnected

“End Session” button for live sessions

Side detail panel: chat log preview, rating, call cost summary

Visual timeline for session activity`}>
                <ul className="list-disc list-inside">
                    <li>Real-time table of all ongoing and completed sessions.</li>
                    <li>Ability to filter sessions by status (Ongoing, Completed, Cancelled).</li>
                    <li>Admin capability to terminate an active session with an "End Session" button.</li>
                    <li>A detailed side panel that appears on session selection, showing cost, timeline, and chat logs.</li>
                    <li>Visual icons and status pills for quick identification of session type and status.</li>
                </ul>
            </FeatureCard>

             <FeatureCard title="Reports Dashboard" prompt={`reports Main Dashboard Cards:
🧍 Total Users
🎧 Total Listeners (Coaches)
💬 Total Sessions (Chat + Call)
💵 Total Revenue (Last 30 Days)
⭐ Average User Rating

Charts Section:
User Growth Graph — line chart of new users per day/week
Revenue Over Time — area or bar chart (toggle between users/listeners)
Top Performing Listeners — leaderboard table or horizontal bar chart
Session Volume Chart — stacked bar (Chat, Voice, Video breakdown)
Payment Sources — pie chart (Razorpay, PhonePe, PayPal, Payoneer share)

Tables Section:
Recent Transactions Table:
Columns → Transaction ID, User/Listener, Gateway, Amount, Date, Status`}>
                 <ul className="list-disc list-inside">
                    <li>Key metric cards for a quick overview of users, listeners, sessions, revenue, and ratings.</li>
                    <li>A variety of charts to visualize data including user growth, revenue, top listeners, session volume, and payment sources.</li>
                    <li>Powered by the \`recharts\` library for interactive and responsive data visualization.</li>
                    <li>A table displaying recent transactions for immediate review.</li>
                </ul>
            </FeatureCard>

            <FeatureCard title="Settings Page" prompt={`Settings Section (Admin Panel Design)
🎯 Purpose:
To manage all technical, operational, and financial configurations from one unified settings interface.

🧭 Design Structure:
Tabbed layout with the following sections:
General Settings
Payment Gateways
System Configurations
Security Settings

... (Detailed field descriptions for General and Payment Gateways)`}>
                <ul className="list-disc list-inside">
                    <li>A unified, tabbed interface for all platform configurations.</li>
                    <li><strong>General Settings:</strong> Manage platform name, call rates, currency, and contact information.</li>
                    <li><strong>Payment Gateways:</strong> Configure integrations for PhonePe, Razorpay, PayPal, and Payoneer with dedicated cards and fields.</li>
                </ul>
            </FeatureCard>

             <FeatureCard title="System Configuration Tab" prompt={`⚙️ 3. System Configuration Tab

Fields:
API Base URL
Frontend URL
SMTP Settings (Email Sending)
Host, Port, Username, Password, Encryption Type
Firebase Config Inputs (for notification integration)
Agora Keys (App ID, Certificate)
Supabase Credentials (optional, for analytics sync)
File Storage Path or Cloud Bucket Config (MinIO / S3)`}>
                 <ul className="list-disc list-inside">
                    <li>A dedicated tab within Settings for technical configurations.</li>
                    <li>Fields to manage core URLs, SMTP for email, Firebase for notifications, and Agora for real-time communication.</li>
                    <li>Inputs for configuring file storage solutions like Amazon S3.</li>
                </ul>
            </FeatureCard>

        </div>
    );
};

export default AdminDoc;