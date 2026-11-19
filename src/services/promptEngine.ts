import { ExamMetadata, Question } from '../types';
import {
  buildKnttCurriculumPromptContext,
  KNTT_CURRICULUM_NAME,
  normalizeKnttGrade,
} from '../data/knttMathCurriculum';

export class PromptEngine {
  /**
   * Tạo System Instruction chuẩn chuyên gia Môn Toán THCS (Lớp 6–9)
   * Bám sát Công văn 7991/BGDĐT & Bộ SGK Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)
   */
  static getSystemInstruction(): string {
    return `Bạn là Chuyên gia Giáo dục Môn Toán THCS Hàng đầu Việt Nam + Chuyên gia Đánh giá Năng lực theo Công văn 7991/BGDĐT của Bộ Giáo dục và Đào tạo.
Nhiệm vụ của bạn là biên soạn ma trận, bảng đặc tả, đề kiểm tra, đáp án và hướng dẫn chấm MÔN TOÁN (Lớp 6, 7, 8, 9), BÁM SÁT TUYỆT ĐỐI 100% NGUỒN SÁCH GIÁO KHOA "KẾT NỐI TRI THỨC VỚI CUỘC SỐNG" (NXB Giáo dục Việt Nam) ĐÃ ĐÍNH KÈM TRONG ỨNG DỤNG.

BẮT BUỘC TUÂN THỦ CÁC NGUYÊN TẮC SAU:
1. NGUỒN DỮ LIỆU DUY NHẤT:
   - Chỉ sử dụng kiến thức, định nghĩa, định lí, kí hiệu, thuật ngữ và thứ tự bài học từ bộ SGK Toán 6, 7, 8, 9 - Kết nối tri thức với cuộc sống (KNTT).
   - TUYỆT ĐỐI KHÔNG sử dụng kiến thức, cách trình bày, kí hiệu riêng của bộ sách khác (Chân trời sáng tạo, Cánh Diều) hay kiến thức vượt cấp (ví dụ: Toán 6 không dùng đa thức/số vô tỉ; Toán 7 không dùng 7 hằng đẳng thức/Thalès/Pythagore vì Pythagore thuộc Bài 35 Toán 8 KNTT; Toán 8 không dùng phương trình bậc hai/hệ hai phương trình bậc nhất hai ẩn/tỉ số lượng giác sin-cos-tan/góc nội tiếp vì các nội dung này thuộc Toán 9 KNTT; Toán 9 không dùng kiến thức THPT).
   - Nội dung câu hỏi phải MỚI (thay đổi số liệu, ngữ cảnh thực tiễn gần gũi kiểu Vuông, Tròn, Pi trong SGK KNTT), KHÔNG sao chép nguyên văn bài tập có sẵn trong SGK, đảm bảo bám sát 100% Yêu cầu cần đạt (YCCĐ).
2. Chuẩn kiến thức, kỹ năng, tính toán ra đáp số chính xác 100%, vừa sức với thời gian làm bài.
3. Đúng cấu trúc Công văn 7991/BGDĐT:
   - PHẦN I: Trắc nghiệm nhiều phương án lựa chọn (Mỗi câu hỏi có 4 phương án A, B, C, D, chỉ chọn 1 phương án đúng).
   - PHẦN II: Trắc nghiệm Đúng/Sai (Mỗi câu hỏi có 1 lệnh hỏi chính và 4 ý a, b, c, d; ở mỗi ý chọn Đúng hoặc Sai).
   - PHẦN III: Trắc nghiệm Trả lời ngắn (Học sinh điền kết quả ngắn, số hoặc giá trị đại lượng).
   - PHẦN IV: Tự luận (Các câu hỏi tự luận theo đúng số lượng yêu cầu, kèm Thang điểm chi tiết & Rubric chấm điểm từng bước).
4. Phân bổ đúng tỷ lệ mức độ nhận thức của toàn đề thi: Nhận biết (REMEMBER / NB), Thông hiểu (UNDERSTAND / TH), Vận dụng (APPLY / VD), Vận dụng cao (ADVANCED / VDC). Với phần Tự luận (Phần IV), điểm số của từng câu tự luận PHẢI khớp chính xác với quỹ điểm được giao.
5. QUY TẮC KÍ HIỆU TOÁN HỌC CHUẨN SGK KẾT NỐI TRI THỨC & LATEX (BẮT BUỘC TUÂN THỦ 100%):
   - Dấu thập phân theo chuẩn Việt Nam & KNTT dùng dấu phẩy ',' (ví dụ: $2,5$, $-0,35$, $3,14$). Phần tử trong tập hợp và khoảng ghép nhóm dùng dấu chấm phẩy ';' (ví dụ: $A = \\{1; 2; 3; 4\\}$, $[10; 20)$).
   - Phép nhân dùng $\\cdot$ (ví dụ: $2 \\cdot 3^2$, $a \\cdot b$). Chia hết dùng $\\vdots$, không chia hết dùng $\\not\\vdots$.
   - Kí hiệu góc dùng $\\widehat{ABC}$, $\\widehat{xOy}$; độ dùng $60^\\circ$; tam giác dùng $\\Delta ABC$, đồng dạng dùng $\\Delta A'B'C' \\sim \\Delta ABC$; cung tròn dùng $\\overparen{AB}$, số đo cung dùng $\\text{sđ}\\;\\overparen{AB}$.
   - CHỈ bọc KÝ HIỆU HOẶC BIỂU THỨC TOÁN HỌC bằng dấu $...$ (ví dụ: $\\Delta ABC$, $AB = 4\\text{ cm}$, $\\widehat{A} = 60^\\circ$, $k = \\frac{2}{3}$, $\\forall x \\in \\mathbb{R}$).
   - TUYỆT ĐỐI KHÔNG bọc văn bản hay từ ngữ Tiếng Việt vào trong dấu $...$ (KHÔNG viết "$Cho tam giác ABC có$", KHÔNG viết "$Biết chu vi$", KHÔNG viết "$độ dài$").
   - TUYỆT ĐỐI KHÔNG dùng mã TeX accent cho tiếng Việt (KHÔNG viết "v\\grave{a}", "c\\'o", "m\\text{\\hat{o}}t", "\\text{\\dh}"). Bắt buộc viết chữ tiếng Việt có dấu chuẩn Unicode.
   - Biểu thức phân số hoặc đẳng thức phức tạp phải bọc TRỌN VẸN trong 1 cặp $...$ duy nhất (ví dụ: $\\frac{AB}{A'B'} = \\frac{BC}{B'C'}$). TUYỆT ĐỐI KHÔNG ngắt dấu $ giữa chừng.
   - HỆ PHƯƠNG TRÌNH (Toán 9 KNTT) bắt buộc dùng môi trường \\begin{cases} ... \\end{cases} và phân cách giữa các phương trình bằng dấu xuống dòng hàng kép '\\\\' (ví dụ: $\\begin{cases} x - 3y = 2 \\\\ -2x + 5y = 1 \\end{cases}$). TUYỆT ĐỐI KHÔNG viết thừa dấu gạch chéo ngược trước begin (KHÔNG viết \\\\begin{cases}).
   - QUY TẮC XUỐNG DÒNG VÀ DẤU GẠCH CHÉO NGƯỢC:
     + Xuống dòng trong câu hỏi, các ý 1), 2), a), b), lời giải chi tiết và hướng dẫn chấm tự luận BẮT BUỘC dùng ký tự ngắt dòng '\\n'. TUYỆT ĐỐI KHÔNG dùng '\\\\' hoặc '\\' để xuống dòng trong văn bản tiếng Việt thông thường.
     + TUYỆT ĐỐI KHÔNG viết dấu gạch chéo ngược '\\' trước từ tiếng Việt hoặc số thứ tự (KHÔNG viết '\\Diện tích', '\\1)').
6. TUYỆT ĐỐI KHÔNG chèn các nhãn mã như [NB_TL], [TH_TL], [VD_TL], [VDC_TL], [NB_TN], [TH_TN] vào chuỗi văn bản 'content', 'explanation', 'essayAnswerGuide'. Mức độ nhận thức CHỈ khai báo qua trường JSON 'cognitiveLevel'.
   - TUYỆT ĐỐI KHÔNG ĐƯA TIẾNG ANH, LẬP LUẬN NỘI BỘ, SUY NGHĨ HOẶC TỰ SỬA ĐỔI (như '*Self-correction:', 'Revised explanation:', 'Note:', 'Let me check...') vào bất kỳ trường nào trong JSON. Toàn bộ lời giải trong 'explanation' và 'essayAnswerGuide' phải 100% bằng TIẾNG VIỆT chuẩn sư phạm Toán THCS.
7. TRONG CHUỖI JSON TRẢ VỀ, MỌI DẤU GẠCH CHÉO NGƯỢC '\\' CỦA LATEX BẮT BUỘC PHẢI ĐƯỢC ESCAPE THÀNH '\\\\' (VÍ DỤ: '\\\\frac', '\\\\sqrt', '\\\\alpha', '\\\\beta', '\\\\begin{cases}', '\\\\end{cases}', '\\\\le', '\\\\ge', '\\\\ne', '\\\\neq', '\\\\tan', '\\\\vdots', VÀ DẤU XUỐNG DÒNG HỆ PHƯƠNG TRÌNH LÀ '\\\\\\\\'). TUYỆT ĐỐI KHÔNG ngắt dòng '\\n' giữa các biểu thức toán học.
8. Trả về đúng 1 đối tượng JSON duy nhất theo đúng schema yêu cầu, không có lời mở đầu hay kết luận thừa ngoài JSON.
9. ĐẶC BIỆT DÀNH CHO CÂU HỎI HÌNH HỌC, ĐỒ THỊ HÀM SỐ & BIỂU ĐỒ TOÁN HỌC:
   Nếu bài tập thuộc mạch HÌNH HỌC PHẲNG / KHÔNG GIAN (tam giác, tứ giác, đường tròn, tứ giác nội tiếp, hình chóp tam giác/tứ giác đều, hình hộp, lăng trụ, hình trụ/nón/cầu...) hoặc ĐỒ THỊ HÀM SỐ ($y = ax + b$, parabol $y = ax^2$):
   - BẮT BUỘC cung cấp chuỗi mã SVG chuẩn, trực quan trong trường "svgDiagram" (cho đề thi) và "solutionDiagramSvg" (cho phần đáp án / hướng dẫn giải chi tiết nếu cần vẽ thêm đường phụ).
   - Mã SVG phải chứa thẻ <svg viewBox='0 0 400 300' ...>, màu sắc rõ ràng, nét vẽ đứt đoạn cho nét khuất hình học (stroke-dasharray='4,4'), có ký hiệu góc vuông / bằng nhau và các nhãn tên điểm / trục tọa độ. MỌI THUỘC TÍNH TRONG SVG BẮT BUỘC DÙNG DẤU NHÁY ĐƠN '...' (ví dụ: viewBox='0 0 400 300') ĐỂ KHÔNG PHÁ VỠ CÚ PHÁP JSON.
10. NĂNG LỰC ĐẶC THÙ MÔN TOÁN (CHUẨN CÔNG VĂN 7991/BGDĐT VÀ GDPT 2018):
   - MỖI CÂU HỎI BẮT BUỘC xác định năng lực đặc thù Toán học tương ứng qua "competency" và "competencyCode", CHỈ sử dụng 5 năng lực Toán học sau:
     + NL TDLL: Năng lực tư duy và lập luận toán học
     + NL MHH: Năng lực mô hình hoá toán học
     + NL GQVĐ: Năng lực giải quyết vấn đề toán học
     + NL GTTH: Năng lực giao tiếp toán học
     + NL CCTH: Năng lực sử dụng công cụ, phương tiện học toán
11. NGUYÊN TẮC PHÂN CHIA ĐƠN VỊ KIẾN THỨC VÀ YÊU CẦU CẦN ĐẠT TRONG MA TRẬN & BẢN ĐẶC TẢ (CV 7991/BGDĐT):
   - Chủ đề/chương kiểm tra BẮT BUỘC chia nhỏ thành 2 đến 5 "ĐƠN VỊ KIẾN THỨC" (subTopic) cụ thể tương ứng với từng bài học trong SGK Toán KNTT.
   - Mỗi "Đơn vị kiến thức" là MỘT DÒNG RIÊNG BIỆT trong cả mảng "matrix" và mảng "specification".
   - Trong "specification", trường "requirements" của MỖI dòng BẮT BUỘC nêu rõ YCCĐ chuẩn Toán KNTT theo 3 gạch đầu dòng:
     "- Biết: [Nhận biết được..., Nhớ được..., Chỉ ra được...]
     - Hiểu: [Thông hiểu được..., Giải thích được..., Thực hiện được...]
     - Vận dụng: [Vận dụng được để tính toán..., Giải quyết được bài toán thực tiễn...]"`;
  }

