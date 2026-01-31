import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';
import { HTTP_STATUS } from '../../../constants/httpStatus';

export const getHealth = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json({
      message: 'Tickets retrieved',
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

export const getTicketUrgency = async (req: Request, res: Response) => {
  try {
    const idStr = String(req.params.id); // Fix: cast to string for TS safety
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid ticket ID' });
    }
    const ticket = await ticketService.getTicketById(id);
    if (!ticket) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Ticket not found' });
    }
    const urgency = await ticketService.calculateUrgency(ticket);
    res.status(HTTP_STATUS.OK).json({
      message: 'Ticket urgency calculated',
      data: urgency,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};