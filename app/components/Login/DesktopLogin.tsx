'use client';
import { authTokenAtom, isLoading, isLoggedAtom, modalLoginAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';

export function LoginForm() {
  const [ShowModal, setShowModal] = useAtom(modalLoginAtom);
  const [__, setIsLogged] = useAtom(isLoggedAtom);
  const [token, setToken] = useAtom(authTokenAtom);
  const [loading, setLoading] = useAtom(isLoading);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true)

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    try {
      const response = await fetch('/api/users/loginUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token)
        setIsLogged(true);
        setShowModal(false);        
      } else {
        alert(data.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      alert('Erro na requisição.');
    }
  };

  if (!ShowModal) return null;

  return (
    <div className="w-full fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
      <div
        className="relative w-[400px] h-[400px] bg-contain bg-center bg-no-repeat rounded-xl shadow-2xl flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/APROVADO.png')" }}
      >
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center py-2 font-semibold rounded-t-xl z-20 text-sm">
          A carta na manga que você precisava para sair na frente!
        </div>

        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full px-6 flex flex-col items-center justify-center gap-4"
        >
          <h2 className="text-white text-2xl font-semibold mb-4">Bem-vindo</h2>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-2 rounded bg-white/90 text-gray-800 focus:outline-none"
            ref={usernameRef}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 rounded bg-white/90 text-gray-800 focus:outline-none"
            ref={passwordRef}
            required
          />
          <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-2 rounded text-white ${
            loading
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logando...' : 'Entrar'}
        </button>

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="text-sm text-white mt-2 hover:underline"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
