import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { authTokenAtom, selectedPlanAtom, userAtom } from '@/store'
import { useRouter } from 'next/router'

const PlanCard: FC = () => {
  const [qrCodeImage, setQrCodeImage] = useState('')
  const [pixKey, setPixKey] = useState('')
  const [token] = useAtom(authTokenAtom)
  const [user] = useAtom(userAtom)
  const [selectedPlan, setSelectedPlan] = useAtom(selectedPlanAtom)

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!selectedPlan) return

      try {
        const response = await axios.get('/api/payment/pagseguro', {
          params: {
            token,
            userId: user?._id,
            meses: selectedPlan.meses,
            finalPrice: selectedPlan.finalPrice,
            id: selectedPlan.id,
          },
        })

        setQrCodeImage(response.data.qrCodeImage)
        setPixKey(response.data.pixKey)
      } catch (error) {
        console.error('Erro ao buscar QR Code:', error)
      }
    }

    fetchQRCode()
  }, [token, user, selectedPlan])

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
          setSelectedPlan(null)
        }}
        className="mt-6 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
      >
        Voltar
      </button>
    </div>
  )
}

export default PlanCard
