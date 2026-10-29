import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, X } from 'lucide-react';
import { Sidebar, TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { TestGeneratorView } from './components/TestGeneratorView';
import { MatrixView } from './components/MatrixView';
import { SpecificationView } from './components/SpecificationView';
import { AnswerKeyView } from './components/AnswerKeyView';
import { MultiCodeView } from './components/MultiCodeView';
import { QuestionBankView } from './components/QuestionBankView';
import { SettingsView } from './components/SettingsView';
import { ApiKeyInputModal, QuotaExceededModal, NotificationModal } from './components/ApiModals';
import { ErrorBoundary } from './components/ErrorBoundary';

import { AppSettings, ExamMetadata, ExamPackage, MatrixRow, Question, QuestionBankItem, SpecRow } from './types';
import { StorageEngine } from './services/storageEngine';
import { GeminiService } from './services/geminiService';
import { ShuffleEngine } from './services/shuffleEngine';
import { ExportDocx } from './services/exportDocx';
import { ExportExcel } from './services/exportExcel';
import { ExportPdf } from './services/exportPdf';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleNavigateTab = (tab: any) => {
    if (!tab) return;
    const cleanTab = String(tab).replace(/-/g, '_');
    if (
      cleanTab === 'dashboard' ||
      cleanTab === 'generator' ||
      cleanTab === 'multicode' ||
      cleanTab === 'matrix' ||
      cleanTab === 'specification' ||
      cleanTab === 'bank' ||
      cleanTab === 'answers' ||
      cleanTab === 'settings'
    ) {
      setActiveTab(cleanTab as TabType);
    } else {
      setActiveTab('dashboard');
    }
  };

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Core Data States
  const [settings, setSettings] = useState<AppSettings>(StorageEngine.getSettings());
  const [examHistory, setExamHistory] = useState<ExamPackage[]>(StorageEngine.getExamHistory());
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(StorageEngine.getQuestionBank());
  const [currentExamPackage, setCurrentExamPackage] = useState<ExamPackage | null>(
    examHistory[0] || null
  );

  // Reactively sync with StorageEngine mutations
  useEffect(() => {
    const unsubscribe = StorageEngine.subscribe(() => {
      const hist = StorageEngine.getExamHistory();
      const bank = StorageEngine.getQuestionBank();
      const sett = StorageEngine.getSettings();
      setSettings(sett);
      setExamHistory(hist);
      setQuestionBank(bank);
      setCurrentExamPackage((prev) => {
        if (!prev) return hist[0] || null;
        const exists = hist.find((e) => e.id === prev.id);
        return exists || hist[0] || null;
      });
    });
    return unsubscribe;
  }, []);

  // Handle dark mode toggle on root html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Generation status & Modals
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: '',
  });
  const [pendingMetadata, setPendingMetadata] = useState<ExamMetadata | null>(null);
  const [generatorInitialMetadata, setGeneratorInitialMetadata] = useState<ExamMetadata | null>(null);

  // Export Toast Notification State
  const [exportToast, setExportToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'loading';
  } | null>(null);

  // Trigger test generation
  const handleGenerateExam = async (metadata: ExamMetadata) => {
    setIsGenerating(true);
    setProgressMessage('Khởi động trợ lý AI biên soạn đề...');

    try {
      const newPackage = await GeminiService.generateExamPackage(
        metadata,
        (msg: string) => setProgressMessage(msg)
      );

      // Save to local history
      StorageEngine.saveExamPackage(newPackage);
      setCurrentExamPackage(newPackage);

      // Auto-navigate to multicode view to see exam papers
      setActiveTab('multicode');
    } catch (err: any) {
      console.error('Lỗi sinh đề:', err);
      const errMsg = err?.message || 'Không thể tạo đề kiểm tra.';

      if (errMsg.includes('NO_API_KEY')) {
        setPendingMetadata(metadata);
        setIsApiKeyModalOpen(true);
      } else if (errMsg.includes('QUOTA_EXHAUSTED') || errMsg.includes('429')) {
        setIsQuotaModalOpen(true);
      } else {
        setNotificationModal({
          isOpen: true,
          title: 'Thông báo khởi tạo',
          message: errMsg,
        });
      }
    } finally {
      setIsGenerating(false);
      setProgressMessage('');
    }
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    StorageEngine.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleDeleteExamPackage = (id: string) => {
    StorageEngine.deleteExamPackage(id);
    const updated = StorageEngine.getExamHistory();
    setExamHistory(updated);
    if (currentExamPackage?.id === id) {
      setCurrentExamPackage(updated[0] || null);
    }
  };

  const handleUpdateMatrix = (newMatrix: MatrixRow[]) => {
    if (!currentExamPackage) return;
    const updated: ExamPackage = {
      ...currentExamPackage,
      matrix: newMatrix,
    };
    StorageEngine.saveExamPackage(updated);
    setCurrentExamPackage(updated);
  };

  const handleUpdateSpec = (newSpec: SpecRow[]) => {
    if (!currentExamPackage) return;
    const updated: ExamPackage = {
      ...currentExamPackage,
      specification: newSpec,
    };
    StorageEngine.saveExamPackage(updated);
    setCurrentExamPackage(updated);
  };

  const handleRegenerateQuestion = (originalQuestion: Question, newQuestion: Question) => {
    if (!currentExamPackage) return;
    const updated = ShuffleEngine.updateRegeneratedQuestionInExamPackage(
      currentExamPackage,
      originalQuestion,
      newQuestion
    );
    StorageEngine.saveExamPackage(updated);
    setCurrentExamPackage(updated);
    setExportToast({
      message: `Đã cập nhật câu hỏi mới đồng thời cho toàn bộ ${updated.exams.length} mã đề đảo và làm mới bảng đáp án!`,
      type: 'success',
    });
    setTimeout(() => {
      setExportToast(null);
    }, 4000);
  };

  // Export Handlers
  const handleExportWord = async (mode: 'full' | 'exams' | 'answers' | 'matrix' | 'cv7991' | 'classic' = 'full') => {
    if (!currentExamPackage) return;
    setExportToast({ message: 'Đang tạo tệp Word (.docx)...', type: 'loading' });
    try {
      if (mode === 'exams') {
        await ExportDocx.exportExamsOnlyToDocx(currentExamPackage);
      } else if (mode === 'answers') {
        await ExportDocx.exportAnswerKeysOnlyToDocx(currentExamPackage);
      } else if (mode === 'matrix') {
        await ExportDocx.exportMatrixOnlyToDocx(currentExamPackage);
      } else if (mode === 'cv7991') {
        await ExportDocx.exportSpecOnlyToDocx(currentExamPackage, 'cv7991');
      } else if (mode === 'classic') {
        await ExportDocx.exportSpecOnlyToDocx(currentExamPackage, 'classic');
      } else {
        await ExportDocx.exportExamPackageToDocx(currentExamPackage);
      }
      setExportToast({ message: 'Đã xuất file Word thành công!', type: 'success' });
    } catch (e: any) {
      setExportToast({ message: 'Lỗi xuất file Word: ' + e.message, type: 'error' });
    } finally {
      setTimeout(() => setExportToast(null), 3000);
    }
  };

  const handleExportExcel = async () => {
    if (!currentExamPackage) return;
    setExportToast({ message: 'Đang tạo bảng tính Excel (.xlsx)...', type: 'loading' });
    try {
      ExportExcel.exportExamPackageToExcel(currentExamPackage);
      setExportToast({ message: 'Đã xuất file Excel thành công!', type: 'success' });
    } catch (e: any) {
      setExportToast({ message: 'Lỗi xuất file Excel: ' + e.message, type: 'error' });
    } finally {
      setTimeout(() => setExportToast(null), 3000);
    }
  };

  const handleExportPdf = (code?: string) => {
    if (!currentExamPackage) return;
    try {
      ExportPdf.printExamPackage(currentExamPackage, code || '101');
    } catch (e: any) {
      setExportToast({ message: 'Lỗi in PDF: ' + e.message, type: 'error' });
      setTimeout(() => setExportToast(null), 3000);
    }
  };

  const handleExportAnswerPdf = (code?: string) => {
    if (!currentExamPackage) return;
    try {
      ExportPdf.printAnswerKeys(currentExamPackage, code || '101');
    } catch (e: any) {
      setExportToast({ message: 'Lỗi in PDF Đáp án: ' + e.message, type: 'error' });
      setTimeout(() => setExportToast(null), 3000);
    }
  };

  const handleClearAllData = () => {
    StorageEngine.clearAllData();
    setExamHistory([]);
    setQuestionBank([]);
    setCurrentExamPackage(null);
    setSettings(StorageEngine.getSettings());
  };

  // Question Bank Handlers
  const handleAddQBItem = (q: Question) => {
    if (!currentExamPackage) return;
    const item: QuestionBankItem = {
      ...q,
      subject: currentExamPackage.metadata.subject,
      grade: currentExamPackage.metadata.grade,
      chapter: currentExamPackage.metadata.chapterTitle || 'Chung',
      curriculum: currentExamPackage.metadata.curriculum,
      createdDate: new Date().toISOString(),
      sourceExamId: currentExamPackage.id,
      sourceExamTitle: currentExamPackage.metadata.examTitle,
      examTitle: currentExamPackage.metadata.examTitle,
    };
    StorageEngine.addQuestionToBank(item);
  };

  const handleDeleteQBItem = (id: string) => {
    StorageEngine.deleteQuestionFromBank(id);
  };

  const handleDeleteMultipleQBItems = (ids: string[]) => {
    StorageEngine.deleteMultipleQuestionsFromBank(ids);
  };

  const handleClearQB = () => {
    StorageEngine.clearQuestionBank();
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex transition-colors duration-200 font-sans`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Layout Area */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} transition-all duration-300 flex flex-col min-w-0 min-h-screen`}>
        <Header
          title={
            activeTab === 'dashboard'
              ? 'Dashboard Tổng Quan'
              : activeTab === 'generator'
              ? 'Tạo Đề Kiểm Tra Chuẩn CV 7991'
              : activeTab === 'matrix'
              ? 'Ma Trận Đề Kiểm Tra'
              : activeTab === 'specification'
              ? 'Bảng Đặc Tả YCCĐ'
              : activeTab === 'bank'
              ? 'Ngân Hàng Câu Hỏi'
              : activeTab === 'multicode'
              ? 'Đề Đã Tạo - Các Mã Đề'
              : activeTab === 'answers'
              ? 'Đáp Án & Rubric Chấm Bài'
              : 'Cài Đặt Hệ Thống'
          }
          subtitle="Ứng dụng biên soạn đề thi & ma trận đánh giá năng lực GDPT 2018"
          onOpenMobileMenu={() => setIsSidebarOpen(true)}
          settings={settings}
          currentExamPackage={currentExamPackage}
          onExportWord={(mode) => handleExportWord(mode)}
          onExportPdf={() => handleExportPdf()}
          onExportExcel={() => handleExportExcel()}
          onNavigateTab={handleNavigateTab}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <ErrorBoundary onReset={() => setActiveTab('dashboard')}>
            {activeTab === 'dashboard' && (
              <DashboardView
                examHistory={examHistory}
                questionBank={questionBank}
                onSelectExamPackage={(pack) => setCurrentExamPackage(pack)}
                onNavigateTab={handleNavigateTab}
                onDeleteExamPackage={handleDeleteExamPackage}
                onExportWord={(pack) => {
                  setCurrentExamPackage(pack);
                  handleExportWord('full');
                }}
              />
            )}

            {activeTab === 'generator' && (
              <TestGeneratorView
                settings={settings}
                onGenerate={handleGenerateExam}
                isGenerating={isGenerating}
                progressMessage={progressMessage}
                onSaveSettings={handleSaveSettings}
                initialMetadata={generatorInitialMetadata}
              />
            )}

            {activeTab === 'matrix' && (
              <MatrixView
                examPackage={currentExamPackage}
                onUpdateMatrix={handleUpdateMatrix}
                onExportWord={() => handleExportWord('matrix')}
                onExportExcel={() => handleExportExcel()}
              />
            )}

            {activeTab === 'specification' && (
              <SpecificationView
                examPackage={currentExamPackage}
                onUpdateSpec={handleUpdateSpec}
                onExportWord={(mode) => handleExportWord(mode)}
                onExportExcel={() => handleExportExcel()}
              />
            )}

            {activeTab === 'bank' && (
              <QuestionBankView
                questionBank={questionBank}
                examHistory={examHistory}
                onAddQuestion={handleAddQBItem}
                onDeleteQuestion={handleDeleteQBItem}
                onDeleteMultipleQuestions={handleDeleteMultipleQBItems}
                onClearQuestionBank={handleClearQB}
                onExportExcel={() => handleExportExcel()}
              />
            )}

            {activeTab === 'multicode' && (
              <MultiCodeView
                examPackage={currentExamPackage}
                onExportWord={() => handleExportWord()}
                onExportPdf={(code) => handleExportPdf(code)}
                onExportExcel={() => handleExportExcel()}
                onRegenerateQuestion={handleRegenerateQuestion}
                onRecreateExam={(meta) => {
                  setGeneratorInitialMetadata(meta);
                  setActiveTab('generator');
                }}
              />
            )}

            {activeTab === 'answers' && (
              <AnswerKeyView
                examPackage={currentExamPackage}
                onExportWord={(mode) => handleExportWord(mode)}
                onExportPdf={(code) => handleExportAnswerPdf(code)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onSaveSettings={handleSaveSettings}
                onClearAllData={handleClearAllData}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>

      {/* Export Status Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div
            className={`p-4 rounded-2xl border shadow-2xl flex items-center justify-between space-x-3 ${
              exportToast.type === 'success'
                ? 'bg-emerald-900/95 text-emerald-100 border-emerald-700'
                : exportToast.type === 'error'
                ? 'bg-rose-900/95 text-rose-100 border-rose-700'
                : 'bg-slate-900/95 text-slate-100 border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              {exportToast.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />}
              {exportToast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {exportToast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              <span className="text-xs font-bold leading-tight">{exportToast.message}</span>
            </div>
            <button
              onClick={() => setExportToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals for API keys & errors */}
      <ApiKeyInputModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={(key) => {
          handleSaveSettings({ ...settings, customApiKey: key });
          setIsApiKeyModalOpen(false);
          if (pendingMetadata) {
            handleGenerateExam(pendingMetadata);
            setPendingMetadata(null);
          }
        }}
      />

      <QuotaExceededModal
        isOpen={isQuotaModalOpen}
        onClose={() => setIsQuotaModalOpen(false)}
        onSaveNewKeyAndRetry={(newKey) => {
          handleSaveSettings({ ...settings, customApiKey: newKey });
          setIsQuotaModalOpen(false);
          if (pendingMetadata) {
            handleGenerateExam(pendingMetadata);
            setPendingMetadata(null);
          }
        }}
      />

      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false, title: '', message: '' })}
        title={notificationModal.title}
        message={notificationModal.message}
      />
    </div>
  );
}
