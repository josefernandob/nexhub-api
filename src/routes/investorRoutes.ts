import { Router } from 'express';
import { InvestorController } from '../controllers/InvestorController';

const investorRoutes = Router();
const investorController = new InvestorController();

investorRoutes.post('/investors', investorController.create);
investorRoutes.get('/investors', investorController.list);

export { investorRoutes };