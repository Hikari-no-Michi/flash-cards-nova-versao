import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface IUserAtom {
  _id: string;
  username: string;
  fullName?: string;
  email?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: string;
  paymentDate?: string | null;
}


interface UserResponse {
  user: IUserAtom;
}

interface UseAuthLoggerProps {
  token: string | null;
  isLogged: boolean;
  user: IUserAtom | null;
  setUser: Dispatch<SetStateAction<IUserAtom | null>>;
}

export function useAuthLogger({ token, isLogged, user, setUser }: UseAuthLoggerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && isLogged && user?._id) {
        try {
          const res = await fetch('/api/users/get-by-id/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, userId: user._id }),
          });

          if (!res.ok) throw new Error('Erro ao buscar usuário');

          const data: UserResponse = await res.json();

          setUser(prev => {
            if (!prev) return prev;

            return {
              ...prev,
              username: data.user.username,
              fullName: data.user.fullName,
              email: data.user.email,
              role: data.user.role,
              status: data.user.status,
              paymentStatus: data.user.paymentStatus,
              paymentDate: data.user.paymentDate,
              createdAt: data.user.createdAt,
            };
          });

          console.log("---------------------------")
          console.log(user.createdAt)
          console.log("---------------------------")

          console.log("---------------------------")
          console.log(data.user.createdAt)
          console.log("---------------------------")

          console.log(`[${new Date().toLocaleTimeString()}] Verificação de pagamento: ${data.user.paymentStatus}`);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      }
    };

    if (!intervalRef.current) {
      fetchUserData();
      intervalRef.current = setInterval(fetchUserData, 20000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [token, isLogged, user?._id]); 
}
