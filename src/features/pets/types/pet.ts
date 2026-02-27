export const PET_CATEGORIES = ['Кот', 'Собака', 'Птица', 'Грызун', 'Кролик', 'Рептилия', 'Рыба', 'Другое'] as const;
export const PET_SEX = ['male', 'female', 'unknown'] as const;
export const AGE_UNITS = ['years', 'months'] as const;

export type Attachment = {
  id: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
  fileData: string;
};

export type Pet = {
  id: string;
  photo?: string;
  name: string;
  category: (typeof PET_CATEGORIES)[number];
  breed?: string;
  sex: (typeof PET_SEX)[number];
  age?: number;
  ageUnit: (typeof AGE_UNITS)[number];
  weight?: number;
  attachments: Attachment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PetFormValues = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;
