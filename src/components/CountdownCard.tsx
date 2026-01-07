import { Timer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownCardProps {
  prayerName: string;
  prayerTime: string;
  timeRemaining: string;
}

/**
 * Card untuk menampilkan countdown ke sholat berikutnya
 */
export function CountdownCard({ prayerName, prayerTime, timeRemaining }: CountdownCardProps) {
  return (
    <Card className="glass-card border-2 border-primary/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg">
            <Timer className="h-7 w-7 text-white animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Sholat Berikutnya
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{prayerName}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-primary font-mono">
                {timeRemaining}
              </p>
              <span className="text-sm text-muted-foreground">menuju {prayerTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
