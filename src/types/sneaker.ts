export type ConditionType = 'DS' | 'VNDS' | 'NDS' | 'BEATER' | 'RESTO';

export type BoxConditionType = 'OG Box' | 'Damaged Box' | 'Replacement Box' | 'No Box';

export type SneakerCategory =
  | 'Air Jordan'
  | 'Air Max'
  | 'Dunk & SB'
  | 'Air Force 1'
  | 'Basketball'
  | 'Running'
  | 'Collab / Limited'
  | 'Autre';

export type StatusType = 'collection' | 'wishlist' | 'for_sale' | 'sold';

export type SilhouetteKey =
  | 'jordan1'
  | 'airmax1'
  | 'dunk'
  | 'airforce1'
  | 'jordan4'
  | 'kobe'
  | 'airmax95'
  | 'running'
  | 'generic';

export interface WearLog {
  id: string;
  date: string; // YYYY-MM-DD
  occasion?: string;
}

export interface Sneaker {
  id: string;
  model: string;
  colorway: string;
  sku: string;
  category: SneakerCategory;
  sizeUS: string;
  sizeEU: string;
  sizeCM: string;
  sizeUK?: string;
  condition: ConditionType;
  boxCondition: BoxConditionType;
  hasReceipt: boolean;
  extraLaces: boolean;
  purchasePrice: number;
  marketValue: number;
  purchaseDate: string; // YYYY-MM-DD
  purchaseLocation: string;
  status: StatusType;
  wearCount: number;
  wearHistory: WearLog[];
  rating: number; // 1-5
  isFavorite: boolean;
  imageUrl?: string;
  silhouetteKey: SilhouetteKey;
  colorHex: string;
  accentColorHex?: string;
  releaseYear?: number;
  notes?: string;
  targetPrice?: number; // For wishlist items
  createdAt: string;
}

export type SortField =
  | 'dateAdded'
  | 'marketValueDesc'
  | 'marketValueAsc'
  | 'purchasePriceDesc'
  | 'wearCountDesc'
  | 'wearCountAsc'
  | 'profitDesc'
  | 'nameAsc';

export interface FilterState {
  search: string;
  category: string; // 'all' | SneakerCategory
  status: string; // 'all' | StatusType
  condition: string; // 'all' | ConditionType
  sizeEU: string; // 'all' | specific size
  onlyFavorites: boolean;
}
