import { useState } from 'react';
import { Header } from '@/components/Header';
import { CitySelector } from '@/components/CitySelector';
import { QiblaCard } from '@/components/QiblaCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QiblaPageProps {
  user: any;
  onLogout: () => void;
}

/**
 * Halaman khusus untuk fitur arah kiblat
 */
export default function QiblaPage({ user, onLogout }: QiblaPageProps) {
  const [selectedCity, setSelectedCity] = useState('Jakarta');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-background">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
          <div className="text-5xl mb-3">🧭</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Arah Kiblat</h1>
          <p className="text-muted-foreground">
            Temukan arah kiblat dari kota Anda
          </p>
        </div>

        {/* City Selector */}
        <div className="mb-6 animate-slide-up">
          <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
        </div>

        {/* Qibla Card */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <QiblaCard city={selectedCity} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-6 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 WaktuSholat. Semoga bermanfaat untuk ibadah kita semua 🤲</p>
        </div>
      </footer>
    </div>
  );
}
