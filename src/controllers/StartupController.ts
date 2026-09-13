import { Request, Response } from 'express';

export class StartupController {
  private static startups: any[] = [];

  async create(req: Request, res: Response) {
    const { name, cnpj, segment, stage, needs, description, website } = req.body;

    if (!name || !segment || !stage || !needs || !description) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const newStartup = {
      id: String(Date.now()),
      name,
      cnpj,
      segment,
      stage,
      needs,
      description,
      website,
      createdAt: new Date()
    };

    StartupController.startups.push(newStartup);
    return res.status(201).json(newStartup);
  }

  async list(req: Request, res: Response) {
    return res.json(StartupController.startups);
  }
}