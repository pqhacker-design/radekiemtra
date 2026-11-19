/**
 * Dữ liệu Chương trình & Yêu cầu cần đạt (YCCĐ) Môn Toán THCS (Lớp 6, 7, 8, 9)
 * Trích xuất 100% từ 8 cuốn Sách giáo khoa Toán Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam)
 * được đính kèm trong ứng dụng. Không sử dụng bất kỳ bộ sách giáo khoa nào khác.
 */

import { KNTT_DEFAULT_DRIVE_LINKS } from '../config/knttDriveLinks';

export type KnttMathGrade = 'Khối 6' | 'Khối 7' | 'Khối 8' | 'Khối 9';

export type KnttMathDomain =
  | 'Số và Đại số'
  | 'Hình học và Đo lường'
  | 'Thống kê và Xác suất';

export interface KnttLesson {
  id: string;
  lessonNumber: string; // e.g., "Bài 1", "Bài 2"
  title: string;
  domain: KnttMathDomain;
  keyKnowledge: string;
  yccd: string;
  hasGeometryOrGraph?: boolean;
  geogebraHint?: string;
}

export interface KnttChapter {
  id: string;
  chapterNumber: string; // e.g., "Chương I"
  title: string;
  semester: 'Học kỳ I' | 'Học kỳ II';
  volumeLabel: 'Tập Một' | 'Tập Hai';
  lessons: KnttLesson[];
}

export interface KnttTextbookVolume {
  id: string;
  grade: KnttMathGrade;
  volume: 'Tập Một' | 'Tập Hai';
  semester: 'Học kỳ I' | 'Học kỳ II';
  title: string;
  fileName: string;
  pdfUrl: string;
  pageCount: number;
  publisher: string;
  series: 'Kết nối tri thức với cuộc sống';
  chapters: KnttChapter[];
}

export const KNTT_GRADES: KnttMathGrade[] = ['Khối 6', 'Khối 7', 'Khối 8', 'Khối 9'];

export const KNTT_CURRICULUM_NAME = 'Kết nối tri thức với cuộc sống' as const;

export const KNTT_GRADE_SCOPE_RULES: Record<KnttMathGrade, string> = {
  'Khối 6':
    'PHẠM VI TOÁN 6 (KNTT): Chỉ sử dụng kiến thức Tập hợp số tự nhiên, Tính chia hết (ƯCLN, BCNN, số nguyên tố), Số nguyên, Phân số, Số thập phân (cả âm), Hình phẳng trực quan (tam giác đều, vuông, lục giác đều, HCN, hình thoi, HBH, hình thang cân, đối xứng trục/tâm), Điểm, đường thẳng, tia, đoạn thẳng, trung điểm, góc và số đo góc, Bảng thống kê/biểu đồ tranh/cột/cột kép và xác suất thực nghiệm. TUYỆT ĐỐI KHÔNG đưa vào số hữu tỉ $\\mathbb{Q}$ tổng quát, số vô tỉ, căn bậc hai, đa thức đại số, tỉ lệ thức, phương trình bậc nhất hay định lí Thalès/Pythagore.',
  'Khối 7':
    'PHẠM VI TOÁN 7 (KNTT): Chỉ sử dụng kiến thức Số hữu tỉ $\\mathbb{Q}$, Số thực $\\mathbb{R}$ và căn bậc hai số học đơn giản, Góc ở vị trí đặc biệt & hai đường thẳng song song (Tiên đề Euclid, chứng minh định lí), Các trường hợp bằng nhau của tam giác & tam giác cân & đường trung trực, Thu thập dữ liệu & biểu đồ quạt tròn/đoạn thẳng, Tỉ lệ thức & đại lượng tỉ lệ thuận/nghịch, Biểu thức đại số & ĐA THỨC MỘT BIẾN, Làm quen biến cố & xác suất, Quan hệ giữa các yếu tố trong tam giác & 4 đường đồng quy, Hình hộp chữ nhật, lập phương, lăng trụ đứng. TUYỆT ĐỐI KHÔNG đưa vào đơn thức/đa thức nhiều biến, 7 hằng đẳng thức đáng nhớ, phân thức đại số, hàm số bậc nhất $y=ax+b$, định lí Thalès hay định lí Pythagore (thuộc Toán 8 KNTT).',
  'Khối 8':
    'PHẠM VI TOÁN 8 (KNTT): Chỉ sử dụng kiến thức Đa thức nhiều biến, 7 Hằng đẳng thức đáng nhớ & phân tích đa thức thành nhân tử, Tứ giác (hình thang cân, HBH, HCN, hình thoi, hình vuông), Định lí Thalès & đường trung bình & tính chất đường phân giác, Dữ liệu và biểu đồ, Phân thức đại số, Phương trình bậc nhất một ẩn & hàm số bậc nhất $y=ax+b$ (hệ số góc), Tính xác suất của biến cố bằng tỉ số, Tam giác đồng dạng & ĐỊNH LÍ PYTHAGORE (Bài 35 Toán 8 KNTT), Hình chóp tam giác đều & hình chóp tứ giác đều. TUYỆT ĐỐI KHÔNG đưa vào hệ hai phương trình bậc nhất hai ẩn, căn thức bậc hai/bậc ba rút gọn, bất phương trình bậc nhất một ẩn, tỉ số lượng giác $\\sin/\\cos/\\tan/\\cot$, đường tròn/góc nội tiếp, hàm số $y=ax^2$, phương trình bậc hai hay hình trụ/nón/cầu (thuộc Toán 9 KNTT).',
  'Khối 9':
    'PHẠM VI TOÁN 9 (KNTT): Chỉ sử dụng kiến thức Hệ hai phương trình bậc nhất hai ẩn, Phương trình quy về bậc nhất (tích, chứa ẩn ở mẫu) & Bất đẳng thức / Bất phương trình bậc nhất một ẩn, Căn bậc hai & Căn bậc ba, Tỉ số lượng giác góc nhọn ($\\sin, \\cos, \\tan, \\cot$) & Hệ thức giữa cạnh và góc trong tam giác vuông, Đường tròn (cung, dây, độ dài cung, diện tích quạt tròn/vành khuyên, tiếp tuyến, vị trí tương đối), Hàm số $y=ax^2 (a\\ne 0)$, Phương trình bậc hai một ẩn & Định lí Viète, Bảng/biểu đồ tần số & tần số tương đối (kể cả ghép nhóm), Không gian mẫu & xác suất cổ điển, Góc nội tiếp, Đường tròn ngoại tiếp/nội tiếp tam giác, Tứ giác nội tiếp & Đa giác đều, Hình trụ, Hình nón, Hình cầu. TUYỆT ĐỐI KHÔNG đưa kiến thức THPT (hàm bậc ba, đạo hàm, tích phân, logarit, tọa độ không gian $Oxyz$, vectơ THPT).',
};

