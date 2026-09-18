import React, { useEffect, useRef, useState } from 'react';
import { CatalogEdits, useCatalogData } from '../context/CatalogDataContext';
import { Collection, Product } from '../types';

type EditableRecord = 'collection' | 'product';
type EditableTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';

interface InlineEditableTextProps {
  record: EditableRecord;
  recordId: string;
  field: keyof Collection | keyof Product;
  value: string;
  as?: EditableTag;
  className?: string;
  multiline?: boolean;
  label?: string;
}

const mergeEdit = (
  edits: CatalogEdits,
  record: EditableRecord,
  recordId: string,
  field: string,
  value: string,
): CatalogEdits => ({
  ...edits,
  [record === 'collection' ? 'collections' : 'products']: {
    ...edits[record === 'collection' ? 'collections' : 'products'],
    [recordId]: {
      ...edits[record === 'collection' ? 'collections' : 'products'][recordId],
      [field]: value,
    },
  },
});

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  record,
  recordId,
  field,
  value,
  as = 'span',
  className = '',
  multiline = false,
  label,
}) => {
  const { edits, isAdminAuthenticated, isEditMode, saveEdits } = useCatalogData();
  const elementRef = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) setDraft(value);
  }, [value, isEditing]);

  const commit = () => {
    const nextValue = (elementRef.current?.innerText || draft).trim();
    setIsEditing(false);
    if (nextValue && nextValue !== value) {
      saveEdits(mergeEdit(edits, record, recordId, String(field), nextValue));
    } else if (!nextValue && elementRef.current) {
      elementRef.current.innerText = value;
      setDraft(value);
    }
  };

  if (!isAdminAuthenticated || !isEditMode) {
    return React.createElement(as, { className }, value);
  }

  return React.createElement(
    as,
    {
      ref: elementRef,
      contentEditable: true,
      suppressContentEditableWarning: true,
      role: 'textbox',
      'aria-label': label || `${String(field)} editor`,
      spellCheck: true,
      onFocus: () => setIsEditing(true),
      onInput: (event: React.FormEvent<HTMLElement>) => setDraft(event.currentTarget.innerText),
      onClick: (event: React.MouseEvent<HTMLElement>) => event.stopPropagation(),
      onBlur: commit,
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          if (elementRef.current) elementRef.current.innerText = value;
          setDraft(value);
          event.currentTarget.blur();
        }
      },
      className: `${className} ${multiline ? 'whitespace-pre-wrap' : ''} rounded-xs outline-none ring-1 ring-dashed ring-[#C28B75]/70 ring-offset-2 transition-shadow focus:ring-2 focus:ring-[#9B522E]`,
      title: 'Click to edit. Changes save when you leave the field.',
    },
    draft,
  );
};
