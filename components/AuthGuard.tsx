import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthGuard: React.FC = () => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = ReactRouterDOM.useLocation();

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );
  }

  if (!isAuthenticated) {
    return <ReactRouterDOM.Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, now check if they are on the right path
  const pathPrefix = location.pathname.split('/')[1]; // 'admin', 'user', 'listener'
  const rolePrefixes = ['admin', 'user', 'listener'];

  // If the user is trying to access a role-specific area that doesn't match their role, redirect them.
  if (rolePrefixes.includes(pathPrefix) && pathPrefix !== role) {
    const redirectTo = role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/listener';
    return <ReactRouterDOM.Navigate to={redirectTo} replace />;
  }

  // Role matches path or it's a generic authenticated route, so allow access.
  return <ReactRouterDOM.Outlet />;
};
