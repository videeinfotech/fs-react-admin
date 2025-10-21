import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ListenerSidebar } from '../../components/listener/Sidebar';
import { ListenerNavbar } from '../../components/listener/Navbar';
import IncomingCallModal from '../../components/listener/IncomingCallModal';
import { useCall } from '../../context/CallContext';
import { mockUsers } from '../Users';
import FloatingCallWidget from '../../components/FloatingCallWidget';
import { ListenerBottomNav } from '../../components/listener/BottomNav';

const ListenerLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { status, user, acceptCall, rejectCall, setIncomingCall } = useCall();
  const isCallActive = status === 'in-call';

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  // Simulate an incoming call for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
        if (status === 'idle') {
            const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
            setIncomingCall({ id: randomUser.id.toString(), name: randomUser.name, avatarUrl: `https://i.pravatar.cc/150?u=${randomUser.id}` });
        }
    }, 5000); // Incoming call after 5 seconds

    return () => clearTimeout(timer);
  }, [status, setIncomingCall]);

  const handleAccept = () => {
    acceptCall('listener');
  };

  const handleReject = () => {
    rejectCall();
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {status === 'incoming' && user && (
          <IncomingCallModal 
              user={user.name}
              onAccept={handleAccept}
              onReject={handleReject}
          />
      )}
      <ListenerNavbar toggleSidebar={toggleSidebar} />
      <ListenerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`p-4 sm:ml-64 ${isCallActive ? 'pb-36' : 'pb-20'}`}>
        <div className="p-0 sm:p-4 mt-14">
          <ReactRouterDOM.Outlet />
        </div>
      </div>
       <FloatingCallWidget />
       <ListenerBottomNav />
    </div>
  );
};

export default ListenerLayout;