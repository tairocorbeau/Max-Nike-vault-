import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Heart,
  Plus,
  Footprints,
  TrendingUp,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Sneaker,
  FilterState,
  SortField,
  SneakerCategory,
  ConditionType,
  StatusType,
  WearLog,
} from './types/sneaker';
import {
  loadSneakers,
  saveSneakers,
  exportToJSON,
  exportToCSV,
  parseSneakersImport,
} from './utils/storage';
import { DEFAULT_SNEAKERS } from './data/defaultSneakers';
import { Navbar } from './components/Navbar';
import { SneakerCard } from './components/SneakerCard';
import { SneakerTableView } from './components/SneakerTableView';
import { SneakerDetailModal } from './components/SneakerDetailModal';
import { SneakerFormModal } from './components/SneakerFormModal';
import { StatsDrawer } from './components/StatsDrawer';
import { RotationModal } from './components/RotationModal';

const CATEGORY_FILTERS = [
  'Toutes',
  'Air Jordan',
  'Air Max',
  'Dunk & SB',
  'Air Force 1',
  'Basketball',
  'Running',
  'Collab / Limited',
];

export default function App() {
  const [sneakers, setSneakers] = useState<Sneaker[]>(() => loadSneakers());
  const [activeTab, setActiveTab] = useState<string>('collection'); // 'collection' | 'wishlist' | 'for_sale' | 'all'
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>('dateAdded');

  // Modals & Panels
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sneakerToEdit, setSneakerToEdit] = useState<Sneaker | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isRotationOpen, setIsRotationOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to localStorage
  useEffect(() => {
    saveSneakers(sneakers);
  }, [sneakers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Quick wear action
  const handleQuickWear = (e: React.MouseEvent | null, targetSneaker: Sneaker) => {
    if (e) e.stopPropagation();
    const today = new Date().toISOString().split('T')[0];
    const newLog: WearLog = {
      id: `w-${Date.now()}`,
      date: today,
      occasion: 'Porté au quotidien',
    };

    setSneakers((prev) =>
      prev.map((s) => {
        if (s.id === targetSneaker.id) {
          const updated = {
            ...s,
            wearCount: s.wearCount + 1,
            wearHistory: [newLog, ...(s.wearHistory || [])],
          };
          if (selectedSneaker?.id === s.id) {
            setSelectedSneaker(updated);
          }
          return updated;
        }
        return s;
      })
    );
    showToast(`👟 +1 portée ajoutée à "${targetSneaker.model}" !`);
  };

  // Add wear log with details
  const handleAddWearLog = (sneakerId: string, log: WearLog) => {
    setSneakers((prev) =>
      prev.map((s) => {
        if (s.id === sneakerId) {
          const updated = {
            ...s,
            wearCount: s.wearCount + 1,
            wearHistory: [log, ...(s.wearHistory || [])],
          };
          setSelectedSneaker(updated);
          return updated;
        }
        return s;
      })
    );
    showToast('✨ Souvenir de sortie enregistré avec succès !');
  };

  // Toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent | null, sneakerId: string) => {
    if (e) e.stopPropagation();
    setSneakers((prev) =>
      prev.map((s) => (s.id === sneakerId ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  // Save (create or update)
  const handleSaveSneaker = (savedSneaker: Sneaker) => {
    setSneakers((prev) => {
      const exists = prev.some((s) => s.id === savedSneaker.id);
      if (exists) {
        return prev.map((s) => (s.id === savedSneaker.id ? savedSneaker : s));
      }
      return [savedSneaker, ...prev];
    });
    if (selectedSneaker?.id === savedSneaker.id) {
      setSelectedSneaker(savedSneaker);
    }
    showToast(`👟 "${savedSneaker.model}" enregistré dans le closet !`);
  };

  // Delete
  const handleDeleteSneaker = (sneakerId: string) => {
    setSneakers((prev) => prev.filter((s) => s.id !== sneakerId));
    if (selectedSneaker?.id === sneakerId) {
      setSelectedSneaker(null);
    }
    showToast('Paire retirée de la collection.');
  };

  // Import handler
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const imported = parseSneakersImport(content);
        setSneakers(imported);
        showToast(`✅ ${imported.length} paires importées avec succès !`);
      } catch (err: any) {
        alert(err.message || "Erreur lors de l'importation du fichier JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Voulez-vous réinitialiser votre collection avec la sélection iconique de base (Air Jordan 1, Dunk Low, Air Max 1...) ?'
      )
    ) {
      setSneakers(DEFAULT_SNEAKERS);
      showToast('🔄 Collection réinitialisée avec les paires de démonstration.');
    }
  };

  // Stats calculation
  const collectionSneakers = useMemo(
    () => sneakers.filter((s) => s.status === 'collection'),
    [sneakers]
  );

  const totalValue = useMemo(
    () => collectionSneakers.reduce((acc, s) => acc + s.marketValue, 0),
    [collectionSneakers]
  );

  const totalCost = useMemo(
    () => collectionSneakers.reduce((acc, s) => acc + s.purchasePrice, 0),
    [collectionSneakers]
  );

  const totalProfit = totalValue - totalCost;
  const roiPercentage = totalCost > 0 ? Math.round((totalProfit / totalCost) * 100) : 0;

  // Filtered & Sorted items
  const filteredSneakers = useMemo(() => {
    return sneakers
      .filter((s) => {
        // Tab filtering
        if (activeTab === 'collection') return s.status === 'collection';
        if (activeTab === 'wishlist') return s.status === 'wishlist';
        if (activeTab === 'for_sale') return s.status === 'for_sale';
        return true; // 'all'
      })
      .filter((s) => {
        // Search
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          s.model.toLowerCase().includes(q) ||
          s.colorway.toLowerCase().includes(q) ||
          s.sku.toLowerCase().includes(q) ||
          (s.purchaseLocation && s.purchaseLocation.toLowerCase().includes(q)) ||
          (s.notes && s.notes.toLowerCase().includes(q)) ||
          (s.releaseYear && s.releaseYear.toString().includes(q))
        );
      })
      .filter((s) => {
        // Category
        if (selectedCategory === 'Toutes') return true;
        return s.category === selectedCategory;
      })
      .filter((s) => {
        // Condition
        if (selectedCondition === 'all') return true;
        return s.condition === selectedCondition;
      })
      .filter((s) => {
        // Favorites
        if (!onlyFavorites) return true;
        return s.isFavorite;
      })
      .sort((a, b) => {
        if (sortBy === 'marketValueDesc') return b.marketValue - a.marketValue;
        if (sortBy === 'marketValueAsc') return a.marketValue - b.marketValue;
        if (sortBy === 'purchasePriceDesc') return b.purchasePrice - a.purchasePrice;
        if (sortBy === 'wearCountDesc') return b.wearCount - a.wearCount;
        if (sortBy === 'wearCountAsc') return a.wearCount - b.wearCount;
        if (sortBy === 'profitDesc') {
          return b.marketValue - b.purchasePrice - (a.marketValue - a.purchasePrice);
        }
        if (sortBy === 'nameAsc') return a.model.localeCompare(b.model);
        // Default: dateAdded
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    sneakers,
    activeTab,
    searchQuery,
    selectedCategory,
    selectedCondition,
    onlyFavorites,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Contract Navbar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAddModal={() => {
          setSneakerToEdit(null);
          setIsFormOpen(true);
        }}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenRotation={() => setIsRotationOpen(true)}
        onExportJSON={() => exportToJSON(sneakers)}
        onExportCSV={() => exportToCSV(sneakers)}
        onImportClick={() => fileInputRef.current?.click()}
        totalCollectionCount={collectionSneakers.length}
      />

      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#18191d] border border-white/20 text-white text-xs font-semibold rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Editorial Vault Portfolio Header */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141518] via-[#111215] to-[#16171c] border border-white/10 shadow-xl overflow-hidden">
          {/* Subtle swoosh glow element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-rose-500 font-bold">
                <span>Le Closet Nike</span>
                <span aria-hidden="true">·</span>
                <span>MAX Nike vault</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]">
                {activeTab === 'collection' && 'Ma Collection de Souliers'}
                {activeTab === 'wishlist' && 'Graals & Souliers Convoités'}
                {activeTab === 'for_sale' && 'Paires à Vendre ou Échanger'}
                {activeTab === 'all' && 'Inventaire Complet du Vault'}
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Suivi de la cote marchande, registre des portées et gestion de vos paires Nike & Jordan.
              </p>
            </div>

            {/* Quick Portfolio Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="px-4 py-3 bg-black/40 rounded-xl border border-white/5">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Valeur Totale
                </span>
                <span className="text-xl font-bold font-mono text-white tabular-nums">
                  {totalValue.toLocaleString('fr-FR')} €
                </span>
              </div>

              <div className="px-4 py-3 bg-black/40 rounded-xl border border-white/5">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Plus-Value
                </span>
                <span
                  className={`text-xl font-bold font-mono tabular-nums flex items-center gap-0.5 ${
                    totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {totalProfit >= 0 ? '+' : ''}
                  {totalProfit.toLocaleString('fr-FR')} €
                </span>
              </div>

              <div className="px-4 py-3 bg-black/40 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Total Paires
                </span>
                <span className="text-xl font-bold font-mono text-white tabular-nums">
                  {collectionSneakers.length} souliers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Control Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher modèle, coloris, SKU (ex: Chicago, Lost & Found, DZ5485)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#141518] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Controls (Favorites, Sort, View mode) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Favorites toggle */}
              <button
                type="button"
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl border transition-colors whitespace-nowrap ${
                  onlyFavorites
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-semibold'
                    : 'border-white/10 bg-[#141518] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500' : ''}`} />
                <span>Favoris</span>
              </button>

              {/* Condition dropdown */}
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-3 py-2 text-xs bg-[#141518] border border-white/10 rounded-xl text-slate-300 focus:outline-none focus:border-rose-500"
              >
                <option value="all">Tous états</option>
                <option value="DS">DS (Neuf)</option>
                <option value="VNDS">VNDS (Porté 1-2x)</option>
                <option value="NDS">NDS (Très bon)</option>
                <option value="BEATER">Beaters</option>
              </select>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortField)}
                className="px-3 py-2 text-xs bg-[#141518] border border-white/10 rounded-xl text-slate-300 focus:outline-none focus:border-rose-500 font-mono"
              >
                <option value="dateAdded">Ajoutées récemment</option>
                <option value="marketValueDesc">Cote la plus haute</option>
                <option value="marketValueAsc">Cote la plus accessible</option>
                <option value="purchasePriceDesc">Prix d'achat le plus élevé</option>
                <option value="profitDesc">Plus forte plus-value</option>
                <option value="wearCountDesc">Paires les plus portées</option>
                <option value="wearCountAsc">Paires les moins portées</option>
                <option value="nameAsc">Nom A - Z</option>
              </select>

              {/* View Switcher (Grid vs Table) */}
              <div className="flex items-center gap-1 p-1 bg-[#141518] border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title="Affichage en cartes"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  title="Affichage en tableau d'inventaire"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-[#141518] hover:bg-[#1a1c22] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sneaker Items Section */}
        {filteredSneakers.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSneakers.map((sneaker) => (
                <SneakerCard
                  key={sneaker.id}
                  sneaker={sneaker}
                  onSelect={setSelectedSneaker}
                  onQuickWear={handleQuickWear}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <SneakerTableView
              sneakers={filteredSneakers}
              onSelect={setSelectedSneaker}
              onEdit={(s) => {
                setSneakerToEdit(s);
                setIsFormOpen(true);
              }}
              onQuickWear={handleQuickWear}
              onToggleFavorite={handleToggleFavorite}
            />
          )
        ) : (
          <div className="py-16 text-center space-y-4 bg-[#121316] rounded-2xl border border-white/5">
            <Footprints className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Aucun soulier ne correspond à ces critères</h3>
              <p className="text-xs text-slate-400">
                Essayez d'ajuster votre recherche ou réinitialisez les filtres.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Toutes');
                  setSelectedCondition('all');
                  setOnlyFavorites(false);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Réinitialiser les filtres
              </button>
              <button
                type="button"
                onClick={() => {
                  setSneakerToEdit(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                + Ajouter une nouvelle paire
              </button>
            </div>
          </div>
        )}

        {/* Footer with backup actions & copyright */}
        <footer className="pt-12 pb-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold font-['Syne',sans-serif]">MAX NIKE VAULT</span>
            <span>· Gestionnaire privé de collection</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => exportToJSON(sneakers)}
              className="hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sauvegarder (JSON)</span>
            </button>
            <button
              type="button"
              onClick={() => exportToCSV(sneakers)}
              className="hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter (Excel / CSV)</span>
            </button>
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser démo</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Modals & Panels */}
      <SneakerDetailModal
        sneaker={selectedSneaker}
        onClose={() => setSelectedSneaker(null)}
        onEdit={(s) => {
          setSneakerToEdit(s);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteSneaker}
        onQuickWear={(s) => handleQuickWear(null, s)}
        onAddWearLog={handleAddWearLog}
        onToggleFavorite={(id) => handleToggleFavorite(null, id)}
      />

      <SneakerFormModal
        isOpen={isFormOpen}
        sneakerToEdit={sneakerToEdit}
        onClose={() => {
          setIsFormOpen(false);
          setSneakerToEdit(null);
        }}
        onSave={handleSaveSneaker}
      />

      <StatsDrawer
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        sneakers={sneakers}
        onSelectSneaker={(s) => setSelectedSneaker(s)}
      />

      <RotationModal
        isOpen={isRotationOpen}
        onClose={() => setIsRotationOpen(false)}
        sneakers={sneakers}
        onWearSneaker={(s) => handleQuickWear(null, s)}
        onSelectSneaker={(s) => setSelectedSneaker(s)}
      />
    </div>
  );
}
