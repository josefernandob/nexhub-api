import express from 'express';
import cors from 'cors';
import { startupRoutes } from './routes/startupRoutes';
import { investorRoutes } from './routes/investorRoutes';
import { authRoutes } from './routes/auth.routes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', startupRoutes);
app.use('/api', investorRoutes);
app.use('/api', authRoutes); // 2. Registramos a rota de auth no Express aqui

app.get('/health', (req, res) => {
  return res.json({ status: 'OK', service: 'Nexhub API', version: '1.0.0' });
});

export { app };