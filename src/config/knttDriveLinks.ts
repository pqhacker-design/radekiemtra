/**
 * Cấu hình đường dẫn Google Drive cho 8 cuốn SGK Toán THCS (Kết nối tri thức với cuộc sống).
 * Hỗ trợ cấu hình theo 3 cách (ưu tiên từ cao xuống thấp):
 * 1. Cấu hình trực tiếp trong giao diện ứng dụng (lưu vào AppSettings / LocalStorage).
 * 2. Biến môi trường Vercel / Vite (VITE_SGK_TOAN_6_TAP_1 ... VITE_SGK_TOAN_9_TAP_2).
 * 3. Điền trực tiếp link Google Drive mặc định vào bảng KNTT_HARDCODED_DRIVE_LINKS bên dưới trước khi deploy.
 */

export type KnttVolumeId =
  | 'toan-6-tap-1'
  | 'toan-6-tap-2'
  | 'toan-7-tap-1'
  | 'toan-7-tap-2'
  | 'toan-8-tap-1'
  | 'toan-8-tap-2'
  | 'toan-9-tap-1'
  | 'toan-9-tap-2';

export interface KnttDriveLinkMeta {
  id: KnttVolumeId;
  grade: 'Khối 6' | 'Khối 7' | 'Khối 8' | 'Khối 9';
  label: string;
  envKey: string;
  fileNameHint: string;
}

export const KNTT_DRIVE_LINK_ITEMS: KnttDriveLinkMeta[] = [
  {
    id: 'toan-6-tap-1',
    grade: 'Khối 6',
    label: 'SGK Toán 6 - Tập Một (KNTT)',
    envKey: 'VITE_SGK_TOAN_6_TAP_1',
    fileNameHint: '06-sgk-toan-6-tap-mot.pdf',
  },
  {
    id: 'toan-6-tap-2',
    grade: 'Khối 6',
    label: 'SGK Toán 6 - Tập Hai (KNTT)',
    envKey: 'VITE_SGK_TOAN_6_TAP_2',
    fileNameHint: '06-sgk-toan-6-tap-hai.pdf',
  },
  {
    id: 'toan-7-tap-1',
    grade: 'Khối 7',
    label: 'SGK Toán 7 - Tập Một (KNTT)',
    envKey: 'VITE_SGK_TOAN_7_TAP_1',
    fileNameHint: '07-sgk-toan-7-tap-mot.pdf',
  },
  {
    id: 'toan-7-tap-2',
    grade: 'Khối 7',
    label: 'SGK Toán 7 - Tập Hai (KNTT)',
    envKey: 'VITE_SGK_TOAN_7_TAP_2',
    fileNameHint: '07-sgk-toan-7-tap-hai.pdf',
  },
  {
    id: 'toan-8-tap-1',
    grade: 'Khối 8',
    label: 'SGK Toán 8 - Tập Một (KNTT)',
    envKey: 'VITE_SGK_TOAN_8_TAP_1',
    fileNameHint: '08-sgk-toan-8-tap-mot.pdf',
  },
  {
    id: 'toan-8-tap-2',
    grade: 'Khối 8',
    label: 'SGK Toán 8 - Tập Hai (KNTT)',
    envKey: 'VITE_SGK_TOAN_8_TAP_2',
    fileNameHint: '08-sgk-toan-8-tap-hai.pdf',
  },
  {
    id: 'toan-9-tap-1',
    grade: 'Khối 9',
    label: 'SGK Toán 9 - Tập Một (KNTT)',
    envKey: 'VITE_SGK_TOAN_9_TAP_1',
    fileNameHint: '09-sgk-toan-9-tap-mot.pdf',
  },
  {
    id: 'toan-9-tap-2',
    grade: 'Khối 9',
    label: 'SGK Toán 9 - Tập Hai (KNTT)',
    envKey: 'VITE_SGK_TOAN_9_TAP_2',
    fileNameHint: '09-sgk-toan-9-tap-hai.pdf',
  },
];

// Link chia sẻ Google Drive mặc định của 8 cuốn SGK Toán KNTT (Lớp 6–9)
const KNTT_HARDCODED_DRIVE_LINKS: Record<KnttVolumeId, string> = {
  'toan-6-tap-1': 'https://drive.google.com/file/d/14ajmnddyPH_2yWXyNoiB7nLSMcjKqdUo/view?usp=sharing',
  'toan-6-tap-2': 'https://drive.google.com/file/d/1pAuX6v119izT8qDPSVUXD27g14WgY2dV/view?usp=sharing',
  'toan-7-tap-1': 'https://drive.google.com/file/d/1iprQkb3GM8ZkxnhYsn4nWpYvVA4YUniG/view?usp=sharing',
  'toan-7-tap-2': 'https://drive.google.com/file/d/15nq0ducjm1s1OEBzlMASBTQGEg9Mm3JX/view?usp=sharing',
  'toan-8-tap-1': 'https://drive.google.com/file/d/174T2hpxtrWpKgJpcHdLowT5M-oa2kGOl/view?usp=sharing',
  'toan-8-tap-2': 'https://drive.google.com/file/d/1eecjzJFOmVejpB1V5uiKJJqgUHwlWXD5/view?usp=sharing',
  'toan-9-tap-1': 'https://drive.google.com/file/d/1ql0xkr7jxajAqQNE8P4Wn0LwvGDmlRj2/view?usp=sharing',
  'toan-9-tap-2': 'https://drive.google.com/file/d/1SuXGORlDAFTvWEUzXVM1m5cHSizTwHYJ/view?usp=drive_link',
};