  /**
   * Tạo prompt chi tiết từ thông tin giáo viên nhập (Chuyên biệt Môn Toán KNTT 6-9)
   */
  static buildGenerationPrompt(metadata: ExamMetadata, existingQuestionsToAvoid: string[] = []): string {
    const entropySeed = Math.random().toString(36).substring(2, 9).toUpperCase() + '_' + Date.now();
    const {
      schoolName,
      grade,
      semester,
      schoolYear,
      examTitle,
      chapterTitle,
      durationMinutes,
      totalPoints,
      examMode,
      questionCounts,
      cognitiveRatio,
    } = metadata;

    const normalizedGrade = normalizeKnttGrade(grade);
    const subCfg = metadata.subjectConfig || {};

    let modeDescription = '';
    if (examMode === 'MCQ_ESSAY') {
      modeDescription = 'Đề kết hợp Trắc nghiệm và Tự luận (Gồm các Phần I, II, III, IV tùy thuộc số lượng câu hỏi khai báo).';
    } else if (examMode === 'MCQ_ONLY') {
      modeDescription = 'Đề Trắc nghiệm 100% (Chỉ gồm Phần I, Phần II, Phần III, KHÔNG có Phần IV Tự luận).';
    } else {
      modeDescription = 'Đề Tự luận 100% (Chỉ gồm Phần IV Tự luận, KHÔNG có các phần Trắc nghiệm I, II, III).';
    }

    const knttCurriculumSection = buildKnttCurriculumPromptContext(
      normalizedGrade,
      semester,
      chapterTitle,
      subCfg.selectedKnttLessonIds
    );

    const domainLabels: Record<string, string> = {
      so_dai_so: 'Số và Đại số',
      hinh_hoc_do_luong: 'Hình học và Đo lường',
      thong_ke_xac_suat: 'Thống kê và Xác suất',
    };
    const activeDomains =
      subCfg.mathDomains && subCfg.mathDomains.length > 0
        ? subCfg.mathDomains.map((d) => domainLabels[d] || d).join(', ')
        : 'Theo các bài học đã chọn trong SGK Toán KNTT';

    const mathConfigSection = `
📐 ĐỊNH HƯỚNG BIÊN SOẠN MÔN TOÁN (SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG - ${normalizedGrade.toUpperCase()}):
- Mạch kiến thức trọng tâm: ${activeDomains}.
- Ngữ cảnh thực tiễn: ${subCfg.hasContextData !== false ? 'Ưu tiên lồng ghép các bài toán thực tiễn đời sống gần gũi với học sinh THCS (tính tiền, đo đạc, lát gạch, vận tốc, xác suất trò chơi, biểu đồ thống kê).' : 'Kết hợp hài hòa giữa bài tập rèn luyện kĩ năng và bài toán thực tế.'}
- Hình vẽ & Đồ thị minh họa: ${subCfg.prioritizeGeoGebraDiagrams !== false ? 'BẮT BUỘC sinh hình vẽ SVG sắc nét (chuẩn GeoGebra, có nhãn điểm và nét đứt cho cạnh khuất) trong trường "svgDiagram" cho mọi câu hỏi Hình học / Đồ thị hàm số / Biểu đồ.' : 'Sinh hình vẽ SVG cho các câu hỏi hình học cần thiết để học sinh dễ quan sát.'}
`;

    let referenceSection = '';
    if (metadata.referenceContext && metadata.referenceContext.trim()) {
      referenceSection += `
⚠️ GHI CHÚ BỔ SUNG & GIỚI HẠN KIẾN THỨC CỤ THỂ TỪ GIÁO VIÊN (BẮT BUỘC BÁM SÁT):
${metadata.referenceContext.trim()}

🎯 YÊU CẦU PHẠM VI:
1. Chỉ sinh câu hỏi nằm hoàn toàn trong phạm vi các bài học SGK Toán KNTT đã chọn và ghi chú giới hạn của giáo viên.
2. Không đưa kiến thức các bài chưa học hoặc kiến thức lớp trên/bộ sách khác.
`;
    }

    const hasCustomSpec = Boolean(
      (metadata.customSpecContext && metadata.customSpecContext.trim().length >= 20) ||
      (metadata.customSpecImages && metadata.customSpecImages.length > 0)
    );

    const hasCustomMatrix = Boolean(
      (metadata.customMatrixContext && metadata.customMatrixContext.trim().length >= 20) ||
      (metadata.customMatrixImages && metadata.customMatrixImages.length > 0)
    );

    const p1Count = questionCounts.part1_MCQSingle ?? 12;
    const p2Count = questionCounts.part2_MCQTrueFalse ?? 2;
    const p3Count = questionCounts.part3_MCQShort ?? 4;
    const p4Count = questionCounts.part4_Essay ?? 2;
    const totalRequiredQuestions = p1Count + p2Count + p3Count + p4Count;

    const mandatoryQuestionsCountSection = `
🚨🚨🚨 QUY ĐỊNH BẮT BUỘC VỀ SỐ LƯỢNG CÂU HỎI TRONG MẢNG "questions" (TUYỆT ĐỐI KHÔNG ĐƯỢC CHỈ SINH 1 CÂU MỖI PHẦN):
Mảng "questions" trong JSON kết quả BẮT BUỘC PHẢI CHỨA ĐỦ TẤT CẢ ${totalRequiredQuestions} CÂU HỎI HOÀN CHỈNH (không được thiếu dù chỉ 1 câu, không được chỉ đưa 1 câu ví dụ):
- PHẦN I (Trắc nghiệm nhiều lựa chọn): BẮT BUỘC SINH ĐỦ CHÍNH XÁC ${p1Count} CÂU HỎI (đánh số "number" từ 1 đến ${p1Count}, mỗi câu 4 phương án A, B, C, D). TUYỆT ĐỐI KHÔNG CHỈ SINH 1 CÂU!
- PHẦN II (Trắc nghiệm Đúng/Sai): BẮT BUỘC SINH ĐỦ CHÍNH XÁC ${p2Count} CÂU HỎI LỚN (đánh số "number" từ 1 đến ${p2Count}, mỗi câu gồm 4 ý a, b, c, d với isCorrect và lời giải). TUYỆT ĐỐI KHÔNG CHỈ SINH 1 CÂU!
- PHẦN III (Trắc nghiệm Trả lời ngắn): BẮT BUỘC SINH ĐỦ CHÍNH XÁC ${p3Count} CÂU HỎI ĐỘC LẬP (đánh số "number" từ 1 đến ${p3Count}). TUYỆT ĐỐI KHÔNG CHỈ SINH 1 CÂU!
- PHẦN IV (Tự luận): BẮT BUỘC SINH ĐỦ CHÍNH XÁC ${p4Count} CÂU HỎI TỰ LUẬN (đánh số "number" từ 1 đến ${p4Count}) kèm hướng dẫn giải chi tiết và mảng "rubric" chấm điểm từng bước.
=> TỔNG CỘNG MẢNG "questions" PHẢI CÓ ĐỦ CHÍNH XÁC ${totalRequiredQuestions} CÂU HỎI!
`;

    let matrixModeSection = '';
    if (hasCustomSpec) {
      matrixModeSection = `
🎯🎯🎯 YÊU CẦU: RA ĐỀ BÁM SÁT BẢNG ĐẶC TẢ CHI TIẾT (CĂN CỨ YÊU CẦU CẦN ĐẠT - YCCĐ & MỨC ĐỘ NHẬN THỨC) 🎯🎯🎯
Giáo viên đã cung cấp BẢNG ĐẶC TẢ ĐỀ KIỂM TRA CHI TIẾT (văn bản hoặc ảnh chụp đính kèm bên dưới).
BẠN BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT:
1. MỖI CÂU HỎI PHẢI ĐỐI ỨNG TRỰC TIẾP VỚI 1 YCCĐ trong Bảng đặc tả và nằm trong phạm vi SGK Toán ${normalizedGrade} KNTT.
2. ĐÚNG CHUẨN TỪNG MỨC ĐỘ NHẬN THỨC (NB, TH, VD, VDC).
3. Mảng "specification" trả về phải giữ trọn vẹn các đơn vị kiến thức (subTopic) và nội dung Yêu cầu cần đạt chi tiết (requirements).

${metadata.customSpecContext ? `
--------------------- NỘI DUNG BẢNG ĐẶC TẢ CHI TIẾT DO GIÁO VIÊN CUNG CẤP ---------------------
${metadata.customSpecContext.trim()}
--------------------- KẾT THÚC BẢNG ĐẶC TẢ CHI TIẾT ---------------------
` : ''}
${metadata.customSpecImages && metadata.customSpecImages.length > 0 ? `
📸 ĐÃ ĐÍNH KÈM ${metadata.customSpecImages.length} ẢNH CHỤP BẢNG ĐẶC TẢ CHI TIẾT:
Hãy phân tích kỹ từng cột trong ảnh chụp để ra đề bám sát 100%!
` : ''}

${mandatoryQuestionsCountSection}
`;
    } else if (hasCustomMatrix) {
      matrixModeSection = `
⚡⚡⚡ YÊU CẦU: RA ĐỀ THEO MA TRẬN MÔN TOÁN ĐÍNH KÈM ⚡⚡⚡
Người dùng đã cung cấp khung Ma trận môn Toán (dạng văn bản hoặc ảnh chụp đính kèm bên dưới).
BẠN BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT:
1. ĐỌC KỸ TỪNG DÒNG, TỪNG CỘT CỦA MA TRẬN VÀ PHÂN BỔ CÂU HỎI CHUẨN SGK TOÁN ${normalizedGrade} KNTT.
2. PHÂN BIỆT RÕ "SỐ CÂU LỚN" VÀ "SỐ Ý":
   - PHẦN I: ${p1Count} câu trắc nghiệm 4 lựa chọn (partType: "PART1").
   - PHẦN II: ${p2Count} CÂU LỚN Đúng/Sai (partType: "PART2"), mỗi câu gồm mảng "trueFalseStatements" 4 ý a, b, c, d.
   - PHẦN III: ${p3Count} câu trả lời ngắn (partType: "PART3").
   - PHẦN IV: ${p4Count} câu tự luận (partType: "PART4") kèm lời giải chi tiết và rubric.
3. TỔNG ĐIỂM TOÀN BỘ ĐỀ THI PHẢI BẰNG ĐÚNG 10.0 ĐIỂM.

${metadata.customMatrixContext ? `
--------------------- NỘI DUNG MA TRẬN TOÁN CUNG CẤP ---------------------
${metadata.customMatrixContext.trim()}
--------------------- KẾT THÚC MA TRẬN TOÁN ---------------------
` : ''}
${metadata.customMatrixImages && metadata.customMatrixImages.length > 0 ? `
📸 ĐÃ ĐÍNH KÈM ${metadata.customMatrixImages.length} ẢNH CHỤP KHUNG MA TRẬN:
Hãy phân tích kỹ từng hàng, từng cột và 3 mức độ đánh giá trong ảnh chụp ma trận để sinh đề bám sát 100%!
` : ''}

${mandatoryQuestionsCountSection}
`;
    } else {
      matrixModeSection = `
📊 CẤU TRÚC SỐ LƯỢNG CÂU HỎI THEO DẠNG VÀ THANG ĐIỂM CHI TIẾT:
- Phần I (Trắc nghiệm 4 lựa chọn): ${questionCounts.part1_MCQSingle} câu (Mỗi câu ${questionCounts.part1_PointsPerQuestion ?? 0.25} điểm, Tổng = ${Math.round((questionCounts.part1_MCQSingle || 0) * (questionCounts.part1_PointsPerQuestion ?? 0.25) * 100) / 100}đ)
- Phần II (Trắc nghiệm Đúng/Sai): ${questionCounts.part2_MCQTrueFalse} câu (Mỗi câu ${questionCounts.part2_PointsPerQuestion ?? 1.0} điểm, gồm chính xác ${questionCounts.part2_TFStatementsPerQuestion ?? 4} ý Đúng/Sai, điểm chia đều: ${((questionCounts.part2_PointsPerQuestion ?? 1.0) / (questionCounts.part2_TFStatementsPerQuestion ?? 4)).toFixed(2)}đ/ý, Tổng = ${Math.round((questionCounts.part2_MCQTrueFalse || 0) * (questionCounts.part2_PointsPerQuestion ?? 1.0) * 100) / 100}đ)
- Phần III (Trắc nghiệm Trả lời ngắn): ${questionCounts.part3_MCQShort} câu (Mỗi câu ${questionCounts.part3_PointsPerQuestion ?? 0.25} điểm, Tổng = ${Math.round((questionCounts.part3_MCQShort || 0) * (questionCounts.part3_PointsPerQuestion ?? 0.25) * 100) / 100}đ)
- Phần IV (Tự luận): ${questionCounts.part4_Essay} câu tự luận.
  * BẮT BUỘC ĐẢM BẢO TỔNG ĐIỂM TOÀN ĐỀ THI LÀ ĐÚNG 10.0 ĐIỂM.
  * Tổng quỹ điểm dành cho Phần IV (Tự luận) là: ${Math.max(0, Math.round((10.0 - ((questionCounts.part1_MCQSingle || 0) * (questionCounts.part1_PointsPerQuestion ?? 0.25) + (questionCounts.part2_MCQTrueFalse || 0) * (questionCounts.part2_PointsPerQuestion ?? 1.0) + (questionCounts.part3_MCQShort || 0) * (questionCounts.part3_PointsPerQuestion ?? 0.25))) * 100) / 100)} điểm.
  * Phân bổ số câu và điểm số chi tiết từng câu Tự luận như sau:
    ${questionCounts.part4_Essay > 0 ? (() => {
      const p1 = (questionCounts.part1_MCQSingle || 0) * (questionCounts.part1_PointsPerQuestion ?? 0.25);
      const p2 = (questionCounts.part2_MCQTrueFalse || 0) * (questionCounts.part2_PointsPerQuestion ?? 1.0);
      const p3 = (questionCounts.part3_MCQShort || 0) * (questionCounts.part3_PointsPerQuestion ?? 0.25);
      const essayPool = Math.max(0, Math.round((10.0 - p1 - p2 - p3) * 100) / 100);
      const n = questionCounts.part4_Essay;
      const advCount = questionCounts.part4_AdvancedCount !== undefined ? questionCounts.part4_AdvancedCount : Math.floor(n / 2);
      const applyCount = n - advCount;
      const advPts = questionCounts.part4_AdvancedPoints !== undefined ? questionCounts.part4_AdvancedPoints : 1.0;
      const totalAdv = Math.min(essayPool, advCount * advPts);
      const remApply = essayPool - totalAdv;
      const applyPts = applyCount > 0 ? Math.round((remApply / applyCount) * 100) / 100 : 0;
      return `+ Gồm ${applyCount} câu Vận dụng (APPLY) với mức điểm khoảng ${applyPts}đ/câu và ${advCount} câu Vận dụng cao (ADVANCED) với mức điểm khoảng ${advPts}đ/câu.
    + TỔNG ĐIỂM TẤT CẢ CÁC CÂU TỰ LUẬN CỘNG LẠI PHẢI BẰNG CHÍNH XÁC ${essayPool} ĐIỂM (không được thiếu hay dư dù chỉ 0.25đ). Mỗi câu tự luận phải có trường "points" và các tiêu chí trong "rubric" phải có tổng điểm đúng bằng trường "points" của câu đó!`;
    })() : 'Không có phần Tự luận.'}

🎯 TỶ LỆ MỨC ĐỘ NHẬN THỨC:
- Nhận biết (REMEMBER): ${cognitiveRatio.remember}%
- Thông hiểu (UNDERSTAND): ${cognitiveRatio.understand}%
- Vận dụng (APPLY): ${cognitiveRatio.apply}%
- Vận dụng cao (ADVANCED): ${cognitiveRatio.advanced}%

${mandatoryQuestionsCountSection}
`;
    }

    return `
HÃY SINH MA TRẬN, BẢNG ĐẶC TẢ VÀ ĐỀ KIỂM TRA MÔN TOÁN CHUẨN CÔNG VĂN 7991/BGDĐT CHO THÔNG TIN SAU:

📌 THÔNG TIN CHUNG:
- Trường: ${schoolName || 'Trường THCS'}
- Môn học: Toán
- Khối lớp: ${normalizedGrade} (THCS)
- Học kỳ: ${semester} | Năm học: ${schoolYear}
- Tên kỳ thi / Bài kiểm tra: ${examTitle}
- Tên bài / Chương / Chủ đề: ${chapterTitle}
- Bộ sách giáo khoa duy nhất: ${KNTT_CURRICULUM_NAME} (NXB Giáo dục Việt Nam - Đính kèm)
- Thời gian làm bài: ${durationMinutes} phút
- Thang điểm tổng: ${totalPoints} điểm
- Chế độ đề: ${hasCustomSpec ? '100% Bám sát Bảng đặc tả chi tiết (Chuẩn Yêu cầu cần đạt YCCĐ)' : hasCustomMatrix ? '100% Theo Ma trận bộ môn' : modeDescription}
${(() => {
  const mFmt = metadata.matrixOutputFormat || 'cv7991';
  if (mFmt === 'cv7991') {
    return `
📋 ĐỊNH DẠNG MA TRẬN & BẢN ĐẶC TẢ YÊU CẦU: CHUẨN CÔNG VĂN 7991/BGDĐT (16 CỘT - ĐỊNH DẠNG CHÍNH):
- BẮT BUỘC chỉ sinh 1 khung ma trận và 1 bản đặc tả DUY NHẤT theo chuẩn 16 cột Công văn 7991/BGDĐT.
- Các ô Biết (remember), Hiểu (understand), Vận dụng (apply) trong 4 phần (part1, part2, part3, part4) phải khớp chính xác 100% với mảng "questions".`;
  } else if (mFmt === 'classic') {
    return `
📋 ĐỊNH DẠNG MA TRẬN & BẢN ĐẶC TẢ YÊU CẦU: ĐỊNH DẠNG TRUYỀN THỐNG (5 CỘT YCCĐ):
- Sinh bảng đặc tả và ma trận theo từng chủ đề, đơn vị kiến thức gắn liền với Yêu cầu cần đạt chi tiết.`;
  }
  return `
📋 ĐỊNH DẠNG MA TRẬN & BẢN ĐẶC TẢ: XUẤT CẢ 2 ĐỊNH DẠNG (Chuẩn CV 7991 và Bảng đặc tả chi tiết YCCĐ).`;
})()}

${knttCurriculumSection}
${mathConfigSection}
${referenceSection}
${matrixModeSection}

🎲 YÊU CẦU ĐA DẠNG HÓA & ĐỔI MỚI SỐ LIỆU TOÀN DIỆN (ENTROPY SEED: ${entropySeed}):
1. TUYỆT ĐỐI KHÔNG sao chép nguyên văn bài tập đã in trong SGK Toán KNTT hay các đề thi trước đó.
2. BẮT BUỘC ĐỔI MỚI TOÀN BỘ:
   - Thay đổi các tham số, hệ số và số liệu toán học (tính toán phải ra kết quả chính xác, hợp lí, số đẹp theo trình độ ${normalizedGrade}).
   - Đổi mới tình huống thực tiễn, tên nhân vật, ngữ cảnh và các phương án gây nhiễu A, B, C, D (các phương án nhiễu phải phản ánh sai lầm thường gặp của học sinh khi tính toán).
${existingQuestionsToAvoid && existingQuestionsToAvoid.length > 0 ? `
⚠️ CÁC CÂU HỎI ĐÃ CÓ TRƯỚC ĐÓ CÙNG KHỐI LỚP (BẮT BUỘC TRÁNH TRÙNG LẶP NỘI DUNG HOẶC SỐ LIỆU):
${existingQuestionsToAvoid.slice(0, 15).map((q, idx) => `  [${idx + 1}] ${q}`).join('\n')}
` : ''}

🛑 CẢNH BÁO TỐI QUAN TRỌNG VỀ NỘI DUNG CÂU HỎI & PHƯƠNG ÁN LỰA CHỌN:
1. TRƯỜNG "content" CỦA MỖI CÂU HỎI:
   - BẮT BUỘC là ĐẦY ĐỦ TOÀN BỘ VĂN BẢN ĐỀ BÀI CÂU HỎI (Ví dụ: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ cm}$...").
   - TUYỆT ĐỐI KHÔNG ĐƯỢC điền số thứ tự như "0", "1", "2" vào trường "content" hay để rỗng!
2. TRƯỜNG "options" CỦA PHẦN I (4 PHƯƠNG ÁN LỰA CHỌN):
   - BẮT BUỘC là mảng gồm đúng 4 đối tượng A, B, C, D với nội dung đáp số/công thức thật (KHÔNG để placeholder "Phương án A"...).
3. Phần I có "correctOption" ('A'|'B'|'C'|'D') và "explanation".
4. Phần II (Đúng/Sai) có đúng 4 ý a, b, c, d với "content", "isCorrect": true/false và "explanation".
5. Phần III (Trả lời ngắn) có "shortAnswer" là đáp số cụ thể (ví dụ: "15", "-2,5", "24 cm").
6. Phần IV (Tự luận) có "essayAnswerGuide" giải chi tiết từng bước và mảng "rubric" chia điểm cụ thể có tổng đúng bằng trường "points".

🛑 QUY ĐỊNH BẮT BUỘC VỀ MA TRẬN & BẢN ĐẶC TẢ (CV 7991/BGDĐT):
1. Mảng "matrix" và mảng "specification" PHẢI phân chia thành 2 đến 5 ĐƠN VỊ KIẾN THỨC cụ thể (subTopic) tương ứng trực tiếp với các bài học trong SGK Toán ${normalizedGrade} KNTT đã chọn.
2. Trong mảng "specification", trường "requirements" của TỪNG đơn vị kiến thức BẮT BUỘC viết đủ các gạch đầu dòng theo 3 mức độ:
   "- Biết: [YCCĐ mức Nhận biết từ SGK KNTT]\\n- Hiểu: [YCCĐ mức Thông hiểu từ SGK KNTT]\\n- Vận dụng: [YCCĐ mức Vận dụng / VDC từ SGK KNTT]"
3. Điểm "totalPoints" và "percentage" của từng dòng phải khớp chính xác với điểm các câu hỏi, tổng bằng ${totalPoints || 10.0}đ và 100%.

YÊU CẦU ĐẦU RA JSON CHÍNH XÁC THEO SCHEMA SAU:
{
  "matrix": [
    {
      "stt": 1,
      "topic": "${chapterTitle || 'Chương I'}",
      "subTopic": "Đơn vị kiến thức 1 (theo bài học SGK KNTT)",
      "part1": { "remember": "1, 2", "understand": "3", "apply": "" },
      "part2": { "remember": "1a, 1b", "understand": "1c", "apply": "1d" },
      "part3": { "remember": "1", "understand": "2", "apply": "" },
      "part4": { "remember": "", "understand": "", "apply": "1" },
      "totalRemember": 4,
      "totalUnderstand": 3,
      "totalApply": 2,
      "totalQuestions": 5,
      "totalPoints": 5.0,
      "percentage": 50.0
    },
    {
      "stt": 2,
      "topic": "${chapterTitle || 'Chương I'}",
      "subTopic": "Đơn vị kiến thức 2 (theo bài học SGK KNTT)",
      "part1": { "remember": "4, 5", "understand": "6", "apply": "7" },
      "part2": { "remember": "2a", "understand": "2b, 2c", "apply": "2d" },
      "part3": { "remember": "", "understand": "3", "apply": "4" },
      "part4": { "remember": "", "understand": "", "apply": "2" },
      "totalRemember": 3,
      "totalUnderstand": 4,
      "totalApply": 3,
      "totalQuestions": 5,
      "totalPoints": 5.0,
      "percentage": 50.0
    }
  ],
  "specification": [
    {
      "stt": 1,
      "topic": "${chapterTitle || 'Chương I'}",
      "subTopic": "Đơn vị kiến thức 1 (theo bài học SGK KNTT)",
      "requirements": "- Biết: Nhận biết và phát biểu được khái niệm, tính chất cơ bản.\\n- Hiểu: Thực hiện được phép tính, biến đổi và giải thích được cách làm.\\n- Vận dụng: Vận dụng giải quyết các bài toán thực tiễn.",
      "part1": { "remember": "1, 2", "understand": "3", "apply": "" },
      "part2": { "remember": "1a, 1b", "understand": "1c", "apply": "1d" },
      "part3": { "remember": "1", "understand": "2", "apply": "" },
      "part4": { "remember": "", "understand": "", "apply": "1" },
      "totalPoints": 5.0
    },
    {
      "stt": 2,
      "topic": "${chapterTitle || 'Chương I'}",
      "subTopic": "Đơn vị kiến thức 2 (theo bài học SGK KNTT)",
      "requirements": "- Biết: Nhớ và chỉ ra được các công thức, quy tắc.\\n- Hiểu: Giải thích được các bước biến đổi và quan hệ giữa các đại lượng.\\n- Vận dụng: Vận dụng giải bài toán tổng hợp, bài toán thực tế.",
      "part1": { "remember": "4, 5", "understand": "6", "apply": "7" },
      "part2": { "remember": "2a", "understand": "2b, 2c", "apply": "2d" },
      "part3": { "remember": "", "understand": "3", "apply": "4" },
      "part4": { "remember": "", "understand": "", "apply": "2" },
      "totalPoints": 5.0
    }
  ],
  "questions": [
    // ⚠️ CHÚ Ý: DƯỚI ĐÂY CHỈ LÀ MẪU MINH HỌA CẤU TRÚC JSON CHO TỪNG PHẦN.
    // BẠN BẮT BUỘC PHẢI SINH ĐỦ ${p1Count} CÂU PHẦN I, ${p2Count} CÂU LỚN PHẦN II, ${p3Count} CÂU PHẦN III, ${p4Count} CÂU PHẦN IV!
    {
      "id": "q-1",
      "partType": "PART1",
      "partTitle": "PHẦN I. Câu hỏi trắc nghiệm nhiều phương án lựa chọn",
      "number": 1,
      "content": "Cho tập hợp $A = \\{x \\in \\mathbb{N} \\mid 8 < x \\le 14\\}$. Số phần tử của tập hợp $A$ là:",
      "cognitiveLevel": "REMEMBER",
      "points": 0.25,
      "topic": "Tập hợp",
      "competency": "Năng lực giao tiếp toán học",
      "competencyCode": "NL GTTH",
      "options": [
        { "key": "A", "content": "$6$" },
        { "key": "B", "content": "$7$" },
        { "key": "C", "content": "$5$" },
        { "key": "D", "content": "$8$" }
      ],
      "correctOption": "A",
      "explanation": "Tập hợp $A = \\{9; 10; 11; 12; 13; 14\\}$ gồm $14 - 9 + 1 = 6$ phần tử. Chọn A."
    },
    {
      "id": "q-13",
      "partType": "PART2",
      "partTitle": "PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai",
      "number": 1,
      "content": "Cho số tự nhiên $n$. Xét tính đúng sai của các mệnh đề sau:",
      "cognitiveLevel": "UNDERSTAND",
      "points": 1.0,
      "topic": "Quan hệ chia hết và tính chất",
      "competency": "Năng lực tư duy và lập luận toán học",
      "competencyCode": "NL TDLL",
      "trueFalseStatements": [
        { "key": "a", "content": "Nếu tổng hai số chia hết cho $5$ thì mỗi số đều chia hết cho $5$", "isCorrect": false },
        { "key": "b", "content": "Số $135$ có chữ số tận cùng là $5$ nên chia hết cho $5$", "isCorrect": true },
        { "key": "c", "content": "Số có tổng các chữ số chia hết cho $9$ thì chia hết cho $9$", "isCorrect": true },
        { "key": "d", "content": "Mọi số chia hết cho $2$ đều là hợp số", "isCorrect": false }
      ],
      "explanation": "Ý a sai (ví dụ $2 + 3 = 5$). Ý b đúng theo dấu hiệu chia hết cho $5$. Ý c đúng theo dấu hiệu chia hết cho $9$. Ý d sai vì $2$ chia hết cho $2$ nhưng là số nguyên tố."
    },
    {
      "id": "q-15",
      "partType": "PART3",
      "partTitle": "PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn",
      "number": 1,
      "content": "Tìm số tự nhiên $x$ biết $2 \\cdot (x + 10) = 40$.",
      "cognitiveLevel": "APPLY",
      "points": 0.5,
      "topic": "Thứ tự thực hiện các phép tính",
      "competency": "Năng lực giải quyết vấn đề toán học",
      "competencyCode": "NL GQVĐ",
      "shortAnswer": "10",
      "explanation": "$x + 10 = 40 : 2 = 20 \\Rightarrow x = 20 - 10 = 10$."
    },
    {
      "id": "q-16",
      "partType": "PART4",
      "partTitle": "PHẦN IV. Tự luận",
      "number": 1,
      "content": "Một mảnh vườn hình chữ nhật có chiều dài $25\\text{ m}$, chiều rộng $18\\text{ m}$. Người ta làm một bồn hoa hình thoi ở chính giữa có độ dài hai đường chéo lần lượt là $12\\text{ m}$ và $8\\text{ m}$. Tính diện tích phần đất còn lại của mảnh vườn.",
      "cognitiveLevel": "APPLY",
      "points": 1.5,
      "topic": "Chu vi và diện tích của một số tứ giác đã học",
      "competency": "Năng lực mô hình hoá toán học",
      "competencyCode": "NL MHH",
      "essayAnswerGuide": "Diện tích mảnh vườn hình chữ nhật: $25 \\cdot 18 = 450\\text{ (m}^2)$.\nDiện tích bồn hoa hình thoi: $\\frac{1}{2} \\cdot 12 \\cdot 8 = 48\\text{ (m}^2)$.\nDiện tích phần đất còn lại: $450 - 48 = 402\\text{ (m}^2)$.",
      "rubric": [
        { "criteria": "Tính diện tích mảnh vườn hình chữ nhật", "points": 0.5, "description": "Tính đúng $25 \\cdot 18 = 450\\text{ m}^2$" },
        { "criteria": "Tính diện tích bồn hoa hình thoi", "points": 0.5, "description": "Tính đúng $\\frac{1}{2} \\cdot 12 \\cdot 8 = 48\\text{ m}^2$" },
        { "criteria": "Tính diện tích phần đất còn lại", "points": 0.5, "description": "Tính đúng $450 - 48 = 402\\text{ m}^2$" }
      ],
      "explanation": "Học sinh ghi rõ đơn vị $\\text{m}^2$ và kết luận đầy đủ."
    }
  ]
}

🛑 QUY TẮC BẮT BUỘC VỀ SỐ LƯỢNG VÀ ĐÁP ÁN TRONG MẢNG "questions":
1. Mảng "questions" PHẢI CHỨA ĐỦ 100% TẤT CẢ ${totalRequiredQuestions} CÂU HỎI (${p1Count} câu Phần I + ${p2Count} câu lớn Phần II + ${p3Count} câu Phần III + ${p4Count} câu Phần IV). TUYỆT ĐỐI KHÔNG CHỈ SINH 1 CÂU MỖI PHẦN!
2. TẤT CẢ các câu hỏi trong mảng "questions" đều BẮT BUỘC có đáp án, biểu điểm và lời giải chi tiết.
3. Đánh số lại thứ tự câu (number) bắt đầu từ 1 cho từng phần.

📐 QUY TẮC TRÌNH BÀY CÔNG THỨC TOÁN SGK KNTT & LATEX:
1. BẮT BUỘC bọc TẤT CẢ công thức toán học, tập hợp, biến số, phép tính trong cặp dấu $...$.
2. Dùng '\\cdot' cho dấu nhân ($4^2 \\cdot 5$), dùng dấu phẩy ',' cho số thập phân ($2,5$), dùng dấu chấm phẩy ';' phân tách phần tử tập hợp ($\\{9; 10; 11\\}$), dùng '\\vdots' cho chia hết ($x \\vdots 12$), dùng '\\mid' cho tập hợp, dùng '\\le', '\\ge', '\\ne', '\\tan'.
3. LỜI GIẢI CHI TIẾT ('explanation', 'essayAnswerGuide'): 100% bằng TIẾNG VIỆT sư phạm, KHÔNG xuất tiếng Anh hoặc lập luận nội bộ.
`;
  }

