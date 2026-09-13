// Initial seed contact submissions matching Rogerex India's enterprise technology domain

export const INITIAL_CONTACT_REQUESTS = [
  {
    id: 'req-101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@techcorp.in',
    phone: '+91 98765 43210',
    subject: 'Enterprise ERP System Development',
    message: 'We are looking to develop a custom ERP solution tailored for our manufacturing business in Pune. Need scalability, real-time analytics, and role-based authorization.',
    status: 'Pending',
    createdAt: '2026-09-04T10:30:00.000Z',
    notes: 'Urgent inquiry. Client requested initial estimate call.',
  },
  {
    id: 'req-102',
    name: 'Priya Patel',
    email: 'priya@finverse.io',
    phone: '+91 91234 56789',
    subject: 'AI-Powered FinTech Mobile App',
    message: 'Hi Rogerex Team, we require an iOS & Android mobile application with AI document verification and secure payment gateway integration.',
    status: 'Contacted',
    createdAt: '2026-09-03T14:15:00.000Z',
    notes: 'Sent initial discovery deck. Scheduled follow-up meeting for Monday.',
  },
  {
    id: 'req-103',
    name: 'Vikramaditya Roy',
    email: 'v.roy@logistix.com',
    phone: '+91 99887 76655',
    subject: 'Cloud Migration & Infrastructure Optimization',
    message: 'Looking for experts to migrate our legacy microservices setup to AWS with Kubernetes containerization and CI/CD pipelines.',
    status: 'Resolved',
    createdAt: '2026-09-01T09:45:00.000Z',
    notes: 'Proposal accepted. Contract signed.',
  },
  {
    id: 'req-104',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@healthpulse.org',
    phone: '+91 97654 32109',
    subject: 'Telemedicine Web & Mobile Portal',
    message: 'We want to build a HIPAA-compliant telemedicine platform with video consultation, patient records, and appointment scheduling.',
    status: 'Pending',
    createdAt: '2026-09-05T08:20:00.000Z',
    notes: '',
  },
  {
    id: 'req-105',
    name: 'Rohan Deshmukh',
    email: 'rohan@retailflow.in',
    phone: '+91 98112 23344',
    subject: 'UI/UX Redesign for E-commerce Platform',
    message: 'Our existing Web app needs a complete modern visual overall and performance optimization. We love the design aesthetics of your portfolio!',
    status: 'Contacted',
    createdAt: '2026-08-28T16:50:00.000Z',
    notes: 'Discussed project scope. Waiting for client requirements document.',
  },
];

const LOCAL_STORAGE_KEY = 'rogerex_contact_requests';

export const getStoredRequests = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CONTACT_REQUESTS));
      return INITIAL_CONTACT_REQUESTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contact requests from localStorage:', error);
    return INITIAL_CONTACT_REQUESTS;
  }
};

export const saveStoredRequests = (requests) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Error saving contact requests to localStorage:', error);
  }
};

export const resetStoredRequests = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CONTACT_REQUESTS));
    return INITIAL_CONTACT_REQUESTS;
  } catch (error) {
    console.error('Error resetting contact requests:', error);
    return INITIAL_CONTACT_REQUESTS;
  }
};
