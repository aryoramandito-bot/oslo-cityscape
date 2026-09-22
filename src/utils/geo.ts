export interface Coordinates {
  lat: number;
  lng: number;
}

export const CITY_CENTERS: Record<string, Coordinates> = {
  jakarta: { lat: -6.175392, lng: 106.827153 }, // Monas
  bandung: { lat: -6.9025, lng: 107.6186 },    // Gedung Sate
  solo: { lat: -7.5666, lng: 110.8283 },       // Keraton / Slamet Riyadi
  laweyan: { lat: -7.5685, lng: 110.7935 },    // Kampung Batik Laweyan / Jl. Sidoluhur
};

/**
 * Calculates great-circle distance between two geographic coordinates using the Haversine formula.
 * @returns Distance in meters
 */
export function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Formats a distance in meters into human-readable string (e.g. "350 m" or "2.4 km").
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

/**
 * Checks if a user is within a given radius of a target site (default 500m for smart check-in).
 */
export function isWithinCheckinRadius(
  userLat: number,
  userLng: number,
  siteLat: number,
  siteLng: number,
  thresholdMeters = 500
): boolean {
  return getDistanceInMeters(userLat, userLng, siteLat, siteLng) <= thresholdMeters;
}
