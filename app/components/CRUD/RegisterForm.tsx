'use client';

import {
  authTokenAtom,
  isLoggedAtom,
  isLoading,
  modalLoginAtom,
  userAtom,
  isRegisterFormAtom
} from '@/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export function RegisterForm() {
  const [isRegisterForm, setIsRegisterForm] = useAtom(isRegisterFormAtom);
  const [isLoginForm, setIsLoginForm] = useAtom(modalLoginAtom);
  const [loading, setLoading] = useAtom(isLoading);
  const [__, setIsLogged] = useAtom(isLoggedAtom);
  const [token, setToken] = useAtom(authTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isMobile, setIsMobile] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para controlar a mensagem de erro

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // remove imediatamente os caracteres especiais, exceto _ e .
    let sanitized = username.replace(/[^\w_.]/g, '');
    if (sanitized !== username) {
      setUsername(sanitized);
      return;
    }
  
    const timer = setTimeout(() => {
      // após 4 segundos, remover _ ou . do início ou fim
      const cleaned = username.replace(/^[_.]+|[_.]+$/g, '');
      if (cleaned !== username) {
        setUsername(cleaned);
      }
    }, 4000);
  
    return () => clearTimeout(timer);
  }, [username]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Limpar qualquer mensagem anterior

    if (!fullName || !username || !email || !password) {
      setErrorMessage('Preencha todos os campos!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users/createUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setIsLogged(true);
        setIsRegisterForm(false);
        setIsLoginForm(false);
      } else {
        setErrorMessage(data.message || 'Erro ao cadastrar.');
      }

      setLoading(false);
    } catch (error) {
      setErrorMessage('Erro na requisição.');
      setLoading(false);
    }

    // Remover a mensagem de erro após 5 segundos
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (!isRegisterForm || !isLoginForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-80 z-[-1]" />

      <div className="my-[30px] mx-[5px] flex flex-col md:flex-row bg-black rounded-xl overflow-hidden shadow-2xl mx-auto">
        <div className="relative w-full md:w-[400px] flex items-center justify-center bg-black">
          
          {isMobile && (
            <img
            src="/MOBILE-A-CARTA-NA-MANGA.png"
            alt="Banner"
            className="object-contain max-h-full max-w-full"
          />
          )}
          {!isMobile && (
            <img
            src="/A-CARTA-NA-MANGA.png"
            alt="Banner"
            className="object-contain max-h-full max-w-full"
          />
          )}
        </div>

        <div className="w-full md:w-[400px] p-8 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div> // Mensagem de erro
            )}
            <input
              type="text"
              required
              placeholder="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <input
              type="text"
              required
              placeholder="@username"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="E-mail"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <input
              type="password"
              required
              placeholder="Senha"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/90 text-black rounded focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white font-semibold transition ${
                loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Criando Conta...' : 'Criar Conta'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterForm(false);
                setIsLoginForm(true);
              }}
              className="w-full text-purple-400 hover:underline"
            >
              Já tem uma conta? Faça login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterForm(false);
                setIsLoginForm(false);
              }}
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
