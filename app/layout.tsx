import AtomProvider from '@/providers/AtomProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'] }); 

export const metadata: Metadata = {
  title: 'A CARTA NA MANGA',
  description: 'A carta na manga que você precisava para sair na frente dos seus concorrentes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AtomProvider>
          {children}
        </AtomProvider>
      </body>
    </html>
  );
}
