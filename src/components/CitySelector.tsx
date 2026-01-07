import { MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CITIES } from '@/lib/aladhan';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

/**
 * Dropdown selector untuk memilih kota
 */
export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="glass-card p-4 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground">
            Pilih Lokasi
          </label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="w-full border-0 bg-transparent p-0 h-auto focus:ring-0 font-semibold text-foreground">
              <SelectValue placeholder="Pilih kota" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {CITIES.map((city) => (
                <SelectItem
                  key={city.value}
                  value={city.value}
                  className="cursor-pointer hover:bg-accent"
                >
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
