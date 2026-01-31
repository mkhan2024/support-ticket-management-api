import express, { Express } from 'express';
import morgan from 'morgan';
import ticketRoutes from './api/v1/routes/ticketRoutes';

const app: Express = express();

app.use(morgan('dev'));

app.use('/api/v1/tickets', express.json());

app.use('/api/v1', ticketRoutes);

export default app;