export const KNTT_TEXTBOOKS: KnttTextbookVolume[] = [
  // ==================== TOÁN 6 - TẬP MỘT ====================
  {
    id: 'toan-6-tap-1',
    grade: 'Khối 6',
    volume: 'Tập Một',
    semester: 'Học kỳ I',
    title: 'SGK Toán 6 - Tập Một (Kết nối tri thức với cuộc sống)',
    fileName: '06-sgk-toan-6-tap-mot.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-6-tap-1'],
    pageCount: 126,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan6-c1',
        chapterNumber: 'Chương I',
        title: 'Chương I. Tập hợp các số tự nhiên',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan6-b1',
            lessonNumber: 'Bài 1',
            title: 'Tập hợp',
            domain: 'Số và Đại số',
            keyKnowledge: 'Khái niệm tập hợp, phần tử thuộc ($\\in$) hay không thuộc ($\\notin$) tập hợp; hai cách cho tập hợp (liệt kê phần tử dùng dấu chấm phẩy `;` và chỉ ra tính chất đặc trưng); kí hiệu $\\mathbb{N}, \\mathbb{N}^*$.',
            yccd: 'Nhận biết được tập hợp và phần tử của tập hợp; sử dụng đúng kí hiệu $\\in, \\notin$; mô tả tập hợp bằng cách liệt kê hoặc nêu dấu hiệu đặc trưng.',
          },
          {
            id: 'toan6-b2',
            lessonNumber: 'Bài 2',
            title: 'Cách ghi số tự nhiên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Hệ thập phân, cấu tạo thập phân của số tự nhiên ($\\overline{abc} = a\\cdot 100 + b\\cdot 10 + c$); đọc và viết số La Mã từ I đến XXX (1 đến 30).',
            yccd: 'Đọc, viết được số tự nhiên trong hệ thập phân và số La Mã từ 1 đến 30; biểu diễn được giá trị theo hàng của các chữ số.',
          },
          {
            id: 'toan6-b3',
            lessonNumber: 'Bài 3',
            title: 'Thứ tự trong tập hợp các số tự nhiên',
            domain: 'Số và Đại số',
            keyKnowledge: 'So sánh hai số tự nhiên trên tia số; kí hiệu $<, >, \\le, \\ge$; số liền trước, số liền sau; viết tập hợp dùng điều kiện $a < x \\le b$.',
            yccd: 'So sánh và sắp xếp được các số tự nhiên; sử dụng đúng kí hiệu $\\le, \\ge$ và biểu diễn số tự nhiên trên tia số.',
          },
          {
            id: 'toan6-b4',
            lessonNumber: 'Bài 4',
            title: 'Phép cộng và phép trừ số tự nhiên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tính chất giao hoán, kết hợp, cộng với số 0; phép trừ số tự nhiên ($a \\ge b$); tính nhẩm, tính hợp lí và tìm $x$.',
            yccd: 'Thực hiện được phép cộng, phép trừ số tự nhiên; vận dụng tính chất để tính nhanh, tính hợp lí và giải quyết bài toán thực tiễn.',
          },
          {
            id: 'toan6-b5',
            lessonNumber: 'Bài 5',
            title: 'Phép nhân và phép chia số tự nhiên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Dấu nhân dùng `\\cdot` (ví dụ $a \\cdot b$); tính chất giao hoán, kết hợp, phân phối của phép nhân đối với phép cộng; phép chia hết và phép chia có dư $a = b \\cdot q + r$ ($0 \\le r < b$).',
            yccd: 'Thực hiện được phép nhân, phép chia hết và phép chia có dư; vận dụng tính chất phân phối để tính nhanh và giải bài toán thực tế.',
          },
          {
            id: 'toan6-b6',
            lessonNumber: 'Bài 6',
            title: 'Luỹ thừa với số mũ tự nhiên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Định nghĩa $a^n$ ($a$ là cơ số, $n$ là số mũ), bình phương, lập phương; nhân và chia hai luỹ thừa cùng cơ số ($a^m \\cdot a^n = a^{m+n}$, $a^m : a^n = a^{m-n}$ với $a\\neq 0, m \\ge n$, quy ước $a^0=1$).',
            yccd: 'Tính được giá trị luỹ thừa; thực hiện được nhân, chia hai luỹ thừa cùng cơ số với số mũ tự nhiên.',
          },
          {
            id: 'toan6-b7',
            lessonNumber: 'Bài 7',
            title: 'Thứ tự thực hiện các phép tính',
            domain: 'Số và Đại số',
            keyKnowledge: 'Biểu thức không có dấu ngoặc (Luỹ thừa $\\to$ Nhân và chia $\\to$ Cộng và trừ) và biểu thức có dấu ngoặc `() -> [] -> {}`.',
            yccd: 'Vận dụng đúng thứ tự thực hiện các phép tính để tính giá trị biểu thức số và tìm số chưa biết $x$.',
          },
        ],
      },
      {
        id: 'toan6-c2',
        chapterNumber: 'Chương II',
        title: 'Chương II. Tính chia hết trong tập hợp các số tự nhiên',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan6-b8',
            lessonNumber: 'Bài 8',
            title: 'Quan hệ chia hết và tính chất',
            domain: 'Số và Đại số',
            keyKnowledge: 'Kí hiệu chia hết $\\vdots$ và không chia hết $\\not\\vdots$; khái niệm ước và bội; tính chất chia hết của một tổng (hiệu): $a \\vdots m, b \\vdots m \\Rightarrow (a \\pm b) \\vdots m$.',
            yccd: 'Nhận biết quan hệ chia hết, tìm được ước và bội của một số; vận dụng tính chất chia hết của một tổng để xét tính chia hết.',
          },
          {
            id: 'toan6-b9',
            lessonNumber: 'Bài 9',
            title: 'Dấu hiệu chia hết',
            domain: 'Số và Đại số',
            keyKnowledge: 'Dấu hiệu chia hết cho $2$, cho $5$, cho $9$, cho $3$; kết hợp tìm chữ số chưa biết để số chia hết.',
            yccd: 'Vận dụng được dấu hiệu chia hết cho 2, 5, 9, 3 để nhận biết nhanh một số hoặc một tổng/hiệu có chia hết hay không.',
          },
          {
            id: 'toan6-b10',
            lessonNumber: 'Bài 10',
            title: 'Số nguyên tố',
            domain: 'Số và Đại số',
            keyKnowledge: 'Số nguyên tố, hợp số (0 và 1 không phải SNT cũng không là hợp số); Sàng Eratosthenes; phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố.',
            yccd: 'Nhận biết được số nguyên tố, hợp số; phân tích được một số ra thừa số nguyên tố theo cột dọc hoặc sơ đồ cây.',
          },
          {
            id: 'toan6-b11',
            lessonNumber: 'Bài 11',
            title: 'Ước chung. Ước chung lớn nhất',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tập hợp ƯC($a, b$), tìm ƯCLN($a, b$) bằng phân tích ra thừa số nguyên tố; hai số nguyên tố cùng nhau; rút gọn phân số về tối giản; bài toán chia đều phần thưởng/nhóm.',
            yccd: 'Tìm được ƯC và ƯCLN của hai hay ba số; nhận biết hai số nguyên tố cùng nhau; vận dụng giải quyết bài toán thực tiễn.',
          },
          {
            id: 'toan6-b12',
            lessonNumber: 'Bài 12',
            title: 'Bội chung. Bội chung nhỏ nhất',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tập hợp BC($a, b$), tìm BCNN($a, b$) bằng phân tích ra thừa số nguyên tố; quy đồng mẫu nhiều phân số; bài toán chu kì gặp lại, xếp hàng.',
            yccd: 'Tìm được BC và BCNN của hai hay ba số; vận dụng BCNN quy đồng mẫu phân số và giải quyết vấn đề thực tiễn.',
          },
        ],
      },
      {
        id: 'toan6-c3',
        chapterNumber: 'Chương III',
        title: 'Chương III. Số nguyên',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan6-b13',
            lessonNumber: 'Bài 13',
            title: 'Tập hợp các số nguyên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Số nguyên âm, tập hợp $\\mathbb{Z}$; biểu diễn số nguyên trên trục số; số đối; so sánh hai số nguyên.',
            yccd: 'Nhận biết được số nguyên âm, tập hợp $\\mathbb{Z}$, số đối; biểu diễn và so sánh được các số nguyên trên trục số và trong thực tế (nhiệt độ, độ cao).',
          },
          {
            id: 'toan6-b14',
            lessonNumber: 'Bài 14',
            title: 'Phép cộng và phép trừ số nguyên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc cộng hai số nguyên cùng dấu, khác dấu; tính chất giao hoán, kết hợp; phép trừ số nguyên $a - b = a + (-b)$.',
            yccd: 'Thực hiện được phép cộng, phép trừ số nguyên; vận dụng tính chất phép cộng để tính hợp lí và giải bài toán có lời văn.',
          },
          {
            id: 'toan6-b15',
            lessonNumber: 'Bài 15',
            title: 'Quy tắc dấu ngoặc',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc bỏ dấu ngoặc và đặt dấu ngoặc có dấu `+` hoặc `-` đằng trước; tính tổng đại số.',
            yccd: 'Vận dụng thành thạo quy tắc dấu ngoặc để rút gọn biểu thức, nhóm hạng tử tính nhanh.',
          },
          {
            id: 'toan6-b16',
            lessonNumber: 'Bài 16',
            title: 'Phép nhân số nguyên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Nhân hai số nguyên khác dấu, cùng dấu; tính chất giao hoán, kết hợp, phân phối của phép nhân với phép cộng/trừ.',
            yccd: 'Thực hiện được phép nhân các số nguyên; vận dụng quy tắc dấu và tính chất phép nhân để tính nhanh và xét dấu tích.',
          },
          {
            id: 'toan6-b17',
            lessonNumber: 'Bài 17',
            title: 'Phép chia hết. Ước và bội của một số nguyên',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phép chia hết trong $\\mathbb{Z}$; quy tắc dấu khi chia; tìm ước và bội của một số nguyên (gồm cả ước âm và ước dương).',
            yccd: 'Thực hiện được phép chia hết số nguyên; tìm được các ước (cả âm và dương) và bội của một số nguyên cho trước.',
          },
        ],
      },
      {
        id: 'toan6-c4',
        chapterNumber: 'Chương IV',
        title: 'Chương IV. Một số hình phẳng trong thực tiễn',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan6-b18',
            lessonNumber: 'Bài 18',
            title: 'Hình tam giác đều. Hình vuông. Hình lục giác đều',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Nhận dạng và nêu đặc điểm về cạnh, góc, đường chéo của tam giác đều, hình vuông, hình lục giác đều (vẽ bằng thước, compa và GeoGebra).',
            yccd: 'Mô tả được một số yếu tố cơ bản (cạnh, góc, đường chéo) của tam giác đều, hình vuông, hình lục giác đều; vẽ được các hình này.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác đều, hình vuông, lục giác đều bằng đa giác đều trong GeoGebra.',
          },
          {
            id: 'toan6-b19',
            lessonNumber: 'Bài 19',
            title: 'Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đặc điểm cạnh, góc, đường chéo của hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',
            yccd: 'Nhận dạng và mô tả được các yếu tố cơ bản của hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình bình hành, hình thoi, hình chữ nhật, hình thang cân rõ độ dài cạnh và góc.',
          },
          {
            id: 'toan6-b20',
            lessonNumber: 'Bài 20',
            title: 'Chu vi và diện tích của một số tứ giác đã học',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Công thức chu vi, diện tích hình vuông, HCN, hình thang, hình bình hành ($S = a\\cdot h$), hình thoi ($S = \\frac{1}{2}d_1\\cdot d_2$); bài toán ghép hình, lát gạch, làm hàng rào thực tế.',
            yccd: 'Giải quyết được một số vấn đề thực tiễn gắn với việc tính chu vi và diện tích các hình phẳng đặc biệt.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình mảnh đất hình chữ nhật, hình thoi hoặc hình ghép kèm kích thước m/cm.',
          },
        ],
      },
      {
        id: 'toan6-c5',
        chapterNumber: 'Chương V',
        title: 'Chương V. Tính đối xứng của hình phẳng trong tự nhiên',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan6-b21',
            lessonNumber: 'Bài 21',
            title: 'Hình có trục đối xứng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Nhận biết hình có trục đối xứng và tìm số trục đối xứng của đoạn thẳng, tam giác đều, hình vuông, hình chữ nhật, hình thoi, hình thang cân, hình tròn, chữ cái.',
            yccd: 'Nhận biết được trục đối xứng của một hình phẳng và chỉ ra trục đối xứng trong tự nhiên/toán học.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình kèm đường thẳng nét đứt làm trục đối xứng.',
          },
          {
            id: 'toan6-b22',
            lessonNumber: 'Bài 22',
            title: 'Hình có tâm đối xứng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Nhận biết hình có tâm đối xứng và chỉ ra tâm đối xứng (đoạn thẳng, hình bình hành, hình thoi, hình chữ nhật, hình vuông, lục giác đều, đường tròn). Lưu ý: hình thang cân và tam giác đều KHÔNG có tâm đối xứng.',
            yccd: 'Nhận biết được hình có tâm đối xứng và xác định được tâm đối xứng của các hình phẳng cơ bản.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình bình hành hoặc lục giác đều có giao điểm hai đường chéo là tâm đối xứng O.',
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 6 - TẬP HAI ====================
  {
    id: 'toan-6-tap-2',
    grade: 'Khối 6',
    volume: 'Tập Hai',
    semester: 'Học kỳ II',
    title: 'SGK Toán 6 - Tập Hai (Kết nối tri thức với cuộc sống)',
    fileName: '06-sgk-toan-6-tap-hai.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-6-tap-2'],
    pageCount: 114,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan6-c6',
        chapterNumber: 'Chương VI',
        title: 'Chương VI. Phân số',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan6-b23',
            lessonNumber: 'Bài 23',
            title: 'Mở rộng khái niệm phân số. Phân số bằng nhau',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b\\ne 0$; hai phân số bằng nhau ($a\\cdot d = b\\cdot c$); tính chất cơ bản và rút gọn phân số về phân số tối giản.',
            yccd: 'Nhận biết được phân số có tử và mẫu là số nguyên; sử dụng quy tắc bằng nhau và tính chất cơ bản để tìm số chưa biết, rút gọn phân số.',
          },
          {
            id: 'toan6-b24',
            lessonNumber: 'Bài 24',
            title: 'So sánh phân số. Hỗn số dương',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy đồng mẫu nhiều phân số; so sánh hai phân số; viết phân số lớn hơn 1 dưới dạng hỗn số dương $q\\frac{r}{b}$ và ngược lại.',
            yccd: 'So sánh, sắp xếp được các phân số (cả âm và dương); đổi được giữa phân số và hỗn số dương.',
          },
          {
            id: 'toan6-b25',
            lessonNumber: 'Bài 25',
            title: 'Phép cộng và phép trừ phân số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Cộng, trừ hai phân số cùng mẫu và khác mẫu; tính chất phép cộng phân số; số đối của phân số.',
            yccd: 'Thực hiện được phép cộng, trừ phân số; vận dụng tính chất giao hoán, kết hợp để tính hợp lí.',
          },
          {
            id: 'toan6-b26',
            lessonNumber: 'Bài 26',
            title: 'Phép nhân và phép chia phân số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Nhân, chia hai phân số; phân số nghịch đảo; tính chất phân phối của phép nhân với phép cộng/trừ.',
            yccd: 'Thực hiện được phép nhân, phép chia phân số; tính giá trị biểu thức phân số một cách hợp lí.',
          },
          {
            id: 'toan6-b27',
            lessonNumber: 'Bài 27',
            title: 'Hai bài toán về phân số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tìm giá trị phân số của một số cho trước ($b \\cdot \\frac{m}{n}$); tìm một số biết giá trị phân số của nó ($a : \\frac{m}{n}$).',
            yccd: 'Giải quyết được các bài toán thực tiễn áp dụng hai bài toán cơ bản về phân số.',
          },
        ],
      },
      {
        id: 'toan6-c7',
        chapterNumber: 'Chương VII',
        title: 'Chương VII. Số thập phân',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan6-b28',
            lessonNumber: 'Bài 28',
            title: 'Số thập phân',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phân số thập phân, số thập phân âm và dương (dùng dấu phẩy `,` ngăn cách phần nguyên và phần thập phân, VD `-2,35`); số đối và so sánh số thập phân.',
            yccd: 'Nhận biết được số thập phân âm, số đối và so sánh, sắp xếp được các số thập phân.',
          },
          {
            id: 'toan6-b29',
            lessonNumber: 'Bài 29',
            title: 'Tính toán với số thập phân',
            domain: 'Số và Đại số',
            keyKnowledge: 'Cộng, trừ, nhân, chia số thập phân (cả âm và dương) và tính chất các phép tính.',
            yccd: 'Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia số thập phân và tính giá trị biểu thức.',
          },
          {
            id: 'toan6-b30',
            lessonNumber: 'Bài 30',
            title: 'Làm tròn và ước lượng',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc làm tròn số thập phân đến hàng phần mười, hàng phần trăm, hàng đơn vị, hàng chục...; ước lượng kết quả phép tính.',
            yccd: 'Thực hiện được làm tròn số thập phân theo yêu cầu hàng cho trước và ước lượng kết quả trong tình huống thực tế.',
          },
          {
            id: 'toan6-b31',
            lessonNumber: 'Bài 31',
            title: 'Một số bài toán về tỉ số và tỉ số phần trăm',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tỉ số của hai đại lượng cùng loại; tỉ số phần trăm $\\frac{a}{b}\\cdot 100\\%$; tìm giá trị phần trăm của một số và tìm một số biết giá trị phần trăm (giảm giá, lãi suất, dân số).',
            yccd: 'Tính được tỉ số, tỉ số phần trăm và giải quyết các bài toán thực tiễn về mua bán, tăng/giảm phần trăm.',
          },
        ],
      },
      {
        id: 'toan6-c8',
        chapterNumber: 'Chương VIII',
        title: 'Chương VIII. Những hình hình học cơ bản',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan6-b32',
            lessonNumber: 'Bài 32',
            title: 'Điểm và đường thẳng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Điểm thuộc/không thuộc đường thẳng ($A \\in d, B \\notin d$); ba điểm thẳng hàng; hai đường thẳng cắt nhau, song song, trùng nhau.',
            yccd: 'Nhận biết quan hệ điểm thuộc đường thẳng, ba điểm thẳng hàng và vị trí tương đối của hai đường thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ điểm, đường thẳng cắt nhau và song song có ghi nhãn A, B, C, d.',
          },
          {
            id: 'toan6-b33',
            lessonNumber: 'Bài 33',
            title: 'Điểm nằm giữa hai điểm. Tia',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Điểm nằm giữa hai điểm; khái niệm tia $Ox$; hai tia đối nhau, hai tia trùng nhau.',
            yccd: 'Nhận biết điểm nằm giữa, xác định được tia, cặp tia đối nhau trên hình vẽ.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đường thẳng xy lấy điểm O tạo thành hai tia đối nhau Ox, Oy và các điểm thuộc tia.',
          },
          {
            id: 'toan6-b34',
            lessonNumber: 'Bài 34',
            title: 'Đoạn thẳng. Độ dài đoạn thẳng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đoạn thẳng $AB$, độ dài đoạn thẳng; công thức cộng độ dài $AM + MB = AB$ khi $M$ nằm giữa $A$ và $B$.',
            yccd: 'Vẽ và đo được độ dài đoạn thẳng; vận dụng hệ thức điểm nằm giữa để tính độ dài đoạn thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tia Ox và các điểm A, B trên tia kèm số đo độ dài.',
          },
          {
            id: 'toan6-b35',
            lessonNumber: 'Bài 35',
            title: 'Trung điểm của đoạn thẳng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa trung điểm $M$ của đoạn thẳng $AB$: $M$ nằm giữa $A, B$ và $MA = MB = \\frac{AB}{2}$.',
            yccd: 'Nhận biết và chứng tỏ được một điểm là trung điểm của đoạn thẳng; tính được độ dài các đoạn thẳng liên quan.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đoạn thẳng AB có trung điểm M với ký hiệu hai đoạn bằng nhau.',
          },
          {
            id: 'toan6-b36',
            lessonNumber: 'Bài 36',
            title: 'Góc',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Khái niệm góc $\\widehat{xOy}$ (đỉnh $O$, hai cạnh $Ox, Oy$), góc bẹt ($180^\\circ$), điểm nằm trong góc.',
            yccd: 'Nhận biết được góc, đỉnh, cạnh của góc và các điểm nằm trong/ngoài góc.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ góc xOy và tia/điểm nằm trong góc.',
          },
          {
            id: 'toan6-b37',
            lessonNumber: 'Bài 37',
            title: 'Số đo góc',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đơn vị độ; phân loại góc nhọn ($0^\\circ < \\alpha < 90^\\circ$), góc vuông ($90^\\circ$), góc tù ($90^\\circ < \\alpha < 180^\\circ$), góc bẹt ($180^\\circ$); so sánh các góc theo số đo.',
            yccd: 'Đọc được số đo góc và phân loại được góc nhọn, góc vuông, góc tù, góc bẹt.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ các góc với ký hiệu cung góc và số đo độ.',
          },
        ],
      },
      {
        id: 'toan6-c9',
        chapterNumber: 'Chương IX',
        title: 'Chương IX. Dữ liệu và xác suất thực nghiệm',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan6-b38',
            lessonNumber: 'Bài 38',
            title: 'Dữ liệu và thu thập dữ liệu',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Dữ liệu số (số liệu) và dữ liệu không phải là số; phát hiện tính hợp lí của dữ liệu thống kê.',
            yccd: 'Phân biệt được dữ liệu số và dữ liệu không phải là số; nhận ra điểm không hợp lí trong bảng dữ liệu.',
          },
          {
            id: 'toan6-b39',
            lessonNumber: 'Bài 39',
            title: 'Bảng thống kê và biểu đồ tranh',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Lập và đọc thông tin từ bảng thống kê, biểu đồ tranh (kể cả biểu tượng biểu thị nhiều đơn vị).',
            yccd: 'Đọc, mô tả và rút ra kết luận từ bảng thống kê và biểu đồ tranh.',
          },
          {
            id: 'toan6-b40',
            lessonNumber: 'Bài 40',
            title: 'Biểu đồ cột',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Đọc, phân tích số liệu và vẽ biểu đồ cột từ bảng thống kê.',
            yccd: 'Đọc và phân tích được số liệu từ biểu đồ cột; nhận xét xu hướng tăng giảm hoặc giá trị lớn nhất/nhỏ nhất.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan6-b41',
            lessonNumber: 'Bài 41',
            title: 'Biểu đồ cột kép',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'So sánh hai nhóm đối tượng thông qua biểu đồ cột kép.',
            yccd: 'Đọc và phân tích, so sánh được hai dãy số liệu trên biểu đồ cột kép.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan6-b42',
            lessonNumber: 'Bài 42',
            title: 'Kết quả có thể và sự kiện trong trò chơi, thí nghiệm',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Liệt kê các kết quả có thể khi tung đồng xu, gieo xúc xắc, quay tấm bìa; nhận biết sự kiện xảy ra hay không.',
            yccd: 'Liệt kê được tập hợp các kết quả có thể xảy ra của một trò chơi, thí nghiệm đơn giản.',
          },
          {
            id: 'toan6-b43',
            lessonNumber: 'Bài 43',
            title: 'Xác suất thực nghiệm',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Công thức xác suất thực nghiệm $\\frac{k}{n}$ với $k$ là số lần sự kiện xảy ra trong $n$ lần thử nghiệm.',
            yccd: 'Tính được xác suất thực nghiệm của một sự kiện qua số liệu thí nghiệm lặp lại.',
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 7 - TẬP MỘT ====================
  {
    id: 'toan-7-tap-1',
    grade: 'Khối 7',
    volume: 'Tập Một',
    semester: 'Học kỳ I',
    title: 'SGK Toán 7 - Tập Một (Kết nối tri thức với cuộc sống)',
    fileName: '07-sgk-toan-7-tap-mot.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-7-tap-1'],
    pageCount: 122,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan7-c1',
        chapterNumber: 'Chương I',
        title: 'Chương I. Số hữu tỉ',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan7-b1',
            lessonNumber: 'Bài 1',
            title: 'Tập hợp các số hữu tỉ',
            domain: 'Số và Đại số',
            keyKnowledge: 'Định nghĩa số hữu tỉ $\\frac{a}{b}$ ($a,b\\in\\mathbb{Z}, b\\ne 0$), tập hợp $\\mathbb{Q}$; số đối; biểu diễn số hữu tỉ trên trục số và thứ tự trong $\\mathbb{Q}$.',
            yccd: 'Nhận biết được số hữu tỉ, số đối; biểu diễn và so sánh được các số hữu tỉ trên trục số.',
          },
          {
            id: 'toan7-b2',
            lessonNumber: 'Bài 2',
            title: 'Cộng, trừ, nhân, chia số hữu tỉ',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc cộng, trừ, nhân, chia số hữu tỉ; tính chất giao hoán, kết hợp, phân phối; tính hợp lí và bài toán thực tế.',
            yccd: 'Thực hiện thành thạo 4 phép tính với số hữu tỉ; vận dụng tính chất để tính nhanh, tính hợp lí.',
          },
          {
            id: 'toan7-b3',
            lessonNumber: 'Bài 3',
            title: 'Luỹ thừa với số mũ tự nhiên của một số hữu tỉ',
            domain: 'Số và Đại số',
            keyKnowledge: 'Luỹ thừa $x^n$ ($x\\in\\mathbb{Q}, n\\in\\mathbb{N}$); tích và thương hai luỹ thừa cùng cơ số; luỹ thừa của luỹ thừa $(x^m)^n = x^{m\\cdot n}$; lưu ý viết đúng tỉ số $x^0=1 (x\\ne 0)$.',
            yccd: 'Vận dụng được các công thức luỹ thừa của số hữu tỉ để rút gọn và tính toán biểu thức.',
          },
          {
            id: 'toan7-b4',
            lessonNumber: 'Bài 4',
            title: 'Thứ tự thực hiện các phép tính. Quy tắc chuyển vế',
            domain: 'Số và Đại số',
            keyKnowledge: 'Thứ tự thực hiện phép tính trên $\\mathbb{Q}$; quy tắc chuyển vế đổi dấu tìm $x$ trong đẳng thức số hữu tỉ.',
            yccd: 'Vận dụng thứ tự thực hiện phép tính và quy tắc chuyển vế để tính giá trị biểu thức và giải bài toán tìm $x$.',
          },
        ],
      },
      {
        id: 'toan7-c2',
        chapterNumber: 'Chương II',
        title: 'Chương II. Số thực',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan7-b5',
            lessonNumber: 'Bài 5',
            title: 'Làm quen với số thập phân vô hạn tuần hoàn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn (kí hiệu chu kì như $0,(3)$ hay $0,2(7)$); làm tròn số với độ chính xác $d$ cho trước (VD $d=0,05$ làm tròn đến hàng phần mười).',
            yccd: 'Nhận biết số thập phân hữu hạn, vô hạn tuần hoàn và thực hiện làm tròn số căn cứ độ chính xác $d$.',
          },
          {
            id: 'toan7-b6',
            lessonNumber: 'Bài 6',
            title: 'Số vô tỉ. Căn bậc hai số học',
            domain: 'Số và Đại số',
            keyKnowledge: 'Số thập phân vô hạn không tuần hoàn là số vô tỉ (tập $\\mathbb{I}$); căn bậc hai số học $\\sqrt{a}$ ($a \\ge 0$) là số $x \\ge 0$ sao cho $x^2 = a$.',
            yccd: 'Nhận biết được số vô tỉ và tính được căn bậc hai số học của số chính phương hoặc ước lượng bằng máy tính cầm tay.',
          },
          {
            id: 'toan7-b7',
            lessonNumber: 'Bài 7',
            title: 'Tập hợp các số thực',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tập hợp $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$; trục số thực; giá trị tuyệt đối $|a|$ của một số thực.',
            yccd: 'Nhận biết tập hợp $\\mathbb{R}$, giá trị tuyệt đối của số thực; so sánh hai số thực và tìm $x$ liên quan $|x|$.',
          },
        ],
      },
      {
        id: 'toan7-c3',
        chapterNumber: 'Chương III',
        title: 'Chương III. Góc và đường thẳng song song',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan7-b8',
            lessonNumber: 'Bài 8',
            title: 'Góc ở vị trí đặc biệt. Tia phân giác của một góc',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Hai góc kề nhau, bù nhau, kề bù (tổng $180^\\circ$), hai góc đối đỉnh (bằng nhau); tia phân giác của một góc.',
            yccd: 'Nhận biết các góc kề bù, đối đỉnh, tia phân giác và tính được số đo góc dựa vào các tính chất này.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai đường thẳng cắt nhau tạo góc đối đỉnh, kề bù và tia phân giác.',
          },
          {
            id: 'toan7-b9',
            lessonNumber: 'Bài 9',
            title: 'Hai đường thẳng song song và dấu hiệu nhận biết',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Cặp góc so le trong, cặp góc đồng vị; dấu hiệu nhận biết hai đường thẳng song song ($a \\parallel b$).',
            yccd: 'Xác định được các cặp góc so le trong, đồng vị và vận dụng dấu hiệu nhận biết để chứng minh hai đường thẳng song song.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai đường thẳng song song bị cắt bởi một cát tuyến và đánh dấu góc.',
          },
          {
            id: 'toan7-b10',
            lessonNumber: 'Bài 10',
            title: 'Tiên đề Euclid. Tính chất của hai đường thẳng song song',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tiên đề Euclid về đường thẳng song song; tính chất: nếu $a \\parallel b$ thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau; quan hệ vuông góc - song song.',
            yccd: 'Phát biểu được Tiên đề Euclid và vận dụng tính chất hai đường thẳng song song để tính góc, chứng minh song song/vuông góc.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai đường thẳng song song và cát tuyến kèm góc so le trong, đồng vị.',
          },
          {
            id: 'toan7-b11',
            lessonNumber: 'Bài 11',
            title: 'Định lí và chứng minh định lí',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Cấu trúc giả thiết (GT) và kết luận (KL) của định lí; các bước lập luận chứng minh định lí.',
            yccd: 'Phân biệt được giả thiết và kết luận của định lí; viết GT - KL và chứng minh được các định lí đơn giản.',
          },
        ],
      },
      {
        id: 'toan7-c4',
        chapterNumber: 'Chương IV',
        title: 'Chương IV. Tam giác bằng nhau',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan7-b12',
            lessonNumber: 'Bài 12',
            title: 'Tổng các góc trong một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tổng ba góc trong tam giác bằng $180^\\circ$; tam giác nhọn, vuông, tù; tính chất góc ngoài của tam giác.',
            yccd: 'Tính được số đo góc chưa biết trong tam giác và vận dụng tính chất góc ngoài.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC có số đo góc và tia kéo dài tạo góc ngoài.',
          },
          {
            id: 'toan7-b13',
            lessonNumber: 'Bài 13',
            title: 'Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa hai tam giác bằng nhau (viết đúng thứ tự đỉnh tương ứng); trường hợp cạnh - cạnh - cạnh (c.c.c).',
            yccd: 'Viết đúng kí hiệu hai tam giác bằng nhau và chứng minh hai tam giác bằng nhau theo trường hợp c.c.c.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai tam giác ABC và A\'B\'C\' hoặc tam giác ghép có cạnh tương ứng bằng nhau.',
          },
          {
            id: 'toan7-b14',
            lessonNumber: 'Bài 14',
            title: 'Trường hợp bằng nhau thứ hai và thứ ba của tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Trường hợp cạnh - góc - cạnh (c.g.c) và góc - cạnh - góc (g.c.g) để chứng minh hai tam giác bằng nhau, từ đó suy ra cạnh/góc bằng nhau.',
            yccd: 'Vận dụng hai trường hợp c.g.c và g.c.g để chứng minh tam giác bằng nhau, đoạn thẳng bằng nhau, góc bằng nhau.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình bài toán chứng minh tam giác bằng nhau c.g.c hoặc g.c.g.',
          },
          {
            id: 'toan7-b15',
            lessonNumber: 'Bài 15',
            title: 'Các trường hợp bằng nhau của tam giác vuông',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Hai cạnh góc vuông, cạnh góc vuông - góc nhọn kề, cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông.',
            yccd: 'Nhận biết và chứng minh hai tam giác vuông bằng nhau theo đủ 4 trường hợp.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác vuông kèm kí hiệu góc vuông và cạnh huyền.',
          },
          {
            id: 'toan7-b16',
            lessonNumber: 'Bài 16',
            title: 'Tam giác cân. Đường trung trực của đoạn thẳng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa, tính chất góc ở đáy và dấu hiệu nhận biết tam giác cân, tam giác đều; định nghĩa và tính chất đường trung trực của đoạn thẳng.',
            yccd: 'Nhận biết, chứng minh tam giác cân và vận dụng tính chất đường trung trực của đoạn thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác cân ABC tại A và đường trung trực của đoạn thẳng.',
          },
        ],
      },
      {
        id: 'toan7-c5',
        chapterNumber: 'Chương V',
        title: 'Chương V. Thu thập và biểu diễn dữ liệu',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan7-b17',
            lessonNumber: 'Bài 17',
            title: 'Thu thập và phân loại dữ liệu',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Dữ liệu định lượng (số liệu) và dữ liệu định tính (không phải số); tính đại diện của mẫu khảo sát.',
            yccd: 'Phân loại được dữ liệu định tính, dữ liệu định lượng và đánh giá được tính đại diện của dữ liệu thu thập.',
          },
          {
            id: 'toan7-b18',
            lessonNumber: 'Bài 18',
            title: 'Biểu đồ hình quạt tròn',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Đọc, mô tả và tính số lượng/tỉ lệ phần trăm từ biểu đồ hình quạt tròn.',
            yccd: 'Đọc và phân tích được số liệu từ biểu đồ hình quạt tròn; đổi giữa tỉ lệ phần trăm và giá trị thực.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan7-b19',
            lessonNumber: 'Bài 19',
            title: 'Biểu đồ đoạn thẳng',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Đọc và phân tích xu hướng thay đổi theo thời gian trên biểu đồ đoạn thẳng.',
            yccd: 'Đọc, vẽ và phân tích xu thế tăng/giảm của dữ liệu qua biểu đồ đoạn thẳng.',
            hasGeometryOrGraph: true,
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 7 - TẬP HAI ====================
  {
    id: 'toan-7-tap-2',
    grade: 'Khối 7',
    volume: 'Tập Hai',
    semester: 'Học kỳ II',
    title: 'SGK Toán 7 - Tập Hai (Kết nối tri thức với cuộc sống)',
    fileName: '07-sgk-toan-7-tap-hai.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-7-tap-2'],
    pageCount: 118,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan7-c6',
        chapterNumber: 'Chương VI',
        title: 'Chương VI. Tỉ lệ thức và đại lượng tỉ lệ',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan7-b20',
            lessonNumber: 'Bài 20',
            title: 'Tỉ lệ thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Khái niệm tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$; tính chất cơ bản $a\\cdot d = b\\cdot c$ và lập các tỉ lệ thức từ đẳng thức tích.',
            yccd: 'Nhận biết tỉ lệ thức và vận dụng tính chất để tìm số hạng chưa biết.',
          },
          {
            id: 'toan7-b21',
            lessonNumber: 'Bài 21',
            title: 'Tính chất của dãy tỉ số bằng nhau',
            domain: 'Số và Đại số',
            keyKnowledge: '$\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d} = \\frac{a-c}{b-d}$ và mở rộng cho dãy 3 tỉ số bằng nhau; giải bài toán chia tỉ lệ.',
            yccd: 'Vận dụng tính chất của dãy tỉ số bằng nhau để tìm $x, y, z$ và giải bài toán thực tế.',
          },
          {
            id: 'toan7-b22',
            lessonNumber: 'Bài 22',
            title: 'Đại lượng tỉ lệ thuận',
            domain: 'Số và Đại số',
            keyKnowledge: 'Công thức $y = a\\cdot x$ ($a\\ne 0$); tính chất tỉ số không đổi và bài toán đại lượng tỉ lệ thuận.',
            yccd: 'Nhận biết hai đại lượng tỉ lệ thuận, tìm hệ số tỉ lệ và giải quyết bài toán thực tiễn.',
          },
          {
            id: 'toan7-b23',
            lessonNumber: 'Bài 23',
            title: 'Đại lượng tỉ lệ nghịch',
            domain: 'Số và Đại số',
            keyKnowledge: 'Công thức $y = \\frac{a}{x}$ ($a\\ne 0$, $x\\cdot y = a$); tính chất và bài toán năng suất, thời gian tỉ lệ nghịch.',
            yccd: 'Nhận biết hai đại lượng tỉ lệ nghịch, xác định hệ số tỉ lệ và giải bài toán thực tế.',
          },
        ],
      },
      {
        id: 'toan7-c7',
        chapterNumber: 'Chương VII',
        title: 'Chương VII. Biểu thức đại số và đa thức một biến',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan7-b24',
            lessonNumber: 'Bài 24',
            title: 'Biểu thức đại số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Biểu thức số và biểu thức đại số; tính giá trị của biểu thức đại số tại giá trị cho trước của biến.',
            yccd: 'Viết được biểu thức đại số biểu thị đại lượng và tính được giá trị biểu thức đại số.',
          },
          {
            id: 'toan7-b25',
            lessonNumber: 'Bài 25',
            title: 'Đa thức một biến',
            domain: 'Số và Đại số',
            keyKnowledge: 'Đơn thức một biến, đa thức một biến $P(x)$; thu gọn và sắp xếp theo luỹ thừa giảm/tăng; bậc, hệ số cao nhất, hệ số tự do; nghiệm của đa thức một biến.',
            yccd: 'Thu gọn, sắp xếp đa thức một biến; xác định bậc, hệ số cao nhất, hệ số tự do và kiểm tra/tìm nghiệm của đa thức.',
          },
          {
            id: 'toan7-b26',
            lessonNumber: 'Bài 26',
            title: 'Phép cộng và phép trừ đa thức một biến',
            domain: 'Số và Đại số',
            keyKnowledge: 'Cộng, trừ hai đa thức một biến theo hàng ngang hoặc cột dọc; tính chất giao hoán, kết hợp.',
            yccd: 'Thực hiện thành thạo phép cộng và phép trừ hai đa thức một biến.',
          },
          {
            id: 'toan7-b27',
            lessonNumber: 'Bài 27',
            title: 'Phép nhân đa thức một biến',
            domain: 'Số và Đại số',
            keyKnowledge: 'Nhân đơn thức với đa thức một biến; nhân hai đa thức một biến.',
            yccd: 'Thực hiện được phép nhân đa thức một biến và rút gọn biểu thức tìm $x$.',
          },
          {
            id: 'toan7-b28',
            lessonNumber: 'Bài 28',
            title: 'Phép chia đa thức một biến',
            domain: 'Số và Đại số',
            keyKnowledge: 'Chia đơn thức cho đơn thức; chia đa thức cho đa thức một biến đã sắp xếp (chia hết và chia có dư $A = B\\cdot Q + R$).',
            yccd: 'Thực hiện được phép chia đa thức một biến; xác định thương, dư và điều kiện chia hết.',
          },
        ],
      },
      {
        id: 'toan7-c8',
        chapterNumber: 'Chương VIII',
        title: 'Chương VIII. Làm quen với biến cố và xác suất của biến cố',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan7-b29',
            lessonNumber: 'Bài 29',
            title: 'Làm quen với biến cố',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Biến cố chắc chắn, biến cố không thể và biến cố ngẫu nhiên trong các phép thử đơn giản.',
            yccd: 'Nhận biết và phân loại được biến cố chắc chắn, không thể và ngẫu nhiên.',
          },
          {
            id: 'toan7-b30',
            lessonNumber: 'Bài 30',
            title: 'Làm quen với xác suất của biến cố',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Xác suất của biến cố chắc chắn bằng $1$, không thể bằng $0$; trường hợp các khả năng đồng khả năng có xác suất $1/k$.',
            yccd: 'Tính được xác suất của biến cố đơn giản trong mô hình đồng khả năng (tung đồng xu, gieo xúc xắc, rút thẻ).',
          },
        ],
      },
      {
        id: 'toan7-c9',
        chapterNumber: 'Chương IX',
        title: 'Chương IX. Quan hệ giữa các yếu tố trong một tam giác',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan7-b31',
            lessonNumber: 'Bài 31',
            title: 'Quan hệ giữa góc và cạnh đối diện trong một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn và ngược lại.',
            yccd: 'So sánh được độ dài các cạnh hoặc số đo các góc trong một tam giác.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan7-b32',
            lessonNumber: 'Bài 32',
            title: 'Quan hệ giữa đường vuông góc và đường xiên',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Khái niệm đường vuông góc, đường xiên; đường vuông góc là đường ngắn nhất.',
            yccd: 'Nhận biết và vận dụng tính chất đường vuông góc ngắn hơn mọi đường xiên để so sánh độ dài.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ điểm A nằm ngoài đường thẳng d, chân đường vuông góc H và đường xiên AB.',
          },
          {
            id: 'toan7-b33',
            lessonNumber: 'Bài 33',
            title: 'Quan hệ giữa ba cạnh của một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Bất đẳng thức tam giác: $|b - c| < a < b + c$; kiểm tra bộ ba độ dài có tạo thành tam giác hay không.',
            yccd: 'Vận dụng bất đẳng thức tam giác để xét sự tồn tại tam giác và tính toán độ dài cạnh nguyên.',
          },
          {
            id: 'toan7-b34',
            lessonNumber: 'Bài 34',
            title: 'Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Trọng tâm $G$ (tỉ lệ $\\frac{2}{3}$ đường trung tuyến); giao điểm ba đường phân giác cách đều ba cạnh.',
            yccd: 'Nhận biết và vận dụng tính chất trọng tâm và tính chất ba đường phân giác của tam giác.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC với các đường trung tuyến đồng quy tại trọng tâm G.',
          },
          {
            id: 'toan7-b35',
            lessonNumber: 'Bài 35',
            title: 'Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Giao điểm ba đường trung trực cách đều ba đỉnh (tâm đường tròn đi qua ba đỉnh); trực tâm $H$ là giao điểm ba đường cao.',
            yccd: 'Nhận biết được tính chất đồng quy của ba đường trung trực và ba đường cao trong tam giác.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC với 3 đường cao đồng quy tại trực tâm H hoặc 3 đường trung trực.',
          },
        ],
      },
      {
        id: 'toan7-c10',
        chapterNumber: 'Chương X',
        title: 'Chương X. Một số hình khối trong thực tiễn',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan7-b36',
            lessonNumber: 'Bài 36',
            title: 'Hình hộp chữ nhật và hình lập phương',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Số mặt, đỉnh, cạnh, đường chéo; diện tích xung quanh $S_{xq} = 2(a+b)h$ và thể tích $V = a\\cdot b\\cdot h$, lập phương $V = a^3$.',
            yccd: 'Mô tả được các yếu tố của hình hộp chữ nhật, lập phương; tính được diện tích xung quanh và thể tích trong bài toán thực tế.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình hộp chữ nhật nét khuất đứt đoạn kèm kích thước a, b, h.',
          },
          {
            id: 'toan7-b37',
            lessonNumber: 'Bài 37',
            title: 'Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đặc điểm mặt đáy, mặt bên, chiều cao; công thức $S_{xq} = C_{\\text{đáy}}\\cdot h$ và $V = S_{\\text{đáy}}\\cdot h$.',
            yccd: 'Nhận biết các yếu tố của lăng trụ đứng tam giác/tứ giác; tính được diện tích xung quanh và thể tích lăng trụ đứng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình lăng trụ đứng tam giác nét đứt cho cạnh khuất.',
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 8 - TẬP MỘT ====================
  {
    id: 'toan-8-tap-1',
    grade: 'Khối 8',
    volume: 'Tập Một',
    semester: 'Học kỳ I',
    title: 'SGK Toán 8 - Tập Một (Kết nối tri thức với cuộc sống)',
    fileName: '08-sgk-toan-8-tap-mot.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-8-tap-1'],
    pageCount: 126,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan8-c1',
        chapterNumber: 'Chương I',
        title: 'Chương I. Đa thức',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan8-b1',
            lessonNumber: 'Bài 1',
            title: 'Đơn thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Đơn thức nhiều biến, đơn thức thu gọn (hệ số, phần biến), bậc của đơn thức, đơn thức đồng dạng và cộng trừ đơn thức đồng dạng.',
            yccd: 'Nhận biết đơn thức, thu gọn đơn thức, xác định hệ số, bậc và thực hiện cộng trừ các đơn thức đồng dạng.',
          },
          {
            id: 'toan8-b2',
            lessonNumber: 'Bài 2',
            title: 'Đa thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Khái niệm đa thức nhiều biến, thu gọn đa thức, tìm bậc của đa thức nhiều biến và tính giá trị đa thức.',
            yccd: 'Nhận biết đa thức nhiều biến; thu gọn và xác định được bậc của đa thức.',
          },
          {
            id: 'toan8-b3',
            lessonNumber: 'Bài 3',
            title: 'Phép cộng và phép trừ đa thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc cộng và trừ hai đa thức nhiều biến; quy tắc dấu ngoặc.',
            yccd: 'Thực hiện thành thạo phép cộng, phép trừ đa thức nhiều biến.',
          },
          {
            id: 'toan8-b4',
            lessonNumber: 'Bài 4',
            title: 'Phép nhân đa thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Nhân đơn thức với đa thức và nhân đa thức với đa thức nhiều biến; rút gọn biểu thức biểu diễn đại lượng hình học.',
            yccd: 'Thực hiện được phép nhân đa thức và vận dụng rút gọn biểu thức, chứng minh giá trị không phụ thuộc biến.',
          },
          {
            id: 'toan8-b5',
            lessonNumber: 'Bài 5',
            title: 'Phép chia đa thức cho đơn thức',
            domain: 'Số và Đại số',
            keyKnowledge: 'Điều kiện chia hết của đơn thức cho đơn thức; chia đa thức nhiều biến cho đơn thức.',
            yccd: 'Thực hiện được phép chia đơn thức cho đơn thức và đa thức cho đơn thức trong trường hợp chia hết.',
          },
        ],
      },
      {
        id: 'toan8-c2',
        chapterNumber: 'Chương II',
        title: 'Chương II. Hằng đẳng thức đáng nhớ và ứng dụng',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan8-b6',
            lessonNumber: 'Bài 6',
            title: 'Hiệu hai bình phương. Bình phương của một tổng hay một hiệu',
            domain: 'Số và Đại số',
            keyKnowledge: '$a^2 - b^2 = (a-b)(a+b)$, $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$.',
            yccd: 'Nhận dạng, khai triển và viết ngược thành tích/bình phương 3 hằng đẳng thức bậc 2 để tính nhanh, tìm $x$, tìm GTLN/GTNN.',
          },
          {
            id: 'toan8-b7',
            lessonNumber: 'Bài 7',
            title: 'Lập phương của một tổng. Lập phương của một hiệu',
            domain: 'Số và Đại số',
            keyKnowledge: '$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$, $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.',
            yccd: 'Khai triển và rút gọn biểu thức chứa lập phương của tổng hoặc hiệu.',
          },
          {
            id: 'toan8-b8',
            lessonNumber: 'Bài 8',
            title: 'Tổng và hiệu hai lập phương',
            domain: 'Số và Đại số',
            keyKnowledge: '$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$, $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$.',
            yccd: 'Vận dụng 2 hằng đẳng thức tổng/hiệu hai lập phương để rút gọn và tính giá trị biểu thức.',
          },
          {
            id: 'toan8-b9',
            lessonNumber: 'Bài 9',
            title: 'Phân tích đa thức thành nhân tử',
            domain: 'Số và Đại số',
            keyKnowledge: 'Ba phương pháp chuẩn KNTT: Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử (và phối hợp nhiều phương pháp).',
            yccd: 'Phân tích được đa thức thành nhân tử và vận dụng để giải bài toán tìm $x$ hoặc tính nhanh.',
          },
        ],
      },
      {
        id: 'toan8-c3',
        chapterNumber: 'Chương III',
        title: 'Chương III. Tứ giác',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan8-b10',
            lessonNumber: 'Bài 10',
            title: 'Tứ giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa tứ giác lồi và định lí tổng 4 góc của một tứ giác bằng $360^\\circ$.',
            yccd: 'Nhận biết tứ giác lồi và tính được số đo góc trong tứ giác.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan8-b11',
            lessonNumber: 'Bài 11',
            title: 'Hình thang cân',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa hình thang, hình thang cân; tính chất về góc kề một đáy và hai đường chéo; dấu hiệu nhận biết hình thang cân.',
            yccd: 'Mô tả, chứng minh tứ giác là hình thang cân và tính góc, cạnh của hình thang cân.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình thang cân ABCD (AB // CD) với hai đường chéo bằng nhau.',
          },
          {
            id: 'toan8-b12',
            lessonNumber: 'Bài 12',
            title: 'Hình bình hành',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tính chất về cạnh đối, góc đối, hai đường chéo cắt nhau tại trung điểm mỗi đường; 5 dấu hiệu nhận biết hình bình hành.',
            yccd: 'Vận dụng dấu hiệu nhận biết và tính chất hình bình hành để chứng minh hình học.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình bình hành ABCD có giao điểm hai đường chéo O.',
          },
          {
            id: 'toan8-b13',
            lessonNumber: 'Bài 13',
            title: 'Hình chữ nhật',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tính chất hai đường chéo bằng nhau; dấu hiệu nhận biết hình chữ nhật; ứng dụng đường trung tuyến ứng với cạnh huyền trong tam giác vuông.',
            yccd: 'Chứng minh tứ giác là hình chữ nhật và vận dụng tính chất trung tuyến ứng với cạnh huyền.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình chữ nhật ABCD hoặc tam giác vuông có đường trung tuyến AM.',
          },
          {
            id: 'toan8-b14',
            lessonNumber: 'Bài 14',
            title: 'Hình thoi và hình vuông',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tính chất hai đường chéo vuông góc, là phân giác các góc của hình thoi; dấu hiệu nhận biết hình thoi và hình vuông.',
            yccd: 'Chứng minh được một tứ giác là hình thoi, hình vuông và vận dụng tính chất để giải toán.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình thoi hoặc hình vuông với hai đường chéo vuông góc.',
          },
        ],
      },
      {
        id: 'toan8-c4',
        chapterNumber: 'Chương IV',
        title: 'Chương IV. Định lí Thalès',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan8-b15',
            lessonNumber: 'Bài 15',
            title: 'Định lí Thalès trong tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tỉ số của hai đoạn thẳng, đoạn thẳng tỉ lệ; Định lí Thalès thuận, Định lí Thalès đảo và hệ quả.',
            yccd: 'Vận dụng Định lí Thalès thuận để tính độ dài đoạn thẳng, Định lí Thalès đảo để chứng minh hai đường thẳng song song.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC có đường thẳng MN // BC cắt AB, AC.',
          },
          {
            id: 'toan8-b16',
            lessonNumber: 'Bài 16',
            title: 'Đường trung bình của tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa đường trung bình của tam giác; tính chất song song với cạnh thứ ba và bằng nửa cạnh ấy; ứng dụng đo khoảng cách gián tiếp.',
            yccd: 'Nhận biết, chứng minh đường trung bình của tam giác và tính độ dài đoạn thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC có M, N lần lượt là trung điểm AB, AC.',
          },
          {
            id: 'toan8-b17',
            lessonNumber: 'Bài 17',
            title: 'Tính chất đường phân giác của tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đường phân giác $AD$ chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề: $\\frac{DB}{DC} = \\frac{AB}{AC}$.',
            yccd: 'Vận dụng tính chất đường phân giác của tam giác để lập tỉ số và tính độ dài đoạn thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác ABC có đường phân giác trong AD.',
          },
        ],
      },
      {
        id: 'toan8-c5',
        chapterNumber: 'Chương V',
        title: 'Chương V. Dữ liệu và biểu đồ',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan8-b18',
            lessonNumber: 'Bài 18',
            title: 'Thu thập và phân loại dữ liệu',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Dữ liệu số liệu rời rạc và số liệu liên tục; dữ liệu định tính không phải là số.',
            yccd: 'Phân biệt được dữ liệu số rời rạc và dữ liệu số liên tục.',
          },
          {
            id: 'toan8-b19',
            lessonNumber: 'Bài 19',
            title: 'Biểu diễn dữ liệu bằng bảng, biểu đồ',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Lựa chọn dạng biểu đồ thích hợp (cột, cột kép, quạt tròn, đoạn thẳng) để biểu diễn dữ liệu.',
            yccd: 'Lựa chọn đúng loại biểu đồ phù hợp với mục đích biểu diễn dữ liệu.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan8-b20',
            lessonNumber: 'Bài 20',
            title: 'Phân tích số liệu thống kê dựa vào biểu đồ',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Phát hiện vấn đề từ biểu đồ, nhận biết cách biểu diễn gây hiểu lầm (trục tung không bắt đầu từ 0).',
            yccd: 'Phân tích số liệu từ biểu đồ và phát hiện được sự sai lệch/hiểu nhầm trong biểu đồ.',
            hasGeometryOrGraph: true,
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 8 - TẬP HAI ====================
  {
    id: 'toan-8-tap-2',
    grade: 'Khối 8',
    volume: 'Tập Hai',
    semester: 'Học kỳ II',
    title: 'SGK Toán 8 - Tập Hai (Kết nối tri thức với cuộc sống)',
    fileName: '08-sgk-toan-8-tap-hai.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-8-tap-2'],
    pageCount: 142,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan8-c6',
        chapterNumber: 'Chương VI',
        title: 'Chương VI. Phân thức đại số',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan8-b21',
            lessonNumber: 'Bài 21',
            title: 'Phân thức đại số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Định nghĩa phân thức $\\frac{A}{B}$ ($B \\ne 0$); hai phân thức bằng nhau; điều kiện xác định (ĐKXĐ) và giá trị của phân thức.',
            yccd: 'Tìm được điều kiện xác định và tính giá trị của phân thức đại số.',
          },
          {
            id: 'toan8-b22',
            lessonNumber: 'Bài 22',
            title: 'Tính chất cơ bản của phân thức đại số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Quy tắc đổi dấu, rút gọn phân thức, tìm mẫu thức chung (MTC) và quy đồng mẫu thức nhiều phân thức.',
            yccd: 'Rút gọn được phân thức đại số và quy đồng mẫu thức nhiều phân thức.',
          },
          {
            id: 'toan8-b23',
            lessonNumber: 'Bài 23',
            title: 'Phép cộng và phép trừ phân thức đại số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Cộng, trừ hai phân thức cùng mẫu và khác mẫu; phân thức đối.',
            yccd: 'Thực hiện được phép cộng, phép trừ phân thức đại số và rút gọn biểu thức hữu tỉ.',
          },
          {
            id: 'toan8-b24',
            lessonNumber: 'Bài 24',
            title: 'Phép nhân và phép chia phân thức đại số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Nhân, chia hai phân thức; phân thức nghịch đảo; biến đổi biểu thức hữu tỉ tổng hợp.',
            yccd: 'Thực hiện được phép nhân, chia và rút gọn biểu thức tổng hợp chứa phân thức đại số.',
          },
        ],
      },
      {
        id: 'toan8-c7',
        chapterNumber: 'Chương VII',
        title: 'Chương VII. Phương trình bậc nhất và hàm số bậc nhất',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan8-b25',
            lessonNumber: 'Bài 25',
            title: 'Phương trình bậc nhất một ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phương trình dạng $ax + b = 0$ ($a \\ne 0$); quy tắc chuyển vế và quy tắc nhân giải phương trình đưa được về bậc nhất một ẩn.',
            yccd: 'Nhận biết và giải thành thạo phương trình bậc nhất một ẩn hoặc phương trình đưa được về dạng $ax + b = 0$.',
          },
          {
            id: 'toan8-b26',
            lessonNumber: 'Bài 26',
            title: 'Giải bài toán bằng cách lập phương trình',
            domain: 'Số và Đại số',
            keyKnowledge: 'Ba bước giải bài toán bằng cách lập phương trình bậc nhất một ẩn (chuyển động, năng suất, hình học, tỉ số phần trăm).',
            yccd: 'Lập và giải được phương trình bậc nhất một ẩn từ các bài toán thực tiễn.',
          },
          {
            id: 'toan8-b27',
            lessonNumber: 'Bài 27',
            title: 'Khái niệm hàm số và đồ thị của hàm số',
            domain: 'Số và Đại số',
            keyKnowledge: 'Khái niệm hàm số $y = f(x)$; tính giá trị hàm số; mặt phẳng tọa độ $Oxy$, tọa độ điểm $M(x_0; y_0)$.',
            yccd: 'Tính được giá trị hàm số và xác định tọa độ điểm trên mặt phẳng $Oxy$.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hệ trục tọa độ Oxy và biểu diễn các điểm theo tọa độ.',
          },
          {
            id: 'toan8-b28',
            lessonNumber: 'Bài 28',
            title: 'Hàm số bậc nhất và đồ thị của hàm số bậc nhất',
            domain: 'Số và Đại số',
            keyKnowledge: 'Hàm số $y = ax + b$ ($a \\ne 0$); cách vẽ đồ thị đường thẳng qua hai điểm cắt trục tọa độ.',
            yccd: 'Nhận biết hàm số bậc nhất và vẽ được đồ thị hàm số $y = ax + b$.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đồ thị đường thẳng y = ax + b trên hệ trục Oxy.',
          },
          {
            id: 'toan8-b29',
            lessonNumber: 'Bài 29',
            title: 'Hệ số góc của đường thẳng',
            domain: 'Số và Đại số',
            keyKnowledge: 'Hệ số góc $a$ của $y = ax + b$; hai đường thẳng song song ($a = a\', b \\ne b\'$), trùng nhau, cắt nhau ($a \\ne a\'$); tìm $m$ thỏa mãn vị trí tương đối.',
            yccd: 'Xác định được hệ số góc và điều kiện để hai đường thẳng song song, cắt nhau.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai đường thẳng song song hoặc cắt nhau trên mặt phẳng tọa độ Oxy.',
          },
        ],
      },
      {
        id: 'toan8-c8',
        chapterNumber: 'Chương VIII',
        title: 'Chương VIII. Mở đầu về tính xác suất của biến cố',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan8-b30',
            lessonNumber: 'Bài 30',
            title: 'Kết quả có thể và kết quả thuận lợi',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Liệt kê kết quả có thể và xác định các kết quả thuận lợi cho một biến cố $E$.',
            yccd: 'Đếm và liệt kê đúng số kết quả thuận lợi cho biến cố trong các phép thử.',
          },
          {
            id: 'toan8-b31',
            lessonNumber: 'Bài 31',
            title: 'Cách tính xác suất của biến cố bằng tỉ số',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Khi các kết quả đồng khả năng: $P(E) = \\frac{k}{n}$ ($k$ là số kết quả thuận lợi, $n$ là tổng số kết quả có thể).',
            yccd: 'Tính được xác suất của biến cố bằng tỉ số giữa số kết quả thuận lợi và tổng số kết quả có thể.',
          },
          {
            id: 'toan8-b32',
            lessonNumber: 'Bài 32',
            title: 'Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Khi số lần thử $n$ đủ lớn, xác suất thực nghiệm gần bằng xác suất lí thuyết $P(E)$; ứng dụng ước lượng số phần tử/dự đoán kết quả.',
            yccd: 'Vận dụng mối liên hệ giữa xác suất thực nghiệm và xác suất để ước lượng số lần xảy ra trong thực tế.',
          },
        ],
      },
      {
        id: 'toan8-c9',
        chapterNumber: 'Chương IX',
        title: 'Chương IX. Tam giác đồng dạng',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan8-b33',
            lessonNumber: 'Bài 33',
            title: 'Hai tam giác đồng dạng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa $\\Delta A\'B\'C\' \\sim \\Delta ABC$ theo tỉ số đồng dạng $k$; định lí đường thẳng song song tạo tam giác mới đồng dạng.',
            yccd: 'Nhận biết hai tam giác đồng dạng, xác định tỉ số đồng dạng và viết đúng thứ tự đỉnh tương ứng.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan8-b34',
            lessonNumber: 'Bài 34',
            title: 'Ba trường hợp đồng dạng của hai tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Ba trường hợp đồng dạng: cạnh - cạnh - cạnh (c.c.c), cạnh - góc - cạnh (c.g.c), góc - góc (g.g).',
            yccd: 'Chứng minh hai tam giác đồng dạng theo 3 trường hợp và suy ra tỉ lệ cạnh, hệ thức tích.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai tam giác đồng dạng hoặc tam giác có đường cao/cát tuyến tạo cặp tam giác đồng dạng.',
          },
          {
            id: 'toan8-b35',
            lessonNumber: 'Bài 35',
            title: 'Định lí Pythagore và ứng dụng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định lí Pythagore thuận ($BC^2 = AB^2 + AC^2$) và Định lí Pythagore đảo nhận biết tam giác vuông; ứng dụng đo khoảng cách/chiều cao thực tế.',
            yccd: 'Tính được độ dài cạnh tam giác vuông bằng định lí Pythagore và nhận biết tam giác vuông bằng định lí đảo.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác vuông ABC kèm kí hiệu góc vuông và độ dài các cạnh.',
          },
          {
            id: 'toan8-b36',
            lessonNumber: 'Bài 36',
            title: 'Các trường hợp đồng dạng của hai tam giác vuông',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đồng dạng tam giác vuông: góc nhọn, hai cạnh góc vuông tỉ lệ, cạnh huyền - cạnh góc vuông tỉ lệ; tỉ số đường cao, tỉ số diện tích bằng $k^2$.',
            yccd: 'Vận dụng các trường hợp đồng dạng của tam giác vuông và hệ thức đường cao để chứng minh và tính độ dài.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan8-b37',
            lessonNumber: 'Bài 37',
            title: 'Hình đồng dạng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Hai hình đồng dạng phối cảnh (hình vị tự) và hai hình đồng dạng trong hình học và thực tiễn.',
            yccd: 'Nhận biết được các cặp hình đồng dạng và tìm tỉ số đồng dạng của chúng.',
            hasGeometryOrGraph: true,
          },
        ],
      },
      {
        id: 'toan8-c10',
        chapterNumber: 'Chương X',
        title: 'Chương X. Một số hình khối trong thực tiễn',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan8-b38',
            lessonNumber: 'Bài 38',
            title: 'Hình chóp tam giác đều',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đáy là tam giác đều, 3 mặt bên là tam giác cân; trung đoạn $d$, chiều cao $h$; $S_{xq} = p\\cdot d$ ($p$ nửa chu vi đáy) và $V = \\frac{1}{3}S_{\\text{đáy}}\\cdot h$.',
            yccd: 'Mô tả hình chóp tam giác đều và tính được diện tích xung quanh, thể tích hình chóp tam giác đều.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình chóp tam giác đều S.ABC với nét đứt cho cạnh khuất và đường cao SO.',
          },
          {
            id: 'toan8-b39',
            lessonNumber: 'Bài 39',
            title: 'Hình chóp tứ giác đều',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đáy là hình vuông, 4 mặt bên là tam giác cân; $S_{xq} = p\\cdot d$ và $V = \\frac{1}{3}S_{\\text{đáy}}\\cdot h$.',
            yccd: 'Mô tả hình chóp tứ giác đều và vận dụng công thức tính diện tích xung quanh, diện tích toàn phần, thể tích trong thực tế.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình chóp tứ giác đều S.ABCD với đường cao SO và trung đoạn SH.',
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 9 - TẬP MỘT ====================
  {
    id: 'toan-9-tap-1',
    grade: 'Khối 9',
    volume: 'Tập Một',
    semester: 'Học kỳ I',
    title: 'SGK Toán 9 - Tập Một (Kết nối tri thức với cuộc sống)',
    fileName: '09-sgk-toan-9-tap-mot.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-9-tap-1'],
    pageCount: 122,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan9-c1',
        chapterNumber: 'Chương I',
        title: 'Chương I. Phương trình và hệ hai phương trình bậc nhất hai ẩn',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan9-b1',
            lessonNumber: 'Bài 1',
            title: 'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phương trình $ax + by = c$ ($a\\ne 0$ hoặc $b\\ne 0$); nghiệm $(x_0; y_0)$ và đường thẳng biểu diễn nghiệm; khái niệm hệ hai PT bậc nhất hai ẩn.',
            yccd: 'Nhận biết phương trình, hệ hai phương trình bậc nhất hai ẩn và kiểm tra một cặp số $(x_0; y_0)$ có phải là nghiệm hay không.',
          },
          {
            id: 'toan9-b2',
            lessonNumber: 'Bài 2',
            title: 'Giải hệ hai phương trình bậc nhất hai ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Giải hệ hai PT bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số; đặt ẩn phụ quy về hệ bậc nhất.',
            yccd: 'Giải thành thạo hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế và cộng đại số.',
          },
          {
            id: 'toan9-b3',
            lessonNumber: 'Bài 3',
            title: 'Giải bài toán bằng cách lập hệ phương trình',
            domain: 'Số và Đại số',
            keyKnowledge: 'Lập hệ phương trình giải toán thực tế: chuyển động, làm chung/riêng, phần trăm, mua bán, số học, hình học.',
            yccd: 'Vận dụng lập hệ phương trình bậc nhất hai ẩn để giải quyết bài toán thực tiễn.',
          },
        ],
      },
      {
        id: 'toan9-c2',
        chapterNumber: 'Chương II',
        title: 'Chương II. Phương trình và bất phương trình bậc nhất một ẩn',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan9-b4',
            lessonNumber: 'Bài 4',
            title: 'Phương trình quy về phương trình bậc nhất một ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Phương trình tích $(ax+b)(cx+d)=0$ và phương trình chứa ẩn ở mẫu (tìm ĐKXĐ, quy đồng khử mẫu, đối chiếu ĐKXĐ).',
            yccd: 'Giải được phương trình tích và phương trình chứa ẩn ở mẫu quy về bậc nhất.',
          },
          {
            id: 'toan9-b5',
            lessonNumber: 'Bài 5',
            title: 'Bất đẳng thức và tính chất',
            domain: 'Số và Đại số',
            keyKnowledge: 'Các tính chất bắc cầu, liên hệ giữa thứ tự và phép cộng, liên hệ giữa thứ tự và phép nhân (nhân số dương giữ chiều, nhân số âm đổi chiều).',
            yccd: 'Vận dụng tính chất của bất đẳng thức để so sánh các biểu thức và chứng minh bất đẳng thức đơn giản.',
          },
          {
            id: 'toan9-b6',
            lessonNumber: 'Bài 6',
            title: 'Bất phương trình bậc nhất một ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Định nghĩa $ax + b > 0$ (hoặc $<, \\le, \\ge$) với $a\\ne 0$; giải bất phương trình bậc nhất một ẩn và các bất phương trình đưa được về bậc nhất một ẩn.',
            yccd: 'Nhận biết và giải được bất phương trình bậc nhất một ẩn; vận dụng vào bài toán thực tế.',
          },
        ],
      },
      {
        id: 'toan9-c3',
        chapterNumber: 'Chương III',
        title: 'Chương III. Căn bậc hai và căn bậc ba',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan9-b7',
            lessonNumber: 'Bài 7',
            title: 'Căn bậc hai và căn thức bậc hai',
            domain: 'Số và Đại số',
            keyKnowledge: 'Căn bậc hai của số không âm; căn thức bậc hai $\\sqrt{A}$ xác định khi $A \\ge 0$; hằng đẳng thức $\\sqrt{A^2} = |A|$.',
            yccd: 'Tìm ĐKXĐ của căn thức bậc hai và vận dụng hằng đẳng thức $\\sqrt{A^2} = |A|$ để rút gọn biểu thức.',
          },
          {
            id: 'toan9-b8',
            lessonNumber: 'Bài 8',
            title: 'Khai căn bậc hai với phép nhân và phép chia',
            domain: 'Số và Đại số',
            keyKnowledge: '$\\sqrt{A\\cdot B} = \\sqrt{A}\\cdot\\sqrt{B}$ ($A, B \\ge 0$) và $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$ ($A\\ge 0, B>0$).',
            yccd: 'Vận dụng quy tắc khai căn của một tích và một thương để tính giá trị và rút gọn biểu thức.',
          },
          {
            id: 'toan9-b9',
            lessonNumber: 'Bài 9',
            title: 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
            domain: 'Số và Đại số',
            keyKnowledge: 'Đưa thừa số ra ngoài/vào trong dấu căn; khử mẫu của biểu thức lấy căn; trục căn thức ở mẫu; rút gọn biểu thức tổng hợp.',
            yccd: 'Thực hiện thành thạo các phép biến đổi đơn giản để rút gọn biểu thức chứa căn bậc hai và giải bài toán phụ liên quan.',
          },
          {
            id: 'toan9-b10',
            lessonNumber: 'Bài 10',
            title: 'Căn bậc ba và căn thức bậc ba',
            domain: 'Số và Đại số',
            keyKnowledge: 'Căn bậc ba $\\sqrt[3]{a}$ tồn tại với mọi $a \\in \\mathbb{R}$; $(\\sqrt[3]{A})^3 = \\sqrt[3]{A^3} = A$.',
            yccd: 'Tính được căn bậc ba và rút gọn biểu thức chứa căn thức bậc ba.',
          },
        ],
      },
      {
        id: 'toan9-c4',
        chapterNumber: 'Chương IV',
        title: 'Chương IV. Hệ thức lượng trong tam giác vuông',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan9-b11',
            lessonNumber: 'Bài 11',
            title: 'Tỉ số lượng giác của góc nhọn',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa $\\sin, \\cos, \\tan, \\cot$ của góc nhọn; tỉ số lượng giác hai góc phụ nhau; giá trị lượng giác góc đặc biệt $30^\\circ, 45^\\circ, 60^\\circ$.',
            yccd: 'Tính được tỉ số lượng giác của góc nhọn và vận dụng quan hệ góc phụ nhau để biến đổi, tính toán.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác vuông đánh dấu góc nhọn alpha và độ dài các cạnh.',
          },
          {
            id: 'toan9-b12',
            lessonNumber: 'Bài 12',
            title: 'Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Hệ thức $b = a\\sin B = a\\cos C$, $b = c\\tan B = c\\cot C$; giải tam giác vuông; bài toán thực tế đo chiều cao tháp, góc nâng, bóng nắng.',
            yccd: 'Giải được tam giác vuông và giải quyết các bài toán thực tiễn đo đạc khoảng cách, chiều cao.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ mô hình tam giác vuông ứng với bài toán đo chiều cao/khoảng cách thực tế.',
          },
        ],
      },
      {
        id: 'toan9-c5',
        chapterNumber: 'Chương V',
        title: 'Chương V. Đường tròn',
        semester: 'Học kỳ I',
        volumeLabel: 'Tập Một',
        lessons: [
          {
            id: 'toan9-b13',
            lessonNumber: 'Bài 13',
            title: 'Mở đầu về đường tròn',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Đường tròn $(O; R)$; vị trí tương đối của điểm với đường tròn; tính đối xứng tâm và trục của đường tròn.',
            yccd: 'Nhận biết vị trí của điểm đối với đường tròn và tính đối xứng của đường tròn.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan9-b14',
            lessonNumber: 'Bài 14',
            title: 'Cung và dây của một đường tròn',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Dây cung, đường kính là dây lớn nhất; góc ở tâm; số đo cung $\\text{sđ}\\;\\overparen{AB}$; liên hệ cung và dây.',
            yccd: 'Xác định được góc ở tâm, số đo cung nhỏ/cung lớn và so sánh dây cung.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đường tròn (O), góc ở tâm AOB và dây cung AB.',
          },
          {
            id: 'toan9-b15',
            lessonNumber: 'Bài 15',
            title: 'Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Độ dài cung $l = \\frac{n}{180}\\pi R$; diện tích hình quạt tròn $S_q = \\frac{n}{360}\\pi R^2 = \\frac{lR}{2}$; diện tích hình vành khuyên $\\pi(R^2 - r^2)$.',
            yccd: 'Tính được độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên trong bài toán thực tế.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình quạt tròn hoặc hình vành khuyên có bán kính R, r và góc ở tâm n độ.',
          },
          {
            id: 'toan9-b16',
            lessonNumber: 'Bài 16',
            title: 'Vị trí tương đối của đường thẳng và đường tròn',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Cắt nhau ($d<R$), tiếp xúc ($d=R$), không giao nhau ($d>R$); dấu hiệu nhận biết tiếp tuyến; tính chất hai tiếp tuyến cắt nhau.',
            yccd: 'Nhận biết, chứng minh tiếp tuyến và vận dụng tính chất hai tiếp tuyến cắt nhau.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đường tròn (O) và hai tiếp tuyến MA, MB cắt nhau tại M.',
          },
          {
            id: 'toan9-b17',
            lessonNumber: 'Bài 17',
            title: 'Vị trí tương đối của hai đường tròn',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Cắt nhau ($R-r < OO\' < R+r$), tiếp xúc ngoài/trong ($OO\' = R+r$ hoặc $R-r$), không giao nhau.',
            yccd: 'Xác định được vị trí tương đối của hai đường tròn dựa vào khoảng cách hai tâm và bán kính.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hai đường tròn (O; R) và (O\'; r) cắt nhau hoặc tiếp xúc.',
          },
        ],
      },
    ],
  },

  // ==================== TOÁN 9 - TẬP HAI ====================
  {
    id: 'toan-9-tap-2',
    grade: 'Khối 9',
    volume: 'Tập Hai',
    semester: 'Học kỳ II',
    title: 'SGK Toán 9 - Tập Hai (Kết nối tri thức với cuộc sống)',
    fileName: '09-sgk-toan-9-tap-hai.pdf',
    pdfUrl: KNTT_DEFAULT_DRIVE_LINKS['toan-9-tap-2'],
    pageCount: 134,
    publisher: 'NXB Giáo dục Việt Nam',
    series: KNTT_CURRICULUM_NAME,
    chapters: [
      {
        id: 'toan9-c6',
        chapterNumber: 'Chương VI',
        title: 'Chương VI. Hàm số y = ax^2 (a ≠ 0). Phương trình bậc hai một ẩn',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan9-b18',
            lessonNumber: 'Bài 18',
            title: 'Hàm số y = ax^2 (a ≠ 0)',
            domain: 'Số và Đại số',
            keyKnowledge: 'Tính chất biến thiên và đồ thị parabol $(P): y = ax^2$ ($a \\ne 0$) đối xứng qua trục $Oy$.',
            yccd: 'Vẽ được đồ thị hàm số $y = ax^2$ và tìm điểm thuộc parabol / giao điểm với đường thẳng.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ parabol y = ax^2 và đường thẳng y = bx + c trên hệ trục Oxy.',
          },
          {
            id: 'toan9-b19',
            lessonNumber: 'Bài 19',
            title: 'Phương trình bậc hai một ẩn',
            domain: 'Số và Đại số',
            keyKnowledge: 'Định nghĩa $ax^2 + bx + c = 0$ ($a \\ne 0$); công thức nghiệm $\\Delta = b^2 - 4ac$ và công thức nghiệm thu gọn $\\Delta\' = b\'^2 - ac$; biện luận số nghiệm theo tham số $m$.',
            yccd: 'Giải thành thạo phương trình bậc hai một ẩn và biện luận số nghiệm theo $\\Delta$ hoặc $\\Delta\'$.',
          },
          {
            id: 'toan9-b20',
            lessonNumber: 'Bài 20',
            title: 'Định lí Viète và ứng dụng',
            domain: 'Số và Đại số',
            keyKnowledge: 'Hệ thức Viète $x_1 + x_2 = -\\frac{b}{a}$, $x_1 x_2 = \\frac{c}{a}$; nhẩm nghiệm ($a+b+c=0$, $a-b+c=0$); tìm hai số biết tổng $S$ và tích $P$ ($X^2 - SX + P = 0$); tìm $m$ thỏa biểu thức đối xứng nghiệm.',
            yccd: 'Vận dụng định lí Viète tính biểu thức đối xứng nghiệm, nhẩm nghiệm và tìm tham số $m$.',
          },
          {
            id: 'toan9-b21',
            lessonNumber: 'Bài 21',
            title: 'Giải bài toán bằng cách lập phương trình',
            domain: 'Số và Đại số',
            keyKnowledge: 'Giải bài toán thực tế (chuyển động, năng suất, diện tích mảnh đất, lãi suất) quy về phương trình bậc hai một ẩn.',
            yccd: 'Lập và giải được phương trình bậc hai từ tình huống thực tiễn, kiểm tra và loại nghiệm không phù hợp.',
          },
        ],
      },
      {
        id: 'toan9-c7',
        chapterNumber: 'Chương VII',
        title: 'Chương VII. Tần số và tần số tương đối',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan9-b22',
            lessonNumber: 'Bài 22',
            title: 'Bảng tần số và biểu đồ tần số',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Cỡ mẫu $N$, tần số $m$ của mỗi giá trị; lập bảng tần số và biểu đồ tần số dạng cột/đoạn thẳng.',
            yccd: 'Xác định tần số, lập bảng và đọc biểu đồ tần số.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan9-b23',
            lessonNumber: 'Bài 23',
            title: 'Bảng tần số tương đối và biểu đồ tần số tương đối',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Tần số tương đối $f_i = \\frac{m_i}{N}\\cdot 100\\%$; tổng các tần số tương đối bằng $100\\%$; biểu đồ cột và biểu đồ hình quạt tròn.',
            yccd: 'Tính được tần số tương đối, đọc và phân tích bảng/biểu đồ tần số tương đối.',
            hasGeometryOrGraph: true,
          },
          {
            id: 'toan9-b24',
            lessonNumber: 'Bài 24',
            title: 'Bảng tần số, tần số tương đối ghép nhóm và biểu đồ',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Nhóm số liệu nửa khoảng $[a_i; a_{i+1})$ (dùng dấu `;`), bảng tần số ghép nhóm, biểu đồ tần số tương đối ghép nhóm dạng cột liền nhau.',
            yccd: 'Đọc, lập bảng tần số/tần số tương đối ghép nhóm và phân tích biểu đồ ghép nhóm.',
            hasGeometryOrGraph: true,
          },
        ],
      },
      {
        id: 'toan9-c8',
        chapterNumber: 'Chương VIII',
        title: 'Chương VIII. Xác suất của biến cố trong một số mô hình xác suất đơn giản',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan9-b25',
            lessonNumber: 'Bài 25',
            title: 'Phép thử ngẫu nhiên và không gian mẫu',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Mô tả không gian mẫu $\\Omega$ và số phần tử $n(\\Omega)$ của phép thử (gieo 2 đồng xu/xúc xắc, lấy 2 viên bi/thẻ).',
            yccd: 'Xác định đúng không gian mẫu $\\Omega$ và tính $n(\\Omega)$ của phép thử ngẫu nhiên.',
          },
          {
            id: 'toan9-b26',
            lessonNumber: 'Bài 26',
            title: 'Xác suất của biến cố liên quan tới phép thử',
            domain: 'Thống kê và Xác suất',
            keyKnowledge: 'Tính xác suất $P(E) = \\frac{n(E)}{n(\\Omega)}$ khi các kết quả đồng khả năng.',
            yccd: 'Tính được xác suất của biến cố trong mô hình không gian mẫu đồng khả năng.',
          },
        ],
      },
      {
        id: 'toan9-c9',
        chapterNumber: 'Chương IX',
        title: 'Chương IX. Đường tròn ngoại tiếp và đường tròn nội tiếp',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan9-b27',
            lessonNumber: 'Bài 27',
            title: 'Góc nội tiếp',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa góc nội tiếp; định lí số đo góc nội tiếp bằng nửa số đo cung bị chắn ($\\widehat{ACB} = \\frac{1}{2}\\text{sđ}\\;\\overparen{AB}$); các góc nội tiếp cùng chắn một cung bằng nhau; góc nội tiếp chắn nửa đường tròn bằng $90^\\circ$.',
            yccd: 'Nhận biết góc nội tiếp, tính số đo góc và vận dụng hệ quả góc nội tiếp để chứng minh hình học.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đường tròn (O), góc nội tiếp ACB và góc ở tâm AOB cùng chắn cung AB.',
          },
          {
            id: 'toan9-b28',
            lessonNumber: 'Bài 28',
            title: 'Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Tâm đường tròn ngoại tiếp (giao 3 đường trung trực) và nội tiếp (giao 3 đường phân giác); trường hợp tam giác vuông ($R = \\frac{BC}{2}$) và tam giác đều cạnh $a$ ($R = \\frac{\\sqrt{3}}{3}a$, $r = \\frac{\\sqrt{3}}{6}a$).',
            yccd: 'Xác định tâm, tính bán kính đường tròn ngoại tiếp và nội tiếp của tam giác vuông, tam giác đều.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ tam giác đều hoặc tam giác vuông nội tiếp đường tròn (O; R).',
          },
          {
            id: 'toan9-b29',
            lessonNumber: 'Bài 29',
            title: 'Tứ giác nội tiếp',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa tứ giác nội tiếp; tính chất tổng hai góc đối bằng $180^\\circ$ ($\\hat{A}+\\hat{C}=180^\\circ$); dấu hiệu chứng minh tứ giác nội tiếp; đường tròn ngoại tiếp hình chữ nhật và hình vuông.',
            yccd: 'Chứng minh tứ giác nội tiếp đường tròn và vận dụng tính chất góc của tứ giác nội tiếp để giải toán.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ đường tròn (O) đi qua 4 đỉnh của tứ giác ABCD.',
          },
          {
            id: 'toan9-b30',
            lessonNumber: 'Bài 30',
            title: 'Đa giác đều',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Định nghĩa đa giác đều; phép quay biến đa giác đều thành chính nó ($\\frac{360^\\circ}{n}$); các đa giác đều trong thực tiễn.',
            yccd: 'Nhận biết đa giác đều và xác định góc quay giữ nguyên đa giác đều.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ ngũ giác đều hoặc lục giác đều nội tiếp đường tròn.',
          },
        ],
      },
      {
        id: 'toan9-c10',
        chapterNumber: 'Chương X',
        title: 'Chương X. Một số hình khối trong thực tiễn',
        semester: 'Học kỳ II',
        volumeLabel: 'Tập Hai',
        lessons: [
          {
            id: 'toan9-b31',
            lessonNumber: 'Bài 31',
            title: 'Hình trụ và hình nón',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Hình trụ ($S_{xq} = 2\\pi Rh$, $V = \\pi R^2 h$) và hình nón (đường sinh $l = \\sqrt{r^2+h^2}$, $S_{xq} = \\pi r l$, $V = \\frac{1}{3}\\pi r^2 h$).',
            yccd: 'Tính được diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ, hình nón trong bài toán thực tế.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình trụ hoặc hình nón ghi rõ bán kính R/r, chiều cao h, đường sinh l.',
          },
          {
            id: 'toan9-b32',
            lessonNumber: 'Bài 32',
            title: 'Hình cầu',
            domain: 'Hình học và Đo lường',
            keyKnowledge: 'Mặt cầu bán kính $R$; diện tích mặt cầu $S = 4\\pi R^2$ và thể tích hình cầu $V = \\frac{4}{3}\\pi R^3$.',
            yccd: 'Tính được diện tích mặt cầu và thể tích hình cầu; giải quyết bài toán thực tiễn kết hợp trụ - nón - cầu.',
            hasGeometryOrGraph: true,
            geogebraHint: 'Vẽ hình cầu tâm O bán kính R kèm đường xích đạo elip nét đứt phía sau.',
          },
        ],
      },
    ],
  },
];

