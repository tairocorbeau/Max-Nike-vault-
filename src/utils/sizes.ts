export interface SizeEntry {
  us: string;
  eu: string;
  cm: string;
  uk: string;
}

export const NIKE_SIZE_CHART: SizeEntry[] = [
  { us: '6', eu: '38.5', cm: '24', uk: '5.5' },
  { us: '6.5', eu: '39', cm: '24.5', uk: '6' },
  { us: '7', eu: '40', cm: '25', uk: '6' },
  { us: '7.5', eu: '40.5', cm: '25.5', uk: '6.5' },
  { us: '8', eu: '41', cm: '26', uk: '7' },
  { us: '8.5', eu: '42', cm: '26.5', uk: '7.5' },
  { us: '9', eu: '42.5', cm: '27', uk: '8' },
  { us: '9.5', eu: '43', cm: '27.5', uk: '8.5' },
  { us: '10', eu: '44', cm: '28', uk: '9' },
  { us: '10.5', eu: '44.5', cm: '28.5', uk: '9.5' },
  { us: '11', eu: '45', cm: '29', uk: '10' },
  { us: '11.5', eu: '45.5', cm: '29.5', uk: '10.5' },
  { us: '12', eu: '46', cm: '30', uk: '11' },
  { us: '12.5', eu: '47', cm: '30.5', uk: '11.5' },
  { us: '13', eu: '47.5', cm: '31', uk: '12' },
  { us: '14', eu: '48.5', cm: '32', uk: '13' },
  { us: '15', eu: '49.5', cm: '33', uk: '14' },
];

export function findSizeByUS(us: string): SizeEntry | undefined {
  return NIKE_SIZE_CHART.find((s) => s.us === us);
}

export function findSizeByEU(eu: string): SizeEntry | undefined {
  return NIKE_SIZE_CHART.find((s) => s.eu === eu);
}

export const POPULAR_NIKE_MODELS = [
  { name: 'Air Jordan 1 Retro High OG', category: 'Air Jordan', silhouette: 'jordan1' },
  { name: 'Air Jordan 1 Low OG', category: 'Air Jordan', silhouette: 'jordan1' },
  { name: 'Air Jordan 3 Retro', category: 'Air Jordan', silhouette: 'jordan4' },
  { name: 'Air Jordan 4 Retro', category: 'Air Jordan', silhouette: 'jordan4' },
  { name: 'Air Jordan 11 Retro', category: 'Air Jordan', silhouette: 'jordan4' },
  { name: 'Air Max 1', category: 'Air Max', silhouette: 'airmax1' },
  { name: 'Air Max 1 \'86 OG', category: 'Air Max', silhouette: 'airmax1' },
  { name: 'Air Max 90', category: 'Air Max', silhouette: 'airmax1' },
  { name: 'Air Max 95', category: 'Air Max', silhouette: 'airmax95' },
  { name: 'Air Max 97', category: 'Air Max', silhouette: 'airmax95' },
  { name: 'Air Max Plus TN', category: 'Air Max', silhouette: 'airmax95' },
  { name: 'Dunk Low Retro', category: 'Dunk & SB', silhouette: 'dunk' },
  { name: 'Nike SB Dunk Low Pro', category: 'Dunk & SB', silhouette: 'dunk' },
  { name: 'Air Force 1 \'07', category: 'Air Force 1', silhouette: 'airforce1' },
  { name: 'Air Force 1 Low Supreme', category: 'Air Force 1', silhouette: 'airforce1' },
  { name: 'Kobe 6 Protro', category: 'Basketball', silhouette: 'kobe' },
  { name: 'Kobe 8 Protro', category: 'Basketball', silhouette: 'kobe' },
  { name: 'ZoomX Vaporfly NEXT% 3', category: 'Running', silhouette: 'running' },
  { name: 'Air Zoom Alphafly NEXT%', category: 'Running', silhouette: 'running' },
  { name: 'Nike x Travis Scott', category: 'Collab / Limited', silhouette: 'dunk' },
  { name: 'Nike x Off-White', category: 'Collab / Limited', silhouette: 'jordan1' },
];
