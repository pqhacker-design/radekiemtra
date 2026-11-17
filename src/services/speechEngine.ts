// Web Speech API utility tailored for bilingual English–Vietnamese Mathematics pronunciation

export type SpeechAccent = 'en-US' | 'en-GB';
export type SpeechRate = 0.75 | 1.0;

export interface SpeechState {
  isPlaying: boolean;
  activeId: string | null;
  lang: string | null;
}

type StateListener = (state: SpeechState) => void;

const listeners = new Set<StateListener>();
let currentState: SpeechState = {
  isPlaying: false,
  activeId: null,
  lang: null,
};

let activeSequenceToken = 0;

function notifyListeners() {
  for (const listener of listeners) {
    try {
      listener({ ...currentState });
    } catch {
      // Ignore listener errors
    }
  }
}

export function subscribeSpeechState(listener: StateListener): () => void {
  listeners.add(listener);
  listener({ ...currentState });
  return () => {
    listeners.delete(listener);
  };
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

/**
 * Convert LaTeX notation inside $...$ / $$...$$ or raw math symbols into natural spoken words
 * so Web Speech API pronounces formulas clearly instead of reading raw backslashes or dollar signs.
 */
export function prepareMathSpeech(rawText: string, lang: 'en' | 'vi'): string {
  if (!rawText) return '';
  let text = rawText
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, ' ')
    .replace(/\\left/g, '')
    .replace(/\\right/g, '');

  if (lang === 'en') {
    text = text
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 over $2')
      .replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 over $2')
      .replace(/\\sqrt\[3\]\{([^{}]+)\}/g, 'the cube root of $1')
      .replace(/\\sqrt\{([^{}]+)\}/g, 'the square root of $1')
      .replace(/\\widehat\{([^{}]+)\}/g, 'angle $1')
      .replace(/\\overline\{([^{}]+)\}/g, 'segment $1')
      .replace(/\\triangle/g, 'triangle ')
      .replace(/\\angle/g, 'angle ')
      .replace(/\\mathbb\{N\}\^\*/g, 'N star')
      .replace(/\\mathbb\{([A-Z])\}/g, 'set $1')
      .replace(/\\notin/g, ' is not an element of ')
      .replace(/\\in\b/g, ' belongs to ')
      .replace(/\\subset/g, ' is a subset of ')
      .replace(/\\parallel/g, ' is parallel to ')
      .replace(/\\perp/g, ' is perpendicular to ')
      .replace(/\\cong/g, ' is congruent to ')
      .replace(/\\sim/g, ' is similar to ')
      .replace(/\\approx/g, ' is approximately equal to ')
      .replace(/\\ne\b|\\neq\b|≠/g, ' is not equal to ')
      .replace(/\\le\b|\\leq\b|≤/g, ' is less than or equal to ')
      .replace(/\\ge\b|\\geq\b|≥/g, ' is greater than or equal to ')
      .replace(/\\cdot|\\times|·|×/g, ' times ')
      .replace(/\\div|÷/g, ' divided by ')
      .replace(/\\pm|±/g, ' plus or minus ')
      .replace(/\\pi|π/g, ' pi ')
      .replace(/\\alpha|α/g, ' alpha ')
      .replace(/\\beta|β/g, ' beta ')
      .replace(/\\Delta|Δ/g, ' delta ')
      .replace(/\\Omega|Ω/g, ' omega ')
      .replace(/\\sin\b/g, 'sine ')
      .replace(/\\cos\b/g, 'cosine ')
      .replace(/\\tan\b/g, 'tangent ')
      .replace(/\\cot\b/g, 'cotangent ')
      .replace(/\\vdots/g, ' is divisible by ')
      .replace(/\^2|\u00b2/g, ' squared')
      .replace(/\^3|\u00b3/g, ' cubed')
      .replace(/\^\\circ|°/g, ' degrees')
      .replace(/\\Rightarrow|⇒/g, ' implies ')
      .replace(/\\Leftrightarrow|⇔/g, ' if and only if ')
      .replace(/\\text\{([^{}]+)\}/g, '$1')
      .replace(/[{}]/g, ' ')
      .replace(/%/g, ' percent')
      .replace(/=/g, ' equals ')
      .replace(/</g, ' is less than ')
      .replace(/>/g, ' is greater than ');
  } else {
    text = text
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 phần $2')
      .replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 phần $2')
      .replace(/\\sqrt\[3\]\{([^{}]+)\}/g, 'căn bậc ba của $1')
      .replace(/\\sqrt\{([^{}]+)\}/g, 'căn bậc hai của $1')
      .replace(/\\widehat\{([^{}]+)\}/g, 'góc $1')
      .replace(/\\overline\{([^{}]+)\}/g, 'đoạn thẳng $1')
      .replace(/\\triangle/g, 'tam giác ')
      .replace(/\\angle/g, 'góc ')
      .replace(/\\mathbb\{N\}\^\*/g, 'N sao')
      .replace(/\\mathbb\{([A-Z])\}/g, 'tập hợp $1')
      .replace(/\\notin/g, ' không thuộc ')
      .replace(/\\in\b/g, ' thuộc ')
      .replace(/\\parallel/g, ' song song với ')
      .replace(/\\perp/g, ' vuông góc với ')
      .replace(/\\cong/g, ' bằng ')
      .replace(/\\sim/g, ' đồng dạng với ')
      .replace(/\\approx/g, ' xấp xỉ ')
      .replace(/\\ne\b|\\neq\b|≠/g, ' khác ')
      .replace(/\\le\b|\\leq\b|≤/g, ' nhỏ hơn hoặc bằng ')
      .replace(/\\ge\b|\\geq\b|≥/g, ' lớn hơn hoặc bằng ')
      .replace(/\\cdot|\\times|·|×/g, ' nhân ')
      .replace(/\\div|÷/g, ' chia ')
      .replace(/\\pm|±/g, ' cộng trừ ')
      .replace(/\\pi|π/g, ' pi ')
      .replace(/\\alpha|α/g, ' an-pha ')
      .replace(/\\beta|β/g, ' bê-ta ')
      .replace(/\\Delta|Δ/g, ' đen-ta ')
      .replace(/\\Omega|Ω/g, ' ô-mê-ga ')
      .replace(/\\sin\b/g, 'sin ')
      .replace(/\\cos\b/g, 'cô-sin ')
      .replace(/\\tan\b/g, 'tang ')
      .replace(/\\cot\b/g, 'cô-tang ')
      .replace(/\\vdots/g, ' chia hết cho ')
      .replace(/\^2|\u00b2/g, ' bình phương')
      .replace(/\^3|\u00b3/g, ' lập phương')
      .replace(/\^\\circ|°/g, ' độ')
      .replace(/\\Rightarrow|⇒/g, ' suy ra ')
      .replace(/\\Leftrightarrow|⇔/g, ' tương đương ')
      .replace(/\\text\{([^{}]+)\}/g, '$1')
      .replace(/[{}]/g, ' ')
      .replace(/%/g, ' phần trăm')
      .replace(/=/g, ' bằng ')
      .replace(/</g, ' nhỏ hơn ')
      .replace(/>/g, ' lớn hơn ');
  }

  return text.replace(/\\/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

function pickBestVoice(langCode: string): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const exact = voices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase());
  if (exact) return exact;

  const prefix = langCode.split('-')[0].toLowerCase();
  const samePrefix = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  if (samePrefix.length > 0) {
    const preferred = samePrefix.find((v) => /google|natural|samantha|daniel|linh|minh/i.test(v.name));
    return preferred || samePrefix[0];
  }
  return null;
}

