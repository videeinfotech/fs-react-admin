import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the call state and context
interface CallState {
    status: 'idle' | 'calling' | 'in-call' | 'incoming';
    user: { id: string, name: string, avatarUrl: string } | null;
    isMuted: boolean;
    isVideoOn: boolean;
}

interface CallContextType extends CallState {
    startCall: (user: CallState['user'], role: 'user' | 'listener') => void;
    endCall: (role: 'user' | 'listener', sessionId: string) => void;
    acceptCall: (role: 'user' | 'listener') => void;
    rejectCall: () => void;
    setIncomingCall: (user: CallState['user']) => void;
    toggleMute: () => void;
    toggleVideo: () => void;
}

// Create the context
export const CallContext = createContext<CallContextType | undefined>(undefined);

// Create the provider component
export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [callState, setCallState] = useState<CallState>({
        status: 'idle',
        user: null,
        isMuted: false,
        isVideoOn: true,
    });
    const navigate = useNavigate();

    const startCall = useCallback((user: CallState['user'], role: 'user' | 'listener') => {
        setCallState({ status: 'calling', user, isMuted: false, isVideoOn: true });
        navigate(`/${role}/calling/${user.id}`);
    }, [navigate]);

    const endCall = useCallback((role: 'user' | 'listener', sessionId: string) => {
        setCallState({ status: 'idle', user: null, isMuted: false, isVideoOn: true });
        navigate(`/${role}/call-summary/${sessionId}`);
    }, [navigate]);
    
    const acceptCall = useCallback((role: 'user' | 'listener') => {
        setCallState(prev => {
            if (prev.user) {
                navigate(`/${role}/active-call/sess_${prev.user.id}`);
            }
            return { ...prev, status: 'in-call' };
        });
    }, [navigate]);

    const rejectCall = useCallback(() => {
        setCallState({ status: 'idle', user: null, isMuted: false, isVideoOn: true });
    }, []);

    const setIncomingCall = useCallback((user: CallState['user']) => {
        setCallState({ status: 'incoming', user, isMuted: false, isVideoOn: true });
    }, []);

    const toggleMute = useCallback(() => {
        setCallState(prev => ({...prev, isMuted: !prev.isMuted}));
    }, []);
    
    const toggleVideo = useCallback(() => {
        setCallState(prev => ({...prev, isVideoOn: !prev.isVideoOn}));
    }, []);

    const value = {
        ...callState,
        startCall,
        endCall,
        acceptCall,
        rejectCall,
        setIncomingCall,
        toggleMute,
        toggleVideo,
    };

    return (
        <CallContext.Provider value={value}>
            {children}
        </CallContext.Provider>
    );
};

// Custom hook to use the call context
export const useCall = () => {
    const context = useContext(CallContext);
    if (context === undefined) {
        throw new Error('useCall must be used within a CallProvider');
    }
    return context;
};
