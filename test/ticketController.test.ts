import { Request, Response } from 'express';
import * as controller from '../src/api/v1/controllers/ticketController';
import * as service from '../src/api/v1/services/ticketService';

jest.mock('../src/api/v1/services/ticketService');

describe('Ticket Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('getHealth', () => {
    it('should handle successful operation', () => {
      controller.getHealth(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getAllTickets', () => {
    it('should handle successful operation', async () => {
      (service.getAllTickets as jest.Mock).mockResolvedValue([{ id: 1 }]);
      await controller.getAllTickets(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors', async () => {
      (service.getAllTickets as jest.Mock).mockRejectedValue(new Error());
      await controller.getAllTickets(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getTicketUrgency', () => {
    it('should handle successful operation', async () => {
      mockReq.params = { id: '1' };
      (service.getTicketById as jest.Mock).mockResolvedValue({ id: 1, title: 'test', priority: 'low', status: 'open', createdAt: new Date().toISOString() });
      (service.calculateUrgency as jest.Mock).mockResolvedValue({ id: 1, title: 'test', priority: 'low', status: 'open', createdAt: new Date().toISOString(), ticketAge: 0, urgencyScore: 10, urgencyLevel: 'Low urgency. Address when capacity allows.' });
      await controller.getTicketUrgency(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 if ticket not found', async () => {
      mockReq.params = { id: '999' };
      (service.getTicketById as jest.Mock).mockResolvedValue(undefined);
      await controller.getTicketUrgency(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      mockReq.params = { id: '1' };
      (service.getTicketById as jest.Mock).mockRejectedValue(new Error());
      await controller.getTicketUrgency(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});