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

/**
 * Auto-detect the best calculation method for a given country code.
 * Returns the Aladhan API method number as a string.
 *
 * Method reference:
 *  2  = ISNA (North America — US, CA)
 *  3  = MWL  (Muslim World League — Europe, Africa, Americas outside NA)
 *  4  = Umm al-Qura (Saudi Arabia)
 *  5  = Egyptian (Egypt, North Africa)
 *  8  = Gulf (UAE, Bahrain, Kuwait, Oman)
 * 12  = Karachi / Hanafi (Pakistan, India, Bangladesh, Afghanistan)
 * 14  = Qatar
 * 15  = Singapore / Malaysia / Indonesia
 * 21  = Dubai
 */
export function getMethodForCountry(countryCode: string): string {
  const code = (countryCode || '').toUpperCase();

  // Saudi Arabia
  if (code === 'SA') return '4';

  // UAE / Dubai
  if (code === 'AE') return '21';

  // Qatar
  if (code === 'QA') return '14';

  // Gulf region
  if (['KW','BH','OM'].includes(code)) return '8';

  // Egypt + North Africa
  if (['EG','LY','TN','DZ','MA'].includes(code)) return '5';

  // South/Southeast Asia
  if (['PK','IN','BD','AF'].includes(code)) return '12';
  if (['SG','MY','ID'].includes(code)) return '15';

  // North America
  if (['US','CA'].includes(code)) return '2';

  // Europe, UK, France, Spain, Germany, etc. + sub-Saharan Africa → MWL
  if (['GB','FR','DE','ES','IT','NL','BE','SE','NO','DK','FI','AT','CH',
       'PT','PL','IE','GR','RO','HU','CZ','SK','HR','RS','BG','UA','TR',
       'NG','GH','SN','CI','ML','BF','NE','TD','CM','SD','ET','KE','TZ',
       'UG','ZA','MZ','AO','CD','ZM','ZW','MG','MR','GM','SL','LR',
       'RW','BI','SO','DJ','ER',
       'MX','BR','AR','CO','CL','PE','VE','EC','BO','PY','UY',
       'AU','NZ',
       'RU','KZ','UZ','TM','KG','TJ','AZ','GE','AM'].includes(code)) return '3';

  // Middle East / Levant → MWL as default
  if (['JO','LB','SY','IQ','IR','YE','PS'].includes(code)) return '3';

  // Default → MWL (safest international choice)
  return '3';
}

export async function getPrayerTimes(lat: number, lng: number, method: number = 3): Promise<PrayerTimes> {
  const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`);
  const data = await response.json();
  return data.data.timings;
}

export async function searchCity(query: string): Promise<CityInfo[]> {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`);
  const data = await response.json();
  if (!data.results) return [];
  return data.results.map((r: any) => ({
    name: r.name,
    country: r.country,
    countryCode: r.country_code || '',
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function getCityFromCoords(lat: number, lng: number): Promise<{ city: string; countryCode: string }> {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return {
      city: data.city || data.locality || 'Your Location',
      countryCode: data.countryCode || '',
    };
  } catch {
    return { city: 'Your Location', countryCode: '' };
  }
}
