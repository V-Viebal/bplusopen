import { Language } from '../types';

const SHORT_COLLECTION_NAMES: Record<string, Record<Language, string>> = {
  bloom: { en: 'POLY BLOOM', vi: 'POLY BLOOM' },
  serenity: { en: 'SERENITY', vi: 'SERENITY' },
  luma: { en: 'LUMA', vi: 'LUMA' },
  lumino: { en: 'LUMINO', vi: 'LUMINO' },
};

const stripCollectionPrefix = (name: string, language: Language): string => {
  if (language === 'vi') {
    return name.replace(/^Bộ Sưu Tập\s+/i, '').trim();
  }

  return name.replace(/\s+Collection$/i, '').trim();
};

export const getCollectionCardName = (
  collectionId: string,
  language: Language,
  fallbackName: string,
): string => SHORT_COLLECTION_NAMES[collectionId]?.[language] || stripCollectionPrefix(fallbackName, language);
