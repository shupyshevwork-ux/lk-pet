import { useEffect, useMemo, useState } from 'react';
import { petsStorage } from '../storage/pets-storage';
import type { Pet, PetFormValues } from '../types/pet';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    setPets(petsStorage.getAll());
  }, []);

  const persist = (next: Pet[]) => {
    setPets(next);
    petsStorage.setAll(next);
  };

  const createPet = (data: PetFormValues) => {
    const now = new Date().toISOString();
    const pet: Pet = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    persist([pet, ...pets]);
    return pet;
  };

  const updatePet = (id: string, data: PetFormValues) => {
    let updated: Pet | undefined;
    const next = pets.map((pet) => {
      if (pet.id !== id) return pet;
      updated = { ...pet, ...data, updatedAt: new Date().toISOString() };
      return updated;
    });
    persist(next);
    return updated;
  };

  const deletePet = (id: string) => persist(pets.filter((pet) => pet.id !== id));

  const seedPet = () => {
    const now = new Date().toISOString();
    const pet: Pet = {
      id: crypto.randomUUID(),
      name: 'Мартин',
      category: 'Кот',
      breed: 'Британец',
      sex: 'male',
      age: 3,
      ageUnit: 'years',
      weight: 4.2,
      photo: undefined,
      attachments: [],
      notes: 'Спокойный, любит прогулки на шлейке.',
      createdAt: now,
      updatedAt: now,
    };
    persist([pet, ...pets]);
  };

  return {
    pets,
    createPet,
    updatePet,
    deletePet,
    seedPet,
    getById: (id: string) => pets.find((pet) => pet.id === id),
    hasPets: useMemo(() => pets.length > 0, [pets]),
  };
};
