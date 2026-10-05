import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const QuickAddModal: React.FC = () => {
  const { isQuickAddOpen, quickAddProduct, closeQuickAdd, addToCart, setIsSizeChartOpen } = useShop();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!isQuickAddOpen || !quickAddProduct) return null;

  const activeColor = selectedColor || quickAddProduct.colors[0]?.name || 'Standard';

  const handleAdd = () => {
    addToCart(quickAddProduct, selectedSize, activeColor, 1);
    closeQuickAdd();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm"
        onClick={closeQuickAdd}
      />

      {/* Modal Container */}
      <div className="relative bg-canvas-base max-w-md w-full p-6 shadow-2xl border border-border-hairline z-10">
        <button
          onClick={closeQuickAdd}
          className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        <div className="flex gap-4 mb-4">
          <img
            src={quickAddProduct.image}
            alt={quickAddProduct.title}
            className="w-20 h-28 object-cover object-top border border-border-hairline"
          />
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest block">
              {quickAddProduct.tagline}
            </span>
            <h3 className="font-title-md font-semibold text-on-surface line-clamp-2">
              {quickAddProduct.title}
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-bold text-primary text-lg">₹{quickAddProduct.price.toLocaleString('en-IN')}</span>
              <span className="text-xs line-through text-text-muted">₹{quickAddProduct.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-semibold text-on-surface block">Color Hue: {activeColor}</span>
          <div className="flex gap-2">
            {quickAddProduct.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-7 h-7 rounded-full shadow-sm cursor-pointer transition-transform ${
                  activeColor === c.name ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-on-surface">Select Size:</span>
            <button
              onClick={() => {
                closeQuickAdd();
                setIsSizeChartOpen(true);
              }}
              className="text-primary hover:underline font-semibold"
            >
              Size Chart
            </button>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {quickAddProduct.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`py-2 text-center text-xs font-semibold uppercase transition-colors cursor-pointer border ${
                  selectedSize === sz
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-low text-on-surface border-border-hairline hover:bg-surface-container'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 text-xs font-semibold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
        >
          Add To Shopping Bag
        </button>
      </div>
    </div>
  );
};
