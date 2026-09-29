import React, { useState } from 'react';
import {
  X,
  Footprints,
  Calendar,
  DollarSign,
  Tag,
  Box,
  Receipt,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Share2,
  Plus,
  Sparkles,
} from 'lucide-react';
import { Sneaker, WearLog } from '../types/sneaker';
import { SneakerSilhouette } from './SneakerSilhouette';

interface SneakerDetailModalProps {
  sneaker: Sneaker | null;
  onClose: () => void;
  onEdit: (sneaker: Sneaker) => void;
  onDelete: (sneakerId: string) => void;
  onQuickWear: (sneaker: Sneaker) => void;
  onAddWearLog: (sneakerId: string, log: WearLog) => void;
  onToggleFavorite: (sneakerId: string) => void;
}

const CONDITION_TEXTS: Record<string, string> = {
  DS: 'Deadstock (Neuf en boîte, jamais essayé)',
  VNDS: 'Very Near Deadstock (Porté 1 à 2 fois en intérieur)',
  NDS: 'Near Deadstock (Très bon état général)',
  BEATER: 'Beater / Porté au quotidien',
  RESTO: 'À restaurer / Vintage',
};

const BOX_TEXTS: Record<string, string> = {
  'OG Box': "Boîte d'origine complète (avec papier)",
  'Damaged Box': "Boîte d'origine endommagée",
  'Replacement Box': 'Boîte de remplacement Nike',
  'No Box': 'Sans boîte',
};

