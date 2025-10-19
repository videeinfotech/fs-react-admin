
import React from 'react';
import { IconProps } from './Icon';

export const WalletIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.248a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.248V12m18 0-3.662-3.662A2.25 2.25 0 0013.896 7.5H10.104a2.25 2.25 0 00-1.591.659L4.843 11.843m12.314 0l-3.662-3.662" />
    </svg>
);
