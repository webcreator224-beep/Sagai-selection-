import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

interface FilterDrawerProps {
  onApplyFilters?: (filters: any) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ onApplyFilters }) => {
  const { isFilterDrawerOpen, setIsFilterDrawerOpen } = useShop();

  const [priceRange, setPriceRange] = useState(8000);
  const [selectedSilhouette, setSelectedSilhouette] = useState<string[]>(['Straight Cut Kurtas', 'Anarkali & Angrakha']);
  const [selectedFabric, setSelectedFabric] = useState<string[]>(['Pure Chanderi Silk']);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  if (!isFilterDrawerOpen) return null;

  const handleSilhouetteToggle = (val: string) => {
    setSelectedSilhouette(prev => 
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const handleFabricToggle = (val: string) => {
    setSelectedFabric(prev => 
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const handleClear = () => {
    setSelectedSilhouette([]);
    setSelectedFabric([]);
    setPriceRange(15000);
    setSelectedSize('');
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        silhouettes: selectedSilhouette,
        fabrics: selectedFabric,
        maxPrice: priceRange,
        size: selectedSize
      });
    }
    setIsFilterDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFilterDrawerOpen(false)}
      />

      {/* Slide-over Container */}
      <aside className="relative w-full max-w-md bg-canvas-base h-full z-10 shadow-2xl flex flex-col border-l border-border-hairline">
        {/* Drawer Header */}
        <div className="p-4 bg-surface-subtle border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            <h2 className="text-base font-semibold text-on-surface">Filter Collection</h2>
          </div>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 hover:text-primary transition-colors text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Filter Options Accordions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Filter: Silhouette */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase text-on-surface tracking-wider font-semibold">Silhouette</h4>
              <span className="material-symbols-outlined text-[18px] text-text-muted">remove</span>
            </div>
            <div className="space-y-2 text-xs text-on-surface-variant">
              {[
                { name: 'Straight Cut Kurtas', count: 64 },
                { name: 'Anarkali & Angrakha', count: 42 },
                { name: 'Sharara & Gharara Sets', count: 28 },
                { name: 'Co-ord Suit Sets', count: 14 }
              ].map((item) => (
                <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                  <input
                    type="checkbox"
                    checked={selectedSilhouette.includes(item.name)}
                    onChange={() => handleSilhouetteToggle(item.name)}
                    className="accent-primary w-4 h-4 rounded-none cursor-pointer"
                  />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-text-muted">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: Fabric */}
          <div className="space-y-3 pt-4 bg-surface-subtle p-3.5 rounded border border-border-hairline">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase text-on-surface tracking-wider font-semibold">Fabric & Weave</h4>
              <span className="material-symbols-outlined text-[18px] text-text-muted">remove</span>
            </div>
            <div className="space-y-2 text-xs text-on-surface-variant">
              {[
                { name: 'Pure Chanderi Silk', count: 52 },
                { name: 'Mulberry Silk Velvet', count: 34 },
                { name: 'Hand-woven Tissue Silk', count: 22 },
                { name: 'Organic Mulmul Cotton', count: 40 }
              ].map((item) => (
                <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                  <input
                    type="checkbox"
                    checked={selectedFabric.includes(item.name)}
                    onChange={() => handleFabricToggle(item.name)}
                    className="accent-primary w-4 h-4 rounded-none cursor-pointer"
                  />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-text-muted">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: Color Palette Swatches */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase text-on-surface tracking-wider font-semibold">Artisanal Palette</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Gulabi Mauve', hex: '#D498A1' },
                { name: 'Neelam Blue', hex: '#182B49' },
                { name: 'Kesar Ochre', hex: '#E5A823' },
                { name: 'Festive Maroon', hex: '#480F16' },
                { name: 'Ivory Chandni', hex: '#F4F1EA' },
                { name: 'Emerald Green', hex: '#1A3326' }
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleFabricToggle(c.name)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface text-xs hover:bg-surface-container border border-border-hairline cursor-pointer"
                >
                  <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Price Range Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <h4 className="uppercase text-on-surface tracking-wider font-semibold">Price Range</h4>
              <span className="text-primary font-bold">Max: ₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="15000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>₹1,999</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* Filter: Size Availability */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase text-on-surface tracking-wider font-semibold">Size</h4>
            <div className="grid grid-cols-6 gap-1.5">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 text-center text-xs cursor-pointer border ${
                    selectedSize === sz
                      ? 'bg-primary text-on-primary border-primary font-bold'
                      : 'bg-surface-container-low text-on-surface border-border-hairline hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-surface-subtle border-t border-border-hairline flex items-center gap-3">
          <button
            onClick={handleClear}
            className="flex-1 py-3 bg-surface-container text-on-surface text-xs uppercase font-semibold tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Apply (148 Styles)
          </button>
        </div>
      </aside>
    </div>
  );
};
