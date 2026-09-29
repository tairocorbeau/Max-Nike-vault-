import React from 'react';
import { Footprints, Heart, TrendingUp, TrendingDown, Eye, Edit2 } from 'lucide-react';
import { Sneaker } from '../types/sneaker';

interface SneakerTableViewProps {
  sneakers: Sneaker[];
  onSelect: (sneaker: Sneaker) => void;
  onEdit: (sneaker: Sneaker) => void;
  onQuickWear: (e: React.MouseEvent, sneaker: Sneaker) => void;
  onToggleFavorite: (e: React.MouseEvent, sneakerId: string) => void;
}

export const SneakerTableView: React.FC<SneakerTableViewProps> = ({
  sneakers,
  onSelect,
  onEdit,
  onQuickWear,
  onToggleFavorite,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/5 bg-[#141518]">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-[#181a1f] text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/5">
          <tr>
            <th className="py-3 px-4">Paire</th>
            <th className="py-3 px-3">SKU</th>
            <th className="py-3 px-3">Catégorie</th>
            <th className="py-3 px-3">Pointure</th>
            <th className="py-3 px-3">Condition</th>
            <th className="py-3 px-3 text-right">Prix Achat</th>
            <th className="py-3 px-3 text-right">Cote Actuelle</th>
            <th className="py-3 px-3 text-right">Plus-Value</th>
            <th className="py-3 px-3 text-center">Portées</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-sans">
          {sneakers.map((sneaker) => {
            const profit = sneaker.marketValue - sneaker.purchasePrice;
            const isPositive = profit >= 0;

            return (
              <tr
                key={sneaker.id}
                onClick={() => onSelect(sneaker)}
                className="hover:bg-white/[0.02] cursor-pointer transition-colors"
              >
                {/* Paire info */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => onToggleFavorite(e, sneaker.id)}
                      className="text-slate-500 hover:text-rose-500 p-1"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          sneaker.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                    {sneaker.imageUrl ? (
                      <img
                        src={sneaker.imageUrl}
                        alt={sneaker.model}
                        className="w-8 h-8 rounded object-cover border border-white/10 shrink-0 bg-[#0c0d0e]"
                      />
                    ) : (
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: sneaker.colorHex }}
                        title={`Coloris: ${sneaker.colorway}`}
                      />
                    )}
                    <div>
                      <div className="font-semibold text-white truncate max-w-[200px]">
                        {sneaker.model}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {sneaker.colorway}
                      </div>
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td className="py-3 px-3 font-mono text-slate-300 whitespace-nowrap">
                  {sneaker.sku}
                </td>

                {/* Category */}
                <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                  {sneaker.category}
                </td>

                {/* Size */}
                <td className="py-3 px-3 font-mono whitespace-nowrap">
                  EU {sneaker.sizeEU} <span className="text-slate-500">(US {sneaker.sizeUS})</span>
                </td>

                {/* Condition */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span
                    className={`font-mono text-[11px] ${
                      sneaker.condition === 'DS'
                        ? 'text-emerald-400 font-semibold'
                        : 'text-slate-300'
                    }`}
                  >
                    {sneaker.condition}
                  </span>
                </td>

                {/* Purchase Price */}
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300 whitespace-nowrap">
                  {sneaker.purchasePrice.toLocaleString('fr-FR')} €
                </td>

                {/* Market Value */}
                <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-white whitespace-nowrap">
                  {sneaker.marketValue.toLocaleString('fr-FR')} €
                </td>

                {/* Profit */}
                <td className="py-3 px-3 text-right font-mono tabular-nums whitespace-nowrap">
                  {sneaker.purchasePrice > 0 ? (
                    <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                      {isPositive ? '+' : ''}
                      {profit.toLocaleString('fr-FR')} €
                    </span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </td>

                {/* Wears */}
                <td className="py-3 px-3 text-center font-mono tabular-nums whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-200">
                    {sneaker.wearCount}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div
                    className="flex items-center justify-end gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sneaker.status === 'collection' && (
                      <button
                        type="button"
                        onClick={(e) => onQuickWear(e, sneaker)}
                        title="Ajouter 1 portée aujourd'hui"
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        <Footprints className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onEdit(sneaker)}
                      title="Modifier la paire"
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
