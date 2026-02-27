import { z } from 'zod';
import { AGE_UNITS, PET_CATEGORIES, PET_SEX } from '../types/pet';

export const petFormSchema = z.object({
  photo: z.string().optional(),
  name: z.string().trim().min(1, 'Введите имя питомца'),
  category: z.enum(PET_CATEGORIES, { errorMap: () => ({ message: 'Выберите категорию' }) }),
  breed: z.string().optional(),
  sex: z.enum(PET_SEX).default('unknown'),
  age: z.coerce.number().min(0, 'Возраст не может быть отрицательным').optional().or(z.nan().transform(() => undefined)),
  ageUnit: z.enum(AGE_UNITS).default('years'),
  weight: z.coerce.number().min(0, 'Вес не может быть отрицательным').optional().or(z.nan().transform(() => undefined)),
  attachments: z.array(
    z.object({
      id: z.string(),
      filename: z.string(),
      size: z.number(),
      type: z.string(),
      uploadedAt: z.string(),
      fileData: z.string(),
    }),
  ),
  notes: z.string().optional(),
});

export type PetFormSchema = z.infer<typeof petFormSchema>;