export function normalizeKnttGrade(grade?: string | null): KnttMathGrade {
  const g = String(grade || '').trim();
  if (g === 'Khối 6' || g === '6') return 'Khối 6';
  if (g === 'Khối 7' || g === '7') return 'Khối 7';
  if (g === 'Khối 8' || g === '8') return 'Khối 8';
  if (g === 'Khối 9' || g === '9') return 'Khối 9';
  return 'Khối 6';
}

export function getKnttTextbooksByGrade(grade: string): KnttTextbookVolume[] {
  const normalized = normalizeKnttGrade(grade);
  return KNTT_TEXTBOOKS.filter((vol) => vol.grade === normalized);
}

export function getKnttChaptersByGrade(grade: string, semester?: string): KnttChapter[] {
  const vols = getKnttTextbooksByGrade(grade);
  const allChapters = vols.flatMap((v) => v.chapters);
  if (!semester || semester === 'Cả năm') return allChapters;
  const matched = allChapters.filter((ch) => ch.semester === semester);
  return matched.length > 0 ? matched : allChapters;
}

export function getDefaultChapterTitleForGrade(grade: string): string {
  const normalized = normalizeKnttGrade(grade);
  const chapters = getKnttChaptersByGrade(normalized, 'Học kỳ I');
  return chapters[0]?.title || 'Chương I. Tập hợp các số tự nhiên';
}

