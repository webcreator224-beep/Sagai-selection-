import React from 'react';
import { useShop } from '../context/ShopContext';

export const SizeChartModal: React.FC = () => {
  const { isSizeChartOpen, setIsSizeChartOpen } = useShop();

  if (!isSizeChartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm"
        onClick={() => setIsSizeChartOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative bg-canvas-base text-on-surface max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-border-hairline z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSizeChartOpen(false)}
          className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
            Atelier Standard
          </span>
          <h3 className="font-serif text-2xl font-bold text-primary">
            Royal Silhouette Sizing Guide
          </h3>
          <p className="text-xs text-text-muted">
            All dimensions correspond to relaxed garment measurement in inches. Measure your bust around the fullest point.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container-high text-primary font-semibold text-[11px] tracking-wider uppercase">
                <th className="p-3">Size</th>
                <th className="p-3">Bust (in)</th>
                <th className="p-3">Waist (in)</th>
                <th className="p-3">Kurta Length (in)</th>
                <th className="p-3">Palazzo Length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline">
              <tr className="bg-canvas-base">
                <td className="p-3 font-bold text-primary">XS</td>
                <td className="p-3">34</td>
                <td className="p-3">28</td>
                <td className="p-3">45</td>
                <td className="p-3">38</td>
              </tr>
              <tr className="bg-surface-subtle">
                <td className="p-3 font-bold text-primary">S</td>
                <td className="p-3">36</td>
                <td className="p-3">30</td>
                <td className="p-3">45</td>
                <td className="p-3">38</td>
              </tr>
              <tr className="bg-canvas-base">
                <td className="p-3 font-bold text-primary">M (Model)</td>
                <td className="p-3">38</td>
                <td className="p-3">32</td>
                <td className="p-3">46</td>
                <td className="p-3">39</td>
              </tr>
              <tr className="bg-surface-subtle">
                <td className="p-3 font-bold text-primary">L</td>
                <td className="p-3">40</td>
                <td className="p-3">34</td>
                <td className="p-3">46</td>
                <td className="p-3">39</td>
              </tr>
              <tr className="bg-canvas-base">
                <td className="p-3 font-bold text-primary">XL</td>
                <td className="p-3">42</td>
                <td className="p-3">36</td>
                <td className="p-3">47</td>
                <td className="p-3">40</td>
              </tr>
              <tr className="bg-surface-subtle">
                <td className="p-3 font-bold text-primary">XXL</td>
                <td className="p-3">44</td>
                <td className="p-3">38</td>
                <td className="p-3">47</td>
                <td className="p-3">40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-surface-container flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <div>
            <span className="font-bold text-on-surface block">Need custom measurements?</span>
            <span className="text-text-muted">Our concierge tailor assists with bespoke bridal commissions.</span>
          </div>
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="bg-primary text-on-primary px-4 py-2 uppercase font-semibold text-xs tracking-wider cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
