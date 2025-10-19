import React from 'react';
import { DashboardIcon } from './components/ui/icons/DashboardIcon';
import { UsersIcon } from './components/ui/icons/UsersIcon';
import { ListenersIcon } from './components/ui/icons/ListenersIcon';
import { WalletIcon } from './components/ui/icons/WalletIcon';
import { IconProps } from './components/ui/icons/Icon';
import { AnalyticsIcon } from './components/ui/icons/AnalyticsIcon';
import { LiveIcon } from './components/ui/icons/LiveIcon';
import { DocIcon } from './components/ui/icons/DocIcon';
import { ApiIcon } from './components/ui/icons/ApiIcon';

// A helper type for nav links
export interface NavLinkInfo {
    name: string;
    path: string;
    icon: React.ReactElement<IconProps>;
}

// These icons need to be defined or imported
const SessionsIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FeedbackIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
const TicketsIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-1.5m0 0h-2.25m13.5 0h-2.25m0 0h-5.25m0 0h-2.25m7.5 0h3.75M3 6h18M3 12h18M3 18h18" /></svg>;
const ReportsIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg>;
const SettingsIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.55-.22 1.156-.22 1.706 0 .55.219 1.02.684 1.11 1.226l.094.542c.065.38.233.74.485 1.045.252.305.587.545.955.71l.555.25c.62.28 1.13.82 1.34 1.48l.093.298c.133.424.133.878 0 1.302l-.093.298c-.21.66-.72 1.2-1.34 1.48l-.555.25c-.368.165-.693.405-.955.71-.252.305-.42.665-.485 1.045l-.094-.542c-.09.542-.56 1.007-1.11 1.226-.55.22-1.156-.22-1.706 0-.55-.219-1.02-.684-1.11-1.226l-.094-.542c-.065-.38-.233-.74-.485-1.045-.252-.305-.587-.545-.955-.71l-.555-.25c-.62-.28-1.13-.82-1.34-1.48l-.093-.298c-.133-.424-.133-.878 0-1.302l.093-.298c.21-.66.72-1.2 1.34-1.48l.555.25c.368.165.693.405.955.71.252.305.42-.665.485 1.045l.094-.542z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export const NAV_LINKS: NavLinkInfo[] = [
    { name: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { name: 'Users', path: '/users', icon: <UsersIcon /> },
    { name: 'Listeners', path: '/listeners', icon: <ListenersIcon /> },
    { name: 'Wallet', path: '/wallet', icon: <WalletIcon /> },
    { name: 'Sessions', path: '/sessions', icon: <SessionsIcon /> },
    { name: 'Live Sessions', path: '/live-sessions', icon: <LiveIcon /> },
    { name: 'Feedback', path: '/feedback', icon: <FeedbackIcon /> },
    { name: 'Support Tickets', path: '/tickets', icon: <TicketsIcon /> },
    { name: 'Reports', path: '/reports', icon: <ReportsIcon /> },
    { name: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
    { name: 'Admin Doc', path: '/admin-doc', icon: <DocIcon /> },
    { name: 'API Doc', path: '/api-doc', icon: <ApiIcon /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];