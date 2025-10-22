import React from 'react';
import { IconProps } from './Icon';

export const WebsiteIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12a9.75 9.75 0 0115.65-8.01M2.25 12a9.75 9.75 0 0015.65 8.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M3.283 8.727h17.434" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.283 15.273h17.434" />
    </svg>
);