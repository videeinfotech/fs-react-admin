
import React from 'react';
// FIX: Changed react-router-dom import to use namespace import to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring'; // New Monitoring Page
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import ListenersList from './pages/ListenersList';
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
import PushNotifications from './pages/PushNotifications'; // New Push Notifications page
import Roles from './pages/Roles';
import AuditLogs from './pages/AuditLogs';
import Analytics from './pages/Analytics';
import LiveSessions from './pages/LiveSessions';
import AdminDoc from './pages/AdminDoc';
import ApiDoc from './pages/ApiDoc';
import QuizEvaluation from './pages/QuizEvaluation';
import AnonymizedReporting from './pages/AnonymizedReporting';

// Payout Management Pages
import EarningsOverview from './pages/EarningsOverview';
import PayoutCycles from './pages/PayoutCycles';
import ProcessPayouts from './pages/ProcessPayouts';
import PayoutHistory from './pages/PayoutHistory';
import GatewaySettings from './pages/GatewaySettings';


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ReactRouterDOM.BrowserRouter>
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/login" element={<Login />} />
            <ReactRouterDOM.Route element={<ProtectedRoute />}>
              <ReactRouterDOM.Route path="/" element={<Layout />}>
                <ReactRouterDOM.Route index element={<Dashboard />} />
                <ReactRouterDOM.Route path="monitoring" element={<Monitoring />} />
                <ReactRouterDOM.Route path="users" element={<UsersList />} />
                <ReactRouterDOM.Route path="users/:id" element={<UserDetails />} />
                <ReactRouterDOM.Route path="listeners" element={<ListenersList />} />
                <ReactRouterDOM.Route path="listeners/:id" element={<ListenerDetails />} />
                <ReactRouterDOM.Route path="wallet" element={<Wallet />} />
                <ReactRouterDOM.Route path="sessions" element={<Sessions />} />
                <ReactRouterDOM.Route path="live-sessions" element={<LiveSessions />} />
                <ReactRouterDOM.Route path="sessions/:id" element={<SessionDetails />} />
                {/* Payout Routes */}
                <ReactRouterDOM.Route path="earnings-overview" element={<EarningsOverview />} />
                <ReactRouterDOM.Route path="payout-cycles" element={<PayoutCycles />} />
                <ReactRouterDOM.Route path="process-payouts" element={<ProcessPayouts />} />
                <ReactRouterDOM.Route path="payout-history" element={<PayoutHistory />} />
                <ReactRouterDOM.Route path="gateway-settings" element={<GatewaySettings />} />
                
                <ReactRouterDOM.Route path="feedback" element={<Feedback />} />
                <ReactRouterDOM.Route path="anonymized-reporting" element={<AnonymizedReporting />} />
                <ReactRouterDOM.Route path="tickets" element={<Tickets />} />
                <ReactRouterDOM.Route path="tickets/:id" element={<TicketDetails />} />
                <ReactRouterDOM.Route path="reports" element={<Reports />} />
                <ReactRouterDOM.Route path="analytics" element={<Analytics />} />
                <ReactRouterDOM.Route path="push-notifications" element={<PushNotifications />} />
                <ReactRouterDOM.Route path="quiz-evaluation" element={<QuizEvaluation />} />
                <ReactRouterDOM.Route path="admin-doc" element={<AdminDoc />} />
                <ReactRouterDOM.Route path="api-doc" element={<ApiDoc />} />
                <ReactRouterDOM.Route path="settings" element={<Settings />} />
                {/* Adding some other placeholder routes for completeness */}
                <ReactRouterDOM.Route path="cms" element={<CMS />} />
                <ReactRouterDOM.Route path="roles" element={<Roles />} />
                <ReactRouterDOM.Route path="audit-logs" element={<AuditLogs />} />
                <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" replace />} />
              </ReactRouterDOM.Route>
            </ReactRouterDOM.Route>
          </ReactRouterDOM.Routes>
        </ReactRouterDOM.BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
