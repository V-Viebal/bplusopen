/**
 * Dimension formatting utilities - Standardized to millimeters (mm)
 */

export function cleanMm(val?: string): string {
  if (!val) return '';
  // Strip any old inch/cm notations if passed, or clean existing mm
  const trimmed = val.trim();
  if (trimmed.toLowerCase().endsWith('mm')) {
    return trimmed;
  }
  return `${trimmed} mm`;
}

export function formatDimensionsSummary(dimensions: {
  width: string;
  depth: string;
  height: string;
}): string {
  const cleanNumber = (s: string) => s.replace(/\s*mm\s*$/i, '').trim();
  const w = cleanNumber(dimensions.width);
  const d = cleanNumber(dimensions.depth);
  const h = cleanNumber(dimensions.height);
  return `${w} × ${d} × ${h} mm`;
}

export function formatCompactDimensions(width: string, depth: string): string {
  const cleanNumber = (s: string) => s.replace(/\s*mm\s*$/i, '').trim();
  return `${cleanNumber(width)} × ${cleanNumber(depth)} mm`;
}
