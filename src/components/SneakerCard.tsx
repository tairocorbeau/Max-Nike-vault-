import React from 'react';
import { Heart, Footprints, ArrowUpRight, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Sneaker } from '../types/sneaker';
import { SneakerSilhouette } from './SneakerSilhouette';

interface SneakerCardProps {
  sneaker: Sneaker;
  onSelect: (sneaker: Sneaker) => void;
  onQuickWear: (e: React.MouseEvent, sneaker: Sneaker) => void;
  onToggleFavorite: (e: React.MouseEvent, sneakerId: string) => void;
}

const CONDITION_LABELS: Record<string, { label: string; desc: string }> = {
  DS: { label: 'DS', desc: 'Deadstock (Neuf)' },
  VNDS: { label: 'VNDS', desc: 'Porté 1-2x' },
  NDS: { label: 'NDS', desc: 'Très bon état' },
  BEATER: { label: 'Beater', desc: 'Quotidien' },
  RESTO: { label: 'Resto', desc: 'À restaurer' },
};

export const SneakerCard: React.FC<SneakerCardProps> = ({
  sneaker,
  onSelect,
  onQuickWear,
  onToggleFavorite,
}) => {
  const profit = sneaker.marketValue - sneaker.purchasePrice;
  const profitPercentage =
    sneaker.purchasePrice > 0 ? Math.round((profit / sneaker.purchasePrice) * 100) : 0;
  const isPositive = profit >= 0;

  return (
    <div
      onClick={() => onSelect(sneaker)}
      className="group relative flex flex-col bg-[#141518] hover:bg-[#181a1f] border border-white/5 hover:border-white/15 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
    >
      {/* Visual showcase area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0e0f11]">
        <SneakerSilhouette
          silhouette={sneaker.silhouetteKey}
          colorHex={sneaker.colorHex}
          accentColorHex={sneaker.accentColorHex}
          imageUrl={sneaker.imageUrl}
          altText={`${sneaker.model} ${sneaker.colorway}`}
          className="w-full h-full"
        />

        {/* Favorite button */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(e, sneaker.id)}
          aria-label={sneaker.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-md text-white/70 hover:text-rose-500 hover:bg-black/60 transition-colors z-10"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              sneaker.isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Status / Category subtle text tag (Anti-pill discipline: unboxed clean text) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded">
          <span>{sneaker.category}</span>
          {sneaker.releaseYear && (
            <>
              <span className="text-white/40">·</span>
              <span className="text-white/70 tabular-nums">{sneaker.releaseYear}</span>
            </>
          )}
        </div>

        {/* Quick Wear Trigger Overlay on Hover */}
        {sneaker.status === 'collection' && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end">
            <button
              type="button"
              onClick={(e) => onQuickWear(e, sneaker)}
              title="Ajouter 1 portée aujourd'hui"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-slate-200 text-xs font-semibold rounded shadow-md transition-colors whitespace-nowrap"
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>+1 Porté</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="flex flex-col flex-1 p-4">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-slate-300 font-medium">{sneaker.sku}</span>
            <span aria-hidden="true">·</span>
            <span>EU {sneaker.sizeEU}</span>
            <span aria-hidden="true">·</span>
            <span>US {sneaker.sizeUS}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono">
            <span
              className={
                sneaker.condition === 'DS'
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-300'
              }
            >
              {CONDITION_LABELS[sneaker.condition]?.label || sneaker.condition}
            </span>
          </div>
        </div>

        {/* Titles */}
        <h3 className="text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors">
          {sneaker.model}
        </h3>
        <p className="text-xs text-slate-400 mb-3 line-clamp-1">
          {sneaker.colorway}
        </p>

        {/* Valuation & Wear count footer */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-end justify-between">
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">
              {sneaker.status === 'wishlist' ? 'Cote estimée' : 'Valeur actuelle'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white font-mono tabular-nums">
                {sneaker.marketValue.toLocaleString('fr-FR')} €
              </span>

              {sneaker.status === 'collection' && sneaker.purchasePrice > 0 && (
                <span
                  className={`flex items-center text-[11px] font-mono tabular-nums ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? '+' : ''}
                  {profitPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Wear stats */}
          <div className="text-right">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">
              {sneaker.status === 'wishlist' ? 'Priorité' : 'Portées'}
            </span>
            {sneaker.status === 'wishlist' ? (
              <div className="flex items-center justify-end gap-0.5 text-amber-400 text-xs">
                {Array.from({ length: sneaker.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            ) : (
              <span className="text-xs font-mono font-medium text-slate-300 tabular-nums">
                {sneaker.wearCount} {sneaker.wearCount > 1 ? 'sorties' : 'sortie'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
