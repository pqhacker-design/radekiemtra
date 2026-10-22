import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Key,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  ExternalLink,
  AlertTriangle,
  HardDrive,
  Check,
} from 'lucide-react';
import { AppSettings } from '../types';
import { callGeminiApi } from '../services/geminiClient';

interface SettingsViewProps {
  settings: AppSettings;
  onSaveSettings: (newSettings: AppSettings) => void;
  onClearAllData: () => void;
}

const GEMINI_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    badge: 'Khuyên Dùng - Tốc Độ & Thông Minh Vượt Trội',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800',
    description: 'Mô hình thế hệ 3 mới nhất, suy luận logic sâu sắc, sinh đề chuẩn xác theo CV 7991/BGDĐT và xử lý LaTeX xuất sắc.',
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite (3.1 Lite)',
    badge: 'Siêu Tốc - Tiết Kiệm Quota',
    badgeClass: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800',
    description: 'Phản hồi siêu tốc, lượng token nhẹ, thích hợp khi cần sinh đề nhanh chóng với API key miễn phí.',
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro Preview (3.1 Pro)',
    badge: 'Chuyên Sâu - Đề Phân Hóa Cao',
    badgeClass: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800',
    description: 'Mô hình chuyên sâu cho các bài toán phân hóa Vận dụng cao (VDC), bồi dưỡng học sinh giỏi và đề thi chuyên.',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    badge: 'Ổn Định',
    badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
    description: 'Mô hình 2.5 với khả năng tương thích cao và thời gian phản hồi ổn định.',
  },
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
  onClearAllData,
}) => {
  const [schoolName, setSchoolName] = useState(settings.defaultSchoolName || 'Trường THCS / THPT');
  const [departmentName, setDepartmentName] = useState(settings.defaultDepartmentName || 'Sở Giáo dục và Đào tạo');
  const [teacherName, setTeacherName] = useState(settings.defaultTeacherName || 'Giáo viên');
  const [customApiKey, setCustomApiKey] = useState(settings.customApiKey || '');
  const [selectedModel, setSelectedModel] = useState(settings.selectedModel || 'gemini-3.8-flash');
  const [showApiKey, setShowApiKey] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [clearedSuccess, setClearedSuccess] = useState(false);

  const [apiTesting, setApiTesting] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleTestApiKey = async () => {
    setApiTesting(true);
    setApiStatus({ type: null, message: '' });

    try {
      const res = await callGeminiApi({
        prompt: 'Hãy trả lời ngắn: "Kết nối thành công API Gemini cho hệ thống ra đề thi."',
        customApiKey: customApiKey.trim(),
        model: selectedModel,
      });

      if (res && res.trim().length > 0) {
        setApiStatus({
          type: 'success',
          message: `Kết nối thành công! Mô hình ${selectedModel} đã phản hồi xuất sắc.`,
        });
      } else {
        setApiStatus({
          type: 'error',
          message: 'Không nhận được phản hồi từ AI. Vui lòng kiểm tra lại API Key.',
        });
      }
    } catch (err: any) {
      setApiStatus({
        type: 'error',
        message: err.message || 'Lỗi kiểm tra API Key.',
      });
    } finally {
      setApiTesting(false);
    }
  };

  const handleSave = () => {
    const updated: AppSettings = {
      ...settings,
      defaultSchoolName: schoolName.trim(),
      defaultDepartmentName: departmentName.trim(),
      defaultTeacherName: teacherName.trim(),
      customApiKey: customApiKey.trim(),
      selectedModel,
    };

    onSaveSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleConfirmClear = () => {
    onClearAllData();
    setShowClearConfirmModal(false);
    setClearedSuccess(true);
    setTimeout(() => setClearedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Cài Đặt Hệ Thống
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quản lý mô hình trí tuệ nhân tạo, API Key Gemini và thông tin mặc định xuất bản đề thi.
        </p>
      </div>

      {/* Section 1: AI Model & API Key */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cấu Hình Trí Tuệ Nhân Tạo (Gemini AI)
            </h3>
            <p className="text-xs text-slate-500">
              Chọn mô hình tạo đề và cung cấp API Key từ Google AI Studio
            </p>
          </div>
        </div>

        {/* Model Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Mô Hình AI Biên Soạn Đề
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GEMINI_MODELS.map((m) => {
              const isSelected = selectedModel === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {m.name}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block self-start ${m.badgeClass}`}>
                    {m.badge}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Gemini API Key Cá Nhân (Tùy Chọn)
            </label>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Lấy API Key miễn phí tại Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="relative">
            <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type={showApiKey ? 'text' : 'password'}
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              placeholder="Nhập khóa API Key của bạn (bắt đầu bằng AIzaSy...)"
              className="w-full pl-10 pr-24 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Nếu để trống, hệ thống sẽ sử dụng API Key mặc định của máy chủ để phục vụ bạn.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleTestApiKey}
              disabled={apiTesting}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${apiTesting ? 'animate-spin' : ''}`} />
              <span>{apiTesting ? 'Đang kiểm tra...' : 'Kiểm tra kết nối AI'}</span>
            </button>
          </div>

          {apiStatus.type && (
            <div
              className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                apiStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
              }`}
            >
              {apiStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              )}
              <span>{apiStatus.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: School & Header Defaults */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Thông Tin Trường & Xuất Bản Đề Thi
            </h3>
            <p className="text-xs text-slate-500">
              Thông tin sẽ tự động điền vào tiêu đề phần đầu các tệp đề thi Word, PDF
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Sở / Phòng Giáo dục và Đào tạo
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Ví dụ: Sở Giáo dục và Đào tạo Hà Nội"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Tên Trường Học
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Ví dụ: Trường THPT Chu Văn An"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Tên Giáo Viên Biên Soạn
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="btn-glow-emerald px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ Cài Đặt</span>
          </button>

          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Đã lưu thành công!
            </span>
          )}
        </div>
      </div>

      {/* Section 3: Data Management */}
      <div className="glass-card p-6 md:p-8 space-y-4 border-rose-200/50 dark:border-rose-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Quản Lý Bộ Nhớ Cục Bộ
            </h3>
            <p className="text-xs text-slate-500">
              Xóa sạch danh sách các đề kiểm tra và câu hỏi đã tạo trên trình duyệt
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Toàn bộ đề thi đã tạo và ngân hàng câu hỏi được lưu trữ an toàn trong bộ nhớ máy tính (LocalStorage). Nếu bạn muốn giải phóng dung lượng hoặc làm mới hệ thống, hãy sử dụng tùy chọn này.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowClearConfirmModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa Sạch Dữ Liệu Bộ Nhớ</span>
          </button>
        </div>

        {clearedSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Đã xóa sạch bộ nhớ đề thi và làm mới hệ thống.
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Xác nhận xóa toàn bộ dữ liệu?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Thao tác này sẽ xóa vĩnh viễn tất cả đề thi, ma trận, bản đặc tả và ngân hàng câu hỏi đã lưu. Hành động này không thể hoàn tác.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm"
              >
                Xóa sạch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
