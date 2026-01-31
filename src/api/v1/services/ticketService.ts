interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'resolved';
  createdAt: string;
}

const tickets: Ticket[] = [
  { id: 1, title: 'Update footer copyright year', description: 'Footer still shows 2024', priority: 'low', status: 'open', createdAt: '2025-12-14T15:00:00.000Z' },
  { id: 2, title: 'Profile picture upload slow', description: 'Upload takes 30+ seconds', priority: 'medium', status: 'open', createdAt: '2025-12-15T15:00:00.000Z' },
  { id: 3, title: 'Dashboard loading slowly', description: 'Dashboard takes 10+ seconds to load', priority: 'medium', status: 'open', createdAt: '2025-12-11T15:00:00.000Z' },
  { id: 4, title: 'Password reset email delayed', description: 'Reset emails taking over 30 minutes', priority: 'high', status: 'open', createdAt: '2025-12-12T15:00:00.000Z' },
  { id: 5, title: 'Export to PDF not working', description: 'PDF export fails silently', priority: 'high', status: 'open', createdAt: '2025-12-08T15:00:00.000Z' },
  { id: 6, title: 'Login page not loading', description: 'Users report blank screen on login', priority: 'critical', status: 'open', createdAt: '2025-12-11T15:00:00.000Z' },
  { id: 7, title: 'Dark mode toggle broken', description: 'Dark mode doesn\'t persist after refresh', priority: 'medium', status: 'resolved', createdAt: '2025-12-07T15:00:00.000Z' },
];

export const getAllTickets = async (): Promise<Ticket[]> => {
  return tickets;
};

export const getTicketById = async (id: number): Promise<Ticket | undefined> => {
  return tickets.find(t => t.id === id);
};

export const calculateUrgency = async (ticket: Ticket) => {
  const ticketAge = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  if (ticket.status === 'resolved') {
    return { ...ticket, ticketAge, urgencyScore: 0, urgencyLevel: 'Minimal. Ticket resolved.' };
  }
  const basePriority = { low: 10, medium: 20, high: 30, critical: 50 }[ticket.priority];
  const urgencyScore = basePriority + (ticketAge * 5);
  let urgencyLevel = '';
  if (urgencyScore < 30) urgencyLevel = 'Low urgency. Address when capacity allows.';
  else if (urgencyScore < 55) urgencyLevel = 'Moderate. Schedule for attention.';
  else if (urgencyScore < 80) urgencyLevel = 'High urgency. Prioritize resolution.';
  else urgencyLevel = 'Critical. Immediate attention required.';
  return { ...ticket, ticketAge, urgencyScore, urgencyLevel };
};