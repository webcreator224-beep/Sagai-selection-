import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { AiStylistDrawer } from './components/AiStylistDrawer';
import { QuickAddModal } from './components/QuickAddModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutBagPage } from './pages/CheckoutBagPage';
import { GenericCategoryPage } from './pages/GenericCategoryPage';

const MainContent: React.FC = () => {
  const { currentScreen } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-canvas-base text-on-surface">
      <Header />
      <main className="flex-1 pt-36">
        {currentScreen === 'home' && <HomePage />}
        {currentScreen === 'collections-kurtas-and-suit-sets' && <CollectionPage />}
        {currentScreen === 'products-gulabi-embroidered-chanderi-kurta-set' && <ProductDetailPage />}
        {currentScreen === 'sarees-and-lehengas' && (
          <GenericCategoryPage
            title="Sarees & Handloom Lehengas"
            categoryKey="sarees-and-lehengas"
            description="Hand-woven Banarasi tissues, Chanderi silks, and opulent bridal lehenga ensembles for grand occasions."
          />
        )}
        {currentScreen === 'festive-collection' && (
          <GenericCategoryPage
            title="Festive Collection 2025"
            categoryKey="festive-collection"
            description="Luminous metallic tissue weaves, rich velvet zardozi tunics, and Chikankari Anarkalis tailored for celebrations."
          />
        )}
        {currentScreen === 'occasion-wear' && (
          <GenericCategoryPage
            title="Occasion & Bespoke Commissions"
            categoryKey="occasion-wear"
            description="Custom tailored celebratory wear and personalized bridal trousseau design services."
          />
        )}
        {currentScreen === 'checkout' && <CheckoutBagPage />}
        {currentScreen === 'lookbook' && <HomePage />}
      </main>
      <Footer />
      <AiStylistDrawer />
      <QuickAddModal />
      <WishlistDrawer />
      <ToastNotification />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
