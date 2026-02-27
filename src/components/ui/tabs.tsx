import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn('inline-flex h-11 items-center rounded-2xl bg-muted p-1', className)} {...props} />
);

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn('inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:shadow-soft', className)}
    {...props}
  />
);

export const TabsContent = TabsPrimitive.Content;
