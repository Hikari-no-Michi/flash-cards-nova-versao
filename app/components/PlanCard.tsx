import { FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { authTokenAtom, isPlanAtom, selectedPlanAtom, userAtom } from '@/store'
import { useRouter } from 'next/router'

const PlanCard: FC = () => {
  const [qrCodeImage, setQrCodeImage] = useState('')
  const [pixKey, setPixKey] = useState('')
  const [qrCodeValue, setQrCodeValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [token] = useAtom(authTokenAtom)
  const [user] = useAtom(userAtom)
  const [selectedPlan, setSelectedPlan] = useAtom(selectedPlanAtom)
  const [isPlan, setIsPlan] = useAtom(isPlanAtom)
  const hasFetched = useRef(false)

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!selectedPlan || hasFetched.current) return

      try {
        setLoading(true)
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
        setQrCodeValue(response.data.order?.qr_codes?.[0]?.amount?.value)
        hasFetched.current = true
      } catch (error) {
        console.error('Erro ao buscar QR Code:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQRCode()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 my-10 border rounded-xl shadow-lg text-center max-w-xl mx-auto bg-white">
        <h2 className="text-2xl font-bold text-purple-700">Aguarde um momento...</h2>
        <p className="text-gray-600 mt-2">Estamos gerando seu QR Code de pagamento</p>
      </div>
    )
  }

  return (
    <div className="pb-5 pt-[140px] sm:p-6 my-10 border rounded-xl shadow-lg text-center max-w-xl mx-auto bg-white sm:mt-10 sm:mb-10 mt-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">PAGUE COM O PIX</h2>

      {qrCodeImage && (
        <div className="mb-4">
          <img src={qrCodeImage} alt="QR Code para pagamento" className="mx-auto w-48 h-48" />
          <p className="text-sm text-gray-600 mt-2">Escaneie o QR Code com o app do seu banco</p>
        </div>
      )}

      {pixKey && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Chave PIX:</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="font-mono text-sm break-all text-purple-800">{pixKey}</div>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              Copiar chave PIX
            </button>
          </div>
          {copied && <p className="text-green-600 text-sm mt-2">Chave PIX copiada!</p>}
        </div>
      )}

      {qrCodeValue && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-1">Valor do pagamento:</p>
          <div className="font-mono text-sm text-purple-800">
            R$ {(Number(qrCodeValue) / 100).toFixed(2).replace('.', ',')}
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsPlan(false)
        }}
        className="mt-6 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
      >
        Voltar
      </button>
    </div>
  )
}

export default PlanCard
