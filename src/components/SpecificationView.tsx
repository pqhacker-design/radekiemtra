import React, { useState } from 'react';
import { Check, ChevronDown, Download, Edit3, FileSpreadsheet, FileText, Layers, Save, Table as TableIcon } from 'lucide-react';
import { ExamPackage, SpecRow, calculateExamScores, getSpecRowQuestionDetails } from '../types';
import { MathText } from './MathText';

import {
  RequirementsByLevel,
  parseRequirementsByLevel,
  combineRequirementsByLevel,
  countQuestionsInValue,
} from '../utils/textUtils';
import {
  getSubjectCompetencies,
  getSpecCellQuestions,
  inferQuestionCompetency,
  CellQuestionItem,
} from '../utils/competencyUtils';

export type { RequirementsByLevel };
export { parseRequirementsByLevel, combineRequirementsByLevel, countQuestionsInValue };

interface SpecificationViewProps {
  examPackage: ExamPackage | null;
  onUpdateSpec?: (updatedSpec: SpecRow[]) => void;
  onExportWord?: (mode?: 'cv7991' | 'classic' | 'full') => void;
  onExportExcel?: () => void;
}

export const SpecificationView: React.FC<SpecificationViewProps> = ({
  examPackage,
  onUpdateSpec,
  onExportWord,
  onExportExcel,
}) => {
  if (!examPackage) {
    return (
      <div className="max-w-5xl mx-auto p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <Layers className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Chưa Có Dữ Liệu Bảng Đặc Tả Đề Kiểm Tra
        </h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Vui lòng vào mục "Tạo đề kiểm tra" để hệ thống AI sinh Bảng đặc tả Yêu cầu cần đạt chuẩn Công văn 7991/BGDĐT.
        </p>
      </div>
    );
  }

  const { metadata, specification } = examPackage;
  const [templateMode, setTemplateMode] = useState<'cv7991' | 'classic'>(
    metadata?.matrixOutputFormat === 'classic' ? 'classic' : 'cv7991'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editableSpec, setEditableSpec] = useState<SpecRow[]>(specification);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  React.useEffect(() => {
    if (metadata?.matrixOutputFormat === 'classic') {
      setTemplateMode('classic');
    } else {
      setTemplateMode('cv7991');
    }
  }, [metadata?.matrixOutputFormat]);

  // Tính điểm và tỉ lệ % chuẩn Công văn 7991
  const examScores = calculateExamScores(metadata.questionCounts || {
    part1_MCQSingle: 12,
    part2_MCQTrueFalse: 2,
    part3_MCQShort: 4,
    part4_Essay: 2,
  });

  const p1Score = examScores.part1Score || 3.0;
  const p2Score = examScores.part2Score || 2.0;
  const p3Score = examScores.part3Score || 2.0;
  const p4Score = examScores.part4Score || 3.0;
  const totalScore = examScores.totalScore || 10.0;

  const p1Pct = Math.round((p1Score / totalScore) * 100);
  const p2Pct = Math.round((p2Score / totalScore) * 100);
  const p3Pct = Math.round((p3Score / totalScore) * 100);
  const p4Pct = 100 - p1Pct - p2Pct - p3Pct;

  const formatScore = (num: number) => num.toFixed(1).replace('.', ',');

  // Thay đổi trường thông thường trong SpecRow
  const handleCellChange = (stt: number, field: string, value: any) => {
    setEditableSpec((prev) =>
      prev.map((row) => (row.stt === stt ? { ...row, [field]: value } : row))
    );
  };

  // Thay đổi từng mức độ YCCĐ (- Biết, - Hiểu, - VD) trong CV 7991
  const handleSubRequirementChange = (
    stt: number,
    level: 'remember' | 'understand' | 'apply',
    value: string
  ) => {
    setEditableSpec((prev) =>
      prev.map((row) => {
        if (row.stt !== stt) return row;
        const currentLevels = parseRequirementsByLevel(row.requirements);
        const updatedLevels = { ...currentLevels, [level]: value };
        const newReq = combineRequirementsByLevel(updatedLevels);
        return { ...row, requirements: newReq };
      })
    );
  };

  // Thay đổi câu hỏi ở từng ô mức độ trong CV 7991
  const handleCognitiveCellChange = (
    stt: number,
    partKey: 'part1' | 'part2' | 'part3' | 'part4',
    level: 'remember' | 'understand' | 'apply',
    value: string
  ) => {
    setEditableSpec((prev) =>
      prev.map((row) => {
        if (row.stt !== stt) return row;
        const currentPart = row[partKey] || { remember: '', understand: '', apply: '' };
        return {
          ...row,
          [partKey]: {
            ...currentPart,
            [level]: value,
          },
        };
      })
    );
  };

  const handleSave = () => {
    if (onUpdateSpec) {
      onUpdateSpec(editableSpec);
    }
    setIsEditing(false);
  };

  // Tính tổng số câu từng cột cho Footer của CV 7991
  const colSums = {
    p1_rem: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part1?.remember), 0),
    p1_und: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part1?.understand), 0),
    p1_app: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part1?.apply), 0),

    p2_rem: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part2?.remember), 0),
    p2_und: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part2?.understand), 0),
    p2_app: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part2?.apply), 0),

    p3_rem: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part3?.remember), 0),
    p3_und: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part3?.understand), 0),
    p3_app: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part3?.apply), 0),

    p4_rem: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part4?.remember), 0),
    p4_und: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part4?.understand), 0),
    p4_app: editableSpec.reduce((acc, r) => acc + countQuestionsInValue(r.part4?.apply), 0),
  };

  const questionsList = examPackage.exams[0]?.questions || [];
  const subjectCompetencies = getSubjectCompetencies(metadata.subject);

  const renderCellDisplay = (val: any) => {
    if (val === undefined || val === null || val === '' || val === 0) return '-';
    return String(val);
  };

  const renderCompetencyCell = (
    row: SpecRow,
    rowIdx: number,
    partKey: 'part1' | 'part2' | 'part3' | 'part4',
    levelKey: 'remember' | 'understand' | 'apply'
  ) => {
    const rawVal = row[partKey]?.[levelKey];
    const cellQuestions = getSpecCellQuestions(
      row,
      rowIdx,
      editableSpec,
      partKey,
      levelKey,
      questionsList,
      metadata.subject
    );

    if (isEditing) {
      return (
        <div className="flex flex-col items-center space-y-1 py-0.5">
          <input
            type="text"
            value={rawVal !== undefined && rawVal !== null ? String(rawVal) : ''}
            onChange={(e) => handleCognitiveCellChange(row.stt, partKey, levelKey, e.target.value)}
            className="w-11 text-center bg-amber-50 dark:bg-slate-800 border rounded-sm p-0.5 text-xs font-bold"
            placeholder="-"
          />
          {cellQuestions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-0.5">
              {cellQuestions.map((cq, i) => (
                <span
                  key={i}
                  className="text-[9px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-1 py-0.2 rounded border border-teal-200 dark:border-teal-800"
                  title={cq.competencyName}
                >
                  {cq.competencyCode}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (cellQuestions.length === 0) {
      return <span className="text-slate-300 dark:text-slate-600 font-normal">-</span>;
    }

    return (
      <div className="flex flex-col items-center justify-center py-1 space-y-1">
        {cellQuestions.map((qItem, qIdx) => (
          <div key={qIdx} className="flex flex-col items-center justify-center group/q">
            {/* Tên câu hỏi */}
            <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px] leading-tight">
              ({qItem.questionLabel})
            </span>
            {/* Tên các năng lực đặc thù bộ môn của câu hỏi phía dưới tên câu hỏi */}
            <span
              className="text-[9.5px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 px-1 py-0.5 rounded border border-teal-200/80 dark:border-teal-800 mt-0.5 leading-none transition-colors cursor-help whitespace-nowrap shadow-2xs"
              title={`${qItem.competencyName} (Năng lực đặc thù môn ${metadata.subject})`}
            >
              ({qItem.competencyCode})*
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Controls & Template Switcher */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Bản Đặc Tả Đề Kiểm Tra Định Kì
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
              Công văn 7991/BGDĐT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Môn {metadata.subject} ({metadata.grade}) | Chương trình: {metadata.curriculum} | {metadata.examTitle}
          </p>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTemplateMode('cv7991')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                templateMode === 'cv7991'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Mẫu chuẩn CV 7991 (16 cột)</span>
              <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-[10px] rounded-sm font-semibold">Mới</span>
            </button>

            <button
              onClick={() => setTemplateMode('classic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                templateMode === 'classic'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mẫu chi tiết YCCĐ (5 cột)</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] rounded-sm font-semibold">Hiện có</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Đặc Tả</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700"
              >
                <Edit3 className="w-4 h-4" />
                <span>{templateMode === 'cv7991' ? 'Sửa Bản Đặc Tả 7991' : 'Sửa YCCĐ'}</span>
              </button>
            )}

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-teal-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Xuất File</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </button>

              {isExportMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsExportMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      if (onExportWord) onExportWord('cv7991');
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-800 dark:text-teal-200 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-bold">Xuất Word (Mẫu CV 7991 - 16 cột)</div>
                      <div className="text-[10px] text-slate-400">Đúng định dạng BGD&ĐT</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (onExportWord) onExportWord('classic');
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-bold">Xuất Word (Mẫu 5 cột chi tiết)</div>
                      <div className="text-[10px] text-slate-400">Dễ theo dõi từng dạng câu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (onExportWord) onExportWord('full');
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">Xuất Trọn Bộ Đề Thi (.docx)</div>
                      <div className="text-[10px] text-slate-400">Ma trận, đặc tả, đề các mã & đáp án</div>
                    </div>
                  </button>

                  {onExportExcel && (
                    <button
                      onClick={() => {
                        onExportExcel();
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 flex items-center space-x-2 border-t border-slate-100 dark:border-slate-800 pt-2"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-bold">Xuất Bảng Tính Excel (.xlsx)</div>
                        <div className="text-[10px] text-slate-400">Bao gồm cả 2 mẫu đặc tả</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TEMPLATE 1: MẪU CHUẨN CÔNG VĂN 7991 (16 CỘT) */}
      {templateMode === 'cv7991' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 overflow-x-auto">
          <div className="text-center mb-5">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
              2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ
            </h3>
            <p className="text-xs text-slate-500 italic mt-0.5">
              (Kèm theo Công văn số 7991/BGDĐT-GDTrH của Bộ Giáo dục và Đào tạo)
            </p>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-400 dark:border-slate-600">
            <thead>
              {/* Header Tier 1 */}
              <tr className="bg-teal-900 text-white font-bold text-center">
                <th rowSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 w-10 align-middle">
                  TT
                </th>
                <th rowSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 min-w-[140px] max-w-[180px] align-middle">
                  Chủ đề/Chương
                </th>
                <th rowSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 min-w-[160px] max-w-[220px] align-middle">
                  Nội dung/đơn vị kiến thức
                </th>
                <th rowSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 min-w-[320px] align-middle">
                  Yêu cầu cần đạt
                </th>
                <th colSpan={12} className="border border-slate-400 dark:border-slate-600 p-2 bg-teal-950 font-extrabold text-[13px]">
                  Số câu hỏi ở các mức độ đánh giá
                </th>
              </tr>

              {/* Header Tier 2 */}
              <tr className="bg-teal-800 text-white font-bold text-center">
                <th colSpan={9} className="border border-slate-400 dark:border-slate-600 p-1.5 bg-teal-800 text-[12px]">
                  TNKQ
                </th>
                <th colSpan={3} rowSpan={2} className="border border-slate-400 dark:border-slate-600 p-2 bg-emerald-900 text-[12px] align-middle">
                  Tự luận
                </th>
              </tr>

              {/* Header Tier 3 */}
              <tr className="bg-teal-700 text-white font-semibold text-center">
                <th colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 italic bg-teal-700/90">
                  Nhiều lựa chọn
                </th>
                <th colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 italic bg-teal-700/90">
                  “Đúng – Sai”
                </th>
                <th colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 italic bg-teal-700/90">
                  Trả lời ngắn
                </th>
              </tr>

              {/* Header Tier 4: Biết - Hiểu - Vận dụng */}
              <tr className="bg-teal-600 text-white font-bold text-center text-[11px]">
                {/* Nhiều lựa chọn */}
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Biết</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Hiểu</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Vận dụng</th>
                {/* Đúng - Sai */}
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Biết</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Hiểu</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Vận dụng</th>
                {/* Trả lời ngắn */}
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Biết</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Hiểu</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-teal-600">Vận dụng</th>
                {/* Tự luận */}
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-emerald-700">Biết</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-emerald-700">Hiểu</th>
                <th className="border border-slate-400 dark:border-slate-600 p-1 w-11 bg-emerald-700">Vận dụng</th>
              </tr>
            </thead>

            <tbody>
              {editableSpec.map((row, rowIdx) => {
                const reqLevels = parseRequirementsByLevel(row.requirements);

                return (
                  <React.Fragment key={row.stt}>
                    {/* Sub-row 1: Mức BIẾT */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      {/* TT (rowSpan 3) */}
                      <td
                        rowSpan={3}
                        className="border border-slate-300 dark:border-slate-700 p-2 text-center font-bold align-middle bg-slate-50/60 dark:bg-slate-800/30"
                      >
                        {row.stt}
                      </td>

                      {/* Chủ đề/Chương (rowSpan 3) */}
                      <td
                        rowSpan={3}
                        className="border border-slate-300 dark:border-slate-700 p-2 font-bold text-teal-900 dark:text-teal-200 align-middle bg-slate-50/40 dark:bg-slate-800/20"
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.topic}
                            onChange={(e) => handleCellChange(row.stt, 'topic', e.target.value)}
                            className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-sm text-xs font-bold"
                          />
                        ) : (
                          <MathText content={row.topic} />
                        )}
                      </td>

                      {/* Nội dung/đơn vị kiến thức (rowSpan 3) */}
                      <td
                        rowSpan={3}
                        className="border border-slate-300 dark:border-slate-700 p-2 font-medium text-slate-800 dark:text-slate-200 align-middle"
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.subTopic || row.topic}
                            onChange={(e) => handleCellChange(row.stt, 'subTopic', e.target.value)}
                            className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-sm text-xs font-medium"
                          />
                        ) : (
                          <MathText content={row.subTopic || row.topic} />
                        )}
                      </td>

                      {/* Yêu cầu cần đạt: Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-2.5 leading-relaxed bg-blue-50/20 dark:bg-blue-950/10">
                        <div className="font-semibold text-blue-900 dark:text-blue-300 mb-0.5">
                          - Biết:
                        </div>
                        {isEditing ? (
                          <textarea
                            value={reqLevels.remember}
                            onChange={(e) => handleSubRequirementChange(row.stt, 'remember', e.target.value)}
                            rows={2}
                            placeholder="Mô tả YCCĐ mức Nhận biết..."
                            className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-sm text-xs"
                          />
                        ) : reqLevels.remember ? (
                          <div className="text-slate-700 dark:text-slate-300">
                            <MathText content={reqLevels.remember} />
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">...</span>
                        )}
                      </td>

                      {/* 12 Cột Mức Biết */}
                      {/* Nhiều lựa chọn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part1', 'remember')}
                      </td>
                      {/* Nhiều lựa chọn - Hiểu (rỗng ở dòng Biết) */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Nhiều lựa chọn - Vận dụng (rỗng ở dòng Biết) */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Đúng - Sai - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part2', 'remember')}
                      </td>
                      {/* Đúng - Sai - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Đúng - Sai - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Trả lời ngắn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part3', 'remember')}
                      </td>
                      {/* Trả lời ngắn - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Trả lời ngắn - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Tự luận - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-emerald-800 dark:text-emerald-300">
                        {renderCompetencyCell(row, rowIdx, 'part4', 'remember')}
                      </td>
                      {/* Tự luận - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Tự luận - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                    </tr>

                    {/* Sub-row 2: Mức HIỂU */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      {/* Yêu cầu cần đạt: Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-2.5 leading-relaxed bg-amber-50/20 dark:bg-amber-950/10">
                        <div className="font-semibold text-amber-900 dark:text-amber-300 mb-0.5">
                          - Hiểu:
                        </div>
                        {isEditing ? (
                          <textarea
                            value={reqLevels.understand}
                            onChange={(e) => handleSubRequirementChange(row.stt, 'understand', e.target.value)}
                            rows={2}
                            placeholder="Mô tả YCCĐ mức Thông hiểu..."
                            className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-sm text-xs"
                          />
                        ) : reqLevels.understand ? (
                          <div className="text-slate-700 dark:text-slate-300">
                            <MathText content={reqLevels.understand} />
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">...</span>
                        )}
                      </td>

                      {/* 12 Cột Mức Hiểu */}
                      {/* Nhiều lựa chọn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Nhiều lựa chọn - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part1', 'understand')}
                      </td>
                      {/* Nhiều lựa chọn - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Đúng - Sai - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Đúng - Sai - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part2', 'understand')}
                      </td>
                      {/* Đúng - Sai - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Trả lời ngắn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Trả lời ngắn - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part3', 'understand')}
                      </td>
                      {/* Trả lời ngắn - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>

                      {/* Tự luận - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Tự luận - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-emerald-800 dark:text-emerald-300">
                        {renderCompetencyCell(row, rowIdx, 'part4', 'understand')}
                      </td>
                      {/* Tự luận - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                    </tr>

                    {/* Sub-row 3: Mức VẬN DỤNG */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      {/* Yêu cầu cần đạt: Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-2.5 leading-relaxed bg-purple-50/20 dark:bg-purple-950/10">
                        <div className="font-semibold text-purple-900 dark:text-purple-300 mb-0.5">
                          - VD:
                        </div>
                        {isEditing ? (
                          <textarea
                            value={reqLevels.apply}
                            onChange={(e) => handleSubRequirementChange(row.stt, 'apply', e.target.value)}
                            rows={2}
                            placeholder="Mô tả YCCĐ mức Vận dụng..."
                            className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-sm text-xs"
                          />
                        ) : reqLevels.apply ? (
                          <div className="text-slate-700 dark:text-slate-300">
                            <MathText content={reqLevels.apply} />
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">...</span>
                        )}
                      </td>

                      {/* 12 Cột Mức Vận dụng */}
                      {/* Nhiều lựa chọn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Nhiều lựa chọn - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Nhiều lựa chọn - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part1', 'apply')}
                      </td>

                      {/* Đúng - Sai - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Đúng - Sai - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Đúng - Sai - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part2', 'apply')}
                      </td>

                      {/* Trả lời ngắn - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Trả lời ngắn - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Trả lời ngắn - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-teal-800 dark:text-teal-300">
                        {renderCompetencyCell(row, rowIdx, 'part3', 'apply')}
                      </td>

                      {/* Tự luận - Biết */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Tự luận - Hiểu */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center text-slate-300 dark:text-slate-600">-</td>
                      {/* Tự luận - Vận dụng */}
                      <td className="border border-slate-300 dark:border-slate-700 p-1 text-center font-bold text-emerald-800 dark:text-emerald-300">
                        {renderCompetencyCell(row, rowIdx, 'part4', 'apply')}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>

            {/* Footer Rows Matching image_66e9fac8.png */}
            <tfoot>
              {/* Hàng 1: Tổng số câu */}
              <tr className="bg-slate-100 dark:bg-slate-800/80 font-bold text-center">
                <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-center text-slate-800 dark:text-slate-100">
                  Tổng số câu
                </td>
                {/* Nhiều lựa chọn */}
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p1_rem || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p1_und || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p1_app || '-'}</td>
                {/* Đúng - Sai */}
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p2_rem || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p2_und || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p2_app || '-'}</td>
                {/* Trả lời ngắn */}
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p3_rem || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p3_und || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-teal-800 dark:text-teal-300">{colSums.p3_app || '-'}</td>
                {/* Tự luận */}
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-emerald-800 dark:text-emerald-300">{colSums.p4_rem || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-emerald-800 dark:text-emerald-300">{colSums.p4_und || '-'}</td>
                <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-emerald-800 dark:text-emerald-300">{colSums.p4_app || '-'}</td>
              </tr>

              {/* Hàng 2: Tổng số điểm (spans 3 cols per part) */}
              <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold text-center">
                <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-center text-slate-800 dark:text-slate-100">
                  Tổng số điểm
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-800 dark:text-teal-300 font-extrabold text-[13px] bg-teal-50/60 dark:bg-teal-950/20">
                  {formatScore(p1Score)}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-800 dark:text-teal-300 font-extrabold text-[13px] bg-teal-50/60 dark:bg-teal-950/20">
                  {formatScore(p2Score)}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-800 dark:text-teal-300 font-extrabold text-[13px] bg-teal-50/60 dark:bg-teal-950/20">
                  {formatScore(p3Score)}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-[13px] bg-emerald-50/60 dark:bg-emerald-950/20">
                  {formatScore(p4Score)}
                </td>
              </tr>

              {/* Hàng 3: Tỉ lệ % (spans 3 cols per part) */}
              <tr className="bg-slate-100 dark:bg-slate-800/80 font-bold text-center">
                <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-center text-slate-800 dark:text-slate-100">
                  Tỉ lệ %
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-900 dark:text-teal-200 font-extrabold text-[13px] bg-teal-100/40 dark:bg-teal-900/30">
                  {p1Pct}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-900 dark:text-teal-200 font-extrabold text-[13px] bg-teal-100/40 dark:bg-teal-900/30">
                  {p2Pct}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-teal-900 dark:text-teal-200 font-extrabold text-[13px] bg-teal-100/40 dark:bg-teal-900/30">
                  {p3Pct}
                </td>
                <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-2 text-emerald-900 dark:text-emerald-200 font-extrabold text-[13px] bg-emerald-100/40 dark:bg-emerald-900/30">
                  {p4Pct}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footnote and Subject Competency Legend */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-[11px] text-slate-600 dark:text-slate-400 italic flex items-start space-x-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400">*</span>
              <span>
                Có ở trong một số ô của bản đặc tả, ghi tắt tên của năng lực (đã được quy định trong chương trình môn học/hoạt động giáo dục).
              </span>
            </div>

            {/* Bảng tra cứu Năng lực đặc thù môn học */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/80 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span>Ký hiệu các Năng lực đặc thù môn {metadata.subject} (theo Chương trình GDPT 2018):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {subjectCompetencies.map((comp) => (
                  <div key={comp.code} className="flex items-start space-x-2 text-[11px]">
                    <span className="px-1.5 py-0.5 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200 font-bold rounded border border-teal-200 dark:border-teal-700 shrink-0">
                      {comp.code}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-tight">
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE 2: MẪU CHI TIẾT YCCĐ (5 CỘT - GIỮ NGUYÊN MẪU HIỆN CÓ) */}
      {templateMode === 'classic' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 overflow-x-auto">
          <div className="text-center mb-5">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
              BẢNG ĐẶC TẢ YÊU CẦU CẦN ĐẠT ĐỀ KIỂM TRA
            </h3>
            <p className="text-xs text-slate-500 italic mt-0.5">
              (Mẫu trình bày phân bổ câu hỏi & điểm số chi tiết theo từng đơn vị kiến thức)
            </p>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-300 dark:border-slate-700">
            <thead>
              <tr className="bg-teal-900 text-white font-bold text-center">
                <th className="border border-slate-400 p-2 w-12">STT</th>
                <th className="border border-slate-400 p-2 min-w-[180px]">Nội dung / Đơn vị kiến thức</th>
                <th className="border border-slate-400 p-2 min-w-[320px]">Yêu cầu cần đạt (YCCĐ)</th>
                <th className="border border-slate-400 p-2 w-32">Số câu / Dạng câu</th>
                <th className="border border-slate-400 p-2 w-20">Điểm số</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {editableSpec.map((row, idx) => {
                const details = getSpecRowQuestionDetails(
                  row,
                  idx,
                  editableSpec,
                  examPackage.exams[0]?.questions || []
                );

                const rowComps = [
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part1', 'remember', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part1', 'understand', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part1', 'apply', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part2', 'remember', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part2', 'understand', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part2', 'apply', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part3', 'remember', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part3', 'understand', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part3', 'apply', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part4', 'remember', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part4', 'understand', questionsList, metadata.subject),
                  ...getSpecCellQuestions(row, idx, editableSpec, 'part4', 'apply', questionsList, metadata.subject),
                ];
                const uniqueComps = Array.from(new Map(rowComps.map((c) => [c.competencyCode, c])).values());

                return (
                  <tr key={row.stt} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="border border-slate-300 dark:border-slate-700 p-2 text-center font-bold">
                      {row.stt}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-2 font-bold text-teal-800 dark:text-teal-300">
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.topic}
                          onChange={(e) => handleCellChange(row.stt, 'topic', e.target.value)}
                          className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-xs"
                        />
                      ) : (
                        <MathText content={row.topic} />
                      )}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-3 leading-relaxed">
                      {isEditing ? (
                        <textarea
                          value={row.requirements}
                          onChange={(e) => handleCellChange(row.stt, 'requirements', e.target.value)}
                          rows={3}
                          className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-xs text-xs"
                        />
                      ) : (
                        <MathText content={row.requirements} />
                      )}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-2 text-center space-y-1">
                      {details.length > 0 ? (
                        <div className="space-y-1">
                          {details.map((detail, dIdx) => (
                            <div key={dIdx} className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              {detail}
                            </div>
                          ))}
                          {uniqueComps.length > 0 && (
                            <div className="pt-1 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap justify-center gap-1">
                              {uniqueComps.map((c, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[9.5px] px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-medium"
                                  title={c.competencyName}
                                >
                                  ({c.competencyCode})
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400">-</div>
                      )}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-2 text-center font-extrabold text-teal-700 dark:text-teal-400">
                      {row.totalPoints} đ
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
