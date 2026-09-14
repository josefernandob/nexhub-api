import { Request, Response } from 'express';

export class InvestorController {
  private static investors: any[] = [];

  async create(req: Request, res: Response) {
    const { name, email, role, interests, ticketSize, availability, bio } = req.body;

    if (!name || !email || !role || !interests ) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const newInvestor = {
      id: String(Date.now()),
      name,
      email,
      role,
      interests,
      ticketSize,
      availability,
      bio,
      createdAt: new Date()
    };

    InvestorController.investors.push(newInvestor);
    return res.status(201).json(newInvestor);
  }

  async list(req: Request, res: Response) {
    return res.json(InvestorController.investors);
  }
}