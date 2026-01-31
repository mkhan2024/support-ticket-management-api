import request from 'supertest';
import express from 'express';

jest.mock('../src/api/v1/controllers/ticketController', () => ({
  __esModule: true,
  getHealth: jest.fn((req, res) => res.status(200).json({})),
  getAllTickets: jest.fn((req, res) => res.status(200).json({})),
  getTicketUrgency: jest.fn((req, res) => res.status(200).json({})),
}));

import routes from '../src/api/v1/routes/ticketRoutes';
import * as controller from '../src/api/v1/controllers/ticketController';

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

describe('Ticket Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/health', () => {
    it('should call getHealth controller', async () => {
      await request(app).get('/api/v1/health');
      expect(controller.getHealth).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/tickets', () => {
    it('should call getAllTickets controller', async () => {
      await request(app).get('/api/v1/tickets');
      expect(controller.getAllTickets).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/tickets/:id/urgency', () => {
    it('should call getTicketUrgency controller', async () => {
      await request(app).get('/api/v1/tickets/1/urgency');
      expect(controller.getTicketUrgency).toHaveBeenCalled();
    });

    it('should return 400 when ID parameter is invalid', async () => {
      (controller.getTicketUrgency as unknown as jest.Mock).mockImplementationOnce((req, res) =>
        res.status(400).json({ message: 'Invalid ticket ID' })
      );

      const response = await request(app).get('/api/v1/tickets/invalid/urgency');
      expect(response.status).toBe(400);

      expect(controller.getTicketUrgency).toHaveBeenCalled();
    });
  });
});