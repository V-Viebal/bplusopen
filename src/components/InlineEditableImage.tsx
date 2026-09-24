import React, { ChangeEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ImagePlus, Link2, X } from 'lucide-react';
import { CatalogEdits, useCatalogData } from '../context/CatalogDataContext';
import { Collection, Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

type ImageRecord = 'collection' | 'product';

interface InlineEditableImageProps {
  record: ImageRecord;
  recordId: string;
  field: keyof Collection | keyof Product;
  value: string;
  alt: string;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  arrayIndex?: number;
  arrayValues?: string[];
  arrayField?: keyof Product | keyof Collection;
}

const mergeImageEdit = (
  edits: CatalogEdits,
  record: ImageRecord,
  recordId: string,
  field: string,
  value: unknown,
): CatalogEdits => {
  const target = record === 'collection' ? edits.collections : edits.products;
  return {
    ...edits,
    [record === 'collection' ? 'collections' : 'products']: {
      ...target,
      [recordId]: {
        ...target[recordId],
        [field]: value,
      },
    },
  };
};

export const InlineEditableImage: React.FC<InlineEditableImageProps> = ({
  record,
  recordId,
  field,
  value,
  alt,
  className = '',
  onError,
  arrayIndex,
  arrayValues,
  arrayField,
}) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { edits, isAdminAuthenticated, isEditMode, saveEdits, uploadImage } = useCatalogData();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const saveImage = () => {
    const nextValue = draft.trim();
    if (nextValue && nextValue !== value) {
      if (arrayIndex !== undefined) {
        const targetArrayField = arrayField || 'lifestyleImagesList';
        const targetEdits = record === 'product' ? edits.products : edits.collections;
        const existing =
          (targetEdits[recordId]?.[targetArrayField] as string[] | undefined) ||
          arrayValues ||
          [];
        const nextImages = [...existing];
        nextImages[arrayIndex] = nextValue;
        saveEdits(
          mergeImageEdit(edits, record, recordId, String(targetArrayField), nextImages),
        );
      } else {
        saveEdits(mergeImageEdit(edits, record, recordId, String(field), nextValue));
      }
    }
    setIsOpen(false);
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError('');
    try {
      setDraft(await uploadImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload this image.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  if (!isAdminAuthenticated || !isEditMode) {
    return <img src={value} alt={alt} className={className} onError={onError} />;
  }

  return (
    <div data-admin-image-editor className="relative h-full w-full" onClick={(event) => event.stopPropagation()}>
      <img src={draft} alt={alt} className={className} onError={onError} />
      <span
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setIsOpen(true);
        }}
        className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-xs bg-[#1C1A17]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-[#9B522E]"
      >
        <ImagePlus className="h-3.5 w-3.5" />
        {isVi ? 'Đổi hình' : 'Change image'}
      </span>

      {isOpen &&
        createPortal(
          <div
            data-admin-edit-layer
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={isVi ? 'Thay đổi hình ảnh' : 'Change image'}
              className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-sm border border-[#DED9CD] bg-[#FAF8F5] p-4 text-left shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                    <ImagePlus className="h-4 w-4 text-[#9B522E]" />
                    {isVi ? 'Thay đổi hình ảnh' : 'Change image'}
                  </div>
                  <p className="mt-1 text-[11px] text-[#8C7A6B]">
                    {isVi ? 'Dán đường dẫn hoặc chọn file từ máy.' : 'Paste a path/URL or choose a local file.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-[#7A6B5F] hover:bg-[#EAE3DA] hover:text-[#1C1A17]"
                  aria-label={isVi ? 'Đóng' : 'Close'}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <label className="mb-3 block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B5E52]">
                  <Link2 className="h-3 w-3" />
                  {isVi ? 'Đường dẫn hình ảnh' : 'Image URL / path'}
                </span>
                <input
                  value={draft.startsWith('data:') ? '' : draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="/luma/scene-3.webp"
                  className="w-full rounded-xs border border-[#DED9CD] bg-white px-3 py-2 text-xs text-[#1C1A17] outline-none focus:border-[#9B522E] focus:ring-2 focus:ring-[#9B522E]/15"
                />
              </label>

              <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xs border border-dashed border-[#C7A58F] bg-white px-3 py-2.5 text-[11px] font-semibold text-[#6B5E52] transition-colors hover:border-[#9B522E] hover:text-[#9B522E]">
                <ImagePlus className="h-4 w-4" />
                {isVi ? 'Chọn file hình ảnh' : 'Choose image file'}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>

              <div className="mb-4 overflow-hidden rounded-xs border border-[#DED9CD] bg-white">
                <img src={draft} alt="" className="max-h-40 w-full object-contain" />
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(value);
                    setError('');
                    setIsOpen(false);
                  }}
                  className="rounded-xs border border-[#DED9CD] bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#6B5E52]"
                >
                  {isVi ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={saveImage}
                  disabled={isUploading || draft.startsWith('data:')}
                  className="inline-flex items-center gap-1.5 rounded-xs bg-[#9B522E] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
                >
                  <Check className="h-3.5 w-3.5" />
                  {isVi ? 'Lưu hình' : 'Save image'}
                </button>
              </div>
              {error && <p className="mt-3 rounded-xs border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
