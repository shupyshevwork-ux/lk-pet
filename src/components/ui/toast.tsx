import * as ToastPrimitive from '@radix-ui/react-toast';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type ToastItem = { id: string; title: string };

const ToastContext = createContext<{ push: (title: string) => void } | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const value = useMemo(
    () => ({
      push: (title: string) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, title }]);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            className="fixed bottom-4 right-4 z-[70] rounded-2xl border border-border bg-white px-4 py-3 shadow-soft"
            duration={2200}
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((item) => item.id !== toast.id));
            }}
          >
            <ToastPrimitive.Title className="text-sm font-medium">{toast.title}</ToastPrimitive.Title>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[80] flex max-w-[420px] flex-col p-4" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return { toast: ({ title }: { title: string }) => ctx.push(title) };
};
