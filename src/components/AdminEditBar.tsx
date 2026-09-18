import React from 'react';
import { ExternalLink, LogOut, Pencil, Save, ShieldCheck } from 'lucide-react';
import { useCatalogData } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminEditBarProps {
  onOpenAdmin: () => void;
}

export const AdminEditBar: React.FC<AdminEditBarProps> = ({ onOpenAdmin }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { isAdminAuthenticated, isEditMode, logout, setEditMode } = useCatalogData();

  if (!isAdminAuthenticated) return null;

  return (
    <div className="fixed bottom-3 left-1/2 z-[70] flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 flex-col gap-3 rounded-sm border border-[#C7A58F] bg-[#1C1A17]/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isEditMode ? 'bg-[#287A3D]' : 'bg-[#9B522E]'}`}>
          {isEditMode ? <Pencil className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9B69F]">B+OPEN ADMIN</p>
          <p className="truncate text-xs text-white/85">
            {isEditMode
              ? (isVi ? 'Edit mode đang bật — bấm trực tiếp vào nội dung để sửa.' : 'Edit mode is on — click text directly to edit.')
              : (isVi ? 'Đã đăng nhập quản trị.' : 'Admin is signed in.')}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => setEditMode(!isEditMode)}
          className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-xs px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
            isEditMode ? 'bg-[#287A3D] text-white hover:bg-[#1F6331]' : 'bg-[#9B522E] text-white hover:bg-[#7F4024]'
          }`}
        >
          <Save className="h-3.5 w-3.5" />
          {isEditMode ? (isVi ? 'Tắt edit' : 'Exit edit') : (isVi ? 'Bật edit' : 'Edit mode')}
        </button>
        <button
          type="button"
          onClick={onOpenAdmin}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xs border border-white/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/85 transition-colors hover:border-white/60 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {isVi ? 'CMS' : 'CMS'}
        </button>
        <button
          type="button"
          onClick={logout}
          className="inline-flex min-h-[36px] items-center justify-center rounded-xs border border-white/20 px-2.5 py-2 text-white/70 transition-colors hover:border-[#C28B75] hover:text-white"
          aria-label={isVi ? 'Đăng xuất' : 'Log out'}
          title={isVi ? 'Đăng xuất' : 'Log out'}
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[#C7A58F] bg-[#1C1A17]" />
    </div>
  );
};
