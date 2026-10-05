import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/918767897945"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[110] bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-110 cursor-pointer border border-white/20 group"
      title="Chat with Sagai Concierge on WhatsApp (+91 87678 97945)"
    >
      <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
        chat
      </span>
      <div className="hidden group-hover:flex flex-col text-left pr-2 transition-all">
        <span className="text-[10px] uppercase font-bold tracking-wider leading-none">Junagadh Concierge</span>
        <span className="text-xs font-bold leading-tight">+91 87678 97945</span>
      </div>
    </a>
  );
};
