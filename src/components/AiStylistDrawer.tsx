import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { StylistMessage } from '../types';

export const AiStylistDrawer: React.FC = () => {
  const { isStylistOpen, setIsStylistOpen, selectedProduct, navigateTo } = useShop();

  const [messages, setMessages] = useState<StylistMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaste & Welcome to Sagai Selection Royal Concierge. I am your Master Stylist. How may I assist you today with garment selection, custom sizing, or occasion styling (Sangeet, Reception, Haldi, Trousseau)?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isStylistOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: StylistMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentQuery,
          currentProduct: selectedProduct?.title
        })
      });

      let replyText = "Our master tailors recommend pure Chanderi silk with subtle gold zardozi for evening celebrations.";

      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          replyText = data.reply || replyText;
        }
      } else {
        const lower = currentQuery.toLowerCase();
        if (lower.includes('haldi') || lower.includes('yellow')) {
          replyText = "For Haldi ceremonies, our 'Kesar Ochre Festive Sharara Set' in crinkled viscose with intricate gota patti border work is the quintessential vibrant choice.";
        } else if (lower.includes('sangeet') || lower.includes('night') || lower.includes('reception')) {
          replyText = "For evening Sangeets & Receptions, 'Neelam Royal Velvet Embroidered Kurta Set' or 'Noor Tissue Silk' offers luminous metallic shimmer.";
        } else if (lower.includes('size') || lower.includes('fit') || lower.includes('alteration')) {
          replyText = "Our Royal Silhouette Size Chart runs true to traditional Indian tailoring. We offer complimentary bespoke length & bust alterations (-2\" to +2\") prior to dispatch!";
        }
      }

      const aiMsg: StylistMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'As Sagai\'s Master Concierge, I recommend pure Chanderi silk with hand-embroidered organza dupattas for timeless celebratory elegance.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What should I wear for a daytime Haldi ceremony?",
    "Recommend an ensemble for an evening Sangeet.",
    "How does Sagai's custom alteration service work?",
    "Which silk is lightweight yet non-sheer?"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsStylistOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-canvas-base h-full shadow-2xl flex flex-col z-10 border-l border-border-hairline">
        {/* Header */}
        <div className="p-4 bg-surface-subtle border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-primary">Sagai Master Stylist</h3>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">AI Bespoke Concierge</p>
            </div>
          </div>
          <button
            onClick={() => setIsStylistOpen(false)}
            className="p-1 hover:text-primary text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Current Product Context Bar if viewing product */}
        {selectedProduct && (
          <div className="px-4 py-2 bg-surface-container-low border-b border-border-hairline flex items-center gap-3 text-xs">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-8 h-10 object-cover object-top"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold uppercase text-secondary tracking-wider block">Context</span>
              <p className="font-medium text-on-surface truncate">{selectedProduct.title}</p>
            </div>
            <button
              onClick={() => {
                setIsStylistOpen(false);
                navigateTo('products-gulabi-embroidered-chanderi-kurta-set', selectedProduct);
              }}
              className="text-primary hover:underline text-[11px] font-semibold"
            >
              View
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary font-medium'
                    : 'bg-surface-container-low text-on-surface border border-border-hairline'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-text-muted mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-primary font-medium p-2">
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>Consulting atelier master archives...</span>
            </div>
          )}
        </div>

        {/* Quick Questions Suggestions */}
        <div className="px-4 py-2 bg-surface-subtle border-t border-border-hairline">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            Suggested Consultations:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                className="text-[11px] bg-canvas-base hover:bg-primary hover:text-on-primary text-on-surface-variant px-2.5 py-1 border border-border-hairline transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-canvas-base border-t border-border-hairline flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask styling advice or sizing questions..."
            className="flex-1 bg-surface-container-low px-3 py-2 text-xs text-on-surface placeholder:text-text-muted focus:outline-none border border-border-hairline"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-primary text-on-primary px-4 py-2 text-xs uppercase font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
