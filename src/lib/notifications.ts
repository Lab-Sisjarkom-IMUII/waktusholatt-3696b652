/**
 * Web Notification API untuk pengingat waktu sholat
 */

/**
 * Meminta izin notifikasi dari browser
 * @returns Promise dengan status izin
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.log('Browser tidak mendukung notifikasi');
    return 'denied';
  }
  
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }
  
  return Notification.permission;
}

/**
 * Mengirim notifikasi pengingat sholat
 * @param prayerName - Nama waktu sholat
 */
export function sendPrayerNotification(prayerName: string): void {
  if (Notification.permission === 'granted') {
    const notification = new Notification('Waktu Sholat 🕌', {
      body: `Waktu ${prayerName} akan segera tiba. Persiapkan diri untuk sholat.`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'prayer-time',
      requireInteraction: false,
      silent: false,
    });
    
    // Auto close notification after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
    
    // Optional: Play notification sound
    playNotificationSound();
  }
}

/**
 * Memainkan suara notifikasi (opsional)
 */
function playNotificationSound(): void {
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLPejgGI3vK8N+WQQsVYLXq66tWFgpDod7vs3U3B');
    audio.play().catch(() => {
      // Ignore error jika browser block autoplay
    });
  } catch (error) {
    console.log('Cannot play notification sound:', error);
  }
}

/**
 * Mengecek apakah sudah waktunya mengirim notifikasi (5 menit sebelum waktu sholat)
 * @param prayerTime - Waktu sholat dalam format HH:mm
 * @returns boolean
 */
export function shouldNotify(prayerTime: string): boolean {
  const now = new Date();
  const [hours, minutes] = prayerTime.split(':').map(Number);
  
  const prayerDateTime = new Date(now);
  prayerDateTime.setHours(hours, minutes, 0, 0);
  
  // Notifikasi 5 menit sebelum waktu sholat
  const notifyTime = new Date(prayerDateTime.getTime() - 5 * 60 * 1000);
  
  // Cek apakah waktu sekarang dalam range 5 menit sebelum waktu sholat
  const diff = prayerDateTime.getTime() - now.getTime();
  const minutesUntilPrayer = Math.floor(diff / (1000 * 60));
  
  return minutesUntilPrayer === 5;
}
