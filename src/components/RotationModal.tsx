import React, { useState, useEffect } from 'react';
import { X, Dices, Footprints, Sparkles, Check } from 'lucide-react';
import { Sneaker } from '../types/sneaker';
import { SneakerSilhouette } from './SneakerSilhouette';

interface RotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sneakers: Sneaker[];
  onWearSneaker: (sneaker: Sneaker) => void;
  onSelectSneaker: (sneaker: Sneaker) => void;
}

export const RotationModal: React.FC<RotationModalProps> = ({
  isOpen,
  onClose,
  sneakers,
  onWearSneaker,
  onSelectSneaker,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'sleepers' | 'beaters' | 'heat'>('all');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPair, setSelectedPair] = useState<Sneaker | null>(null);
  const [hasConfirmedWear, setHasConfirmedWear] = useState(false);

  const eligiblePairs = sneakers
    .filter((s) => s.status === 'collection')
    .filter((s) => {
      if (filterMode === 'sleepers') return s.wearCount <= 2;
      if (filterMode === 'beaters') return s.condition === 'BEATER' || s.wearCount > 10;
      if (filterMode === 'heat') return s.marketValue >= 250 || s.isFavorite;
      return true;
    });

  const pickRandomPair = () => {
    if (eligiblePairs.length === 0) return;
    setIsSpinning(true);
    setHasConfirmedWear(false);

    let count = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * eligiblePairs.length);
      setSelectedPair(eligiblePairs[randIdx]);
      count += 1;
      if (count > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  useEffect(() => {
    if (isOpen && eligiblePairs.length > 0 && !selectedPair) {
      const randIdx = Math.floor(Math.random() * eligiblePairs.length);
      setSelectedPair(eligiblePairs[randIdx]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#131417] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#17181c]">
          <div className="flex items-center gap-2">
            <Dices className="w-5 h-5 text-rose-500" />
            <h2 className="text-base font-bold text-white tracking-tight">
              La Paire du Jour · Rotation Aléatoire
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

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Ambiance de la journée
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                  filterMode === 'all'
                    ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Toutes les paires</div>
                <div className="text-[10px] text-slate-500">Tirage au sort total</div>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('sleepers')}
                className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                  filterMode === 'sleepers'
                    ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Paires qui dorment</div>
                <div className="text-[10px] text-slate-500">Sortir les moins portées</div>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('beaters')}
                className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                  filterMode === 'beaters'
                    ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Beater & Quotidien</div>
                <div className="text-[10px] text-slate-500">Paires tout-terrain</div>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('heat')}
                className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                  filterMode === 'heat'
                    ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Heat & Favoris</div>
                <div className="text-[10px] text-slate-500">Grosses paires du placard</div>
              </button>
            </div>
          </div>

          {/* Selected Pair Showcase */}
          {selectedPair ? (
            <div className="p-4 bg-[#181a1f] rounded-xl border border-white/5 space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#0e0f11]">
                <SneakerSilhouette
                  silhouette={selectedPair.silhouetteKey}
                  colorHex={selectedPair.colorHex}
                  accentColorHex={selectedPair.accentColorHex}
                  imageUrl={selectedPair.imageUrl}
                  altText={`${selectedPair.model} ${selectedPair.colorway}`}
                  className="w-full h-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{selectedPair.category}</span>
                  <span className="font-mono">{selectedPair.wearCount} portées au compteur</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {selectedPair.model}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedPair.colorway} · Pointure EU {selectedPair.sizeEU}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  disabled={hasConfirmedWear || isSpinning}
                  onClick={() => {
                    onWearSneaker(selectedPair);
                    setHasConfirmedWear(true);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-colors shadow-lg ${
                    hasConfirmedWear
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white hover:shadow-rose-600/30'
                  }`}
                >
                  {hasConfirmedWear ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Enfilée pour aujourd'hui ! (+1)</span>
                    </>
                  ) : (
                    <>
                      <Footprints className="w-4 h-4" />
                      <span>J'enfile cette paire aujourd'hui</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isSpinning}
                  onClick={pickRandomPair}
                  title="Relancer un tirage"
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-slate-500">
              Aucune paire trouvée pour ce critère.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
