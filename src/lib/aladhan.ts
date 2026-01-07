/**
 * Aladhan API Integration
 * Mengambil jadwal waktu sholat berdasarkan kota
 */

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface DateInfo {
  gregorian: string;
  hijri: string;
}

export interface PrayerData {
  times: PrayerTimes;
  date: DateInfo;
}

// Daftar kota yang tersedia (Ibukota Provinsi & Kota Besar di Indonesia)
export const CITIES = [
  // Sumatera
  { name: 'Banda Aceh', value: 'Banda Aceh' },
  { name: 'Medan', value: 'Medan' },
  { name: 'Padang', value: 'Padang' },
  { name: 'Pekanbaru', value: 'Pekanbaru' },
  { name: 'Jambi', value: 'Jambi' },
  { name: 'Palembang', value: 'Palembang' },
  { name: 'Bengkulu', value: 'Bengkulu' },
  { name: 'Bandar Lampung', value: 'Bandar Lampung' },
  { name: 'Batam', value: 'Batam' },
  { name: 'Pangkal Pinang', value: 'Pangkal Pinang' },
  
  // Jawa
  { name: 'Jakarta', value: 'Jakarta' },
  { name: 'Bogor', value: 'Bogor' },
  { name: 'Depok', value: 'Depok' },
  { name: 'Tangerang', value: 'Tangerang' },
  { name: 'Bekasi', value: 'Bekasi' },
  { name: 'Serang', value: 'Serang' },
  { name: 'Bandung', value: 'Bandung' },
  { name: 'Cirebon', value: 'Cirebon' },
  { name: 'Tasikmalaya', value: 'Tasikmalaya' },
  { name: 'Semarang', value: 'Semarang' },
  { name: 'Surakarta', value: 'Surakarta' },
  { name: 'Tegal', value: 'Tegal' },
  { name: 'Yogyakarta', value: 'Yogyakarta' },
  { name: 'Surabaya', value: 'Surabaya' },
  { name: 'Malang', value: 'Malang' },
  { name: 'Kediri', value: 'Kediri' },
  { name: 'Madiun', value: 'Madiun' },
  { name: 'Probolinggo', value: 'Probolinggo' },
  
  // Kalimantan
  { name: 'Pontianak', value: 'Pontianak' },
  { name: 'Palangkaraya', value: 'Palangkaraya' },
  { name: 'Banjarmasin', value: 'Banjarmasin' },
  { name: 'Balikpapan', value: 'Balikpapan' },
  { name: 'Samarinda', value: 'Samarinda' },
  { name: 'Tarakan', value: 'Tarakan' },
  
  // Sulawesi
  { name: 'Makassar', value: 'Makassar' },
  { name: 'Manado', value: 'Manado' },
  { name: 'Palu', value: 'Palu' },
  { name: 'Kendari', value: 'Kendari' },
  { name: 'Gorontalo', value: 'Gorontalo' },
  
  // Bali & Nusa Tenggara
  { name: 'Denpasar', value: 'Denpasar' },
  { name: 'Mataram', value: 'Mataram' },
  { name: 'Kupang', value: 'Kupang' },
  
  // Maluku & Papua
  { name: 'Ambon', value: 'Ambon' },
  { name: 'Ternate', value: 'Ternate' },
  { name: 'Jayapura', value: 'Jayapura' },
  { name: 'Manokwari', value: 'Manokwari' },
  { name: 'Sorong', value: 'Sorong' },
].sort((a, b) => a.name.localeCompare(b.name)); // Diurutkan alfabetis

/**
 * Mengambil jadwal sholat dari Aladhan API
 * @param city - Nama kota
 * @returns Promise dengan data jadwal sholat
 */
export async function getPrayerTimes(city: string): Promise<PrayerData> {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }
    
    const data = await response.json();
    const timings = data.data.timings;
    const date = data.data.date;
    
    return {
      times: {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      },
      date: {
        gregorian: `${date.gregorian.day} ${date.gregorian.month.en} ${date.gregorian.year}`,
        hijri: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`,
      },
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

/**
 * Mendapatkan waktu sholat berikutnya
 * @param times - Objek waktu sholat
 * @returns Nama sholat berikutnya dan waktu tersisa
 */
export function getNextPrayer(times: PrayerTimes): {
  name: string;
  time: string;
  timeRemaining: string;
} | null {
  const now = new Date();
  const prayers = [
    { name: 'Subuh', time: times.Fajr },
    { name: 'Dzuhur', time: times.Dhuhr },
    { name: 'Ashar', time: times.Asr },
    { name: 'Maghrib', time: times.Maghrib },
    { name: 'Isya', time: times.Isha },
  ];
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = new Date(now);
    prayerTime.setHours(hours, minutes, 0, 0);
    
    if (prayerTime > now) {
      const diff = prayerTime.getTime() - now.getTime();
      const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);
      
      return {
        name: prayer.name,
        time: prayer.time,
        timeRemaining: `${hoursRemaining}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`,
      };
    }
  }
  
  // Jika sudah lewat Isya, sholat berikutnya adalah Subuh besok
  const [hours, minutes] = times.Fajr.split(':').map(Number);
  const fajrTomorrow = new Date(now);
  fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
  fajrTomorrow.setHours(hours, minutes, 0, 0);
  
  const diff = fajrTomorrow.getTime() - now.getTime();
  const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    name: 'Subuh',
    time: times.Fajr,
    timeRemaining: `${hoursRemaining}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`,
  };
}
