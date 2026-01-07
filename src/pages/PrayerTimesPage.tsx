import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CitySelector } from '@/components/CitySelector';
import { PrayerTimeCard } from '@/components/PrayerTimeCard';
import { CountdownCard } from '@/components/CountdownCard';
import { DateDisplay } from '@/components/DateDisplay';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, ArrowLeft } from 'lucide-react';
import { getPrayerTimes, getNextPrayer, PrayerData } from '@/lib/aladhan';
import { requestNotificationPermission, sendPrayerNotification, shouldNotify } from '@/lib/notifications';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PrayerTimesPageProps {
  user: any;
  onLogout: () => void;
}

/**
 * Halaman khusus untuk jadwal waktu sholat
 */
export default function PrayerTimesPage({ user, onLogout }: PrayerTimesPageProps) {
  const [selectedCity, setSelectedCity] = useState('Jakarta');
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch prayer times saat city berubah
  useEffect(() => {
    loadPrayerTimes();
  }, [selectedCity]);

  // Update countdown setiap detik
  useEffect(() => {
    if (prayerData?.times) {
      const interval = setInterval(() => {
        const next = getNextPrayer(prayerData.times);
        setNextPrayer(next);

        // Cek apakah perlu kirim notifikasi
        if (notificationsEnabled && next) {
          if (shouldNotify(next.time)) {
            sendPrayerNotification(next.name);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [prayerData, notificationsEnabled]);

  const loadPrayerTimes = async () => {
    try {
      const data = await getPrayerTimes(selectedCity);
      setPrayerData(data);
      const next = getNextPrayer(data.times);
      setNextPrayer(next);
    } catch (error) {
      toast({
        title: 'Gagal memuat jadwal sholat',
        description: 'Silakan coba lagi nanti',
        variant: 'destructive',
      });
    }
  };

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      setNotificationsEnabled(true);
      toast({
        title: 'Notifikasi Diaktifkan ✅',
        description: 'Anda akan menerima pengingat 5 menit sebelum waktu sholat',
      });
    } else {
      toast({
        title: 'Notifikasi Ditolak',
        description: 'Silakan aktifkan notifikasi di pengaturan browser',
        variant: 'destructive',
      });
    }
  };

  const prayers = [
    { name: 'Subuh', time: prayerData?.times.Fajr || '00:00' },
    { name: 'Dzuhur', time: prayerData?.times.Dhuhr || '00:00' },
    { name: 'Ashar', time: prayerData?.times.Asr || '00:00' },
    { name: 'Maghrib', time: prayerData?.times.Maghrib || '00:00' },
    { name: 'Isya', time: prayerData?.times.Isha || '00:00' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-background">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Button>

        {/* Page Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-5xl mb-3">⏰</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Jadwal Sholat</h1>
          <p className="text-muted-foreground">
            Waktu sholat 5 waktu untuk hari ini
          </p>
        </div>

        {/* Date & City Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in">
          {prayerData && (
            <DateDisplay
              gregorian={prayerData.date.gregorian}
              hijri={prayerData.date.hijri}
            />
          )}
          <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
        </div>

        {/* Notification Button */}
        <div className="mb-6 animate-slide-up">
          <Button
            onClick={handleEnableNotifications}
            disabled={notificationsEnabled}
            className={`w-full md:w-auto ${
              notificationsEnabled
                ? 'bg-primary/20 text-primary hover:bg-primary/30'
                : 'bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg'
            }`}
          >
            {notificationsEnabled ? (
              <>
                <Bell className="mr-2 h-5 w-5" />
                Pengingat Aktif
              </>
            ) : (
              <>
                <BellOff className="mr-2 h-5 w-5" />
                Aktifkan Pengingat Sholat
              </>
            )}
          </Button>
        </div>

        {/* Countdown Card */}
        {nextPrayer && (
          <div className="mb-6 animate-slide-up">
            <CountdownCard
              prayerName={nextPrayer.name}
              prayerTime={nextPrayer.time}
              timeRemaining={nextPrayer.timeRemaining}
            />
          </div>
        )}

        {/* Prayer Time Cards */}
        <div className="space-y-3">
          {prayers.map((prayer, index) => (
            <div
              key={prayer.name}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PrayerTimeCard
                name={prayer.name}
                time={prayer.time}
                isNext={nextPrayer?.name === prayer.name}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-6 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 WaktuSholat. Data dari Aladhan API.</p>
          <p className="mt-1">Semoga bermanfaat untuk ibadah kita semua 🤲</p>
        </div>
      </footer>
    </div>
  );
}
