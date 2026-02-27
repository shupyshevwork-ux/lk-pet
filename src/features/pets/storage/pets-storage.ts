import type { Pet } from '../types/pet';

const STORAGE_KEY = 'lk-pets-v1';

export const serializePets = (pets: Pet[]) => JSON.stringify(pets);

export const deserializePets = (value: string | null): Pet[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as Pet[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const petsStorage = {
  getAll: (): Pet[] => deserializePets(localStorage.getItem(STORAGE_KEY)),
  setAll: (pets: Pet[]) => localStorage.setItem(STORAGE_KEY, serializePets(pets)),
};
