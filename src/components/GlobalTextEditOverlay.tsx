import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Pencil, RotateCcw, Trash2, X } from 'lucide-react';
import { useCatalogData } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

const EXCLUDED = 'script, style, noscript, svg, textarea, select, input, [contenteditable], [data-admin-ui], [data-admin-edit-layer], [data-admin-image-editor]';
const originals = new WeakMap<Text, string>();

const isEditable = (node: Text): boolean => {
  const parent = node.parentElement;
  return Boolean(
    parent &&
    parent.closest('#root') &&
    !parent.closest(EXCLUDED) &&
    (node.textContent?.trim() || originals.has(node)),
  );
};

// The page, language, original copy and DOM position make repeated labels
// independently editable without changing the markup of every page.
const textKey = (node: Text, language: string): string => {
  const parts: string[] = [];
  let element: Element | null = node.parentElement;
  const isSiteContent = Boolean(element?.closest('header, footer'));
  while (element && element.id !== 'root') {
    const parent: Element | null = element.parentElement;
    if (!parent) break;
    parts.push(`${element.tagName.toLowerCase()}:${Array.prototype.indexOf.call(parent.children, element)}`);
    element = parent;
  }
  const index = Array.prototype.indexOf.call(node.parentNode?.childNodes || [], node);
  const original = originals.get(node) || node.textContent || '';
  return `page-text:${isSiteContent ? 'site' : location.hash || '#home'}:${language}:${parts.reverse().join('/')}:${index}:${original.trim()}`;
};

const deletedTextNodes = new WeakSet<Text>();