export const SneakerDetailModal: React.FC<SneakerDetailModalProps> = ({
  sneaker,
  onClose,
  onEdit,
  onDelete,
  onQuickWear,
  onAddWearLog,
  onToggleFavorite,
}) => {
  const [showAddLog, setShowAddLog] = useState(false);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logOccasion, setLogOccasion] = useState('');
  const [copied, setCopied] = useState(false);

  if (!sneaker) return null;

  const profit = sneaker.marketValue - sneaker.purchasePrice;
  const profitPercentage =
    sneaker.purchasePrice > 0 ? Math.round((profit / sneaker.purchasePrice) * 100) : 0;
  const isPositive = profit >= 0;

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: WearLog = {
      id: `wear-${Date.now()}`,
      date: logDate,
      occasion: logOccasion.trim() || 'Sortie sneakers',
    };
    onAddWearLog(sneaker.id, newLog);
    setLogOccasion('');
    setShowAddLog(false);
  };

  const handleShare = () => {
    const text = `👟 ${sneaker.model} '${sneaker.colorway}' | SKU: ${sneaker.sku} | Cote: ${sneaker.marketValue}€ | ${sneaker.condition} | MAX Nike vault`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-[#121316] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#17181c]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>{sneaker.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white font-medium">{sneaker.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copié !' : 'Partager'}</span>
            </button>

            <button
              type="button"
              onClick={() => onEdit(sneaker)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Modifier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Voulez-vous supprimer "${sneaker.model}" de votre collection ?`)) {
                  onDelete(sneaker.id);
                  onClose();
                }
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Supprimer la paire"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sneaker Visual Hero */}
        <div className="relative aspect-[16/9] w-full max-h-[320px] bg-[#0c0d0f] border-b border-white/5 overflow-hidden">
          <SneakerSilhouette
            silhouette={sneaker.silhouetteKey}
            colorHex={sneaker.colorHex}
            accentColorHex={sneaker.accentColorHex}
            imageUrl={sneaker.imageUrl}
            altText={`${sneaker.model} ${sneaker.colorway}`}
            className="w-full h-full"
          />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase text-slate-400">
                  {sneaker.status === 'wishlist' ? 'Graal recherché' : 'Dans le closet'}
                </span>
                {sneaker.releaseYear && (
                  <span className="text-xs font-mono text-slate-400">· Année {sneaker.releaseYear}</span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {sneaker.model}
              </h2>
              <p className="text-sm font-medium text-slate-300">
                {sneaker.colorway}
              </p>
            </div>

            {sneaker.status === 'collection' && (
              <button
                type="button"
                onClick={() => onQuickWear(sneaker)}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide rounded-lg transition-colors shadow-lg hover:shadow-rose-600/30 whitespace-nowrap"
              >
                <Footprints className="w-4 h-4" />
                <span>Enfiler aujourd'hui (+1)</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {sneaker.status === 'wishlist' ? 'Prix Cible' : "Prix d'achat"}
              </span>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                {(sneaker.status === 'wishlist' && sneaker.targetPrice
                  ? sneaker.targetPrice
                  : sneaker.purchasePrice
                ).toLocaleString('fr-FR')}{' '}
                €
              </div>
              <div className="text-xs text-slate-400 mt-1 truncate">
                {sneaker.purchaseLocation || 'Non renseigné'}
              </div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Cote Marché
              </span>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                {sneaker.marketValue.toLocaleString('fr-FR')} €
              </div>
              <div className="flex items-center text-xs font-mono mt-1">
                {sneaker.status === 'collection' && sneaker.purchasePrice > 0 ? (
                  <span
                    className={`flex items-center ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {profit.toLocaleString('fr-FR')} € ({profitPercentage}%)
                  </span>
                ) : (
                  <span className="text-slate-400">Estimation actuelle</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Sorties / Portées
              </span>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                {sneaker.wearCount}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {sneaker.wearCount === 0 ? 'Paire neuve (DS)' : 'En rotation'}
              </div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Pointure
              </span>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                EU {sneaker.sizeEU}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                US {sneaker.sizeUS} · {sneaker.sizeCM} cm
              </div>
            </div>
          </div>

          {/* Technical Specs & Provenance */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              État & Accessoires
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Condition</span>
                  <span className="text-white font-medium">
                    {CONDITION_TEXTS[sneaker.condition] || sneaker.condition}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Box className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Boîte</span>
                  <span className="text-white font-medium">
                    {BOX_TEXTS[sneaker.boxCondition] || sneaker.boxCondition}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Receipt className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Facture / Preuve</span>
                  <span className="text-white font-medium">
                    {sneaker.hasReceipt ? 'Facture d’achat disponible' : 'Sans facture'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Lacets additionnels</span>
                  <span className="text-white font-medium">
                    {sneaker.extraLaces ? 'Lacets supplémentaires inclus' : 'Lacets standards uniquement'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Collector Notes */}
          {sneaker.notes && (
            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Notes de collection
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {sneaker.notes}
              </p>
            </div>
          )}

          {/* Wear History Section */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Journal des sorties ({sneaker.wearHistory?.length || 0})
                </h4>
                <p className="text-xs text-slate-500">
                  Gardez une trace des événements où vous avez porté cette paire
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddLog(!showAddLog)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter un souvenir</span>
              </button>
            </div>

            {/* Add Log Inline Form */}
            {showAddLog && (
              <form
                onSubmit={handleAddLogSubmit}
                className="p-3 bg-black/40 rounded-lg border border-white/10 space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Date de sortie
                    </label>
                    <input
                      type="date"
                      value={logDate}
                      onChange={(e) => setLogDate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-[#1f2127] border border-white/10 rounded text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Occasion / Souvenir
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Soirée Sneakers, Voyage au Japon, Mariage..."
                      value={logOccasion}
                      onChange={(e) => setLogOccasion(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-[#1f2127] border border-white/10 rounded text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLog(false)}
                    className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded"
                  >
                    Enregistrer la sortie
                  </button>
                </div>
              </form>
            )}

            {/* Logs List */}
            {sneaker.wearHistory && sneaker.wearHistory.length > 0 ? (
              <div className="space-y-2">
                {sneaker.wearHistory.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between text-xs py-2 px-3 bg-black/20 rounded border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Footprints className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-white font-medium">{log.occasion}</span>
                    </div>
                    <span className="font-mono text-slate-400 tabular-nums">{log.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-3 text-center border border-dashed border-white/10 rounded-lg">
                Aucun souvenir enregistré. Cliquez sur « Enfiler aujourd’hui » ou « Ajouter un souvenir ».
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
