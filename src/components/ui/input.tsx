import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-11 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/30',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';
