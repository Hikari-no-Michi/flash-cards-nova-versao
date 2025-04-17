import { FC, useEffect, useState } from 'react'
import axios from 'axios'

const PlanCard: FC = () => {
  const [qrCodeImage, setQrCodeImage] = useState('')
  const [pixKey, setPixKey] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    const expiration_date = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('.')[0] + "-03:00"

    const payload = {
      reference_id: "pedido-semestre-001",
      customer: {
        name: "Erica Sousa Alves Correia",
        email: "aciresousa2@gmail.com",
        tax_id: "12345678909",
        phones: [
          {
            country: "55",
            area: "86",
            number: "994059642",
            type: "MOBILE",
          },
        ],
      },
      items: [
        {
          name: "mensalidade",
          quantity: 6,
          unit_amount: 1900,
        },
      ],
      qr_codes: [
        {
          amount: {
            value: 11400,
          },
          expiration_date: expiration_date,
        },
      ],
      notification_urls: ["https://seusite.com.br/notificacoes-pagseguro"],
    }

    const sendOrderToPagSeguro = async () => {
      try {
        const response = await axios.post('https://api.pagseguro.com/orders', payload, {
          headers: {
            accept: '*/*',
            Authorization: 'Bearer 6f774a41-477f-424f-b33c-d64b74a607b897050e6849cb95a0f40522cafba763df3e1f-624a-4262-9b8c-87ee374a3d14',
            'Content-Type': 'application/json',
          },
        })

        const data = response.data

        const qrCode = data.qr_codes[0]?.links?.[0]?.href
        const pixKey = data.qr_codes[0]?.text

        if (qrCode) {
          setQrCodeImage(qrCode)
        }

        if (pixKey) {
          setPixKey(pixKey)
        }

        setSelectedPlan(data)
      } catch (error) {
        console.error('Erro ao enviar pedido para o PagSeguro:', error)
      }
    }

    sendOrderToPagSeguro()
  }, [])

  return (
    <div className="p-6 border rounded-xl shadow-lg text-center max-w-xl mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Plano Selecionado</h2>

      {qrCodeImage && (
        <div className="mb-4">
          <img src={qrCodeImage} alt="QR Code para pagamento" className="mx-auto w-48 h-48" />
          <p className="text-sm text-gray-600 mt-2">Escaneie o QR Code com o app do seu banco</p>
        </div>
      )}

      {pixKey && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-1">Chave PIX:</p>
          <div className="font-mono text-sm break-words text-purple-800">{pixKey}</div>
        </div>
      )}

      <button
        onClick={() => {
          console.log('Voltando, resetando o plano selecionado...')
        }}
        className="mt-6 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
      >
        Voltar
      </button>
    </div>
  )
}

export default PlanCard
