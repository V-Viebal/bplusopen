import React, { useState, useEffect } from 'react';
import { Product, PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ProjectSpecDrawer } from './components/ProjectSpecDrawer';
import { SearchModal } from './components/SearchModal';
import { CatalogDownloadModal } from './components/CatalogDownloadModal';
import { NavigationDrawer, MenuScreen } from './components/NavigationDrawer';
import { useLanguage } from './context/LanguageContext';

// Separate Page Components
import { HomePage } from './pages/HomePage';
import { FurniturePage } from './pages/FurniturePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { DesignPage } from './pages/DesignPage';
import { StoryPage } from './pages/StoryPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { TradePage } from './pages/TradePage';
import { ShowroomsPage } from './pages/ShowroomsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { HowToBuyPage } from './pages/HowToBuyPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { CatalogPage } from './pages/CatalogPage';
import { Showroom3DPage } from './pages/Showroom3DPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminEditBar } from './components/AdminEditBar';
import { GlobalImageEditOverlay } from './components/GlobalImageEditOverlay';
import { GlobalTextEditOverlay } from './components/GlobalTextEditOverlay';
import { useCatalogData } from './context/CatalogDataContext';

export default function App() {
  // Page Routing State
  // Active Filters for Catalog & Collections
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash.startsWith('collection/')) {
      return hash.replace('collection/', '');
    }
    return 'all';
  });

  // Active Selected Product for Dedicated Product Detail Page
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash.startsWith('product/')) {
      return hash.replace('product/', '');
    }
    return 'lumino-deep-sofa';
  });

  // Page Routing State - Defaults to 'story' as requested by user
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: PageId[] = [
      'home',
      'furniture',
      'collections',
      'collection-detail',
      'product-detail',
      'materials',
      'sustainability',
      'design',
      'story',
      'care',
      'trade',
      'showrooms',
      'how-to-buy',
      'news',
      'help-center',
      'admin',
    ];
    if (hash.startsWith('product/')) {
      return 'product-detail';
    }
    if (hash.startsWith('collection/')) {
      return 'collection-detail';
    }
    if (hash === 'help-center' || hash === 'help_center' || hash === 'help' || hash === 'helpcenter') return 'help-center';
    if (hash === 'articles' || hash === 'news' || hash === 'news-events' || hash === 'news_events') return 'news';
    if (hash === 'how-to-buy' || hash === 'how_to_buy' || hash === 'howtobuy') return 'how-to-buy';
    if (hash === 'retailers' || hash === 'find-a-retailer' || hash === 'find-retailer' || hash === 'design-showroom' || hash === 'design-showrooms' || hash === 'showroom') return 'showrooms';
    if (hash === 'contract' || hash === 'contract-hospitality' || hash === 'hospitality') return 'showrooms';
    if (hash === 'catalog') return 'furniture';
    if (hash === 'design-process') return 'design';
    if (hash === 'materials-ipe' || hash === 'ipe') return 'materials';
    if (hash === 'our-story' || hash === 'our_story' || hash === 'story' || hash === 'about') return 'story';
    if (!hash || hash === '' || hash === 'home') return 'home';
    return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
  });

  // State for active Showrooms tab
  const [showroomsTab, setShowroomsTab] = useState<'retailers' | 'design-showrooms' | 'contract-hospitality'>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'retailers' || hash === 'find-a-retailer' || hash === 'find-retailer') return 'retailers';
    if (hash === 'contract' || hash === 'contract-hospitality' || hash === 'hospitality') return 'contract-hospitality';
    return 'design-showrooms';
  });

  // State for saved pieces in Project Spec Sheet
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set(['lumino-deep-sofa']));
  
  // Active Modals & Drawers
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isSpecDrawerOpen, setIsSpecDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [menuDrawerInitialScreen, setMenuDrawerInitialScreen] = useState<MenuScreen>('root');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const {
    products: catalogProducts,
    isAdminAuthenticated,
    isEditMode,
    setEditMode,
  } = useCatalogData();
  const { language } = useLanguage();

  // A deleted product cannot remain open in its detail page or quick-view modal.
  useEffect(() => {
    if (activeProductModal && !catalogProducts.some((product) => product.id === activeProductModal.id)) {
      setActiveProductModal(null);
    }
    if (currentPage === 'product-detail' && !catalogProducts.some((product) => product.id === selectedProductId)) {
      setCurrentPage('furniture');
      window.location.hash = 'furniture';
    }
  }, [activeProductModal, catalogProducts, currentPage, selectedProductId]);

  // Handle URL hash changes (browser back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = [
        'home',
        'furniture',
        'collections',
        'collection-detail',
        'product-detail',
        'materials',
        'sustainability',
        'design',
        'story',
        'care',
        'trade',
        'showrooms',
        'how-to-buy',
        'news',
        'help-center',
        'catalog',
        '3d-showroom',
        'admin',
      ];
      if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        setSelectedProductId(prodId);
        setCurrentPage('product-detail');
        return;
      }
      if (hash.startsWith('collection/')) {
        const colId = hash.replace('collection/', '');
        setSelectedCollection(colId);
        setCurrentPage('collection-detail');
        return;
      }
      if (hash === 'collections') {
        setSelectedCollection('all');
        setCurrentPage('collections');
        return;
      }
      if (hash === 'catalog' || hash === 'catalogs') {
        setCurrentPage('catalog');
        return;
      }
      if (hash === '3d-showroom' || hash === '3d_showroom' || hash === '3dshowroom' || hash === 'showroom3d') {
        setCurrentPage('3d-showroom');
        return;
      }
      if (hash === 'product-care' || hash === 'care' || hash === 'care-guide') {
        setCurrentPage('care');
        return;
      }
      if (hash === 'help-center' || hash === 'help_center' || hash === 'help' || hash === 'helpcenter') {
        setCurrentPage('help-center');
        return;
      }
      if (hash === 'articles' || hash === 'news' || hash === 'news-events' || hash === 'news_events') {
        setCurrentPage('news');
        return;
      }
      if (hash === 'how-to-buy' || hash === 'how_to_buy' || hash === 'howtobuy') {
        setCurrentPage('how-to-buy');
        return;
      }
      if (hash === 'retailers' || hash === 'find-a-retailer' || hash === 'find-retailer') {
        setShowroomsTab('retailers');
        setCurrentPage('showrooms');
        return;
      }
      if (hash === 'design-showroom' || hash === 'design-showrooms' || hash === 'showroom' || hash === 'showrooms') {
        setShowroomsTab('design-showrooms');
        setCurrentPage('showrooms');
        return;
      }
      if (hash === 'contract' || hash === 'contract-hospitality' || hash === 'hospitality') {
        setShowroomsTab('contract-hospitality');
        setCurrentPage('showrooms');
        return;
      }
      if (hash === 'design-process') {
        setCurrentPage('design');
      } else if (hash === 'materials-ipe' || hash === 'ipe') {
        setCurrentPage('materials');
      } else if (hash === 'our-story' || hash === 'our_story' || hash === 'story' || hash === 'about') {
        setCurrentPage('story');
      } else if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    // Auto-sync initial hash if landing on root
    const currentHash = window.location.hash.replace('#', '').toLowerCase();
    if (!currentHash || currentHash === '' || currentHash === 'home') {
      setCurrentPage('home');
      window.location.hash = '';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Central Navigation Handler
  const handleNavigate = (
    page: PageId,
    extra?: { 
      category?: string; 
      collection?: string; 
      productId?: string; 
      tab?: 'retailers' | 'design-showrooms' | 'contract-hospitality';
    }
  ) => {
    if (extra?.category) {
      setSelectedCategory(extra.category);
    }
    if (extra?.collection) {
      setSelectedCollection(extra.collection);
    }
    if (extra?.productId) {
      setSelectedProductId(extra.productId);
    }
    if (extra?.tab) {
      setShowroomsTab(extra.tab);
    }

    // Direct product navigation to dedicated ProductDetailPage
    if (page === 'product-detail' && extra?.productId) {
      setSelectedProductId(extra.productId);
      setCurrentPage('product-detail');
      window.location.hash = `product/${extra.productId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Direct collection navigation to dedicated CollectionDetailPage
    if ((page === 'collections' || page === 'collection-detail') && extra?.collection && extra.collection !== 'all') {
      setSelectedCollection(extra.collection);
      setCurrentPage('collection-detail');
      window.location.hash = `collection/${extra.collection}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'collections' && !extra?.collection) {
      setSelectedCollection('all');
      setCurrentPage('collections');
      window.location.hash = 'collections';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'story') {
      setCurrentPage('story');
      window.location.hash = 'our-story';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'how-to-buy') {
      setCurrentPage('how-to-buy');
      window.location.hash = 'how-to-buy';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'showrooms') {
      const targetTab = extra?.tab || showroomsTab || 'design-showrooms';
      setShowroomsTab(targetTab);
      setCurrentPage('showrooms');
      window.location.hash = targetTab === 'retailers' 
        ? 'retailers' 
        : targetTab === 'contract-hospitality' 
          ? 'contract-hospitality' 
          : 'design-showrooms';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setCurrentPage(page);
    // Update hash for bookmarking and history
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Product Click Handler -> Opens Full Dedicated ProductDetailPage
  const handleOpenProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setSelectedCollection(product.collection);
    setCurrentPage('product-detail');
    window.location.hash = `product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save to Project Spec
  const handleToggleSave = (product: Product) => {
    setSavedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const handleRemoveSavedProduct = (id: string) => {
    setSavedProductIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleClearAllSaved = () => {
    setSavedProductIds(new Set());
  };

  const savedProductsList = catalogProducts.filter((p) => savedProductIds.has(p.id));

  const handleLocateShowroom = (tab: 'retailers' | 'design-showrooms' = 'retailers') => {
    handleNavigate('showrooms', { tab });
  };

  const isHeroPage = ['home', 'story', 'furniture', 'how-to-buy', 'trade', 'collections', 'care', 'news'].includes(currentPage);

  // Dynamic header clearance tracking so content is never obscured by the fixed header
  const [headerHeight, setHeaderHeight] = useState<number>(184);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.getElementById('main-header');
      if (headerEl && window.scrollY < 20) {
        setHeaderHeight(headerEl.offsetHeight);
      }
    };
    updateHeaderHeight();
    const timer = setTimeout(updateHeaderHeight, 120);
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2] text-[#221F1C]">
      {/* Sticky Main Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSpecDrawer={() => setIsSpecDrawerOpen(true)}
        onOpenTradeModal={() => handleNavigate('trade')}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onOpenMenuDrawer={(screen: MenuScreen = 'root') => {
          setMenuDrawerInitialScreen(screen);
          setIsMenuDrawerOpen(true);
        }}
        isAdminAuthenticated={isAdminAuthenticated}
        isAdminEditMode={isEditMode}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onToggleAdminEditMode={() => setEditMode(!isEditMode)}
        savedItemCount={savedProductIds.size}
      />

      {/* Main Separate Page View */}
      <main 
        className={`flex-1 ${!isHeroPage ? 'pt-[142px] sm:pt-[168px] lg:pt-[184px]' : ''}`}
        style={!isHeroPage ? { paddingTop: `${Math.max(headerHeight, 142)}px` } : undefined}
      >
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'furniture' && (
          <FurniturePage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCollection={selectedCollection}
            onSelectCollection={setSelectedCollection}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onOpenProductModal={handleOpenProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'collections' && (
          <CollectionsPage
            initialCollection={selectedCollection}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onOpenProductModal={handleOpenProduct}
            onNavigate={handleNavigate}
          />
        )}

        {/* All collections, including LUMA, use the same editorial detail layout. */}
        {currentPage === 'collection-detail' && (
          <CollectionDetailPage
            collectionId={selectedCollection || 'lumino'}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onOpenProductModal={handleOpenProduct}
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onSelectCollection={(colId) => {
              setSelectedCollection(colId);
              window.location.hash = `collection/${colId}`;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            onNavigate={handleNavigate}
            onSelectProduct={(id) => {
              setSelectedProductId(id);
              window.location.hash = `product/${id}`;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTradeModal={() => handleNavigate('trade')}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        )}

        {currentPage === 'materials' && (
          <MaterialsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'sustainability' && (
          <SustainabilityPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'design' && (
          <DesignPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'story' && (
          <StoryPage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        )}

        {currentPage === 'care' && (
          <CareGuidePage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        )}

        {currentPage === 'trade' && (
          <TradePage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        )}

        {currentPage === 'showrooms' && (
          <ShowroomsPage 
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onOpenTradeModal={() => handleNavigate('trade')}
            initialTab={showroomsTab}
          />
        )}

        {currentPage === 'how-to-buy' && (
          <HowToBuyPage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onOpenTradeModal={() => handleNavigate('trade')}
          />
        )}

        {currentPage === 'news' && (
          <ArticlesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'help-center' && (
          <HelpCenterPage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onOpenTradeModal={() => handleNavigate('trade')}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            onNavigate={handleNavigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        )}

        {currentPage === '3d-showroom' && (
          <Showroom3DPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
            onOpenLogin={() => setIsAdminLoginOpen(true)}
          />
        )}
      </main>

      {/* Comprehensive Brand Footer */}
      <Footer
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onOpenTradeModal={() => handleNavigate('trade')}
        onNavigate={handleNavigate}
      />

      {/* Product Detail & Spec Modal */}
      <ProductModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        isSaved={activeProductModal ? savedProductIds.has(activeProductModal.id) : false}
        onToggleSave={handleToggleSave}
        onLocateShowroom={handleLocateShowroom}
      />

      {/* Slide-over Project Spec Sheet Drawer */}
      <ProjectSpecDrawer
        isOpen={isSpecDrawerOpen}
        onClose={() => setIsSpecDrawerOpen(false)}
        savedProducts={savedProductsList}
        onRemoveProduct={handleRemoveSavedProduct}
        onClearAll={handleClearAllSaved}
        onLocateShowroom={handleLocateShowroom}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(p) => {
          setIsSearchModalOpen(false);
          handleOpenProduct(p);
        }}
        onSelectCollection={(colId) => {
          handleNavigate('collections', { collection: colId });
        }}
        onNavigate={handleNavigate}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
      />

      {/* 2026 Collection Lookbook Download Modal */}
      <CatalogDownloadModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />

      {/* Sliding Navigation Drawer (Menu cuộn) */}
      <NavigationDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onNavigate={handleNavigate}
        initialScreen={menuDrawerInitialScreen}
        language={language}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      <AdminEditBar onOpenAdmin={() => handleNavigate('admin')} />
      <GlobalImageEditOverlay />
      <GlobalTextEditOverlay />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onAuthenticated={() => setEditMode(true)}
      />
    </div>
  );
}
