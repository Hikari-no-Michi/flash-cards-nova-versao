import AtomProvider from '@/providers/AtomProvider';
import dynamic from 'next/dynamic';

const ClientHome = dynamic(() => import('./Home'), { ssr: false });

export default function Page() {
  return (
    <AtomProvider>
      <ClientHome />
    </AtomProvider>
  )
}
