import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT, checkRoles } from '../auth/guards/auth.middleware';
import { Role } from '../auth/enums/role.enum';

const authRoutes = Router();

authRoutes.post('/auth/login-teste', AuthController.loginTeste);

authRoutes.get(
  '/auth/admin-only',
  authenticateJWT,
  checkRoles([Role.ADMIN]),
  AuthController.adminOnly
);

authRoutes.get(
  '/auth/startup-dashboard',
  authenticateJWT,
  checkRoles([Role.STARTUP, Role.ADMIN]),
  AuthController.startupOnly
);

authRoutes.get(
  '/auth/investidor-deals',
  authenticateJWT,
  checkRoles([Role.INVESTIDOR, Role.ADMIN]),
  AuthController.investidorOnly
);

export { authRoutes };