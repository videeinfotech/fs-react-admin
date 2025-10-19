
import React from 'react';
import { IconProps } from './Icon';

export const ListenersIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 8.634c.328.16.64.333.944.512m-9.118 0a48.243 48.243 0 01-1.12 9.15c-1.316.32-2.684.52-4.1.52H4.88c-1.18 0-2.28-.24-3.29-.684m14.536-9.15c-.328-.16-.64-.333-.944-.512m6.082 3.064a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3 3 0 00-3-3h-1.5a3 3 0 00-3 3v4.5A3 3 0 009.75 15h1.5a3 3 0 003-3v-4.5z" />
    </svg>
);
