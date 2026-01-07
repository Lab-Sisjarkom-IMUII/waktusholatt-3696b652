import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Clock, Compass, BookOpen, BookMarked, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomeProps {
  user: any;
  onLogout: () => void;
}

/**
 * Halaman beranda dengan menu pilihan fitur
 */
export default function Home({ user, onLogout }: HomeProps) {
  const menuItems = [
    {
      title: 'Waktu Sholat',
      description: 'Lihat jadwal sholat 5 waktu dengan countdown otomatis',
      icon: Clock,
      path: '/prayer-times',
      gradient: 'from-teal-500 to-teal-700',
    },
    {
      title: 'Arah Kiblat',
      description: 'Temukan arah kiblat dengan kompas visual',
      icon: Compass,
      path: '/qibla',
      gradient: 'from-emerald-500 to-emerald-700',
    },
    {
      title: 'Doa Harian',
      description: 'Kumpulan doa-doa harian dengan terjemahan',
      icon: BookOpen,
      path: '/doa',
      gradient: 'from-cyan-500 to-cyan-700',
    },
    {
      title: 'Al-Qur\'an',
      description: 'Baca Al-Qur\'an lengkap dengan terjemahan Indonesia',
      icon: BookMarked,
      path: '/quran',
      gradient: 'from-violet-500 to-violet-700',
    },
    {
      title: 'Pengaturan',
      description: 'Kelola notifikasi dan preferensi aplikasi',
      icon: Settings,
      path: '/settings',
      gradient: 'from-slate-500 to-slate-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-background">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🕌</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            WaktuSholat
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Assalamu'alaikum, <span className="font-semibold text-primary">{user?.name}</span>
          </p>
          <p className="text-muted-foreground mt-2">
            Pilih fitur yang ingin Anda gunakan
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="animate-slide-up hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="glass-card border-primary/20 h-full hover:shadow-elegant transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-muted/30 rounded-lg p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-semibold">Tips:</span> Aktifkan notifikasi untuk mendapat pengingat waktu sholat
          </p>
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
