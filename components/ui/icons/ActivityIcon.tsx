import React from 'react';
import { IconProps } from './Icon';

export const ActivityIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h3l2.25 9h3.75l2.25-15h3l2.25 6h3" />
    </svg>
);