import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthGuard } from './components/AuthGuard';

// Layouts
import { Layout } from './components/layout/Layout';
import { UserLayout } from './pages/user/UserLayout';
import ListenerLayout from './pages/listener/ListenerLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import ListenersList from './pages/ListenersList';
import ListenerDetails from './pages/ListenerDetails';
import Wallet from './pages/Wallet';
import Sessions from './pages/Sessions';
import SessionDetails from './pages/SessionDetails';
import LiveSessions from './pages/LiveSessions';
import Feedback from './pages/Feedback';
import Tickets from './pages/Tickets';
import TicketDetails from './pages/TicketDetails';
import AnonymizedReporting from './pages/AnonymizedReporting';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Monitoring from './pages/Monitoring';
import PushNotifications from './pages/PushNotifications';
import QuizEvaluation from './pages/QuizEvaluation';
import Settings from './pages/Settings';
import AdminDoc from './pages/AdminDoc';
import ApiDoc from './pages/ApiDoc';
import LandingPage from './pages/Landing';
import NotFound from './pages/NotFound';

// User App Pages
import UserHome from './pages/user/Home';
import FindListener from './pages/user/FindListener';
import UserListenerProfile from './pages/user/ListenerProfile';
import UserChats from './pages/user/Chats';
import UserChat from './pages/user/Chat';
import UserCalls from './pages/user/Calls';
import UserWallet from './pages/user/Wallet';
import UserProfile from './pages/user/Profile';
import UserFeedback from './pages/user/Feedback';
import UserCalling from './pages/user/Calling';
import UserActiveCall from './pages/user/ActiveCall';
import UserCallSummary from './pages/user/CallSummary';


// Listener App Pages
import ListenerDashboard from './pages/listener/Dashboard';
import ListenerActiveSessions from './pages/listener/ActiveSessions';
import ListenerChats from './pages/listener/Chats';
import ListenerChat from './pages/listener/Chat';
import ListenerCalls from './pages/listener/Calls';
import ListenerEarnings from './pages/listener/Earnings';
import ListenerReviews from './pages/listener/Reviews';
import ListenerQuiz from './pages/listener/Quiz';
import ListenerAnalytics from './pages/listener/Analytics';
import ListenerProfile from './pages/listener/Profile';
import ListenerSettings from './pages/listener/Settings';
import ListenerActiveCall from './pages/listener/ActiveCall';
import ListenerCallSummary from './pages/listener/CallSummary';


// Payouts
import EarningsOverview from './pages/EarningsOverview';
import PayoutCycles from './pages/PayoutCycles';
import ProcessPayouts from './pages/ProcessPayouts';
import PayoutHistory from './pages/PayoutHistory';
import GatewaySettings from './pages/GatewaySettings';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              
              {/* Authenticated Routes */}
              <Route element={<AuthGuard />}>
                {/* Admin Panel */}
                <Route path="/admin" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<UsersList />} />
                  <Route path="users/:id" element={<UserDetails />} />
                  <Route path="listeners" element={<ListenersList />} />
                  <Route path="listeners/:id" element={<ListenerDetails />} />
                  <Route path="wallet" element={<Wallet />} />
                  <Route path="sessions" element={<Sessions />} />
                  <Route path="sessions/:id" element={<SessionDetails />} />
                  <Route path="live-sessions" element={<LiveSessions />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="tickets" element={<Tickets />} />
                  <Route path="tickets/:id" element={<TicketDetails />} />
                  <Route path="anonymized-reporting" element={<AnonymizedReporting />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="monitoring" element={<Monitoring />} />
                  <Route path="push-notifications" element={<PushNotifications />} />
                  <Route path="quiz-evaluation" element={<QuizEvaluation />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="admin-doc" element={<AdminDoc />} />
                  <Route path="api-doc" element={<ApiDoc />} />
                   {/* Payout Management */}
                  <Route path="earnings-overview" element={<EarningsOverview />} />
                  <Route path="payout-cycles" element={<PayoutCycles />} />
                  <Route path="process-payouts" element={<ProcessPayouts />} />
                  <Route path="payout-history" element={<PayoutHistory />} />
                  <Route path="gateway-settings" element={<GatewaySettings />} />
                </Route>

                {/* User App */}
                <Route path="/user" element={<UserLayout />}>
                   <Route index element={<UserHome />} />
                   <Route path="home" element={<Navigate to="/user" replace />} />
                   <Route path="find" element={<FindListener />} />
                   <Route path="listener/:id" element={<UserListenerProfile />} />
                   <Route path="chats" element={<UserChats />} />
                   <Route path="chat/:sessionId" element={<UserChat />} />
                   <Route path="calls" element={<UserCalls />} />
                   <Route path="calling/:listenerId" element={<UserCalling />} />
                   <Route path="call/:sessionId" element={<UserActiveCall />} />
                   <Route path="call-summary/:sessionId" element={<UserCallSummary />} />
                   <Route path="wallet" element={<UserWallet />} />
                   <Route path="profile" element={<UserProfile />} />
                   <Route path="feedback/:sessionId" element={<UserFeedback />} />
                </Route>

                 {/* Listener App */}
                <Route path="/listener" element={<ListenerLayout />}>
                    <Route index element={<ListenerDashboard />} />
                    <Route path="dashboard" element={<Navigate to="/listener" replace />} />
                    <Route path="sessions" element={<ListenerActiveSessions />} />
                    <Route path="chats" element={<ListenerChats />} />
                    <Route path="chat/:sessionId" element={<ListenerChat />} />
                    <Route path="calls" element={<ListenerCalls />} />
                    <Route path="call/:sessionId" element={<ListenerActiveCall />} />
                    <Route path="call-summary/:sessionId" element={<ListenerCallSummary />} />
                    <Route path="earnings" element={<ListenerEarnings />} />
                    <Route path="reviews" element={<ListenerReviews />} />
                    <Route path="quiz" element={<ListenerQuiz />} />
                    <Route path="analytics" element={<ListenerAnalytics />} />
                    <Route path="profile" element={<ListenerProfile />} />
                    <Route path="settings" element={<ListenerSettings />} />
                </Route>

              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
