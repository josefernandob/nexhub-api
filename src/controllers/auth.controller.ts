import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  static loginTeste(req: Request, res: Response) {
    const { id, email, role } = req.body;

    const token = jwt.sign(
      { userId: id, email, role },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '1d' }
    );

    return res.json({ access_token: token });
  }

  static adminOnly(req: Request, res: Response) {
    return res.json({ message: 'Bem-vindo, Administrador! Acesso concedido.' });
  }

  static startupOnly(req: Request, res: Response) {
    return res.json({ message: 'Painel da Startup carregado com sucesso.' });
  }

  static investidorOnly(req: Request, res: Response) {
    return res.json({ message: 'Lista de oportunidades para Investidores.' });
  }
}