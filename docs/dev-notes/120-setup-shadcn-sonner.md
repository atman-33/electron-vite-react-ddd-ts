# shadcn/ui sonner セットアップ

## ステップ

### インストール

shadcn/ui sonner をインストール

### Toaster コンポーネントを実装

`src\renderer\src\components\shadcn\custom\color-toaster.tsx`

```tsx
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
```

`src\renderer\src\pages\_app.tsx`

```tsx
const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-2 p-4">
        <Header href="/" />
      </div>
      {/* NOTE: flex-grow により、フレックスコンテナの余白を自動的に広げる */}
      <div className="flex flex-grow">
        <div className="w-64 border-r-2 px-4 py-4">
          <SidebarNav navItems={navItems} />
        </div>
        <div className="h-full flex-grow">
          <Outlet />
        </div>
+       <ColorToaster />
      </div>
    </div>
  );
};
```

### トースト呼び出し例

e.g.  

```tsx
import { toast } from 'sonner';

  // ...
  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const res = await window.api.registerUser({ name: values.username });

    if (res.status === 'success') {
      toast.success('User registerd.', {
        duration: 2000,
        position: 'bottom-center'
      });
    } else if (res.status === 'error') {
      toast.error(res.message, {
        duration: 10000,
        position: 'bottom-center'
      });
    } else {
      throw new Error('unknown error');
    }
  };
```
