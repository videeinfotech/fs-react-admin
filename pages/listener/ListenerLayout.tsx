import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ListenerSidebar } from '../../components/listener/Sidebar';
import { ListenerNavbar } from '../../components/listener/Navbar';
import IncomingCallModal from '../../components/listener/IncomingCallModal';
import { useCall } from '../../context/CallContext';
import { mockUsers } from '../Users';

const ListenerLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { status, user, acceptCall, rejectCall, setIncomingCall } = useCall();
  const navigate = ReactRouterDOM.useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  // Simulate an incoming call for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
        if (status === 'idle') {
            setIncomingCall({ id: mockUsers[0].id.toString(), name: mockUsers[0].name, avatarUrl: `https://i.pravatar.cc/150?u=${mockUsers[0].id}` });
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
    <div>
      {status === 'incoming' && user && (
          <IncomingCallModal 
              user={user.name}
              onAccept={handleAccept}
              onReject={handleReject}
          />
      )}
      <ListenerNavbar toggleSidebar={toggleSidebar} />
      <ListenerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <ReactRouterDOM.Outlet />
        </div>
      </div>
    </div>
  );
};

export default ListenerLayout;
