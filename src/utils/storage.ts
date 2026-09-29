import { Sneaker } from '../types/sneaker';
import { DEFAULT_SNEAKERS } from '../data/defaultSneakers';
import { REAL_NIKE_PHOTOS } from '../data/realPhotos';

const STORAGE_KEY = 'nike_vault_sneakers_v2'; // bumped to v2 for real photos migration

export function loadSneakers(): Sneaker[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('nike_vault_sneakers_v1');
    if (!raw) {
      saveSneakers(DEFAULT_SNEAKERS);
      return DEFAULT_SNEAKERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Enrich existing stored sneakers with real photos if missing
      const enriched = parsed.map((s: Sneaker) => {
        if (!s.imageUrl && REAL_NIKE_PHOTOS[s.id]) {
          return { ...s, imageUrl: REAL_NIKE_PHOTOS[s.id] };
        }
        return s;
      });
      saveSneakers(enriched);
      return enriched;
    }
    return DEFAULT_SNEAKERS;
  } catch (err) {
    console.error('Erreur lors du chargement des souliers:', err);
    return DEFAULT_SNEAKERS;
  }
}

export function saveSneakers(sneakers: Sneaker[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sneakers));
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err);
  }
}

export function exportToJSON(sneakers: Sneaker[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sneakers, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  const date = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute('download', `max-nike-vault-collection-${date}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCSV(sneakers: Sneaker[]): void {
  const headers = [
    'Modèle',
    'Coloris',
    'SKU',
    'Catégorie',
    'Pointure US',
    'Pointure EU',
    'État',
    'Boîte',
    'Facture',
    'Prix Achat (€)',
    'Cote Estimée (€)',
    'Plus-Value (€)',
    'Portées',
    'Date Achat',
    'Lieu Achat',
    'Statut',
    'Favori',
    'Notes',
  ];

  const rows = sneakers.map((s) => [
    `"${(s.model || '').replace(/"/g, '""')}"`,
    `"${(s.colorway || '').replace(/"/g, '""')}"`,
    `"${s.sku || ''}"`,
    `"${s.category || ''}"`,
    `"${s.sizeUS || ''}"`,
    `"${s.sizeEU || ''}"`,
    `"${s.condition || ''}"`,
    `"${s.boxCondition || ''}"`,
    s.hasReceipt ? 'Oui' : 'Non',
    s.purchasePrice || 0,
    s.marketValue || 0,
    (s.marketValue || 0) - (s.purchasePrice || 0),
    s.wearCount || 0,
    `"${s.purchaseDate || ''}"`,
    `"${(s.purchaseLocation || '').replace(/"/g, '""')}"`,
    `"${s.status || ''}"`,
    s.isFavorite ? 'Oui' : 'Non',
    `"${(s.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  const date = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `max-nike-vault-collection-${date}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function parseSneakersImport(jsonString: string): Sneaker[] {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) {
    throw new Error('Le fichier importé doit être une liste de souliers (tableau JSON).');
  }
  return parsed.map((item, idx) => ({
    ...item,
    id: item.id || `imported-${Date.now()}-${idx}`,
    wearHistory: Array.isArray(item.wearHistory) ? item.wearHistory : [],
    wearCount: typeof item.wearCount === 'number' ? item.wearCount : 0,
    purchasePrice: Number(item.purchasePrice) || 0,
    marketValue: Number(item.marketValue) || 0,
    rating: Number(item.rating) || 5,
    isFavorite: Boolean(item.isFavorite),
    createdAt: item.createdAt || new Date().toISOString(),
  }));
}