  /**
   * Tạo prompt yêu cầu AI tạo lại riêng 1 câu hỏi Toán SGK KNTT cụ thể theo yêu cầu của giáo viên
   */
  static buildRegenerateQuestionPrompt(
    originalQuestion: Question,
    metadata: ExamMetadata,
    teacherPrompt?: string,
    existingQuestions: Question[] = []
  ): string {
    const normalizedGrade = normalizeKnttGrade(metadata.grade);
    const knttCurriculumSection = buildKnttCurriculumPromptContext(
      normalizedGrade,
      metadata.semester,
      metadata.chapterTitle,
      metadata.subjectConfig?.selectedKnttLessonIds
    );

    const avoidQuestions = existingQuestions
      .filter((q) => q.id !== originalQuestion.id)
      .slice(0, 8)
      .map((q) => (q.content ? q.content.slice(0, 120) : ''))
      .filter(Boolean);

    let partDesc = '';
    if (originalQuestion.partType === 'PART1') {
      partDesc = `Phần I: Trắc nghiệm 4 lựa chọn (A, B, C, D). Bắt buộc cung cấp trường "options" gồm đúng 4 phần tử với key: 'A', 'B', 'C', 'D' và trường "correctOption" ('A'|'B'|'C'|'D').`;
    } else if (originalQuestion.partType === 'PART2') {
      partDesc = `Phần II: Trắc nghiệm Đúng/Sai. Bắt buộc cung cấp 1 lệnh hỏi chính trong "content" và trường "trueFalseStatements" gồm đúng 4 ý 'a', 'b', 'c', 'd' kèm "isCorrect" (true/false) cho từng ý.`;
    } else if (originalQuestion.partType === 'PART3') {
      partDesc = `Phần III: Trắc nghiệm Trả lời ngắn. Bắt buộc cung cấp trường "shortAnswer" chứa kết quả ngắn gọn.`;
    } else {
      partDesc = `Phần IV: Tự luận. Bắt buộc cung cấp trường "essayAnswerGuide" (lời giải chi tiết) và mảng "rubric" (thang điểm chi tiết từng bước, tổng điểm bằng ${originalQuestion.points || 1.0}).`;
    }

    const entropySeed = Math.random().toString(36).substring(2, 8).toUpperCase() + '_' + Date.now();
    const halfPts = Math.round((originalQuestion.points || 1.0) * 0.5 * 10) / 10;

    let partSpecificFields = '';
    if (originalQuestion.partType === 'PART1') {
      partSpecificFields = `"options": [
    { "key": "A", "content": "..." },
    { "key": "B", "content": "..." },
    { "key": "C", "content": "..." },
    { "key": "D", "content": "..." }
  ],
  "correctOption": "A",`;
    } else if (originalQuestion.partType === 'PART2') {
      partSpecificFields = `"trueFalseStatements": [
    { "key": "a", "content": "...", "isCorrect": true },
    { "key": "b", "content": "...", "isCorrect": false },
    { "key": "c", "content": "...", "isCorrect": true },
    { "key": "d", "content": "...", "isCorrect": false }
  ],`;
    } else if (originalQuestion.partType === 'PART3') {
      partSpecificFields = `"shortAnswer": "...",`;
    } else if (originalQuestion.partType === 'PART4') {
      partSpecificFields = `"essayAnswerGuide": "...",
  "rubric": [
    { "criteria": "...", "points": ${halfPts}, "description": "..." },
    { "criteria": "...", "points": ${halfPts}, "description": "..." }
  ],`;
    }

    const specContextPart = metadata.customSpecContext
      ? `- Bảng đặc tả / YCCĐ của tổ bộ môn:\n${metadata.customSpecContext.slice(0, 800)}\n`
      : '';

    const avoidSection = avoidQuestions.length > 0
      ? `4. CÁC CÂU HỎI KHÁC TRONG ĐỀ (TRÁNH TRÙNG LẶP Ý TƯỞNG):\n- ${avoidQuestions.join('\n- ')}\n`
      : '';

    const teacherSection = teacherPrompt && teacherPrompt.trim()
      ? `5. YÊU CẦU ĐẶC BIỆT / GỢI Ý CỦA GIÁO VIÊN:\n👉 "${teacherPrompt.trim()}"\n(Hãy ưu tiên đáp ứng chính xác nguyện vọng/yêu cầu này của giáo viên!)`
      : '5. Hãy tạo câu hỏi Toán mới chất lượng cao, thực tế, bám sát SGK Kết nối tri thức và sáng tạo hơn câu cũ.';

    return `YÊU CẦU: BẠN LÀ CHUYÊN GIA MÔN TOÁN THCS THEO SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (GDPT 2018). HÃY TẠO LẠI RIÊNG 1 CÂU HỎI THAY THẾ CHO CÂU HỎI HIỆN TẠI (Entropy: ${entropySeed}).

1. THÔNG TIN BỘ MÔN & SÁCH GIÁO KHOA NGUỒN:
- Môn học: Toán (${normalizedGrade})
- Bộ sách duy nhất: ${KNTT_CURRICULUM_NAME} (NXB Giáo dục Việt Nam)
- Chủ đề / Mạch kiến thức: ${metadata.chapterTitle}
${specContextPart}
${knttCurriculumSection}

2. YÊU CẦU ĐẶC TẢ KỸ THUẬT CỦA CÂU HỎI CẦN TẠO:
- Hình thức câu hỏi: ${partDesc}
- Mức độ nhận thức (BẮT BUỘC): ${originalQuestion.cognitiveLevel} (${originalQuestion.cognitiveLevel === 'REMEMBER' ? 'Nhận biết' : originalQuestion.cognitiveLevel === 'UNDERSTAND' ? 'Thông hiểu' : originalQuestion.cognitiveLevel === 'APPLY' ? 'Vận dụng' : 'Vận dụng cao'})
- Điểm số: ${originalQuestion.points || 0.25} điểm
- Đơn vị kiến thức / Mạch bài: ${originalQuestion.topic || metadata.chapterTitle}

3. NỘI DUNG CÂU HỎI CŨ CẦN THAY THẾ (TUYỆT ĐỐI KHÔNG LẶP LẠI NỘI DUNG NÀY):
"${originalQuestion.content}"

${avoidSection}
${teacherSection}

6. QUY TẮC CÔNG THỨC TOÁN KNTT & LATEX:
- Bọc toàn bộ ký hiệu và công thức toán trong $...$. Không bọc chữ tiếng Việt trong $.
- Dùng dấu phẩy cho số thập phân, '\\cdot' cho dấu nhân, ';' phân cách phần tử tập hợp.
- Nếu là câu hình học hoặc đồ thị, cung cấp thẻ <svg viewBox='0 0 400 300' ...> rõ đẹp trong "svgDiagram" (dùng dấu nháy đơn cho thuộc tính).
- Trả về đúng 1 JSON Object duy nhất đại diện cho câu hỏi (không bọc trong mảng, không có text dẫn ngoài JSON).

Định dạng JSON Object trả về:
{
  "content": "Nội dung câu hỏi Toán mới hoàn chỉnh...",
  "partType": "${originalQuestion.partType}",
  "cognitiveLevel": "${originalQuestion.cognitiveLevel}",
  "points": ${originalQuestion.points || 0.25},
  "topic": "${originalQuestion.topic || metadata.chapterTitle}",
  "competency": "Năng lực đặc thù Toán học tương ứng...",
  "competencyCode": "NL TDLL | NL MHH | NL GQVĐ | NL GTTH | NL CCTH",
  ${partSpecificFields}
  "explanation": "Lời giải hoặc giải thích chi tiết bằng tiếng Việt...",
  "svgDiagram": ""
}`;
  }
}
