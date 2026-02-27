import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

export const Form = FormProvider;

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

export const FormItem = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn('space-y-2', className)} {...props} />;

export const FormLabel = ({ className, required, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) => (
  <label className={cn('text-sm font-medium', className)} {...props}>
    {props.children}
    {required && <span className="ml-1 text-destructive">*</span>}
  </label>
);

export const FormControl = ({ children }: { children: ReactNode }) => <>{children}</>;

export const FormMessage = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const message = name.split('.').reduce<any>((acc, key) => acc?.[key], errors)?.message as string | undefined;
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
};
