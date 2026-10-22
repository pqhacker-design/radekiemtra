import React from 'react';
import { motion } from 'motion/react';
import Chart from 'react-apexcharts';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Grid,
  Layers,
  PlusCircle,
  Sparkles,
  Trash2,
  TrendingUp,
  Award,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { ExamPackage, QuestionBankItem } from '../types';

interface DashboardViewProps {
  examHistory: ExamPackage[];
  questionBank: QuestionBankItem[];
  onSelectExamPackage: (examPack: ExamPackage) => void;
  onNavigateTab: (tab: any) => void;
  onDeleteExamPackage: (id: string) => void;
  onExportWord: (examPack: ExamPackage) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  examHistory,
  questionBank,
  onSelectExamPackage,
  onNavigateTab,
  onDeleteExamPackage,
  onExportWord,
}) => {
  const [deletingItem, setDeletingItem] = React.useState<ExamPackage | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const latestExam = examHistory[0] || null;

  // Chart data calculation
  const trendSeries = [
    {
      name: 'Số đề đã tạo',
      data: examHistory.slice(0, 7).map((_, i) => (i + 1) * 2),
    },
  ];

  const trendChartOptions: any = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Be Vietnam Pro, sans-serif',
      sparkline: { enabled: false },
    },
    colors: ['#10B981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      labels: { style: { colors: '#94A3B8', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: '#94A3B8', fontSize: '11px' } },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
      strokeDashArray: 4,
    },
    tooltip: { theme: 'dark' },
  };

  const cognitiveDonutOptions: any = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['Nhận biết (40%)', 'Thông hiểu (30%)', 'Vận dụng (20%)', 'Vận dụng cao (10%)'],
    colors: ['#10B981', '#06B6D4', '#6366F1', '#EC4899'],
    legend: {
      position: 'bottom',
      labels: { colors: '#94A3B8' },
      fontSize: '11px',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng tỷ lệ',
              formatter: () => '100%',
              color: '#94A3B8',
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    tooltip: { theme: 'dark' },
  };

  const cognitiveDonutSeries = [40, 30, 20, 10];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Hero Glassmorphic Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-10 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white border border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
      >
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hệ thống biên soạn đề kiểm tra chuẩn CV 7991/BGDĐT</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
              AI Test Generator Pro
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
              Tự động hóa hoàn toàn quy trình sinh Ma trận, Bản đặc tả, Đề thi đa mã đề và Rubric chấm điểm chi tiết bằng trí tuệ nhân tạo. LƯU Ý: AI CÓ THỂ MẮC SAI SÓT.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('generator')}
              className="btn-glow-emerald px-7 py-4 rounded-2xl text-white font-black text-xs md:text-sm shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-emerald-200" />
              <span>Tạo Đề Thi Mới với AI</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Gói Đề Đã Sinh (AI)
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {examHistory.length} gói đề
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn CV 7991/BGDĐT
            </p>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('bank')}
          className="glass-card p-5 flex items-center justify-between cursor-pointer hover:border-cyan-500/50"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Ngân Hàng Câu Hỏi
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {questionBank.length} câu
            </h3>
            <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Tự động phân loại YCCĐ
            </p>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Khung Năng Lực 4 Cấp Độ
            </p>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              100% Đạt Chuẩn
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đầy đủ Ma trận & Lời giải
            </p>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Xuất Bản Đa Định Dạng
            </p>
            <h3 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              Word / PDF / Excel
            </h3>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold mt-1 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Sẵn sàng in ấn & giảng dạy
            </p>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Tiến Độ Biên Soạn Đề Kiểm Tra
                </h3>
                <p className="text-xs text-slate-500">Thống kê hoạt động khởi tạo gói đề thi</p>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Chart options={trendChartOptions} series={trendSeries} type="area" height={240} />
          </div>
        </div>

        {/* Cognitive Level Donut Chart */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Tỷ Lệ Mức Độ Nhận Thức
                </h3>
                <p className="text-xs text-slate-500">Chuẩn 40 - 30 - 20 - 10</p>
              </div>
            </div>
          </div>
          <div className="pt-2 flex justify-center">
            <Chart options={cognitiveDonutOptions} series={cognitiveDonutSeries} type="donut" height={240} />
          </div>
        </div>
      </div>

      {/* Main Table: Created Exam Packages */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Danh Mục Gói Đề Thi Đã Tạo
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Toàn bộ gói đề thi bao gồm các mã đề xáo trộn, Ma trận 7991, Bản đặc tả và Rubric chấm
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('generator')}
            className="btn-glow-emerald px-4 py-2.5 rounded-2xl text-white font-bold text-xs flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo Gói Đề Mới</span>
          </button>
        </div>

        {examHistory.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                Chưa có đề thi nào được tạo
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Hãy nhấn &quot;Tạo Đề Thi Mới với AI&quot; để biên soạn đề kiểm tra chuẩn Công văn 7991/BGDĐT chỉ trong vài giây.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('generator')}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-sm"
            >
              Bắt đầu tạo đề ngay
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200/60 dark:border-slate-800/60">
                <tr>
                  <th className="px-6 py-4">Tên Bài Kiểm Tra</th>
                  <th className="px-6 py-4">Môn Học & Khối</th>
                  <th className="px-6 py-4">Thời Gian & Mã Đề</th>
                  <th className="px-6 py-4">Ngày Khởi Tạo</th>
                  <th className="px-6 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {examHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.metadata?.examTitle || 'Đề kiểm tra'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                        {item.metadata?.chapterTitle || 'Kiến thức tổng hợp'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                        {item.metadata?.subject || 'Toán'} • {item.metadata?.grade || 'Khối'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{item.metadata?.durationMinutes || 45} phút</span>
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                        {item.exams?.length || 1} mã đề (101, 102...)
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          onSelectExamPackage(item);
                          onNavigateTab('multicode');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/25 font-bold text-xs transition-colors cursor-pointer"
                        title="Xem chi tiết các mã đề thi"
                      >
                        Xem Đề
                      </button>
                      <button
                        onClick={() => {
                          onSelectExamPackage(item);
                          onNavigateTab('matrix');
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        title="Xem ma trận đề thi"
                      >
                        Ma Trận
                      </button>
                      <button
                        onClick={() => {
                          onSelectExamPackage(item);
                          onNavigateTab('specification');
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        title="Xem bảng đặc tả YCCĐ"
                      >
                        Bản Đặc Tả
                      </button>
                      <button
                        onClick={() => onExportWord(item)}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs transition-colors cursor-pointer inline-flex items-center"
                        title="Xuất file Word"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingItem(item)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer inline-flex items-center"
                        title="Xóa đề thi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Xác nhận xóa gói đề thi?
            </h3>
            <p className="text-xs text-slate-500">
              Gói đề &quot;<strong>{deletingItem.metadata?.examTitle}</strong>&quot; sẽ bị xóa khỏi lịch sử tạo đề.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteExamPackage(deletingItem.id);
                  setDeletingItem(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
