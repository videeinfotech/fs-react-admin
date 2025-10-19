import React from 'react';
import { IconProps } from './Icon';

export const QuizIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.557l5.603-3.113a.375.375 0 01.557.557z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25a.75.75 0 01.75-.75H13.5a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.75a.75.75 0 01.75-.75H13.5a.75.75 0 010 1.5H13.5a.75.75 0 01-.75-.75z" />
    </svg>
);
