import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import database from '@/lib/mongodb';
import User from '@/models/user.model';

//http://localhost:3000/api/paymentUpdate/67ecacfe08b9fc6f43cea7e0
//o link acima faz o pagamento do documento com o id acima

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido ou ausente' });
    }

    try {
      await database.connect();

      const user = await User.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
          paymentStatus: 'paid',
          paymentDate: new Date(),
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json({
        message: 'Pagamento atualizado com sucesso',
        user,
      });

      await database.disconnect();
    } catch (err: unknown) {
      console.error('Erro ao atualizar pagamento:', err);
      res.status(500).json({ message: 'Erro ao atualizar pagamento' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
