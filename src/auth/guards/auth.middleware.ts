import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Role } from '../enums/role.enum';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: Role;
      };
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secret = (process.env.JWT_SECRET || 'secreto_super_seguro') as jwt.Secret;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado no cabeçalho de autorização.' });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err || !user) {
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
      }

      req.user = user as any;
      next();
    });
  } else {
    res.status(401).json({ message: 'Cabeçalho de autorização não encontrado.' });
  }
};

export const checkRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Acesso negado: sem permissão necessária.' });
    }
  };
};