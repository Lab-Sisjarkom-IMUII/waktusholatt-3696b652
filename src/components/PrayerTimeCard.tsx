import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isNext?: boolean;
}

/**
 * Card untuk menampilkan satu waktu sholat
 */
export function PrayerTimeCard({ name, time, isNext }: PrayerTimeCardProps) {
  return (
    <Card
      className={`
        glass-card hover-glow transition-all duration-300 border-2
        ${isNext 
          ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10' 
          : 'border-border/40 hover:border-primary/30'
        }
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`
                flex h-12 w-12 items-center justify-center rounded-xl
                ${isNext 
                  ? 'bg-gradient-to-br from-primary to-primary-glow' 
                  : 'bg-muted'
                }
              `}
            >
              <Clock className={isNext ? 'h-6 w-6 text-white' : 'h-6 w-6 text-muted-foreground'} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{name}</h3>
              {isNext && (
                <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                  Sholat Berikutnya
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${isNext ? 'text-primary' : 'text-foreground'}`}>
              {time}
            </p>
            <p className="text-xs text-muted-foreground mt-1">WIB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
