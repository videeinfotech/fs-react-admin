
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Listeners from './pages/Listeners';
import ListenerDetails from './pages/ListenerDetails';
import Wallet from './pages/Wallet';
import Sessions from './pages/Sessions';
import SessionDetails from './pages/SessionDetails';
import Feedback from './pages/Feedback';
import Tickets from './pages/Tickets';
import TicketDetails from './pages/TicketDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import CMS from './pages/CMS';
import Notifications from './pages/Notifications';
import Roles from './pages/Roles';
import AuditLogs from './pages/AuditLogs';
import Analytics from './pages/Analytics';


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserDetails />} />
                <Route path="listeners" element={<Listeners />} />
                <Route path="listeners/:id" element={<ListenerDetails />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="sessions/:id" element={<SessionDetails />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="tickets/:id" element={<TicketDetails />} />
                <Route path="reports" element={<Reports />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                {/* Adding some other placeholder routes for completeness */}
                <Route path="cms" element={<CMS />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="roles" element={<Roles />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
