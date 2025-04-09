'use client';

import { Provider } from 'jotai';
import { ReactNode } from 'react';

interface AtomProviderProps {
  children: ReactNode;
}

export default function AtomProvider({ children }: AtomProviderProps) {
  return <Provider>{children}</Provider>;
}
