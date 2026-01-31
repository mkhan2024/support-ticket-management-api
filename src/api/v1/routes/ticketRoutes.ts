import { Router } from 'express';
import * as ticketController from '../controllers/ticketController';

const router = Router();

router.get('/health', ticketController.getHealth);
router.get('/tickets', ticketController.getAllTickets);
router.get('/tickets/:id/urgency', ticketController.getTicketUrgency);

export default router;