import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Sparkles,
  DollarSign,
  Palette,
  Image as ImageIcon,
  Check,
  ChevronDown,
} from 'lucide-react';
import {
  Sneaker,
  SneakerCategory,
  ConditionType,
  BoxConditionType,
  StatusType,
  SilhouetteKey,
} from '../types/sneaker';
import { NIKE_SIZE_CHART, POPULAR_NIKE_MODELS, findSizeByUS } from '../utils/sizes';
import { CATALOGUE_REAL_PHOTOS } from '../data/realPhotos';
import { SneakerSilhouette } from './SneakerSilhouette';

interface SneakerFormModalProps {
  isOpen: boolean;
  sneakerToEdit: Sneaker | null;
  onClose: () => void;
  onSave: (sneaker: Sneaker) => void;
}

const CATEGORIES: SneakerCategory[] = [
  'Air Jordan',
  'Air Max',
  'Dunk & SB',
  'Air Force 1',
  'Basketball',
  'Running',
  'Collab / Limited',
  'Autre',
];

const SILHOUETTES: { key: SilhouetteKey; label: string }[] = [
  { key: 'jordan1', label: 'Air Jordan 1' },
  { key: 'jordan4', label: 'Air Jordan 4 / 3' },
  { key: 'airmax1', label: 'Air Max 1 / 90' },
  { key: 'airmax95', label: 'Air Max 95 / TN' },
  { key: 'dunk', label: 'Dunk / SB Dunk' },
  { key: 'airforce1', label: 'Air Force 1' },
  { key: 'kobe', label: 'Kobe / Basketball' },
  { key: 'running', label: 'Vaporfly / Running' },
  { key: 'generic', label: 'Swoosh Universel' },
];

const PRESET_COLORS = [
  { name: 'Chicago Red', hex: '#dc2626', accent: '#171717' },
  { name: 'Panda B&W', hex: '#18181b', accent: '#fafafa' },
  { name: 'Royal Blue', hex: '#2563eb', accent: '#0f172a' },
  { name: 'Travis Mocha', hex: '#78350f', accent: '#d97706' },
  { name: 'Volt / Neon', hex: '#84cc16', accent: '#18181b' },
  { name: 'Triple White', hex: '#ffffff', accent: '#e5e7eb' },
  { name: 'Triple Black', hex: '#09090b', accent: '#27272a' },
  { name: 'Cool Grey', hex: '#71717a', accent: '#f4f4f5' },
  { name: 'Pine Green', hex: '#16a34a', accent: '#111827' },
  { name: 'Shattered Orange', hex: '#ea580c', accent: '#18181b' },
  { name: 'Court Purple', hex: '#9333ea', accent: '#18181b' },
];

