import React from 'react';
import { Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useCatalogData } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

interface DeleteProductButtonProps {
  product: Product;
  className?: string;
}

export const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({ product, className = '' }) => {
  const { language } = useLanguage();
  const { isAdminAuthenticated, isEditMode, deleteProduct } = useCatalogData();
  if (!isAdminAuthenticated || !isEditMode) return null;

  const isVi = language === 'vi';
  const name = isVi ? product.nameVi || product.name : product.name;

  return (
    <button
      type="button"
      data-admin-ui
      aria-label={isVi ? `Xóa sản phẩm ${name}` : `Delete product ${name}`}
      className={`z-40 inline-flex items-center gap-1 rounded-xs bg-red-700 px-2.5 py-2 text-xs font-semibold text-white shadow-lg hover:bg-red-800 ${className}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (window.confirm(isVi
          ? `Xóa sản phẩm "${name}" khỏi website? Có thể khôi phục trong CMS.`
          : `Remove "${name}" from the website? You can restore it in the CMS.`)) {
          deleteProduct(product.id);
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
      {isVi ? 'Xóa' : 'Delete'}
    </button>
  );
};
