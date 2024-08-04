import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/shadcn/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export const ModeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.add(theme);
  }, []);

  const handleThemeClick = (theme: string) => {
    const body = document.body;

    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
      setTheme('light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      setTheme('dark');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 rounded-full px-0 text-xl focus:outline-0">
          {theme === 'light' ? '🔆' : '🌙'}
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeClick('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeClick('dark')}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