export const SneakerFormModal: React.FC<SneakerFormModalProps> = ({
  isOpen,
  sneakerToEdit,
  onClose,
  onSave,
}) => {
  const [model, setModel] = useState('');
  const [colorway, setColorway] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<SneakerCategory>('Air Jordan');
  const [silhouetteKey, setSilhouetteKey] = useState<SilhouetteKey>('jordan1');
  const [sizeUS, setSizeUS] = useState('10.5');
  const [sizeEU, setSizeEU] = useState('44.5');
  const [sizeCM, setSizeCM] = useState('28.5');
  const [condition, setCondition] = useState<ConditionType>('DS');
  const [boxCondition, setBoxCondition] = useState<BoxConditionType>('OG Box');
  const [hasReceipt, setHasReceipt] = useState(true);
  const [extraLaces, setExtraLaces] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState('180');
  const [marketValue, setMarketValue] = useState('240');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [purchaseLocation, setPurchaseLocation] = useState('SNKRS App');
  const [status, setStatus] = useState<StatusType>('collection');
  const [wearCount, setWearCount] = useState(0);
  const [rating, setRating] = useState(5);
  const [isFavorite, setIsFavorite] = useState(false);
  const [colorHex, setColorHex] = useState('#dc2626');
  const [accentColorHex, setAccentColorHex] = useState('#171717');
  const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTab, setImageTab] = useState<'photos' | 'silhouette' | 'upload' | 'url'>('photos');

  useEffect(() => {
    if (sneakerToEdit) {
      setModel(sneakerToEdit.model);
      setColorway(sneakerToEdit.colorway);
      setSku(sneakerToEdit.sku);
      setCategory(sneakerToEdit.category);
      setSilhouetteKey(sneakerToEdit.silhouetteKey);
      setSizeUS(sneakerToEdit.sizeUS);
      setSizeEU(sneakerToEdit.sizeEU);
      setSizeCM(sneakerToEdit.sizeCM);
      setCondition(sneakerToEdit.condition);
      setBoxCondition(sneakerToEdit.boxCondition);
      setHasReceipt(sneakerToEdit.hasReceipt);
      setExtraLaces(sneakerToEdit.extraLaces);
      setPurchasePrice(sneakerToEdit.purchasePrice.toString());
      setMarketValue(sneakerToEdit.marketValue.toString());
      setPurchaseDate(sneakerToEdit.purchaseDate);
      setPurchaseLocation(sneakerToEdit.purchaseLocation);
      setStatus(sneakerToEdit.status);
      setWearCount(sneakerToEdit.wearCount);
      setRating(sneakerToEdit.rating);
      setIsFavorite(sneakerToEdit.isFavorite);
      setColorHex(sneakerToEdit.colorHex);
      setAccentColorHex(sneakerToEdit.accentColorHex || '#ffffff');
      setReleaseYear(sneakerToEdit.releaseYear || new Date().getFullYear());
      setNotes(sneakerToEdit.notes || '');
      setImageUrl(sneakerToEdit.imageUrl || '');
      setImageTab(sneakerToEdit.imageUrl ? 'photos' : 'silhouette');
    } else {
      // Reset defaults for a new shoe
      setModel('Air Jordan 1 Retro High OG');
      setColorway('Chicago');
      setSku('DZ5485-612');
      setCategory('Air Jordan');
      setSilhouetteKey('jordan1');
      setSizeUS('10.5');
      setSizeEU('44.5');
      setSizeCM('28.5');
      setCondition('DS');
      setBoxCondition('OG Box');
      setHasReceipt(true);
      setExtraLaces(true);
      setPurchasePrice('180');
      setMarketValue('280');
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setPurchaseLocation('SNKRS App');
      setStatus('collection');
      setWearCount(0);
      setRating(5);
      setIsFavorite(false);
      setColorHex('#dc2626');
      setAccentColorHex('#171717');
      setReleaseYear(new Date().getFullYear());
      setNotes('');
      setImageUrl(CATALOGUE_REAL_PHOTOS[0].imageUrl);
      setImageTab('photos');
    }
  }, [sneakerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSizeChange = (newUS: string) => {
    setSizeUS(newUS);
    const matched = findSizeByUS(newUS);
    if (matched) {
      setSizeEU(matched.eu);
      setSizeCM(matched.cm);
    }
  };

  const handleModelPresetSelect = (preset: (typeof POPULAR_NIKE_MODELS)[0]) => {
    setModel(preset.name);
    setCategory(preset.category as SneakerCategory);
    setSilhouetteKey(preset.silhouette as SilhouetteKey);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim()) return;

    const finalSneaker: Sneaker = {
      id: sneakerToEdit ? sneakerToEdit.id : `sneaker-${Date.now()}`,
      model: model.trim(),
      colorway: colorway.trim() || 'Coloris standard',
      sku: sku.trim() || 'SKU-INCONNU',
      category,
      silhouetteKey,
      sizeUS,
      sizeEU,
      sizeCM,
      condition,
      boxCondition,
      hasReceipt,
      extraLaces,
      purchasePrice: parseFloat(purchasePrice) || 0,
      marketValue: parseFloat(marketValue) || 0,
      purchaseDate,
      purchaseLocation: purchaseLocation.trim() || 'Boutique Nike',
      status,
      wearCount: Number(wearCount) || 0,
      wearHistory: sneakerToEdit ? sneakerToEdit.wearHistory : [],
      rating: Number(rating) || 5,
      isFavorite,
      colorHex,
      accentColorHex,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
      notes: notes.trim(),
      imageUrl: imageUrl.trim() || undefined,
      createdAt: sneakerToEdit ? sneakerToEdit.createdAt : new Date().toISOString(),
    };

    onSave(finalSneaker);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-[#131417] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#17181c]">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {sneakerToEdit ? 'Modifier la paire Nike' : 'Ajouter une paire à la collection'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick preset chips for iconic models */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Modèles Nike Populaires (Sélection Rapide)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_NIKE_MODELS.slice(0, 8).map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleModelPresetSelect(preset)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    model === preset.name
                      ? 'bg-rose-600 text-white font-medium'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Modèle Nike *
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: Air Jordan 1 High OG, Dunk Low..."
                required
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Coloris / Colorway *
              </label>
              <input
                type="text"
                value={colorway}
                onChange={(e) => setColorway(e.target.value)}
                placeholder="Ex: Chicago, Panda, Big Bubble..."
                required
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Code Style / SKU Nike
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                placeholder="Ex: DZ5485-612"
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Catégorie Nike
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SneakerCategory)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sizing & Condition */}
          <div className="p-4 bg-[#181a1f] rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Pointure & État
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Pointure US Men
                </label>
                <select
                  value={sizeUS}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                >
                  {NIKE_SIZE_CHART.map((s) => (
                    <option key={s.us} value={s.us}>
                      US {s.us}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Pointure EU
                </label>
                <input
                  type="text"
                  value={sizeEU}
                  onChange={(e) => setSizeEU(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Longueur CM
                </label>
                <input
                  type="text"
                  value={sizeCM}
                  onChange={(e) => setSizeCM(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Condition / État d'usure
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ConditionType)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
                >
                  <option value="DS">DS - Deadstock (Neuf en boîte, jamais porté)</option>
                  <option value="VNDS">VNDS - Very Near Deadstock (Porté 1-2 fois)</option>
                  <option value="NDS">NDS - Near Deadstock (Très bon état)</option>
                  <option value="BEATER">Beater (Porté au quotidien)</option>
                  <option value="RESTO">Resto (À restaurer / Vintage)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  État de la Boîte
                </label>
                <select
                  value={boxCondition}
                  onChange={(e) => setBoxCondition(e.target.value as BoxConditionType)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
                >
                  <option value="OG Box">Boîte d'origine complète (OG Box)</option>
                  <option value="Damaged Box">Boîte originale endommagée</option>
                  <option value="Replacement Box">Boîte de remplacement</option>
                  <option value="No Box">Sans boîte (No Box)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReceipt}
                  onChange={(e) => setHasReceipt(e.target.checked)}
                  className="rounded bg-[#1f2127] border-white/20 text-rose-600 focus:ring-0"
                />
                <span>Facture / Preuve d'authenticité</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extraLaces}
                  onChange={(e) => setExtraLaces(e.target.checked)}
                  className="rounded bg-[#1f2127] border-white/20 text-rose-600 focus:ring-0"
                />
                <span>Lacets supplémentaires inclus</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFavorite}
                  onChange={(e) => setIsFavorite(e.target.checked)}
                  className="rounded bg-[#1f2127] border-white/20 text-rose-600 focus:ring-0"
                />
                <span>Paire Favorite</span>
              </label>
            </div>
          </div>

          {/* Pricing & Valuation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Prix Payé (€)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Cote Actuelle Estimée (€)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={marketValue}
                onChange={(e) => setMarketValue(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Année de sortie
              </label>
              <input
                type="number"
                min="1970"
                max="2030"
                value={releaseYear}
                onChange={(e) => setReleaseYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Lieu d'achat
              </label>
              <input
                type="text"
                placeholder="Ex: SNKRS, StockX, Boutique Paris..."
                value={purchaseLocation}
                onChange={(e) => setPurchaseLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Date d'achat
              </label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
                className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
              >
                <option value="collection">Dans ma collection</option>
                <option value="wishlist">Graal / Wishlist (À trouver)</option>
                <option value="for_sale">À vendre / Trade</option>
                <option value="sold">Vendu / Archivé</option>
              </select>
            </div>
          </div>

          {/* Visual Presentation (Silhouette SVG vs Upload vs URL) */}
          <div className="p-4 bg-[#181a1f] rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Aperçu Visuel & Photo
              </h3>

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setImageTab('photos')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    imageTab === 'photos'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Photos Réelles HD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageTab('silhouette');
                    setImageUrl('');
                  }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    imageTab === 'silhouette'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Silhouette Vectorielle
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    imageTab === 'upload'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Importer
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    imageTab === 'url'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Lien URL
                </button>
              </div>
            </div>

            {/* Photos Réelles Selector Gallery */}
            {imageTab === 'photos' && (
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-slate-400">
                  Choisissez une photo réelle haute définition dans le catalogue ou collez votre propre photo :
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {CATALOGUE_REAL_PHOTOS.map((preset) => {
                    const isSelected = imageUrl === preset.imageUrl;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setImageUrl(preset.imageUrl);
                          // Auto match SKU and colors if blank or user wants
                          if (!sku || sku === 'SKU-INCONNU' || sku === 'DZ5485-612') {
                            setSku(preset.sku);
                          }
                        }}
                        className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-rose-500 ring-2 ring-rose-500/50 scale-[1.02]'
                            : 'border-white/10 hover:border-white/30 bg-black/40'
                        }`}
                      >
                        <div className="aspect-[4/3] w-full bg-[#121316] overflow-hidden">
                          <img
                            src={preset.thumbnailUrl}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="p-1.5 bg-[#17181c] text-[10px]">
                          <div className="font-semibold text-white truncate">{preset.name}</div>
                          <div className="text-slate-400 truncate">{preset.colorway}</div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-rose-600 text-white rounded-full p-0.5 shadow">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        {preset.badge && (
                          <div className="absolute top-1.5 left-1.5 px-1 py-0.2 rounded bg-black/70 text-[9px] font-mono text-slate-300">
                            {preset.badge}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Silhouette Controls */}
            {imageTab === 'silhouette' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {SILHOUETTES.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSilhouetteKey(s.key)}
                      className={`px-3 py-1.5 text-xs text-left rounded-lg border transition-colors ${
                        silhouetteKey === s.key
                          ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                          : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                    Couleurs du colorway
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_COLORS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setColorHex(preset.hex);
                          setAccentColorHex(preset.accent);
                        }}
                        title={preset.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          colorHex === preset.hex ? 'scale-125 border-rose-500' : 'border-white/20'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${preset.hex} 50%, ${preset.accent} 50%)`,
                        }}
                      />
                    ))}
                    <div className="flex items-center gap-1.5 ml-2">
                      <input
                        type="color"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                        title="Couleur personnalisée"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {imageTab === 'upload' && (
              <div className="p-4 border-2 border-dashed border-white/10 rounded-xl text-center hover:border-white/20 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-xs font-semibold text-rose-400 hover:text-rose-300">
                    Sélectionner une photo depuis votre appareil
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-500 mt-1">PNG, JPG, WebP jusqu'à 5 Mo</p>
              </div>
            )}

            {imageTab === 'url' && (
              <div>
                <input
                  type="url"
                  placeholder="https://images.nike.com/... ou lien de votre photo"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1f2127] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
            )}

            {/* Live Mini Preview */}
            <div className="h-32 rounded-lg overflow-hidden border border-white/10">
              <SneakerSilhouette
                silhouette={silhouetteKey}
                colorHex={colorHex}
                accentColorHex={accentColorHex}
                imageUrl={imageUrl}
                altText="Aperçu"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Notes & Historique Personnel
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Paire acquise lors du drop anniversaire, lacets sail installés, gardée avec embauchoirs en cèdre..."
              className="w-full px-3 py-2 bg-[#1a1c22] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide rounded-lg transition-colors shadow-lg hover:shadow-rose-600/30"
            >
              {sneakerToEdit ? 'Mettre à jour la paire' : 'Ajouter à mon Closet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
