import { useState } from 'react';
import { Header } from '@/components/Header';
import { DoaCard } from '@/components/DoaCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doaData from '@/data/doa.json';

interface DoaPageProps {
  user: any;
  onLogout: () => void;
}

/**
 * Halaman khusus untuk doa-doa harian
 */
export default function DoaPage({ user, onLogout }: DoaPageProps) {
  const [currentDoa, setCurrentDoa] = useState(doaData[0]);
  const navigate = useNavigate();

  const handleRefreshDoa = () => {
    const randomIndex = Math.floor(Math.random() * doaData.length);
    setCurrentDoa(doaData[randomIndex]);
  };

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
          <div className="text-5xl mb-3">📖</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Doa Harian</h1>
          <p className="text-muted-foreground">
            Kumpulan doa-doa pilihan dengan terjemahan
          </p>
        </div>

        {/* Doa Card */}
        <div className="animate-slide-up">
          <DoaCard
            title={currentDoa.title}
            arabic={currentDoa.arabic}
            latin={currentDoa.latin}
            translation={currentDoa.translation}
            onRefresh={handleRefreshDoa}
          />
        </div>

        {/* Info */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground">
            💡 Klik tombol refresh untuk melihat doa lainnya
          </p>
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
