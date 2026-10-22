import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Download,
  FileCode,
  Menu,
  Sparkles,
  FileText,
  CheckCircle2,
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

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Mở menu"
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

        {/* Right: Export Actions & Package Selector */}
        <div className="flex items-center gap-2 shrink-0">
          {currentExamPackage && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[200px]">
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
  );
};
