import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// --- Layouts ---
import { Layout as AdminLayout } from './components/layout/Layout';
import { UserLayout } from './pages/user/UserLayout';
import { ListenerLayout } from './pages/listener/ListenerLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// --- Main Pages ---
import LandingPage from './pages/Landing';
import Login from './pages/Login';

// --- Admin Pages ---
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
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
import PushNotifications from './pages/PushNotifications';
import Analytics from './pages/Analytics';
import LiveSessions from './pages/LiveSessions';
import AdminDoc from './pages/AdminDoc';
import ApiDoc from './pages/ApiDoc';
import QuizEvaluation from './pages/QuizEvaluation';
import AnonymizedReporting from './pages/AnonymizedReporting';
import EarningsOverview from './pages/EarningsOverview';
import PayoutCycles from './pages/PayoutCycles';
import ProcessPayouts from './pages/ProcessPayouts';
import PayoutHistory from './pages/PayoutHistory';
import GatewaySettings from './pages/GatewaySettings';

// --- User App Pages ---
import UserHome from './pages/user/Home';
import FindListener from './pages/user/FindListener';
import UserListenerProfile from './pages/user/ListenerProfile';
import UserChat from './pages/user/Chat';
import UserActiveCall from './pages/user/Call';
import UserWallet from './pages/user/Wallet';
import UserFeedback from './pages/user/Feedback';
import UserJournal from './pages/user/Journal';
import UserSettings from './pages/user/Settings';
import UserProfile from './pages/user/Profile';
import UserChats from './pages/user/Chats';
import UserCalls from './pages/user/Calls';

// --- Listener App Pages ---
import ListenerDashboard from './pages/listener/Dashboard';
import ListenerActiveSessions from './pages/listener/ActiveSessions';
import ListenerEarnings from './pages/listener/Earnings';
import ListenerReviews from './pages/listener/Reviews';
import ListenerQuiz from './pages/listener/Quiz';
import ListenerAnalytics from './pages/listener/Analytics';
import ListenerActiveChat from './pages/listener/Chat';
import ListenerProfile from './pages/listener/Profile';
import ListenerChats from './pages/listener/Chats';
import ListenerCalls from './pages/listener/Calls';


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ReactRouterDOM.BrowserRouter>
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/login" element={<Login />} />
            <ReactRouterDOM.Route path="/" element={<LandingPage />} />
            
            {/* USER APP ROUTES */}
            <ReactRouterDOM.Route path="/user" element={<UserLayout />}>
              <ReactRouterDOM.Route index element={<UserHome />} />
              <ReactRouterDOM.Route path="find" element={<FindListener />} />
              <ReactRouterDOM.Route path="listener/:id" element={<UserListenerProfile />} />
              <ReactRouterDOM.Route path="chat/:sessionId" element={<UserChat />} />
              <ReactRouterDOM.Route path="active-call/:sessionId" element={<UserActiveCall />} />
              <ReactRouterDOM.Route path="wallet" element={<UserWallet />} />
              <ReactRouterDOM.Route path="feedback/:sessionId" element={<UserFeedback />} />
              <ReactRouterDOM.Route path="journal" element={<UserJournal />} />
              <ReactRouterDOM.Route path="settings" element={<UserSettings />} />
              <ReactRouterDOM.Route path="profile" element={<UserProfile />} />
              <ReactRouterDOM.Route path="chats" element={<UserChats />} />
              <ReactRouterDOM.Route path="calls" element={<UserCalls />} />
            </ReactRouterDOM.Route>

            {/* LISTENER APP ROUTES */}
             <ReactRouterDOM.Route path="/listener" element={<ListenerLayout />}>
                <ReactRouterDOM.Route index element={<ListenerDashboard />} />
                <ReactRouterDOM.Route path="sessions" element={<ListenerActiveSessions />} />
                <ReactRouterDOM.Route path="chat/:sessionId" element={<ListenerActiveChat />} />
                <ReactRouterDOM.Route path="earnings" element={<ListenerEarnings />} />
                <ReactRouterDOM.Route path="reviews" element={<ListenerReviews />} />
                <ReactRouterDOM.Route path="quiz" element={<ListenerQuiz />} />
                <ReactRouterDOM.Route path="analytics" element={<ListenerAnalytics />} />
                <ReactRouterDOM.Route path="profile" element={<ListenerProfile />} />
                <ReactRouterDOM.Route path="chats" element={<ListenerChats />} />
                <ReactRouterDOM.Route path="calls" element={<ListenerCalls />} />
             </ReactRouterDOM.Route>

            {/* ADMIN APP ROUTES */}
            <ReactRouterDOM.Route element={<ProtectedRoute />}>
              <ReactRouterDOM.Route path="/admin" element={<AdminLayout />}>
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
                <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/admin" replace />} />
              </ReactRouterDOM.Route>
            </ReactRouterDOM.Route>

          </ReactRouterDOM.Routes>
        </ReactRouterDOM.BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;