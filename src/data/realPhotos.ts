/**
 * Galerie de vraies photos haute définition pour chaque modèle et coloris Nike.
 * Photos en studio et gros plans réels avec fallback immédiat vers les silhouettes vectorielles
 * si le réseau bloque l'accès aux images externes.
 */

export interface RealSneakerPhotoPreset {
  id: string;
  name: string;
  colorway: string;
  sku: string;
  imageUrl: string;
  thumbnailUrl: string;
  badge?: string;
}

export const REAL_NIKE_PHOTOS: Record<string, string> = {
  // Air Jordan 1 Retro High Chicago 'Lost & Found' (DZ5485-612)
  'nike-aj1-chicago': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',

  // Air Max 1 '86 OG Big Bubble Sport Red (DQ3989-100)
  'nike-am1-86-og': 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',

  // Dunk Low Retro Panda (DD1391-100)
  'nike-dunk-panda': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',

  // Air Jordan 4 Bred Reimagined (FV5029-006)
  'nike-aj4-bred': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',

  // Nike SB Dunk Low Pro Travis Scott Cactus Jack (CT5053-001)
  'nike-sb-dunk-travis': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',

  // Air Force 1 '07 Triple White (CW2288-111)
  'nike-af1-white': 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80',

  // Kobe 6 Protro Grinch (CW2190-300)
  'nike-kobe-6-grinch': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',

  // Air Max 95 OG Neon (CT1689-001)
  'nike-am95-neon': 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=80',

  // ZoomX Vaporfly NEXT% 3 (DV4129-100)
  'nike-vaporfly-ekiden': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',

  // Nike Air Mag Back To The Future
  'nike-wishlist-airmag': 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
};

// Catalogue de photos réelles prêt à l'emploi lors de l'ajout d'une nouvelle paire
export const CATALOGUE_REAL_PHOTOS: RealSneakerPhotoPreset[] = [
  {
    id: 'chicago',
    name: 'Air Jordan 1 High',
    colorway: 'Chicago (Red & White)',
    sku: 'DZ5485-612',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80',
    badge: 'Iconique',
  },
  {
    id: 'panda',
    name: 'Nike Dunk Low',
    colorway: 'Panda (Black & White)',
    sku: 'DD1391-100',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80',
    badge: 'Populaire',
  },
  {
    id: 'am1',
    name: 'Air Max 1',
    colorway: 'Sport Red OG',
    sku: 'DQ3989-100',
    imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=200&q=80',
    badge: 'Air Max Day',
  },
  {
    id: 'af1',
    name: 'Air Force 1',
    colorway: "'07 Triple White",
    sku: 'CW2288-111',
    imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=200&q=80',
    badge: 'Essentiel',
  },
  {
    id: 'jordan4',
    name: 'Air Jordan 4',
    colorway: 'Bred / Black Cement',
    sku: 'FV5029-006',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=200&q=80',
    badge: 'Graal',
  },
  {
    id: 'travis',
    name: 'Nike Dunk / SB',
    colorway: 'Travis Scott Mocha / Cactus',
    sku: 'CT5053-001',
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=200&q=80',
    badge: 'Collab',
  },
  {
    id: 'running',
    name: 'Nike ZoomX Running',
    colorway: 'Bright Crimson / Sport Red',
    sku: 'DV4129-100',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80',
    badge: 'Performance',
  },
  {
    id: 'retro-court',
    name: 'Nike Vintage Blazer / Court',
    colorway: 'Sail & Midnight Navy',
    sku: 'BQ6806-100',
    imageUrl: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=200&q=80',
    badge: 'Vintage',
  },
  {
    id: 'am95',
    name: 'Air Max 95 / TN',
    colorway: 'Neon / Grey Gradient',
    sku: 'CT1689-001',
    imageUrl: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=200&q=80',
    badge: 'Streetwear',
  },
  {
    id: 'kobe',
    name: 'Kobe Basketball Protro',
    colorway: 'Green Apple / Neon',
    sku: 'CW2190-300',
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=200&q=80',
    badge: 'Mamba',
  },
  {
    id: 'mag',
    name: 'Nike Futuristic Vault',
    colorway: 'Grey & Cyan Glow (Air Mag)',
    sku: 'MAG-2016-01',
    imageUrl: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=200&q=80',
    badge: 'Futuriste',
  },
];
