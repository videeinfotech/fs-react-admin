
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { CallProvider } from './context/CallContext';

import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/AuthGuard';
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
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PushNotifications from './pages/PushNotifications';
import QuizEvaluation from './pages/QuizEvaluation';
import AnonymizedReporting from './pages/AnonymizedReporting';
import AdminDoc from './pages/AdminDoc';
import ApiDoc from './pages/ApiDoc';
import Monitoring from './pages/Monitoring';
import WebsiteCMS from './pages/WebsiteCMS';

import EarningsOverview from './pages/EarningsOverview';
import PayoutCycles from './pages/PayoutCycles';
import ProcessPayouts from './pages/ProcessPayouts';
import PayoutHistory from './pages/PayoutHistory';
import GatewaySettings from './pages/GatewaySettings';

// User App Pages
import UserLayout from './pages/user/UserLayout';
import UserHome from './pages/user/Home';
import FindListener from './pages/user/FindListener';
import UserListenerProfile from './pages/user/ListenerProfile';
import UserChat from './pages/user/Chat';
import UserChats from './pages/user/Chats';
import UserCalls from './pages/user/Calls';
import UserCalling from './pages/user/Calling';
import UserActiveCall from './pages/user/ActiveCall';
import UserCallSummary from './pages/user/CallSummary';
import UserWallet from './pages/user/Wallet';
import UserFeedback from './pages/user/Feedback';
import UserProfile from './pages/user/Profile';

// Listener App Pages
import ListenerLayout from './pages/listener/ListenerLayout';
import ListenerDashboard from './pages/listener/Dashboard';
import ListenerActiveSessions from './pages/listener/ActiveSessions';
import ListenerChat from './pages/listener/Chat';
import ListenerChats from './pages/listener/Chats';
import ListenerCalls from './pages/listener/Calls';
import ListenerActiveCall from './pages/listener/ActiveCall';
import ListenerCallSummary from './pages/listener/CallSummary';
import ListenerEarnings from './pages/listener/Earnings';
import ListenerReviews from './pages/listener/Reviews';
import ListenerQuiz from './pages/listener/Quiz';
import ListenerAnalytics from './pages/listener/Analytics';
import ListenerProfile from './pages/listener/Profile';

import WebsiteLayout from './components/website/WebsiteLayout';
import WebsiteHome from './pages/website/Home';
import About from './pages/website/About';
import WhyChooseUs from './pages/website/WhyChooseUs';
import WebsiteListeners from './pages/website/Listeners';
import HowItWorks from './pages/website/HowItWorks';
import Testimonials from './pages/website/Testimonials';
import Blogs from './pages/website/Blogs';
import BlogDetail from './pages/website/BlogDetail';
import Contact from './pages/website/Contact';
import Careers from './pages/website/Careers';
import LandingPage from './pages/Landing';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

const { Routes, Route, BrowserRouter } = ReactRouterDOM;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <CallProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route path="/website" element={<WebsiteLayout />}>
                  <Route index element={<WebsiteHome />} />
                  <Route path="about" element={<About />} />
                  <Route path="why-choose-us" element={<WhyChooseUs />} />
                  <Route path="listeners" element={<WebsiteListeners />} />
                  <Route path="how-it-works" element={<HowItWorks />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="blogs" element={<Blogs />} />
                  <Route path="blogs/:slug" element={<BlogDetail />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="careers" element={<Careers />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<Terms />} />

                {/* Authenticated Routes */}
                <Route element={<AuthGuard />}>
                  {/* Admin Routes */}
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
                    <Route path="reports" element={<Reports />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="push-notifications" element={<PushNotifications />} />
                    <Route path="quiz-evaluation" element={<QuizEvaluation />} />
                    <Route path="anonymized-reporting" element={<AnonymizedReporting />} />
                    <Route path="admin-doc" element={<AdminDoc />} />
                    <Route path="api-doc" element={<ApiDoc />} />
                    <Route path="monitoring" element={<Monitoring />} />
                    <Route path="website-cms" element={<WebsiteCMS />} />
                    <Route path="earnings-overview" element={<EarningsOverview />} />
                    <Route path="payout-cycles" element={<PayoutCycles />} />
                    <Route path="process-payouts" element={<ProcessPayouts />} />
                    <Route path="payout-history" element={<PayoutHistory />} />
                    <Route path="gateway-settings" element={<GatewaySettings />} />
                  </Route>
                  
                  {/* User Routes */}
                  <Route path="/user" element={<UserLayout />}>
                      <Route index element={<UserHome />} />
                      <Route path="home" element={<UserHome />} />
                      <Route path="find" element={<FindListener />} />
                      <Route path="listener/:id" element={<UserListenerProfile />} />
                      <Route path="chats" element={<UserChats />} />
                      <Route path="chat/:sessionId" element={<UserChat />} />
                      <Route path="calls" element={<UserCalls />} />
                      <Route path="calling/:listenerId" element={<UserCalling />} />
                      <Route path="active-call/:sessionId" element={<UserActiveCall />} />
                      <Route path="call-summary/:sessionId" element={<UserCallSummary />} />
                      <Route path="wallet" element={<UserWallet />} />
                      <Route path="feedback/:sessionId" element={<UserFeedback />} />
                      <Route path="profile" element={<UserProfile />} />
                  </Route>

                  {/* Listener Routes */}
                  <Route path="/listener" element={<ListenerLayout />}>
                    <Route index element={<ListenerDashboard />} />
                    <Route path="dashboard" element={<ListenerDashboard />} />
                    <Route path="sessions" element={<ListenerActiveSessions />} />
                    <Route path="chats" element={<ListenerChats />} />
                    <Route path="chat/:sessionId" element={<ListenerChat />} />
                    <Route path="calls" element={<ListenerCalls />} />
                    <Route path="active-call/:sessionId" element={<ListenerActiveCall />} />
                    <Route path="call-summary/:sessionId" element={<ListenerCallSummary />} />
                    <Route path="earnings" element={<ListenerEarnings />} />
                    <Route path="reviews" element={<ListenerReviews />} />
                    <Route path="quiz" element={<ListenerQuiz />} />
                    <Route path="analytics" element={<ListenerAnalytics />} />
                    <Route path="profile" element={<ListenerProfile />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </CallProvider>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