export const GlobalTextEditOverlay: React.FC = () => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { edits, isAdminAuthenticated, isEditMode, saveContentEdits, removeContentEdit } = useCatalogData();
  const [selected, setSelected] = useState<{ key: string; original: string; linkKey?: string; href?: string } | null>(null);
  const [draft, setDraft] = useState('');
  const [draftHref, setDraftHref] = useState('');
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const [hoverNode, setHoverNode] = useState<Text | null>(null);
  const selectedRef = useRef(selected);
  const contentsRef = useRef(edits.content);
  contentsRef.current = edits.content;
  const previousOverrides = useRef<Record<string, string>>(edits.content);
  selectedRef.current = selected;

  const applyOverrides = useCallback(() => {
    const root = document.getElementById('root');
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!isEditable(node)) continue;
      const current = node.textContent || '';
      const previous = originals.get(node);
      if (previous === undefined) originals.set(node, current);
      else if (!deletedTextNodes.has(node)) {
        const oldKey = textKey(node, language);
        const oldReplacement = contentsRef.current[oldKey] ?? previousOverrides.current[oldKey];
        const expected = oldReplacement === undefined
          ? previous
          : previous.replace(previous.trim(), oldReplacement);
        if (current !== expected && current !== previous) originals.set(node, current);
      }
      const original = originals.get(node) || current;
      const replacement = contentsRef.current[textKey(node, language)];
      const next = replacement === undefined
        ? original
        : replacement === ''
          ? (isAdminAuthenticated && isEditMode ? (isVi ? '[Nội dung đã xóa · bấm để khôi phục]' : '[Deleted text · click to restore]') : '')
          : original.replace(original.trim(), replacement);
      if (node.textContent !== next) node.textContent = next;
      if (replacement === '') deletedTextNodes.add(node);
      else deletedTextNodes.delete(node);
    }
    root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
      if (anchor.closest('[data-admin-ui], [data-admin-edit-layer]')) return;
      const firstText = Array.from(anchor.querySelectorAll('*'))
        .flatMap((element) => Array.from(element.childNodes))
        .concat(Array.from(anchor.childNodes))
        .find((node): node is Text => node.nodeType === Node.TEXT_NODE && isEditable(node as Text));
      if (!firstText) return;
      const key = `page-link:${textKey(firstText, language)}`;
      const current = anchor.getAttribute('href') || '';
      const previous = anchor.dataset.adminOriginalHref;
      if (previous && current !== previous && current !== (edits.content[key] || previous)) {
        anchor.dataset.adminOriginalHref = current;
      }
      const original = anchor.dataset.adminOriginalHref || current;
      if (!original) return;
      anchor.dataset.adminOriginalHref = original;
      const next = contentsRef.current[key] || original;
      if (anchor.getAttribute('href') !== next) anchor.setAttribute('href', next);
    });
    previousOverrides.current = contentsRef.current;
  }, [language, isAdminAuthenticated, isEditMode, isVi]);

  useEffect(() => {
    applyOverrides();
  }, [edits.content, applyOverrides]);

  useEffect(() => {
    const observer = new MutationObserver(applyOverrides);
    observer.observe(document.getElementById('root') || document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    window.addEventListener('hashchange', applyOverrides);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', applyOverrides);
    };
  }, [applyOverrides]);

  useEffect(() => {
    if (!isAdminAuthenticated || !isEditMode) {
      setHoverRect(null);
      setHoverNode(null);
      setSelected(null);
      return;
    }

    const findText = (target: EventTarget | null, x: number, y: number): Text | null => {
      if (!(target instanceof Element) || target.closest(EXCLUDED)) return null;
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let candidate: Text | null = null;
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (!isEditable(node)) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = Array.from(range.getClientRects());
        if (rects.some((rect) => x >= rect.left - 3 && x <= rect.right + 3 && y >= rect.top - 3 && y <= rect.bottom + 3)) {
          candidate = node;
          break;
        }
      }
      if (candidate) return candidate;
      // A heading or paragraph can be wider than a short edited sentence.
      // Clicking its empty padding should still reopen the same editor.
      if (target.matches('h1, h2, h3, h4, h5, h6, p, span, label, button, a')) {
        const rect = target.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return Array.from(target.childNodes).find(
            (node): node is Text => node.nodeType === Node.TEXT_NODE && isEditable(node as Text),
          ) || null;
        }
      }
      const deleted = Array.from(target.childNodes).find(
        (node): node is Text => node.nodeType === Node.TEXT_NODE && deletedTextNodes.has(node as Text),
      );
      if (deleted) return deleted;
      return null;
    };

    const handleMove = (event: PointerEvent) => {
      if (selectedRef.current) return;
      const node = findText(event.target, event.clientX, event.clientY);
      if (!node) {
        setHoverRect(null);
        setHoverNode(null);
        return;
      }
      const range = document.createRange();
      range.selectNodeContents(node);
      setHoverNode(node);
      setHoverRect(deletedTextNodes.has(node)
        ? node.parentElement?.getBoundingClientRect() || range.getBoundingClientRect()
        : range.getBoundingClientRect());
    };
    const handleClick = (event: MouseEvent) => {
      if (selectedRef.current) return;
      const node = findText(event.target, event.clientX, event.clientY);
      if (!node) return;
      event.preventDefault();
      event.stopPropagation();
      const key = textKey(node, language);
      const original = (originals.get(node) || node.textContent || '').trim();
      const anchor = node.parentElement?.closest<HTMLAnchorElement>('a[href]');
      const href = anchor?.dataset.adminOriginalHref || anchor?.getAttribute('href') || undefined;
      const linkKey = href ? `page-link:${key}` : undefined;
      setSelected({ key, original, linkKey, href });
      setDraft(edits.content[key] || original);
      setDraftHref(linkKey ? edits.content[linkKey] ?? href ?? '' : '');
      setHoverRect(null);
      setHoverNode(null);
    };

    document.addEventListener('pointermove', handleMove, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('pointermove', handleMove, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isAdminAuthenticated, isEditMode, edits.content, language]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  const save = () => {
    if (!selected) return;
    const patch: Record<string, string> = { [selected.key]: draft.trim() };
    if (selected.linkKey && draftHref.trim() !== (edits.content[selected.linkKey] ?? selected.href)) {
      // Block scripts in an editable URL; only normal destinations are allowed.
      const url = draftHref.trim();
      if (/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(url)) {
        patch[selected.linkKey] = url;
      }
    }
    saveContentEdits(patch);
    setSelected(null);
  };
  const restore = () => {
    if (!selected) return;
    removeContentEdit(selected.key);
    if (selected.linkKey) removeContentEdit(selected.linkKey);
    setSelected(null);
  };
  const deleteText = () => {
    if (!selected) return;
    if (!window.confirm(isVi
      ? 'Xóa nội dung này khỏi trang? Có thể khôi phục lại trong Edit Mode.'
      : 'Remove this text from the page? You can restore it in Edit Mode.')) return;
    saveContentEdits({ [selected.key]: '' });
    setSelected(null);
  };

  if (!isAdminAuthenticated || !isEditMode) return null;
    return (
    <>
      {hoverRect && hoverNode && !selected && hoverRect.width > 0 && hoverRect.height > 0 && (
        <button
          type="button"
          data-admin-edit-layer
          aria-label={isVi ? 'Sửa nội dung' : 'Edit content'}
          className="fixed z-[79] flex items-center justify-center rounded-xs border border-[#C28B75] bg-[#1C1A17] p-1.5 text-white shadow-lg hover:bg-[#9B522E]"
          style={{ left: Math.max(4, hoverRect.right - 28), top: Math.max(4, hoverRect.top - 28) }}
          onClick={() => {
            if (!hoverNode.isConnected) return;
            const key = textKey(hoverNode, language);
            const original = (originals.get(hoverNode) || hoverNode.textContent || '').trim();
            const anchor = hoverNode.parentElement?.closest<HTMLAnchorElement>('a[href]');
            const href = anchor?.dataset.adminOriginalHref || anchor?.getAttribute('href') || undefined;
            const linkKey = href ? `page-link:${key}` : undefined;
            setSelected({ key, original, linkKey, href });
            setDraft(edits.content[key] || original);
            setDraftHref(linkKey ? edits.content[linkKey] ?? href ?? '' : '');
            setHoverRect(null);
            setHoverNode(null);
          }}
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
      {selected && (
        <div
          data-admin-edit-layer
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
        >
          <div role="dialog" aria-modal="true" aria-label={isVi ? 'Sửa nội dung' : 'Edit content'} className="w-full max-w-xl rounded-sm bg-[#FAF8F5] p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between text-[#1C1A17]">
              <span className="flex items-center gap-2 text-sm font-bold"><Pencil className="h-4 w-4" />{isVi ? 'Sửa nội dung' : 'Edit content'}</span>
              <button type="button" onClick={() => setSelected(null)} aria-label={isVi ? 'Đóng' : 'Close'}><X className="h-5 w-5" /></button>
            </div>
            <textarea
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={Math.max(3, Math.min(10, draft.length / 75 + 2))}
              className="w-full resize-y rounded-xs border border-[#DED9CD] bg-white p-3 text-sm text-[#1C1A17] outline-none focus:border-[#9B522E]"
            />
            {selected.linkKey && (
              <label className="mt-3 block text-xs text-[#1C1A17]">
                {isVi ? 'Đường dẫn nút / liên kết' : 'Button / link destination'}
                <input
                  type="text"
                  value={draftHref}
                  onChange={(event) => setDraftHref(event.target.value)}
                  className="mt-1 w-full rounded-xs border border-[#DED9CD] bg-white p-3 text-sm outline-none focus:border-[#9B522E]"
                />
              </label>
            )}
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={deleteText} className="mr-auto inline-flex items-center gap-1 rounded-xs border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5" />{isVi ? 'Xóa nội dung' : 'Delete text'}
              </button>
              <button type="button" onClick={restore} className="inline-flex items-center gap-1 rounded-xs border border-[#DED9CD] px-3 py-2 text-xs text-[#1C1A17]"><RotateCcw className="h-3.5 w-3.5" />{isVi ? 'Khôi phục' : 'Restore'}</button>
              <button type="button" onClick={() => setSelected(null)} className="rounded-xs border border-[#DED9CD] px-3 py-2 text-xs text-[#1C1A17]">{isVi ? 'Hủy' : 'Cancel'}</button>
              <button type="button" onClick={save} className="inline-flex items-center gap-1 rounded-xs bg-[#9B522E] px-4 py-2 text-xs font-bold text-white"><Check className="h-3.5 w-3.5" />{isVi ? 'Lưu' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