export function stopSpeaking() {
  activeSequenceToken++;
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
  currentState = {
    isPlaying: false,
    activeId: null,
    lang: null,
  };
  notifyListeners();
}

export interface SpeakItem {
  text: string;
  lang: SpeechAccent | 'vi-VN';
  rate?: SpeechRate;
  isMath?: boolean;
}

export function speakSequence(items: SpeakItem[], activeId: string) {
  if (!isSpeechSupported() || items.length === 0) return;

  stopSpeaking();
  const token = ++activeSequenceToken;

  let index = 0;

  const playNext = () => {
    if (token !== activeSequenceToken) return;
    if (index >= items.length) {
      currentState = { isPlaying: false, activeId: null, lang: null };
      notifyListeners();
      return;
    }

    const item = items[index++];
    const langPrefix: 'en' | 'vi' = item.lang.startsWith('vi') ? 'vi' : 'en';
    const cleanText = item.isMath === false ? item.text : prepareMathSpeech(item.text, langPrefix);

    if (!cleanText) {
      playNext();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = item.lang;
    utterance.rate = item.rate ?? 1.0;

    const voice = pickBestVoice(item.lang);
    if (voice) {
      utterance.voice = voice;
    }

    currentState = {
      isPlaying: true,
      activeId,
      lang: item.lang,
    };
    notifyListeners();

    utterance.onend = () => {
      if (token === activeSequenceToken) {
        playNext();
      }
    };

    utterance.onerror = () => {
      if (token === activeSequenceToken) {
        currentState = { isPlaying: false, activeId: null, lang: null };
        notifyListeners();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  playNext();
}

export function speakSingle(
  text: string,
  activeId: string,
  lang: SpeechAccent | 'vi-VN',
  rate: SpeechRate = 1.0
) {
  if (currentState.isPlaying && currentState.activeId === activeId) {
    stopSpeaking();
    return;
  }
  speakSequence([{ text, lang, rate, isMath: true }], activeId);
}
