import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { CatalogDataProvider } from './context/CatalogDataContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CatalogDataProvider>
        <App />
      </CatalogDataProvider>
    </LanguageProvider>
  </StrictMode>,
);
