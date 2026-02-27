import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fileToBase64 } from '../utils/file';
import { petFormSchema, type PetFormSchema } from '../schema/pet-schema';
import { AGE_UNITS, PET_CATEGORIES, PET_SEX, type PetFormValues } from '../types/pet';
import { FileDropzone } from './file-dropzone';

const sexLabels: Record<(typeof PET_SEX)[number], string> = { male: 'Самец', female: 'Самка', unknown: 'Не указан' };
const ageLabels: Record<(typeof AGE_UNITS)[number], string> = { years: 'лет', months: 'мес' };

type Props = {
  defaultValues?: Partial<PetFormValues>;
  onSubmit: (values: PetFormValues) => void;
  onCancel: () => void;
  submitLabel: string;
};

export const PetForm = ({ defaultValues, onSubmit, onCancel, submitLabel }: Props) => {
  const form = useForm<PetFormSchema>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: '',
      category: undefined,
      breed: '',
      sex: 'unknown',
      age: undefined,
      ageUnit: 'years',
      weight: undefined,
      notes: '',
      attachments: [],
      ...defaultValues,
    },
  });

  const photo = form.watch('photo');
  const attachments = form.watch('attachments');

  const photoDropzone = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: async (accepted) => {
      if (!accepted[0]) return;
      form.setValue('photo', await fileToBase64(accepted[0]));
    },
  });

  const submit = form.handleSubmit((values) => onSubmit(values));

  const attachmentActions = useMemo(
    () => ({
      add: async (files: File[]) => {
        const mapped = await Promise.all(
          files.map(async (file) => ({
            id: crypto.randomUUID(),
            filename: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            fileData: await fileToBase64(file),
          })),
        );
        form.setValue('attachments', [...attachments, ...mapped], { shouldValidate: true });
      },
      remove: (id: string) => form.setValue('attachments', attachments.filter((item) => item.id !== id), { shouldValidate: true }),
    }),
    [attachments, form],
  );

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={submit}>
        <Tabs defaultValue="main" className="space-y-4">
          <TabsList>
            <TabsTrigger value="main">Основное</TabsTrigger>
            <TabsTrigger value="medical">Документы и заметки</TabsTrigger>
          </TabsList>
          <TabsContent value="main" className="space-y-4">
            <div {...photoDropzone.getRootProps()} className="flex min-h-44 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-4">
              <input {...photoDropzone.getInputProps()} />
              {photo ? <img src={photo} className="h-36 w-36 rounded-2xl object-cover" /> : <div className="text-center text-sm text-muted-foreground"><ImagePlus className="mx-auto mb-2" />Фото питомца (drag&drop)</div>}
            </div>
            {photo && (
              <Button variant="outline" size="sm" onClick={() => form.setValue('photo', undefined)} type="button">
                Удалить фото
              </Button>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Имя</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage name="name" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Категория</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PET_CATEGORIES.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage name="category" />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="breed" render={({ field }) => <FormItem><FormLabel>Порода</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пол</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{PET_SEX.map((sex) => <SelectItem key={sex} value={sex}>{sexLabels[sex]}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Возраст</FormLabel>
                    <div className="flex gap-2">
                      <Input type="number" min={0} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} />
                      <FormField control={form.control} name="ageUnit" render={({ field: ageField }) => (
                        <Select value={ageField.value} onValueChange={ageField.onChange}>
                          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                          <SelectContent>{AGE_UNITS.map((unit) => <SelectItem key={unit} value={unit}>{ageLabels[unit]}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                    </div>
                    <FormMessage name="age" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Вес (кг)</FormLabel>
                    <FormControl><Input type="number" step="0.1" min={0} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
                    <FormMessage name="weight" />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="medical" className="space-y-4">
            <FormItem>
              <FormLabel>Анализы</FormLabel>
              <FileDropzone multiple onDropFiles={attachmentActions.add} items={attachments} onRemove={attachmentActions.remove} compact />
            </FormItem>
            <FormField control={form.control} name="notes" render={({ field }) => <FormItem><FormLabel>Доп. информация о питомце</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={onCancel}>Отмена</Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
