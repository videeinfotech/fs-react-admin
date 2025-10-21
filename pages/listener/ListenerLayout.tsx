import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ListenerSidebar } from '../../components/listener/Sidebar';
import { ListenerNavbar } from '../../components/listener/Navbar';
import { ListenerBottomNav } from '../../components/listener/BottomNav';
import IncomingCallModal from '../../components/listener/IncomingCallModal';

const ListenerLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false); // Set to false by default

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  const handleCallResponse = (accepted: boolean) => {
      setIncomingCall(false);
      // In a real app, you would navigate to the call screen if accepted
  }

  // Demo: show incoming call modal after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => setIncomingCall(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ListenerNavbar toggleSidebar={toggleSidebar} />
      <ListenerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14 pb-20 sm:pb-4">
          <ReactRouterDOM.Outlet />
        </div>
      </div>
      <ListenerBottomNav />
      {incomingCall && <IncomingCallModal user="Riya Sharma" onAccept={() => handleCallResponse(true)} onReject={() => handleCallResponse(false)} />}
    </div>
  );
};

export default ListenerLayout;
