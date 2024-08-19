import { Toaster } from '../ui/sonner';

export const ColorToaster = () => {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-white group-[.toast]:text-black',
          error:
            'group toast group-[.toaster]:bg-red-100 group-[.toaster]:text-red-600 dark:group-[.toaster]:text-foreground group-[.toaster]:shadow-lg',
          success:
            'group toast group-[.toaster]:bg-green-100 group-[.toaster]:text-green-600 dark:group-[.toaster]:text-foreground group-[.toaster]:shadow-lg',
          warning:
            'group toast group-[.toaster]:bg-yellow-100 group-[.toaster]:text-yellow-600 dark:group-[.toaster]:text-foreground group-[.toaster]:shadow-lg',
          info: 'group toast group-[.toaster]:bg-gray-100 group-[.toaster]:text-gray-600 dark:group-[.toaster]:text-foreground group-[.toaster]:shadow-lg'
        }
      }}
    />
  );
};
