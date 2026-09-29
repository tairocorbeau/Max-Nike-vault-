import React from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Footprints,
  Layers,
  Award,
  CircleDollarSign,
  PieChart,
} from 'lucide-react';
import { Sneaker } from '../types/sneaker';

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sneakers: Sneaker[];
  onSelectSneaker: (sneaker: Sneaker) => void;
}

export const StatsDrawer: React.FC<StatsDrawerProps> = ({
  isOpen,
  onClose,
  sneakers,
  onSelectSneaker,
}) => {
  if (!isOpen) return null;

  const collectionOnly = sneakers.filter((s) => s.status === 'collection');
  const wishlistOnly = sneakers.filter((s) => s.status === 'wishlist');

  const totalValue = collectionOnly.reduce((sum, s) => sum + s.marketValue, 0);
  const totalCost = collectionOnly.reduce((sum, s) => sum + s.purchasePrice, 0);
  const totalProfit = totalValue - totalCost;
  const roiPercentage = totalCost > 0 ? Math.round((totalProfit / totalCost) * 100) : 0;
  const totalWears = collectionOnly.reduce((sum, s) => sum + s.wearCount, 0);

  // Group by category
  const categoryCounts: Record<string, { count: number; value: number }> = {};
  collectionOnly.forEach((s) => {
    if (!categoryCounts[s.category]) {
      categoryCounts[s.category] = { count: 0, value: 0 };
    }
    categoryCounts[s.category].count += 1;
    categoryCounts[s.category].value += s.marketValue;
  });

  const categoryList = Object.entries(categoryCounts).sort(
    (a, b) => b[1].value - a[1].value
  );

  // Condition breakdown
  const conditionCounts: Record<string, number> = {
    DS: 0,
    VNDS: 0,
    NDS: 0,
    BEATER: 0,
    RESTO: 0,
  };
  collectionOnly.forEach((s) => {
    if (conditionCounts[s.condition] !== undefined) {
      conditionCounts[s.condition] += 1;
    }
  });

  // Top valued
  const topValued = [...collectionOnly]
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 4);

  // Most worn
  const mostWorn = [...collectionOnly]
    .filter((s) => s.wearCount > 0)
    .sort((a, b) => b.wearCount - a.wearCount)
    .slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl h-full bg-[#121316] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#17181c]">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-rose-500" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Analyse du Portfolio & Statistiques
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Portfolio Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Valeur Globale Estimée
              </span>
              <div className="text-2xl font-black text-white font-mono tabular-nums mt-1">
                {totalValue.toLocaleString('fr-FR')} €
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {collectionOnly.length} paires dans la collection
              </div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Investissement Total
              </span>
              <div className="text-2xl font-black text-white font-mono tabular-nums mt-1">
                {totalCost.toLocaleString('fr-FR')} €
              </div>
              <div className="text-xs text-slate-400 mt-1">Coût d'acquisition cumulé</div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Plus-Value Nette Latente
              </span>
              <div
                className={`text-2xl font-black font-mono tabular-nums mt-1 flex items-center gap-1 ${
                  totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {totalProfit >= 0 ? (
                  <TrendingUp className="w-5 h-5 inline" />
                ) : (
                  <TrendingDown className="w-5 h-5 inline" />
                )}
                {totalProfit >= 0 ? '+' : ''}
                {totalProfit.toLocaleString('fr-FR')} €
              </div>
              <div className="text-xs font-mono text-emerald-400/80 mt-1">
                Rendement de {roiPercentage >= 0 ? '+' : ''}
                {roiPercentage}%
              </div>
            </div>

            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Sorties Totales
              </span>
              <div className="text-2xl font-black text-white font-mono tabular-nums mt-1 flex items-center gap-1.5">
                <Footprints className="w-5 h-5 text-rose-500" />
                {totalWears}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Moyenne de{' '}
                {collectionOnly.length > 0
                  ? (totalWears / collectionOnly.length).toFixed(1)
                  : 0}{' '}
                ports/paire
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Répartition par Ligne Nike
            </h3>
            <div className="space-y-2">
              {categoryList.map(([cat, data]) => {
                const percent = totalValue > 0 ? Math.round((data.value / totalValue) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">
                        {cat} ({data.count})
                      </span>
                      <span className="font-mono text-slate-300 tabular-nums">
                        {data.value.toLocaleString('fr-FR')} € · {percent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Condition breakdown */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              État de Préservation de la Collection
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-black/30 rounded">
                <span className="block font-mono text-emerald-400 text-lg font-bold">
                  {conditionCounts.DS}
                </span>
                <span className="text-slate-400 text-[10px]">DS (Neuf)</span>
              </div>
              <div className="p-2 bg-black/30 rounded">
                <span className="block font-mono text-sky-400 text-lg font-bold">
                  {conditionCounts.VNDS}
                </span>
                <span className="text-slate-400 text-[10px]">VNDS</span>
              </div>
              <div className="p-2 bg-black/30 rounded">
                <span className="block font-mono text-amber-400 text-lg font-bold">
                  {conditionCounts.NDS}
                </span>
                <span className="text-slate-400 text-[10px]">NDS</span>
              </div>
              <div className="p-2 bg-black/30 rounded">
                <span className="block font-mono text-slate-300 text-lg font-bold">
                  {conditionCounts.BEATER}
                </span>
                <span className="text-slate-400 text-[10px]">Beaters</span>
              </div>
            </div>
          </div>

          {/* Top Valued pairs */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Pièces Maîtresses (Plus Haute Valeur)</span>
            </h3>
            <div className="space-y-2">
              {topValued.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onClose();
                    onSelectSneaker(s);
                  }}
                  className="flex items-center justify-between p-2.5 bg-black/20 hover:bg-black/40 rounded-lg cursor-pointer transition-colors border border-white/5"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.model}
                        className="w-9 h-9 rounded object-cover border border-white/10 shrink-0 bg-[#0e0f11]"
                      />
                    ) : (
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: s.colorHex }}
                      />
                    )}
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white truncate">{s.model}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.colorway}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white tabular-nums shrink-0 ml-2">
                    {s.marketValue.toLocaleString('fr-FR')} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most worn */}
          {mostWorn.length > 0 && (
            <div className="p-4 bg-[#18191d] rounded-xl border border-white/5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-rose-400" />
                <span>Rotation Active (Paires les plus portées)</span>
              </h3>
              <div className="space-y-2">
                {mostWorn.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onSelectSneaker(s);
                    }}
                    className="flex items-center justify-between p-2.5 bg-black/20 hover:bg-black/40 rounded-lg cursor-pointer transition-colors border border-white/5"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{s.model}</div>
                        <div className="text-[11px] text-slate-400 truncate">{s.colorway}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-300 tabular-nums shrink-0 ml-2">
                      {s.wearCount} sorties
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
