
import React from 'react';
import { DataTable } from '../components/ui/DataTable';
import { Feedback as FeedbackType } from '../types';

export const mockFeedback: FeedbackType[] = [
    { id: 1, user: 'John Doe', listener: 'Alice Johnson', rating: 5, comment: 'Alice was amazing!', date: '2023-10-25' },
    { id: 2, user: 'Jane Smith', listener: 'Alice Johnson', rating: 4, comment: 'Very helpful session.', date: '2023-10-24' },
    // Add more mock feedback
];

const Feedback: React.FC = () => {
    const columns = [
        { header: 'User', accessor: 'user' as keyof FeedbackType, sortable: true },
        { header: 'Listener', accessor: 'listener' as keyof FeedbackType, sortable: true },
        { header: 'Rating', accessor: 'rating' as keyof FeedbackType, sortable: true },
        { header: 'Comment', accessor: 'comment' as keyof FeedbackType, sortable: false },
        { header: 'Date', accessor: 'date' as keyof FeedbackType, sortable: true },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Feedback</h1>
            <DataTable columns={columns} data={mockFeedback} />
        </div>
    );
};

export default Feedback;
