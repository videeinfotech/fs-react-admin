import React, { useState, useMemo } from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" error.
import * as ReactRouterDOM from 'react-router-dom';
import { DataTable } from '../components/ui/DataTable';
import { AnonymousReport } from '../types';
import { useToast } from '../hooks/useToast';

const mockReports: AnonymousReport[] = [
    { id: 1, listenerId: 1, listenerName: 'Alice Johnson', reason: 'Inappropriate Language', details: 'The listener used profane and unprofessional language during our session. It made me very uncomfortable.', date: '2023-10-28', status: 'New' },
    { id: 2, listenerId: 2, listenerName: 'Bob Williams', reason: 'Unprofessional Conduct', details: 'The listener seemed distracted and was typing loudly throughout the call. They did not seem to be paying attention to me.', date: '2023-10-27', status: 'Under Review' },
    { id: 3, listenerId: 1, listenerName: 'Alice Johnson', reason: 'Safety Concern', details: 'The listener asked for personal information that was not relevant to the session, including my home address.', date: '2023-10-26', status: 'Resolved' },
    { id: 4, listenerId: 3, listenerName: 'Charles Davis', reason: 'Other', details: 'The listener ended the session abruptly without any explanation.', date: '2023-10-25', status: 'Dismissed' },
];

const StatusBadge: React.FC<{ status: AnonymousReport['status'] }> = ({ status }) => {
    const statusClasses = {
        'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Dismissed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const AnonymizedReporting: React.FC = () => {
    const { addToast } = useToast();
    const [reports, setReports] = useState<AnonymousReport[]>(mockReports);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<AnonymousReport | null>(null);

    const columns = useMemo(() => [
        { header: 'Report ID', accessor: 'id' as keyof AnonymousReport, sortable: true },
        { header: 'Listener', accessor: 'listenerName' as keyof AnonymousReport, sortable: true, render: (item: AnonymousReport) => <ReactRouterDOM.Link to={`/admin/listeners/${item.listenerId}`} className="text-primary-600 hover:underline">{item.listenerName}</ReactRouterDOM.Link> },
        { header: 'Reason', accessor: 'reason' as keyof AnonymousReport, sortable: true },
        { header: 'Date', accessor: 'date' as keyof AnonymousReport, sortable: true },
        { header: 'Status', accessor: 'status' as keyof AnonymousReport, sortable: true, render: (item: AnonymousReport) => <StatusBadge status={item.status} /> },
    ], []);

    const handleViewDetails = (report: AnonymousReport) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const updateReportStatus = (reportId: number, status: AnonymousReport['status']) => {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
        addToast(`Report #${reportId} status updated to "${status}"`, 'success');
        if (selectedReport?.id === reportId) {
            setSelectedReport(prev => prev ? { ...prev, status } : null);
        }
    };
    
    const renderActions = (report: AnonymousReport) => (
        <div className="space-x-2">
            <button onClick={() => handleViewDetails(report)} className="text-primary-600 hover:underline">View Details</button>
            {report.status === 'New' && <button onClick={() => updateReportStatus(report.id, 'Under Review')} className="text-yellow-600 hover:underline">Review</button>}
        </div>
    );
    
    const ReportDetailsModal = () => {
        if (!selectedReport) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
                    <div className="p-6 border-b dark:border-gray-700">
                        <h3 className="text-xl font-bold">Report Details: #{selectedReport.id}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Report against <ReactRouterDOM.Link to={`/admin/listeners/${selectedReport.listenerId}`} className="font-semibold text-primary-600 hover:underline">{selectedReport.listenerName}</ReactRouterDOM.Link></p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><strong>Reason:</strong> {selectedReport.reason}</div>
                        <div><strong>Date:</strong> {selectedReport.date}</div>
                        <div><strong>Status:</strong> <StatusBadge status={selectedReport.status} /></div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                            <h4 className="font-semibold mb-2">Anonymous User Report:</h4>
                            <p className="text-gray-700 dark:text-gray-300 italic">"{selectedReport.details}"</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-2 rounded-b-lg">
                         <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Close</button>
                         {selectedReport.status !== 'Resolved' && <button onClick={() => { updateReportStatus(selectedReport.id, 'Resolved'); setIsModalOpen(false); }} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Mark as Resolved</button>}
                         {selectedReport.status !== 'Dismissed' && <button onClick={() => { updateReportStatus(selectedReport.id, 'Dismissed'); setIsModalOpen(false); }} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Dismiss Report</button>}
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Anonymized Reporting & Moderation</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and manage reports submitted by users regarding listener conduct. All user information is kept anonymous.</p>
            
            <DataTable 
                columns={columns}
                data={reports}
                renderActions={renderActions}
            />
            
            {isModalOpen && <ReportDetailsModal />}
        </div>
    );
};

export default AnonymizedReporting;