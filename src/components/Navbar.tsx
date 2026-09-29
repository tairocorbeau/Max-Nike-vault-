import React from 'react';
import { Plus, BarChart3, Dices, Download, Upload, Footprints } from 'lucide-react';
import { StatusType } from '../types/sneaker';

interface NavbarProps {
  currentTab: string; // 'collection' | 'wishlist' | 'for_sale' | 'all'
  onSelectTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onOpenStats: () => void;
  onOpenRotation: () => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
  onImportClick: () => void;
  totalCollectionCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
  onOpenStats,
  onOpenRotation,
  onExportJSON,
  onExportCSV,
  onImportClick,
  totalCollectionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0d0e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('collection')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <span className="font-['Syne',sans-serif] font-black text-xl tracking-tight text-white group-hover:text-rose-500 transition-colors uppercase">
              MAX Nike vault
            </span>
          </button>
        </div>

        {/* Zone 2: Clean unboxed text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => onSelectTab('collection')}
            className={`transition-colors relative py-1 text-xs uppercase tracking-wider font-mono ${
              currentTab === 'collection'
                ? 'text-white font-bold border-b-2 border-rose-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mes Souliers ({totalCollectionCount})
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('wishlist')}
            className={`transition-colors relative py-1 text-xs uppercase tracking-wider font-mono ${
              currentTab === 'wishlist'
                ? 'text-white font-bold border-b-2 border-rose-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Graals & Wishlist
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('for_sale')}
            className={`transition-colors relative py-1 text-xs uppercase tracking-wider font-mono ${
              currentTab === 'for_sale'
                ? 'text-white font-bold border-b-2 border-rose-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            À Vendre & Trades
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('all')}
            className={`transition-colors relative py-1 text-xs uppercase tracking-wider font-mono ${
              currentTab === 'all'
                ? 'text-white font-bold border-b-2 border-rose-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Toutes les Paires
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Daily Pick Action */}
          <button
            type="button"
            onClick={onOpenRotation}
            title="La paire du jour (tirage au sort)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
          >
            <Dices className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Paire du Jour</span>
          </button>

          {/* Stats Button */}
          <button
            type="button"
            onClick={onOpenStats}
            title="Statistiques de collection"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          {/* Primary Add CTA */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-md hover:shadow-rose-600/30 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Paire</span>
          </button>
        </div>
      </div>

      {/* Mobile Subnav for tabs */}
      <div className="flex md:hidden px-4 py-2 border-t border-white/5 overflow-x-auto gap-4 text-xs font-mono">
        <button
          type="button"
          onClick={() => onSelectTab('collection')}
          className={`whitespace-nowrap ${
            currentTab === 'collection' ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          Mes Souliers ({totalCollectionCount})
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('wishlist')}
          className={`whitespace-nowrap ${
            currentTab === 'wishlist' ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          Wishlist
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('for_sale')}
          className={`whitespace-nowrap ${
            currentTab === 'for_sale' ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          À Vendre
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('all')}
          className={`whitespace-nowrap ${
            currentTab === 'all' ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          Toutes
        </button>
      </div>
    </header>
  );
};
