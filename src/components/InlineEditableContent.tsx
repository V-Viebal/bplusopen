import React, { useEffect, useRef, useState } from 'react';
import { useCatalogData } from '../context/CatalogDataContext';

type EditableTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'button';

interface InlineEditableContentProps {
  contentKey: string;
  value: string;
  as?: EditableTag;
  className?: string;
  multiline?: boolean;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const InlineEditableContent: React.FC<InlineEditableContentProps> = ({
  contentKey,
  value,
  as = 'span',
  className = '',
  multiline = false,
  label,
  onClick,
}) => {
  const { edits, isAdminAuthenticated, isEditMode, saveContentEdit } = useCatalogData();
  const elementRef = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState(edits.content[contentKey] ?? value);

  const effectiveValue = edits.content[contentKey] ?? value;

  useEffect(() => {
    setDraft(effectiveValue);
    if (elementRef.current && document.activeElement !== elementRef.current) {
      elementRef.current.innerText = effectiveValue;
    }
  }, [effectiveValue]);

  const commit = () => {
    const nextValue = (elementRef.current?.innerText || draft).trim();
    if (nextValue && nextValue !== effectiveValue) saveContentEdit(contentKey, nextValue);
    else if (!nextValue && elementRef.current) {
      elementRef.current.innerText = effectiveValue;
      setDraft(effectiveValue);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (isAdminAuthenticated && isEditMode) event.stopPropagation();
    onClick?.(event);
  };

  if (!isAdminAuthenticated || !isEditMode) {
    return React.createElement(as, { className, onClick }, effectiveValue);
  }

  return React.createElement(as, {
    ref: elementRef,
    contentEditable: true,
    suppressContentEditableWarning: true,
    role: 'textbox',
    'aria-label': label || `${contentKey} editor`,
    spellCheck: true,
    onInput: (event: React.FormEvent<HTMLElement>) => setDraft(event.currentTarget.innerText),
    onClick: handleClick,
    onBlur: commit,
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (!multiline && event.key === 'Enter') {
        event.preventDefault();
        event.currentTarget.blur();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        if (elementRef.current) elementRef.current.innerText = effectiveValue;
        setDraft(effectiveValue);
        event.currentTarget.blur();
      }
    },
    className: `${className} ${multiline ? 'whitespace-pre-wrap' : ''} rounded-xs outline-none ring-1 ring-dashed ring-[#C28B75]/70 ring-offset-2 transition-shadow focus:ring-2 focus:ring-[#9B522E]`,
    title: 'Click to edit. Changes save when you leave the field.',
  }, effectiveValue);
};
