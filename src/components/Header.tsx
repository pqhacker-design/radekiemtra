import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Download,
  FileCode,
  Menu,
  Sparkles,
  FileText,
  CheckCircle2,
  GraduationCap,
  Phone,
  MessageCircle,
  Copy,
  Check,
  X,
  ExternalLink,
  MapPin,
  School,
  User,
} from 'lucide-react';
import { AppSettings, ExamPackage } from '../types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  settings: AppSettings;
  currentExamPackage: ExamPackage | null;
  onExportWord?: (mode?: 'full' | 'exams' | 'answers') => void;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
  settings,
  currentExamPackage,
  onExportWord,
  onExportPdf,
  onExportExcel,
  onNavigateTab,
}) => {
  const [isWordDropdownOpen, setIsWordDropdownOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWordDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText('0913117321');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 px-3.5 sm:px-6 py-2.5 transition-colors">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Center: Author Info Badge (Desktop & Tablet) */}
          <div
            onClick={() => setIsAuthorModalOpen(true)}
            className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/25 hover:border-emerald-500/40 text-xs shadow-xs transition-all cursor-pointer group"
            title="Bấm để xem thông tin chi tiết tác giả & liên hệ Zalo / Điện thoại"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">Tác giả:</span>
                <span className="font-black text-emerald-800 dark:text-emerald-300 text-xs group-hover:underline">
                  Ngô Thanh Hùng
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  GV THCS
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[230px] xl:max-w-[320px]" title="Giáo viên trường THCS Bình San - Mỹ Đức, phường Hà Tiên, An Giang">
                  THCS Bình San - Mỹ Đức, P. Hà Tiên, An Giang
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                  <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>0913117321</span>
                </span>
              </div>
            </div>
          </div>

          {/* Medium Screen Author Pill (md to lg) */}
          <button
            onClick={() => setIsAuthorModalOpen(true)}
            className="hidden md:flex lg:hidden items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs cursor-pointer hover:bg-emerald-100/60 transition-colors"
            title="Tác giả: Ngô Thanh Hùng - THCS Bình San - Mỹ Đức, Hà Tiên"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                Tác giả: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Ngô Thanh Hùng</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                ĐT/Zalo: 0913117321
              </div>
            </div>
          </button>

          {/* Right: Export Actions & Package Selector */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Small Screen Author Trigger Button */}
            <button
              onClick={() => setIsAuthorModalOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              title="Thông tin tác giả: Ngô Thanh Hùng"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px]">Tác giả</span>
            </button>

            {currentExamPackage && (
              <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate max-w-[180px]">
                  {currentExamPackage.metadata?.examTitle || 'Đề kiểm tra'}
                </span>
              </div>
            )}

            {/* Export Word Dropdown */}
            {onExportWord && currentExamPackage && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsWordDropdownOpen(!isWordDropdownOpen)}
                  className="btn-glow-emerald px-3.5 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  title="Xuất file Word đề thi chuẩn BGD&ĐT"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xuất Word</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isWordDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => {
                        onExportWord('full');
                        setIsWordDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Trọn bộ (Đề + Ma trận + ĐT)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExportWord('exams');
                        setIsWordDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Chỉ đề thi (Các mã đề)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExportWord('answers');
                        setIsWordDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <FileCode className="w-3.5 h-3.5 text-purple-600" />
                      <span>Chỉ Đáp án & Rubric chấm</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Create Button */}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('generator')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                title="Tạo đề kiểm tra mới"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Tạo Đề AI</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Author Information Modal */}
      {isAuthorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            {/* Top decorative gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            {/* Close button */}
            <button
              onClick={() => setIsAuthorModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>

              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Thông Tin Tác Giả
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ứng dụng biên soạn đề kiểm tra & ma trận chuẩn CV 7991/BGDĐT
              </p>

              {/* Author details card */}
              <div className="w-full mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Họ và tên tác giả
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      Ngô Thanh Hùng
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <School className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Đơn vị công tác
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Giáo viên trường THCS Bình San - Mỹ Đức
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Địa bàn
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Phường Hà Tiên, An Giang
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Điện thoại & Zalo
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400 tracking-wide">
                        0913117321
                      </span>
                      <button
                        onClick={handleCopyPhone}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Sao chép số điện thoại"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="w-full grid grid-cols-2 gap-2.5 mt-4">
                <a
                  href="https://zalo.me/0913117321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Nhắn tin Zalo</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <a
                  href="tel:0913117321"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi điện thoại</span>
                </a>
              </div>

              <div className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
                Thầy cô cần trao đổi về phần mềm hoặc cấu hình ma trận vui lòng liên hệ qua Zalo.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

