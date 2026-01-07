import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

interface QuranDetailPageProps {
  user: any;
  onLogout: () => void;
}

export default function QuranDetailPage({ user, onLogout }: QuranDetailPageProps) {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (surahNumber) {
      fetchSurahDetail(surahNumber);
    }
  }, [surahNumber]);

  const fetchSurahDetail = async (number: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}/id.indonesian`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setSurah(data.data);
    } catch (err) {
      console.error('Error fetching surah detail:', err);
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
          to="/quran"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Surah
        </Link>

        {loading && (
          <div className="space-y-6">
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </CardContent>
            </Card>
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
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
                onClick={() => surahNumber && fetchSurahDetail(surahNumber)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Muat Ulang
              </button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && surah && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Surah */}
            <Card className="glass-card border-primary/20">
              <CardContent className="p-6 text-center">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {surah.englishName}
                </h1>
                <p className="text-4xl font-arabic mb-2" dir="rtl">
                  {surah.name}
                </p>
                <p className="text-muted-foreground">
                  {surah.englishNameTranslation}
                </p>
                <div className="flex items-center justify-center gap-3 mt-3 text-sm text-muted-foreground">
                  <span>Surah ke-{surah.number}</span>
                  <span>•</span>
                  <span>{surah.numberOfAyahs} Ayat</span>
                  <span>•</span>
                  <span>{surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Bismillah (kecuali At-Taubah) */}
            {surah.number !== 9 && (
              <div className="text-center py-6">
                <p className="text-3xl font-arabic" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
                </p>
              </div>
            )}

            {/* Daftar Ayat */}
            <div className="space-y-4">
              {surah.ayahs.map((ayah, index) => (
                <Card
                  key={ayah.number}
                  className="glass-card border-primary/20 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Nomor Ayat */}
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {ayah.numberInSurah}
                      </div>
                    </div>

                    {/* Teks Arab */}
                    <div className="text-right" dir="rtl">
                      <p className="text-2xl md:text-3xl font-arabic leading-loose">
                        {ayah.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
