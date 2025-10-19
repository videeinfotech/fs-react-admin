export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Suspended' | 'Deleted';
  createdAt: string;
  lastLogin: string;
  address: Address;
  wallet: number;
  totalSessions: number;
  totalSpent: number;
}

export interface Listener {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Pending' | 'Blocked';
  avgRating: number;
  totalSessions: number;
  totalEarnings: number;
  rate: number;
  createdAt: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
  language: string[];
  dob: string;
  age: number;
  city: string;
}

export interface TranscriptMessage {
  sender: string;
  message: string;
  timestamp: string;
}

export interface Session {
  id: string;
  user: string;
  userId: number;
  listener: string;
  listenerId: number;
  type: 'Chat' | 'Call' | 'Video';
  status: 'Completed' | 'Ongoing' | 'Cancelled';
  duration: string;
  cost: number;
  startedAt: string;
  endedAt?: string;
  transcript?: TranscriptMessage[];
}

export interface Transaction {
    id: number;
    userOrListener: string;
    userId: number;
    description: string;
    date: string;
    type: 'Credit' | 'Debit' | 'Refund';
    amount: number;
    method: 'Payment Gateway' | 'Manual Adjustment' | 'Session Fee';
    status: 'Completed' | 'Pending' | 'Failed';
}

export interface Feedback {
    id: number;
    user: string;
    listener: string;
    rating: number;
    comment: string;
    date: string;
}

export interface TicketHistory {
    author: 'User' | 'Admin';
    timestamp: string;
    message: string;
}

export interface Ticket {
    id: number;
    userId: number;
    user: string;
    subject: string;
    description: string;
    status: 'Open' | 'Closed' | 'In Progress';
    createdAt: string;
    history: TicketHistory[];
}

export interface AnonymousReport {
    id: number;
    listenerId: number;
    listenerName: string;
    reason: 'Inappropriate Language' | 'Unprofessional Conduct' | 'Safety Concern' | 'Other';
    details: string;
    date: string;
    status: 'New' | 'Under Review' | 'Resolved' | 'Dismissed';
}