const env = (import.meta as any).env || {};

export const KNTT_DEFAULT_DRIVE_LINKS: Record<KnttVolumeId, string> = {
  'toan-6-tap-1': String(env.VITE_SGK_TOAN_6_TAP_1 || KNTT_HARDCODED_DRIVE_LINKS['toan-6-tap-1'] || '').trim(),
  'toan-6-tap-2': String(env.VITE_SGK_TOAN_6_TAP_2 || KNTT_HARDCODED_DRIVE_LINKS['toan-6-tap-2'] || '').trim(),
  'toan-7-tap-1': String(env.VITE_SGK_TOAN_7_TAP_1 || KNTT_HARDCODED_DRIVE_LINKS['toan-7-tap-1'] || '').trim(),
  'toan-7-tap-2': String(env.VITE_SGK_TOAN_7_TAP_2 || KNTT_HARDCODED_DRIVE_LINKS['toan-7-tap-2'] || '').trim(),
  'toan-8-tap-1': String(env.VITE_SGK_TOAN_8_TAP_1 || KNTT_HARDCODED_DRIVE_LINKS['toan-8-tap-1'] || '').trim(),
  'toan-8-tap-2': String(env.VITE_SGK_TOAN_8_TAP_2 || KNTT_HARDCODED_DRIVE_LINKS['toan-8-tap-2'] || '').trim(),
  'toan-9-tap-1': String(env.VITE_SGK_TOAN_9_TAP_1 || KNTT_HARDCODED_DRIVE_LINKS['toan-9-tap-1'] || '').trim(),
  'toan-9-tap-2': String(env.VITE_SGK_TOAN_9_TAP_2 || KNTT_HARDCODED_DRIVE_LINKS['toan-9-tap-2'] || '').trim(),
};

/**
 * Trích xuất Google Drive File ID từ các định dạng link phổ biến:
 * - https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
 * - https://drive.google.com/file/d/<FILE_ID>/preview
 * - https://drive.google.com/open?id=<FILE_ID>
 * - https://drive.google.com/uc?id=<FILE_ID>&export=download
 * - Hoặc chính chuỗi <FILE_ID>
 */
export function extractGoogleDriveFileId(input?: string | null): string | null {
  const raw = String(input || '').trim();
  if (!raw) return null;

  // Dạng /file/d/<id>/...
  const fileMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]{15,})/);
  if (fileMatch?.[1]) return fileMatch[1];

  // Dạng ?id=<id> hoặc &id=<id>
  const queryMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]{15,})/);
  if (queryMatch?.[1]) return queryMatch[1];

  // Dạng /d/<id>
  const shortMatch = raw.match(/\/d\/([a-zA-Z0-9_-]{15,})/);
  if (shortMatch?.[1]) return shortMatch[1];

  // Chỉ dán trực tiếp File ID (không chứa khoảng trắng hay dấu /)
  if (/^[a-zA-Z0-9_-]{20,60}$/.test(raw)) {
    return raw;
  }

  return null;
}

export interface ResolvedTextbookDriveLink {
  rawUrl: string;
  previewUrl: string;
  viewUrl: string;
  isGoogleDrive: boolean;
  isConfigured: boolean;
}

/**
 * Chuẩn hóa link Google Drive sang định dạng nhúng iframe (/preview) và mở tab ngoài (/view).
 */
export function normalizeTextbookUrl(rawInput?: string | null): ResolvedTextbookDriveLink {
  const raw = String(rawInput || '').trim();
  if (!raw) {
    return {
      rawUrl: '',
      previewUrl: '',
      viewUrl: '',
      isGoogleDrive: false,
      isConfigured: false,
    };
  }

  const fileId = extractGoogleDriveFileId(raw);
  if (fileId) {
    return {
      rawUrl: raw,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      viewUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
      isGoogleDrive: true,
      isConfigured: true,
    };
  }

  // Hỗ trợ trường hợp link thư mục Drive hoặc đường dẫn PDF trực tiếp (https://...)
  if (/^https?:\/\//i.test(raw)) {
    return {
      rawUrl: raw,
      previewUrl: raw,
      viewUrl: raw,
      isGoogleDrive: raw.includes('drive.google.com'),
      isConfigured: true,
    };
  }

  return {
    rawUrl: raw,
    previewUrl: '',
    viewUrl: '',
    isGoogleDrive: false,
    isConfigured: false,
  };
}

export function resolveKnttTextbookDriveUrls(
  volumeId: string,
  customLinks?: Record<string, string>,
  fallbackUrl?: string
): ResolvedTextbookDriveLink {
  const userLink = customLinks?.[volumeId]?.trim();
  if (userLink) {
    return normalizeTextbookUrl(userLink);
  }

  const defaultLink = (KNTT_DEFAULT_DRIVE_LINKS as Record<string, string>)[volumeId]?.trim();
  if (defaultLink) {
    return normalizeTextbookUrl(defaultLink);
  }

  if (fallbackUrl && /^https?:\/\//i.test(fallbackUrl.trim())) {
    return normalizeTextbookUrl(fallbackUrl);
  }

  return {
    rawUrl: '',
    previewUrl: '',
    viewUrl: '',
    isGoogleDrive: false,
    isConfigured: false,
  };
}
