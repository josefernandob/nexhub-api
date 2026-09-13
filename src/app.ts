import express from 'express';
import cors from 'cors';
import { startupRoutes } from './routes/startupRoutes';
import { investorRoutes } from './routes/investorRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', startupRoutes);
app.use('/api', investorRoutes);

app.get('/health', (req, res) => {
  return res.json({ status: 'OK', service: 'Nexhub API', version: '1.0.0' });
});

export { app };