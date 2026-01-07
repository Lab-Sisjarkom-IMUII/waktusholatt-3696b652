import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass } from 'lucide-react';

interface QiblaCardProps {
  city: string;
}

// Data arah kiblat untuk kota-kota di Indonesia (dalam derajat dari Utara)
const qiblaDirections: Record<string, number> = {
  // Sumatera
  'Banda Aceh': 292,
  'Medan': 294,
  'Padang': 295,
  'Pekanbaru': 294,
  'Jambi': 294,
  'Palembang': 295,
  'Bengkulu': 295,
  'Bandar Lampung': 295,
  'Batam': 294,
  'Pangkal Pinang': 295,
  
  // Jawa
  'Jakarta': 295,
  'Bogor': 295,
  'Depok': 295,
  'Tangerang': 295,
  'Bekasi': 295,
  'Serang': 295,
  'Bandung': 294,
  'Cirebon': 294,
  'Tasikmalaya': 294,
  'Semarang': 293,
  'Surakarta': 293,
  'Tegal': 294,
  'Yogyakarta': 293,
  'Surabaya': 292,
  'Malang': 292,
  'Kediri': 292,
  'Madiun': 293,
  'Probolinggo': 291,
  
  // Kalimantan
  'Pontianak': 291,
  'Palangkaraya': 290,
  'Banjarmasin': 290,
  'Balikpapan': 288,
  'Samarinda': 288,
  'Tarakan': 286,
  
  // Sulawesi
  'Makassar': 286,
  'Manado': 282,
  'Palu': 285,
  'Kendari': 285,
  'Gorontalo': 283,
  
  // Bali & Nusa Tenggara
  'Denpasar': 287,
  'Mataram': 286,
  'Kupang': 281,
  
  // Maluku & Papua
  'Ambon': 280,
  'Ternate': 280,
  'Jayapura': 274,
  'Manokwari': 276,
  'Sorong': 278,
};

/**
 * Komponen untuk menampilkan arah kiblat berdasarkan kota
 */
export function QiblaCard({ city }: QiblaCardProps) {
  const qiblaAngle = qiblaDirections[city] || 295;

  return (
    <Card className="glass-card border-primary/20 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Compass className="h-5 w-5 text-primary" />
          Arah Kiblat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Kompas Visual */}
        <div className="relative w-48 h-48">
          {/* Lingkaran luar kompas */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.3"
            />
            
            {/* Cardinal directions */}
            <text x="100" y="20" textAnchor="middle" className="fill-primary font-semibold text-sm">
              U
            </text>
            <text x="180" y="105" textAnchor="middle" className="fill-muted-foreground text-xs">
              T
            </text>
            <text x="100" y="190" textAnchor="middle" className="fill-muted-foreground text-xs">
              S
            </text>
            <text x="20" y="105" textAnchor="middle" className="fill-muted-foreground text-xs">
              B
            </text>

            {/* Degree markers */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const radian = (angle - 90) * (Math.PI / 180);
              const x1 = 100 + 80 * Math.cos(radian);
              const y1 = 100 + 80 * Math.sin(radian);
              const x2 = 100 + 85 * Math.cos(radian);
              const y2 = 100 + 85 * Math.sin(radian);
              
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}

            {/* Qibla direction arrow */}
            <g transform={`rotate(${qiblaAngle} 100 100)`}>
              {/* Arrow shaft */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Arrow head */}
              <polygon
                points="100,20 95,35 105,35"
                fill="hsl(var(--primary))"
              />
              {/* Center dot */}
              <circle
                cx="100"
                cy="100"
                r="5"
                fill="hsl(var(--primary))"
              />
            </g>
          </svg>
        </div>

        {/* Info text */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{qiblaAngle}°</div>
          <p className="text-sm text-muted-foreground">
            Arah kiblat dari {city}
          </p>
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 mt-4">
            <p className="mb-1">💡 <span className="font-semibold">Petunjuk:</span></p>
            <p>Hadapkan perangkat ke arah Utara, lalu putar searah jarum jam sebesar {qiblaAngle}° untuk menghadap kiblat.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
