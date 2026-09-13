import { Router } from 'express';
import { StartupController } from '../controllers/StartupController';

const startupRoutes = Router();
const startupController = new StartupController();

startupRoutes.post('/startups', startupController.create);
startupRoutes.get('/startups', startupController.list);

export { startupRoutes };