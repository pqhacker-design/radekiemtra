import React from 'react';

interface DiagramRendererProps {
  diagram?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  showFrame?: boolean;
}

/**
 * Hiển thị linh hoạt cả hình ảnh PNG/WebP từ GeoGebra (data:image/...) lẫn mã vector SVG (<svg...>).
 */
export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  diagram,
  alt = 'Hình vẽ minh họa bài toán',
  className = '',
  imageClassName = 'max-h-72',
  showFrame = true,
}) => {
  if (!diagram || typeof diagram !== 'string') return null;
  const trimmed = diagram.trim();
  if (trimmed.length < 10) return null;

  const isDataImage = /^data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,/i.test(trimmed) || /^data:image\//i.test(trimmed);

  const frameClass = showFrame
    ? 'p-3 my-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto flex justify-center items-center shadow-2xs'
    : 'flex justify-center items-center overflow-x-auto';

  if (isDataImage) {
    return (
      <div className={`${frameClass} ${className}`}>
        <img
          src={trimmed}
          alt={alt}
          className={`max-w-full w-auto h-auto object-contain rounded-lg bg-white p-1 ${imageClassName}`}
        />
      </div>
    );
  }

  if (trimmed.includes('<svg')) {
    return (
      <div
        className={`${frameClass} ${className}`}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  return null;
};
