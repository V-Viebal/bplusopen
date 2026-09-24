import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { LockKeyhole, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCatalogData } from '../context/CatalogDataContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const { language } = useLanguage();
  const { login } = useCatalogData();
  const isVi = language === 'vi';
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setUsername('');
    setPassword('');
    setError('');
    window.setTimeout(() => usernameRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (login(username, password)) {
      onAuthenticated();
      onClose();
      return;
    }
    setError(isVi ? 'Tên đăng nhập hoặc mật khẩu không đúng.' : 'Incorrect username or password.');
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/65 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-sm border border-[#DED9CD] bg-[#FAF8F5] shadow-2xl">
        <div className="flex items-start justify-between bg-[#1C1A17] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9B522E]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9B69F]">
                B+OPEN
              </p>
              <h2 id="admin-login-title" className="text-xl font-semibold">
                {isVi ? 'Đăng nhập quản trị' : 'Admin sign in'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={isVi ? 'Đóng' : 'Close'}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <p className="text-sm leading-relaxed text-[#6B5E52]">
            {isVi
              ? 'Đăng nhập để bật chế độ chỉnh sửa và lưu nội dung catalog trên máy chủ.'
              : 'Sign in to enable edit mode and save catalog content on the server.'}
          </p>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3822]">
              {isVi ? 'Tên đăng nhập' : 'Username'}
            </span>
            <input
              ref={usernameRef}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="w-full rounded-xs border border-[#DED9CD] bg-white px-3 py-2.5 text-sm text-[#1C1A17] outline-none transition-colors focus:border-[#9B522E] focus:ring-2 focus:ring-[#9B522E]/15"
              placeholder="admin"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3822]">
              {isVi ? 'Mật khẩu' : 'Password'}
            </span>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B522E]" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xs border border-[#DED9CD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#1C1A17] outline-none transition-colors focus:border-[#9B522E] focus:ring-2 focus:ring-[#9B522E]/15"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          {error && (
            <p className="rounded-xs border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xs bg-[#9B522E] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7F4024]"
          >
            {isVi ? 'Đăng nhập & bật edit' : 'Sign in & enable edit'}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-[#8C7A6B]">
            {isVi
              ? 'Tài khoản mặc định cho bản preview local: admin / bopen2026'
              : 'Default local preview account: admin / bopen2026'}
          </p>
        </form>
      </div>
    </div>
  );
};
