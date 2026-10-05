import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, ACCESSORIES } from '../data/products';
import { SizeChartModal } from '../components/SizeChartModal';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    wishlist,
    navigateTo,
    setIsSizeChartOpen,
    showToast
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];
  const isWished = wishlist.includes(product.id);

  // Gallery Active Image
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeThumbId, setActiveThumbId] = useState<string>('thumb-main');

  // Hue & Size
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Gulabi Rose');
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // Bespoke Alteration Checkbox & Note
  const [bespokeChecked, setBespokeChecked] = useState(false);
  const [bespokeNotes, setBespokeNotes] = useState('');

  // Pincode
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeResult] = useState<{ text: string; success: boolean } | null>(null);

  // Specs Tab
  const [activeTab, setActiveTab] = useState<'craft' | 'composition' | 'care' | 'shipping'>('craft');

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6 || isNaN(Number(pincode))) {
      setPincodeResult({ text: 'Please enter a valid 6-digit Indian PIN code.', success: false });
    } else {
      setPincodeResult({ text: `Eligible for Express Air delivery to PIN ${pincode} within 2-3 business days. Free shipping applied.`, success: true });
    }
  };

  const handleAddToBag = () => {
    addToCart(
      product,
      selectedSize,
      selectedColor,
      1,
      bespokeChecked,
      bespokeChecked ? bespokeNotes : undefined
    );
  };

  const handleAddAccessory = (accTitle: string, price: number) => {
    showToast(`Added "${accTitle}" (₹${price}) to Shopping Bag`);
  };

  return (
    <div className="flex flex-col w-full bg-canvas-base">
      <SizeChartModal />

      {/* Editorial Breadcrumb Bar */}
      <div className="w-full bg-surface-container-low text-on-surface border-b border-border-hairline">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-text-muted">
            <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('collections-kurtas-and-suit-sets')} className="hover:text-primary transition-colors cursor-pointer">
              Festive Collection
            </button>
            <span>/</span>
            <span className="text-on-surface font-semibold line-clamp-1">{product.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider text-text-muted mt-2 sm:mt-0 font-semibold">
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> IN STOCK • READY TO SHIP
            </span>
            <span>ARTISAN ID: {product.artisanId || '#SAG-2025-GLB'}</span>
          </div>
        </div>
      </div>

      {/* Main Product Stage */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-8 lg:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:gap-6 sticky top-28">
            {/* Interactive Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0 scrollbar-none">
              {(product.detailImages || [
                { id: 'thumb-main', label: 'LOOK', url: product.image }
              ]).map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => {
                    setActiveImage(thumb.url);
                    setActiveThumbId(thumb.id);
                  }}
                  className={`w-16 h-20 md:w-20 md:h-24 bg-surface-container overflow-hidden relative group shadow-sm transition-all cursor-pointer border ${
                    activeThumbId === thumb.id
                      ? 'ring-2 ring-primary opacity-100'
                      : 'opacity-70 hover:opacity-100 border-border-hairline'
                  }`}
                >
                  <img src={thumb.url} alt={thumb.label} className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 inset-x-0 bg-primary/80 text-on-primary text-[9px] font-semibold tracking-tighter py-0.5 text-center">
                    {thumb.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Hero Display Frame */}
            <div className="relative flex-1 bg-surface-container-low overflow-hidden shadow-md group border border-border-hairline">
              <div className="aspect-[3/4] w-full relative">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-top transition-opacity duration-300"
                />

                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 text-xs text-on-surface shadow-sm">
                  <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                  <span>HD ZOOM</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-primary text-on-primary px-3 py-1 text-[10px] font-semibold tracking-widest shadow-md uppercase">
                  AUTHENTIC CHANDERI WEAVE
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 left-4 w-9 h-9 bg-surface/90 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                    isWished ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Purchasing & Narrative Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-secondary uppercase">
                  Heritage Festive Weaves
                </span>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="font-semibold text-on-surface">{product.rating}</span>
                  <span>({product.reviewCount} Heirloom Reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-primary leading-tight font-medium">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-surface-subtle p-4 shadow-sm flex items-center justify-between border border-border-hairline">
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-3">
                  <span className="font-bold text-2xl text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm line-through text-text-muted">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 uppercase">
                    {product.discountPct}% SAVINGS
                  </span>
                </div>
                <p className="text-[11px] text-text-muted">Inclusive of all duties and GST. Complimentary pan-India transit.</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] tracking-widest text-primary font-bold block">PREPAID PERK</span>
                <span className="text-xs font-semibold text-festive-maroon-dark">Additional ₹450 Off</span>
              </div>
            </div>

            {/* Hue Selector */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface">
                  Selected Hue: <span className="text-primary font-bold">{selectedColor}</span>
                </span>
                <span className="text-text-muted text-[11px]">{product.colors.length} Colorways Crafted</span>
              </div>

              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 shadow-sm transition-all cursor-pointer ${
                      selectedColor === c.name ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-on-surface">Select Silhouette Size</span>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] uppercase font-bold text-primary hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">straighten</span>
                  ROYAL SIZE CHART
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 text-center text-xs font-semibold transition-colors cursor-pointer border ${
                      selectedSize === sz
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container text-on-surface border-border-hairline hover:bg-primary-container hover:text-on-primary'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-text-muted flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                Model is 5'9" wearing Size S. Features relaxed traditional cut.
              </p>
            </div>

            {/* Bespoke Alteration Request Checkbox */}
            <div className="bg-surface-subtle p-3.5 shadow-sm space-y-2 border border-border-hairline">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bespokeChecked}
                  onChange={(e) => setBespokeChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary rounded-none cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-on-surface block">Complimentary Bespoke Alteration</span>
                  <p className="text-[11px] text-text-muted">
                    Master tailor will adjust tunic hemline length (-2" to +2") or sleeve circumference at zero surcharge prior to dispatch.
                  </p>
                </div>
              </label>

              {bespokeChecked && (
                <div className="pl-7 pt-2">
                  <input
                    type="text"
                    value={bespokeNotes}
                    onChange={(e) => setBespokeNotes(e.target.value)}
                    placeholder="E.g., Please trim kurta length by 1.5 inches for 5'3 height"
                    className="w-full bg-canvas-base text-on-surface text-xs p-2.5 focus:outline-none border border-border-hairline placeholder:text-text-muted"
                  />
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToBag}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 px-6 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  Add to Shopping Bag
                </button>
                <button
                  onClick={() => {
                    handleAddToBag();
                    navigateTo('checkout');
                  }}
                  className="w-full bg-on-surface hover:bg-primary text-canvas-base py-4 px-6 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Instant Checkout
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full border py-3 px-4 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isWished
                    ? 'bg-primary-fixed/50 text-primary border-primary shadow-xs'
                    : 'bg-surface-subtle text-on-surface border-border-hairline hover:border-primary hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>
                  favorite
                </span>
                {isWished ? 'Saved in Your Wishlist' : 'Add to Wishlist'}
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-text-muted font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span> 100% Handcrafted Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">published_with_changes</span> 7-Day Easy Exchange
                </span>
              </div>
            </div>

            {/* Pincode Estimator */}
            <div className="bg-surface-container-low p-4 shadow-sm space-y-2 border border-border-hairline">
              <span className="text-xs font-semibold text-on-surface tracking-wider uppercase block">
                Check Festive Delivery Window
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted text-[18px]">location_on</span>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit delivery pincode"
                    className="w-full bg-canvas-base pl-10 pr-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-surface-container-highest hover:bg-on-surface hover:text-canvas-base px-5 py-2 text-xs uppercase font-semibold tracking-wider text-on-surface transition-colors cursor-pointer border border-border-hairline"
                >
                  Check
                </button>
              </form>
              {pincodeMessage && (
                <p className={`text-xs pt-1 ${pincodeMessage.success ? 'text-primary font-semibold' : 'text-error font-medium'}`}>
                  {pincodeMessage.text}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WEAVERS OF MP SPLIT BANNER */}
      <section className="w-full bg-primary text-on-primary py-12 lg:py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-tertiary-fixed text-xs font-semibold uppercase tracking-widest block">
                Heritage Weavers of Madhya Pradesh
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight font-light">
                Woven on Wooden Looms, Draped in Festivity
              </h2>
              <p className="text-xs sm:text-sm text-primary-fixed leading-relaxed">
                Every Gulabi ensemble embodies seventy-two uninterrupted hours of traditional warp and weft calibration. The translucent gossamer texture is enriched with gold zari motifs embedded deep into the selvedge.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-festive-maroon-dark p-3 text-center border border-on-primary/10">
                  <span className="font-serif text-xl font-bold text-tertiary-fixed block">72h</span>
                  <span className="text-[10px] tracking-wider uppercase text-primary-fixed block mt-0.5">Looped Threadwork</span>
                </div>
                <div className="bg-festive-maroon-dark p-3 text-center border border-on-primary/10">
                  <span className="font-serif text-xl font-bold text-tertiary-fixed block">100%</span>
                  <span className="text-[10px] tracking-wider uppercase text-primary-fixed block mt-0.5">Mulberry Chanderi</span>
                </div>
                <div className="bg-festive-maroon-dark p-3 text-center border border-on-primary/10">
                  <span className="font-serif text-xl font-bold text-tertiary-fixed block">0.38kg</span>
                  <span className="text-[10px] tracking-wider uppercase text-primary-fixed block mt-0.5">Featherweight Fall</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-lg relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDJJ8O6FA2sZUqoGLhL0cQGYAbl3LdiN40zpaPCUNcRpGInk9NMcu0MWrFDXbGelpV4qDW_3EIs1T7QdTsgZd86cqKd3qwCZfXs7G81Cy5_Zf06rJcv5vmB4W4V4HfV-cWHw5hx0XCdaF2CBfDe1PITMBY_fHuRfEJFbS0eTTc7V8dJfMj_qa1lJHMI4t1nPJNzPsrT3lGeUbfr4UHVt3uOqjRLzNrfUeuE6i2U5Pm0yBsizrAceLq"
                  alt="Chanderi Loom Weaving"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-festive-maroon-dark/90 px-2.5 py-1 text-[10px] text-tertiary-fixed font-semibold tracking-wider">
                  CHANDERI CLUSTER, MP
                </div>
              </div>
              <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-lg relative group mt-6">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7wpfrsPgt0w89PWBRNln_eOP_Guzu8pyPhI6r8e4if37iyM2opiUpVTguA10Kr-GRe7ZaHycJaA3xZONTUo_qwU9r1_tUcmcND82un1fE0n8J8irtGR9jxMDtPnlRqWmxf3ngR-EZMZ73jY9nA9sCShhIw60Kl8WZHdigYCbKur3SJ5FkD1rU25enXR9c2oHyMs-TJ8qjnRFxtp8ecHGcCUodYI3tqGq4bWXFxdffO4i-9GQE0FJ-"
                  alt="Zardozi Karigari Detail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-festive-maroon-dark/90 px-2.5 py-1 text-[10px] text-tertiary-fixed font-semibold tracking-wider">
                  ZARDOZI KĀRĪGARĪ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED TABBED SPECIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-8 w-full">
        <div className="bg-surface-subtle shadow-sm p-6 lg:p-10 border border-border-hairline">
          {/* Tab Controls */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
            {[
              { key: 'craft', label: 'Craft & Silhouette' },
              { key: 'composition', label: 'Fabric Composition' },
              { key: 'care', label: 'Care Instructions' },
              { key: 'shipping', label: 'Free Shipping & Returns' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-5 py-3 text-xs uppercase font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Craft */}
          {activeTab === 'craft' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-primary font-medium">Royal Silhouette & Craftsmanship</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                Constructed with a modest V-neckline adorned with artisanal copper and gold zardozi bullion, paired with hand-tucked micro gathers along the yoke. The kurta silhouette flows in a structured straight drape with side slits calibrated for regal movement and fluid ease.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-canvas-base p-4 shadow-sm border border-border-hairline space-y-1">
                  <span className="text-xs uppercase text-secondary font-bold block">TOP PIECE</span>
                  <p className="text-xs text-on-surface">Calf-length straight tunic, 3/4 sleeves with scallop gota trim, cotton mulmul lining.</p>
                </div>
                <div className="bg-canvas-base p-4 shadow-sm border border-border-hairline space-y-1">
                  <span className="text-xs uppercase text-secondary font-bold block">BOTTOM SILHOUETTE</span>
                  <p className="text-xs text-on-surface">Structured wide-leg palazzo with semi-elasticated waist and concealed right pocket.</p>
                </div>
                <div className="bg-canvas-base p-4 shadow-sm border border-border-hairline space-y-1">
                  <span className="text-xs uppercase text-secondary font-bold block">DUPATTA SCARF</span>
                  <p className="text-xs text-on-surface">2.5-meter pure organza veil with hand-tasseled edges and gold wire border work.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Fabric Composition */}
          {activeTab === 'composition' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-primary font-medium">100% Chanderi Silk & Natural Dyes</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                Sourced directly from registered weaving guilds in Chanderi. The fabric marries fine mulberry silk warp with unbleached organic cotton weft, yielding the iconic luminous sheen and breathable structure favored for Indian climates.
              </p>
              <ul className="space-y-2 text-xs text-on-surface pt-2">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> <strong>Kurta Shell:</strong> {product.specs?.shell || '100% Handloom Chanderi Silk'}</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> <strong>Inner Lining:</strong> {product.specs?.lining || '100% Pure Pre-shrunk Cotton Mulmul'}</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> <strong>Palazzo Fabric:</strong> {product.specs?.bottom || 'Textured Chanderi Cotton Blend'}</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> <strong>Drape:</strong> {product.specs?.drape || 'Translucent Gossamer Organza Silk'}</li>
              </ul>
            </div>
          )}

          {/* Tab 3: Care Instructions */}
          {activeTab === 'care' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-primary font-medium">Preserving Your Heirloom</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { icon: 'dry_cleaning', title: 'Dry Clean Only', desc: 'Strictly professional dry clean. Do not submerge in water.' },
                  { icon: 'iron', title: 'Reverse Warm Iron', desc: 'Steam or iron on reverse side under a clean cotton press cloth.' },
                  { icon: 'inventory_2', title: 'Muslin Storage', desc: 'Store wrapped in the complimentary Sagai unbleached muslin garment bag.' },
                  { icon: 'wb_sunny', title: 'Avoid Direct Sunlight', desc: 'Keep away from prolonged UV exposure and dampness.' }
                ].map((c, i) => (
                  <div key={i} className="bg-canvas-base p-4 shadow-sm border border-border-hairline flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">{c.icon}</span>
                    <div>
                      <span className="font-semibold text-xs text-on-surface block">{c.title}</span>
                      <span className="text-[11px] text-text-muted mt-0.5 block">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Shipping */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-primary font-medium">Complimentary Shipping & Easy Exchanges</h3>
              <div className="space-y-3 text-xs text-on-surface leading-relaxed max-w-3xl">
                <p><strong>Domestic Dispatch:</strong> Ready-to-wear sizes dispatch within 24-48 business hours. Orders requesting bespoke alteration require 3 additional tailor crafting days.</p>
                <p><strong>Transit Time:</strong> 2 to 4 days across metros (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata); 3 to 6 days for Tier-2 cities.</p>
                <p><strong>7-Day Exchange Policy:</strong> If sizing requires adjustments, our concierge arranges doorstep pickup and size exchanges with zero added transit fees.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CURATED ACCESSORIES (COMPLETE THE LOOK) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12 py-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">Artisanal Pairings</span>
            <h2 className="font-serif text-3xl text-primary mt-1">Complete the Festive Silhouette</h2>
          </div>
          <p className="text-xs text-text-muted max-w-md mt-2 md:mt-0">
            Handpicked jewelry and accessories designed by our in-house atelier to harmonise with the Gulabi rose silk palette.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCESSORIES.slice(0, 3).map((acc) => (
            <div key={acc.id} className="bg-surface-container-low border border-border-hairline shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="aspect-[4/5] bg-canvas-base overflow-hidden relative">
                <img
                  src={acc.image}
                  alt={acc.title}
                  className="w-full h-full object-cover object-center"
                />
                {acc.badge && (
                  <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase px-2 py-0.5">
                    {acc.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">{acc.category}</span>
                  <h4 className="font-semibold text-sm text-on-surface truncate">{acc.title}</h4>
                  <p className="text-xs text-text-muted line-clamp-2">{acc.description}</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-border-hairline">
                  <span className="font-bold text-base text-primary">₹{acc.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleAddAccessory(acc.title, acc.price)}
                    className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 text-[11px] uppercase font-semibold tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    + Add Accessory
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add To Bag Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1f0107]/95 text-on-primary p-3 border-t border-tertiary-fixed/30 sm:hidden flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
        <div>
          <span className="text-[10px] uppercase text-tertiary-fixed block font-medium">Size {selectedSize} • Hue: {selectedColor}</span>
          <span className="font-bold text-base text-tertiary-fixed">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleAddToBag}
          className="bg-tertiary-fixed text-tertiary hover:bg-white font-bold py-2.5 px-5 text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
          Add to Bag
        </button>
      </div>
    </div>
  );
};
