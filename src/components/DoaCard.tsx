import { BookOpen, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DoaCardProps {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  onRefresh: () => void;
}

/**
 * Card untuk menampilkan doa harian
 */
export function DoaCard({ title, arabic, latin, translation, onRefresh }: DoaCardProps) {
  return (
    <Card className="glass-card border-2 border-accent/30 hover-glow h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-secondary">
              <BookOpen className="h-5 w-5 text-accent-foreground" />
            </div>
            <CardTitle className="text-lg">Doa Harian</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            className="rounded-full hover:bg-accent/20 hover:rotate-180 transition-all duration-500"
          >
            <RefreshCw className="h-5 w-5 text-accent" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-accent/5 p-4 border border-accent/20">
          <h4 className="font-semibold text-foreground mb-2">{title}</h4>
          <p className="text-2xl font-arabic text-right leading-loose text-foreground mb-3 py-2">
            {arabic}
          </p>
          <p className="text-sm italic text-muted-foreground mb-2">
            {latin}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-3" />
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">Artinya:</span> {translation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
