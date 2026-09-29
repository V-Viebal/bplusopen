import React from 'react';
import { Trash2 } from 'lucide-react';
import { Collection } from '../types';
import { useCatalogData } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

interface DeleteCollectionButtonProps {
  collection: Collection;
  className?: string;
  variant?: 'button' | 'badge';
}

export const DeleteCollectionButton: React.FC<DeleteCollectionButtonProps> = ({
  collection,
  className = '',
  variant = 'button',
}) => {
  const { language } = useLanguage();
  const { isAdminAuthenticated, isEditMode, deleteCollection } = useCatalogData();
  if (!isAdminAuthenticated || !isEditMode) return null;

  const isVi = language === 'vi';
  const name = isVi && collection.nameVi ? collection.nameVi : collection.name;

  return (
    <button
      type="button"
      data-admin-ui
      aria-label={isVi ? `Xóa collection ${name}` : `Delete collection ${name}`}
      className={
        variant === 'badge'
          ? `z-40 inline-flex items-center gap-1 rounded-xs bg-red-700 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-md hover:bg-red-800 transition-colors cursor-pointer ${className}`
          : `z-40 inline-flex items-center gap-1.5 rounded-xs bg-red-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-red-800 transition-colors cursor-pointer ${className}`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (
          window.confirm(
            isVi
              ? `Xóa collection "${name}" và toàn bộ sản phẩm thuộc collection này khỏi website?`
              : `Remove collection "${name}" and all attached products from the website?`,
          )
        ) {
          deleteCollection(collection.id);
        }
      }}
    >
      <Trash2 className="h-3.5 w-3.5" />
      <span>{isVi ? 'Xóa Collection' : 'Delete Collection'}</span>
    </button>
  );
};
