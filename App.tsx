import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring'; // New Monitoring Page
import UserDetails from './pages/UserDetails';
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
import LiveSessions from './pages/LiveSessions';
import AdminDoc from './pages/AdminDoc';
import ApiDoc from './pages/ApiDoc';


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
                <Route path="monitoring" element={<Monitoring />} />
                <Route path="users/:id" element={<UserDetails />} />
                <Route path="listeners/:id" element={<ListenerDetails />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="live-sessions" element={<LiveSessions />} />
                <Route path="sessions/:id" element={<SessionDetails />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="tickets/:id" element={<TicketDetails />} />
                <Route path="reports" element={<Reports />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="admin-doc" element={<AdminDoc />} />
                <Route path="api-doc" element={<ApiDoc />} />
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