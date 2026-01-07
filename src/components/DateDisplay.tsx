import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DateDisplayProps {
  gregorian: string;
  hijri: string;
}

/**
 * Display untuk tanggal Masehi dan Hijriyah
 */
export function DateDisplay({ gregorian, hijri }: DateDisplayProps) {
  return (
    <Card className="glass-card border-border/40">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{gregorian}</p>
            <p className="text-xs text-muted-foreground">{hijri} H</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
