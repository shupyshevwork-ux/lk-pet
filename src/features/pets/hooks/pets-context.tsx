import { createContext, useContext, type ReactNode } from 'react';
import { usePets } from './use-pets';

type PetsStore = ReturnType<typeof usePets>;

const PetsContext = createContext<PetsStore | null>(null);

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const store = usePets();
  return <PetsContext.Provider value={store}>{children}</PetsContext.Provider>;
};

export const usePetsStore = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePetsStore must be used in PetsProvider');
  return ctx;
};
