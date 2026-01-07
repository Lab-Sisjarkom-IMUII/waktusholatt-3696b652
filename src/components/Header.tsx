import { Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

/**
 * Header component dengan profile user dan tombol logout
 */
export function Header({ user, onLogout }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow">
            <span className="text-xl">🕌</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">WaktuSholat</h1>
            <p className="text-xs text-muted-foreground">Pengingat Sholat Modern</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user && (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">
                  {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage 
                  src={user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                  alt={user.user_metadata?.full_name || user.email || 'User'} 
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {(user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
