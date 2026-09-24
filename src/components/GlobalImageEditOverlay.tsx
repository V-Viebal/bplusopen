import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ImagePlus, Link2, RotateCcw, X } from 'lucide-react';
import { useCatalogData } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const GlobalImageEditOverlay: React.FC = () => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const {
    edits,
    isAdminAuthenticated,
    isEditMode,
    saveImageEdit,
    removeImageEdit,
  } = useCatalogData();

  const [hoveredImage, setHoveredImage] = useState<HTMLImageElement | null>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [selectedSource, setSelectedSource] = useState('');
  const [draft, setDraft] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const previousOverrides = useRef<Record<string, string>>(edits.images || {});

  const imageEdits = edits.images || {};
  const selectedOriginal = selectedSource;
  const selectedOverride = selectedOriginal ? imageEdits[selectedOriginal] : undefined;

  const refreshHoveredRect = () => {
    if (!hoveredImage || !document.body.contains(hoveredImage)) {
      setHoveredImage(null);
      setHoveredRect(null);
      return;
    }
    setHoveredRect(hoveredImage.getBoundingClientRect());
  };

  const isEditableImage = (image: HTMLImageElement) =>
    !image.closest('[data-admin-ui], [data-admin-image-editor], [data-admin-edit-layer]');

  const selectImage = (image: HTMLImageElement) => {
    if (!isEditableImage(image)) return;
    const original = image.dataset.adminOriginalSrc || image.getAttribute('src') || '';
    if (!original) return;
    image.dataset.adminOriginalSrc = original;
    setSelectedSource(original);
    setDraft(imageEdits[original] || image.getAttribute('src') || image.currentSrc || original);
    setError('');
    setIsOpen(true);
  };

  useEffect(() => {
    const applyImageOverrides = () => {
      document.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
        if (!isEditableImage(image)) return;
        const original = image.dataset.adminOriginalSrc || image.getAttribute('src') || '';
        if (!original) return;
        const current = image.getAttribute('src') || '';
        if (current !== original && current !== imageEdits[original] && current !== previousOverrides.current[original]) {
          image.dataset.adminOriginalSrc = current;
        } else {
          image.dataset.adminOriginalSrc = original;
        }
        const source = image.dataset.adminOriginalSrc;
        const replacement = imageEdits[source] || source;
        if (current !== replacement) {
          image.setAttribute('src', replacement);
        }
      });
      previousOverrides.current = imageEdits;
    };

    applyImageOverrides();
    const observer = new MutationObserver(applyImageOverrides);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
    return () => observer.disconnect();
  }, [imageEdits]);

  useEffect(() => {
    if (!isAdminAuthenticated || !isEditMode) {
      setHoveredImage(null);
      setHoveredRect(null);
      return;
    }

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const image = target?.closest?.('img') as HTMLImageElement | null;
      if (!image || !isEditableImage(image)) return;
      image.dataset.adminOriginalSrc ||= image.getAttribute('src') || '';
      setHoveredImage(image);
      setHoveredRect(image.getBoundingClientRect());
    };

    const handlePointerOut = (event: PointerEvent) => {
      const relatedTarget = event.relatedTarget as Node | null;
      if (relatedTarget && hoveredImage?.contains(relatedTarget)) return;
      if (relatedTarget instanceof Element && relatedTarget.closest('[data-admin-edit-layer]')) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('[data-admin-edit-layer]')) return;
      setHoveredImage(null);
      setHoveredRect(null);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const image = target?.closest?.('img') as HTMLImageElement | null;
      if (!image || !isEditableImage(image)) return;
      event.preventDefault();
      event.stopPropagation();
      selectImage(image);
    };

    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerout', handlePointerOut, true);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', refreshHoveredRect, true);
    window.addEventListener('resize', refreshHoveredRect);

    return () => {
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerout', handlePointerOut, true);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', refreshHoveredRect, true);
      window.removeEventListener('resize', refreshHoveredRect);
    };
  }, [isAdminAuthenticated, isEditMode, hoveredImage, imageEdits]);

  const openHoverEditor = () => {
    if (hoveredImage) selectImage(hoveredImage);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(isVi ? 'File quá lớn. Vui lòng chọn file dưới 5MB.' : 'File is too large. Choose an image under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDraft(reader.result);
        setError('');
      }
    };
    reader.onerror = () => setError(isVi ? 'Không đọc được file hình.' : 'Could not read this image file.');
    reader.readAsDataURL(file);
  };

  const closeEditor = () => {
    setIsOpen(false);
    setError('');
  };

  const save = () => {
    if (!selectedOriginal || !draft.trim()) return;
    saveImageEdit(selectedOriginal, draft.trim());
    closeEditor();
  };

  const restore = () => {
    if (!selectedOriginal) return;
    removeImageEdit(selectedOriginal);
    setDraft(selectedOriginal);
    closeEditor();
  };

  const buttonStyle = useMemo(() => {
    if (!hoveredRect || hoveredRect.width < 20 || hoveredRect.height < 20) return undefined;
    return {
      top: Math.max(8, hoveredRect.top + 10),
      left: Math.max(8, hoveredRect.right - 122),
    };
  }, [hoveredRect]);

  if (!isAdminAuthenticated || !isEditMode) return null;

  return (
    <>
      {buttonStyle && !isOpen && (
        <button
          type="button"
          data-admin-edit-layer
          onClick={openHoverEditor}
          className="fixed z-[85] inline-flex min-h-[34px] items-center gap-1.5 rounded-xs bg-[#1C1A17]/95 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl transition-colors hover:bg-[#9B522E]"
          style={buttonStyle}
        >
          <ImagePlus className="h-3.5 w-3.5" />
          {isVi ? 'Đổi hình' : 'Change image'}
        </button>
      )}

      {isOpen && (
        <div
          data-admin-edit-layer
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditor();
          }}
        >
          <div className="w-full max-w-lg rounded-sm border border-[#DED9CD] bg-[#FAF8F5] p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1C1A17]">
                  <ImagePlus className="h-4 w-4 text-[#9B522E]" />
                  {isVi ? 'Thay đổi hình ảnh' : 'Change image'}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#8C7A6B]">
                  {isVi ? 'Đây là lớp edit chung cho mọi hình ảnh trên frontend.' : 'This editor applies to every image on the frontend.'}
                </p>
              </div>
              <button type="button" onClick={closeEditor} className="rounded-full p-1 text-[#7A6B5F] hover:bg-[#EAE3DA]">
                <X className="h-5 w-5" />
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
                className="w-full rounded-xs border border-[#DED9CD] bg-white px-3 py-2.5 text-sm text-[#1C1A17] outline-none focus:border-[#9B522E] focus:ring-2 focus:ring-[#9B522E]/15"
              />
            </label>

            <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xs border border-dashed border-[#C7A58F] bg-white px-3 py-3 text-xs font-semibold text-[#6B5E52] hover:border-[#9B522E] hover:text-[#9B522E]">
              <ImagePlus className="h-4 w-4" />
              {isVi ? 'Chọn file hình ảnh dưới 5MB' : 'Choose an image under 5MB'}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>

            {error && <p className="mb-3 rounded-xs border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

            <div className="mb-5 max-h-64 overflow-hidden rounded-xs border border-[#DED9CD] bg-white">
              <img src={draft} alt="" className="max-h-64 w-full object-contain" />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" onClick={restore} className="inline-flex items-center gap-1.5 rounded-xs border border-[#DED9CD] bg-white px-3 py-2 text-xs font-semibold text-[#6B5E52] hover:border-[#9B522E] hover:text-[#9B522E]">
                <RotateCcw className="h-3.5 w-3.5" />
                {isVi ? 'Khôi phục gốc' : 'Restore original'}
              </button>
              <button type="button" onClick={closeEditor} className="rounded-xs border border-[#DED9CD] bg-white px-3 py-2 text-xs font-semibold text-[#6B5E52]">
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button type="button" onClick={save} className="inline-flex items-center gap-1.5 rounded-xs bg-[#9B522E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#7F4024]">
                <Check className="h-3.5 w-3.5" />
                {isVi ? 'Lưu hình' : 'Save image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
