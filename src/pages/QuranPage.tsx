import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface QuranPageProps {
  user: any;
  onLogout: () => void;
}

export default function QuranPage({ user, onLogout }: QuranPageProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setSurahs(data.data);
    } catch (err) {
      console.error('Error fetching surahs:', err);
      setError(true);
      toast.error('Gagal memuat data, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-background">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Al-Qur'an
          </h1>
          <p className="text-muted-foreground">
            Daftar 114 Surah dalam Al-Qur'an
          </p>
        </div>

        {loading && (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Card className="glass-card border-destructive/20">
            <CardContent className="p-8 text-center">
              <p className="text-destructive mb-4">❌ Gagal memuat data, coba lagi.</p>
              <button
                onClick={fetchSurahs}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Muat Ulang
              </button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (
          <div className="space-y-3 animate-slide-up">
            {surahs.map((surah, index) => (
              <Link
                key={surah.number}
                to={`/quran/${surah.number}`}
                className="block animate-slide-up hover-scale"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <Card className="glass-card border-primary/20 hover:shadow-elegant transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Nomor Surah */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform">
                        {surah.number}
                      </div>

                      {/* Info Surah */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-lg truncate">
                            {surah.englishName}
                          </h3>
                          <p className="text-xl font-arabic text-right" dir="rtl">
                            {surah.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{surah.englishNameTranslation}</span>
                          <span>•</span>
                          <span>{surah.numberOfAyahs} Ayat</span>
                          <span>•</span>
                          <span>{surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
