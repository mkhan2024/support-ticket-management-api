import * as service from '../src/api/v1/services/ticketService';

describe('Ticket Service', () => {
  describe('calculateUrgency', () => {
    it('should calculate for ticket 1 (low)', async () => {
      const ticket = await service.getTicketById(1);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(25);
      expect(result.urgencyLevel).toBe('Low urgency. Address when capacity allows.');
    });

    it('should calculate for ticket 2 (medium age 2)', async () => {
      const ticket = await service.getTicketById(2);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(30);
      expect(result.urgencyLevel).toBe('Moderate. Schedule for attention.');
    });

    it('should calculate for ticket 3 (medium age 6)', async () => {
      const ticket = await service.getTicketById(3);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(50);
      expect(result.urgencyLevel).toBe('Moderate. Schedule for attention.');
    });

    it('should calculate for ticket 4 (high age 5)', async () => {
      const ticket = await service.getTicketById(4);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(55);
      expect(result.urgencyLevel).toBe('High urgency. Prioritize resolution.');
    });

    it('should calculate for ticket 5 (high age 9)', async () => {
      const ticket = await service.getTicketById(5);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(75);
      expect(result.urgencyLevel).toBe('High urgency. Prioritize resolution.');
    });

    it('should calculate for ticket 6 (critical age 6)', async () => {
      const ticket = await service.getTicketById(6);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(80);
      expect(result.urgencyLevel).toBe('Critical. Immediate attention required.');
    });

    it('should calculate for ticket 7 (resolved)', async () => {
      const ticket = await service.getTicketById(7);
      const result = await service.calculateUrgency(ticket!);
      expect(result.urgencyScore).toBe(0);
      expect(result.urgencyLevel).toBe('Minimal. Ticket resolved.');
    });
  });
});