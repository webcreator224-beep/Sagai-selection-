import React from 'react';
import { useShop } from '../context/ShopContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] bg-on-surface text-canvas-base px-5 py-3 shadow-2xl flex items-center gap-3 border border-border-hairline max-w-sm transition-all duration-300 animate-bounce">
      <span className="material-symbols-outlined text-tertiary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
        stars
      </span>
      <p className="text-xs font-medium leading-tight">{toastMessage}</p>
    </div>
  );
};
