import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/lib/mongodb';
import User from '@/models/user.model';

export default async function updatePaymentStatus(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { userId, paymentStatus } = req.body;

    try {
      await database.connect();

      const usuario = await User.findById(userId);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      usuario.paymentStatus = paymentStatus;
      usuario.paymentDate = new Date();

      const resultado = await usuario.save();

      res.status(200).json({
        message: 'Status de pagamento atualizado com sucesso!',
        user: resultado,
      });

      await database.disconnect();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao atualizar o Status de Pagamento:', err.message);
        res.status(500).json({ message: 'Erro ao atualizar o Status de Pagamento', error: err.message });
      } else {
        console.error('Erro desconhecido:', err);
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
