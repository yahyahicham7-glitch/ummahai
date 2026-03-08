export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export async function getPrayerTimes(lat: number, lng: number, method: number = 2): Promise<PrayerTimes> {
  const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`);
  const data = await response.json();
  return data.data.timings;
}

export async function searchCity(query: string): Promise<CityInfo[]> {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`);
  const data = await response.json();
  if (!data.results) return [];
  return data.results.map((r: any) => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude
  }));
}

export async function getCityFromCoords(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return data.city || data.locality || "Your Location";
  } catch {
    return "Your Location";
  }
}
