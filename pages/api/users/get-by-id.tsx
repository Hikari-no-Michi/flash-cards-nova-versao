import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/lib/mongodb';
import User from '@/models/user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'LuizHenrique_EricaSousa_31-05-2025!';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { token, userId } = req.body;

  if (!token || !userId) {
    return res.status(400).json({ message: 'Token e ID do usuário são obrigatórios' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    

    await database.connect();

    const user = await User.findById(userId).select('-password'); 

    await database.disconnect();

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário encontrado com sucesso', user });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
