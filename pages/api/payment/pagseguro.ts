import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import database from '@/lib/mongodb';
import User from '@/models/user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'LuizHenrique_EricaSousa_31-05-2025!';
const PAGSEGURO_TOKEN = '6f774a41-477f-424f-b33c-d64b74a607b897050e6849cb95a0f40522cafba763df3e1f-624a-4262-9b8c-87ee374a3d14';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }
  

  const { token, userId, meses, finalPrice, id } = req.query;

  console.log('Valores recebidos:');
  console.log('Token:', token);
  console.log('User ID:', userId);
  console.log('Meses:', meses);
  console.log('Preço Final:', finalPrice);
  console.log('ID do plano:', id);

  if (!token || !userId || !meses || !finalPrice || !id) {
    return res.status(400).json({ message: 'Parâmetros obrigatórios ausentes' });
  }

  console.log('-------------\n CORRETO -----------\n');

  try {
    const decoded = jwt.verify(token as string, SECRET_KEY);
    console.log('Token decodificado:', decoded);

    await database.connect();
    const user = await User.findById(userId as string).select('-password');
    await database.disconnect();

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const expiration_date = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('.')[0] + '-03:00';

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const notificationURL = `https://acartanamanga.vercel.app/api/paymentUpdate/${userId}`;

    const payload = {
      reference_id: `pedido-${id}`,
      customer: {
        name: user.name,
        email: user.email,
        tax_id: user.cpf || '12345678909',
        phones: [
          {
            country: '55',
            area: '86',
            number: '994059642', // substitua se necessário por user.phone
            type: 'MOBILE',
          },
        ],
      },
      items: [
        {
          name: 'mensalidade',
          quantity: Number(meses),
          unit_amount: Math.round(Number(finalPrice) / Number(meses)),
        },
      ],
      qr_codes: [
        {
          amount: {
            value: Number(finalPrice),
          },
          expiration_date,
        },
      ],
      notification_urls: [notificationURL],
    };

    const response = await axios.post('https://api.pagseguro.com/orders', payload, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${PAGSEGURO_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    const qrCode = data.qr_codes[0]?.links?.[0]?.href;
    const pixKey = data.qr_codes[0]?.text;

    return res.status(200).json({
      qrCodeImage: qrCode,
      pixKey,
      order: data,
    });

  } catch (error: any) {
    console.error('Erro ao gerar pedido:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Erro interno ao gerar pedido' });
  }
}
