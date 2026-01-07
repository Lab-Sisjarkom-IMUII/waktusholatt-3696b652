import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface SettingPageProps {
  user: any;
  onLogout: () => void;
}

export default function SettingPage({ user, onLogout }: SettingPageProps) {
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  // Load setting dari localStorage saat component mount
  useEffect(() => {
    const saved = localStorage.getItem('prayerNotificationEnabled');
    if (saved !== null) {
      setNotificationEnabled(saved === 'true');
    }
  }, []);

  // Handle toggle change
  const handleToggleChange = (checked: boolean) => {
    setNotificationEnabled(checked);
    localStorage.setItem('prayerNotificationEnabled', String(checked));
    toast.success(
      checked 
        ? 'Notifikasi sholat diaktifkan' 
        : 'Notifikasi sholat dinonaktifkan'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-background">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 text-center">⚙️ Pengaturan</h1>

          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle>Notifikasi</CardTitle>
              <CardDescription>
                Kelola pengaturan notifikasi aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <Label htmlFor="notification-toggle" className="text-base font-medium">
                    Aktifkan Notifikasi Sholat
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dapatkan pengingat otomatis saat waktu sholat tiba
                  </p>
                </div>
                <Switch
                  id="notification-toggle"
                  checked={notificationEnabled}
                  onCheckedChange={handleToggleChange}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
            💡 Fitur notifikasi akan segera diimplementasikan
          </div>
        </div>
      </main>
    </div>
  );
}
