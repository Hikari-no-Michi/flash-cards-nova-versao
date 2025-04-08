import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET || 'LuizHenrique_EricaSousa_31-05-2025!';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token não fornecido' });
    }

    console.log('Token recebido:', token);

    const decoded = jwt.verify(token, SECRET_KEY);

    return res.status(200).json({ message: 'Token válido', user: decoded });

  } catch (error) {
    console.error("Erro ao validar token:", error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
