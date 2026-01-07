import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';

/**
 * Halaman Login dengan Google OAuth
 */
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Gagal login dengan Google',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      
      const demoEmail = 'demo@waktusholat.com';
      const demoPassword = 'DemoWaktuSholat2025!@#';
      
      // Coba login dulu dengan akun demo
      let { error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      // Jika login gagal karena user belum ada, buat akun baru
      if (signInError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            data: {
              full_name: 'Demo User',
            },
          },
        });
        
        if (signUpError) {
          throw signUpError;
        }
        
        // Setelah signup, langsung login
        const { error: retrySignInError } = await supabase.auth.signInWithPassword({
          email: demoEmail,
          password: demoPassword,
        });
        
        if (retrySignInError) {
          throw retrySignInError;
        }
      }
      
      toast({
        title: 'Login Berhasil! 🎉',
        description: 'Selamat datang di WaktuSholat',
      });
    } catch (error: any) {
      console.error('Demo login error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal login sebagai demo',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-glow shadow-2xl mb-4">
            <span className="text-4xl">🕌</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">WaktuSholat</h1>
          <p className="text-muted-foreground">Pengingat Sholat Modern & Islami</p>
        </div>

        <Card className="glass-card border-2 border-border/40 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Selamat Datang</CardTitle>
            <CardDescription>
              Masuk dengan akun Google untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk dengan Google'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Atau gunakan demo
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Lanjutkan sebagai Demo
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dengan masuk, Anda menyetujui untuk menerima pengingat waktu sholat
                dan notifikasi dari aplikasi ini.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              ✓ Jadwal Sholat Akurat
            </span>
            <span className="flex items-center gap-2">
              ✓ Doa Harian
            </span>
            <span className="flex items-center gap-2">
              ✓ Notifikasi Pengingat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
