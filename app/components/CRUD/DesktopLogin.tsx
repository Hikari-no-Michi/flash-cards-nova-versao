'use client';

import { authTokenAtom, isLoading, isLoggedAtom, isRegisterFormAtom, modalLoginAtom, userAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function LoginForm() {
  const [isLoginForm, setIsLoginForm] = useAtom(modalLoginAtom);
  const [__, setIsLogged] = useAtom(isLoggedAtom);
  const [token, setToken] = useAtom(authTokenAtom);
  const [loading, setLoading] = useAtom(isLoading);
  const [user, setUser] = useAtom(userAtom);
  const [isRegisterForm, setIsRegisterForm] = useAtom(isRegisterFormAtom);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    try {
      const response = await fetch('/api/users/loginUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setIsLogged(true);
        setIsLoginForm(false);
      } else {
        alert(data.message || 'Erro ao fazer login.');
        setLoading(false);
      }
    } catch (error) {
      alert('Erro na requisição.');
      setLoading(false);
    }
  };

  if (!isLoginForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Cortina escura atrás do modal */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-[-1]" />
  
      <div className="my-[30px] mx-[5px] flex flex-col md:flex-row bg-black rounded-xl overflow-hidden shadow-2xl mx-auto">
        {/* Imagem */}
        <div className="relative w-full md:w-[400px] md:h-auto order-1 md:order-2 flex items-center justify-center bg-black">
          <Image
            src={isMobile ? "/MOBILE-A-CARTA-NA-MANGA.png" : "/A-CARTA-NA-MANGA.png"}
            alt="Promo Banner"
            width={981}
            height={582}
            className="object-contain max-h-full max-w-full"
            priority
          />
        </div>

        {/* Formulário */}
        <div className="w-full md:w-[400px] p-8 text-white flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl font-bold mb-6 text-center">Bem-vindo de volta!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={usernameRef}
              type="text"
              required
              placeholder="E-mail, Celular ou CPF"
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <input
              ref={passwordRef}
              type="password"
              required
              placeholder="Senha"
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white font-semibold transition ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Entrando...' : 'Entrar na Conta'}
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterForm(true)}
              className="w-full text-purple-400 hover:underline"
            >
              Cadastre-se agora!
            </button>

            <button
              type="button"
              onClick={() => setIsLoginForm(false)}
              className="w-full text-sm mt-4 text-gray-300 hover:underline"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
