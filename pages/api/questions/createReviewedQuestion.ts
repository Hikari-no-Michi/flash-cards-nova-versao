import database from '@/lib/mongodb';
import ReviewedQuestion from '@/models/reviewedQuestion.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, questionId, status } = req.body;

    try {
      await database.connect();

      const novaRevisao = new ReviewedQuestion({
        userId,
        questionId,
        status,
      });

      const resultado = await novaRevisao.save();

      res.status(201).json({
        message: 'Revisão da questão registrada com sucesso!',
        review: resultado,
      });

      await database.disconnect();
    } catch (err: unknown) {
      // Verificação de tipo para garantir que err é um tipo Error
      if (err instanceof Error) {
        console.error('Erro ao registrar a revisão:', err.message);
        res.status(500).json({ message: 'Erro ao registrar a revisão', error: err.message });
      } else {
        console.error('Erro desconhecido:', err);
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