export function getKnttLessonById(lessonId: string): {
  volume: KnttTextbookVolume;
  chapter: KnttChapter;
  lesson: KnttLesson;
} | null {
  for (const volume of KNTT_TEXTBOOKS) {
    for (const chapter of volume.chapters) {
      for (const lesson of chapter.lessons) {
        if (lesson.id === lessonId) {
          return { volume, chapter, lesson };
        }
      }
    }
  }
  return null;
}

/**
 * Xây dựng ngữ cảnh SGK Toán KNTT chính xác để nhúng vào Prompt sinh đề
 */
export function buildKnttCurriculumPromptContext(
  grade: string,
  semester: string,
  chapterTitle: string,
  selectedLessonIds?: string[]
): string {
  const normalizedGrade = normalizeKnttGrade(grade);
  const volumes = getKnttTextbooksByGrade(normalizedGrade);
  const scopeRule = KNTT_GRADE_SCOPE_RULES[normalizedGrade];

  const selectedLessons: Array<{ chapterTitle: string; lesson: KnttLesson }> = [];

  if (selectedLessonIds && selectedLessonIds.length > 0) {
    const idSet = new Set(selectedLessonIds);
    volumes.forEach((v) =>
      v.chapters.forEach((ch) =>
        ch.lessons.forEach((ls) => {
          if (idSet.has(ls.id)) {
            selectedLessons.push({ chapterTitle: ch.title, lesson: ls });
          }
        })
      )
    );
  }

  // Nếu người dùng chưa tích từng bài, tự khớp theo tên chương/bài trong chapterTitle hoặc học kỳ
  if (selectedLessons.length === 0 && chapterTitle && chapterTitle.trim()) {
    const lowerTarget = chapterTitle.toLowerCase();
    volumes.forEach((v) =>
      v.chapters.forEach((ch) => {
        const chLower = ch.title.toLowerCase();
        const chNumLower = ch.chapterNumber.toLowerCase();
        const chapterMatched =
          lowerTarget.includes(chNumLower) ||
          lowerTarget.includes(chLower) ||
          chLower.includes(lowerTarget);

        ch.lessons.forEach((ls) => {
          const lsTitleLower = ls.title.toLowerCase();
          const lsNumLower = ls.lessonNumber.toLowerCase();
          if (
            chapterMatched ||
            lowerTarget.includes(lsTitleLower) ||
            lowerTarget.includes(lsNumLower)
          ) {
            selectedLessons.push({ chapterTitle: ch.title, lesson: ls });
          }
        });
      })
    );
  }

  const lines: string[] = [
    `📚 NGUỒN DỮ LIỆU SGK TOÁN DUY NHẤT ĐƯỢC PHÉP SỬ DỤNG (${normalizedGrade}):`,
    `- Bộ sách: SGK Toán ${normalizedGrade.replace('Khối ', '')} - Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam) [2 tập PDF đính kèm: ${volumes.map((v) => `${v.volume} (${v.fileName})`).join(' & ')}].`,
    `- TUYỆT ĐỐI KHÔNG sử dụng thuật ngữ, kí hiệu hay trình tự kiến thức của bộ sách Chân trời sáng tạo, Cánh Diều hay chương trình cũ.`,
    `- ${scopeRule}`,
  ];

  if (selectedLessons.length > 0) {
    lines.push(`\n📌 CÁC BÀI HỌC & YÊU CẦU CẦN ĐẠT (YCCĐ) TỪ SGK TOÁN ${normalizedGrade.replace('Khối ', '')} KNTT ĐƯỢC CHỌN:`);
    selectedLessons.forEach(({ chapterTitle: chTitle, lesson }) => {
      lines.push(
        `  • [${chTitle}] ${lesson.lessonNumber}. ${lesson.title} (Mạch: ${lesson.domain})\n` +
          `    - Kiến thức trọng tâm SGK KNTT: ${lesson.keyKnowledge}\n` +
          `    - YCCĐ chuẩn: ${lesson.yccd}` +
          (lesson.geogebraHint ? `\n    - Gợi ý hình vẽ/GeoGebra: ${lesson.geogebraHint}` : '')
      );
    });
  } else {
    const semChapters = getKnttChaptersByGrade(normalizedGrade, semester);
    lines.push(`\n📌 MỤC LỤC CHƯƠNG TRÌNH SGK TOÁN ${normalizedGrade.replace('Khối ', '')} KNTT (${semester || 'Cả năm'}):`);
    semChapters.forEach((ch) => {
      const lessonList = ch.lessons.map((l) => `${l.lessonNumber}: ${l.title}`).join('; ');
      lines.push(`  • ${ch.title}: ${lessonList}`);
    });
  }

  return lines.join('\n');
}
