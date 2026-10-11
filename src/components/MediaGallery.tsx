import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { MediaItem } from '@/lib/media';

interface MediaGalleryProps {
  items: MediaItem[];
  index: number;
  onIndexChange: (i: number) => void;
  /** Used for alt text, e.g. the place name. */
  label: string;
  /** Size / layout classes for the frame. */
  className?: string;
  placeholderIcon?: ReactNode;
}

const navButton =
  'absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

// A photo/video frame with previous/next buttons over the picture when there is more than one item.
const MediaGallery = ({ items, index, onIndexChange, label, className = '', placeholderIcon }: MediaGalleryProps) => {
  const frame = `relative overflow-hidden rounded-3xl border-4 border-white shadow-xl ${className}`;

  if (items.length === 0) {
    return (
      <div
        role="img"
        aria-label={`Photo of ${label} coming soon`}
        className={`${frame} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/25 to-primary/5 text-foreground/60 [text-shadow:none]`}
      >
        {placeholderIcon ?? <ImageIcon size={36} aria-hidden="true" />}
        <span className="text-sm font-medium">Photo coming soon</span>
      </div>
    );
  }

  const i = Math.min(index, items.length - 1);
  const item = items[i];
  const many = items.length > 1;
  const go = (n: number) => onIndexChange((n + items.length) % items.length);

  return (
    <div className={frame}>
      {item.type === 'video' ? (
        <video key={item.src} src={item.src} controls playsInline preload="metadata" className="h-full w-full object-cover" aria-label={`Video of ${label}`} />
      ) : (
        <img key={item.src} src={item.src} alt={item.alt ?? item.caption ?? `${label}, photo ${i + 1}`} className="h-full w-full object-cover" />
      )}
      {many && (
        <>
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous photo" className={`${navButton} left-2`}>
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next photo" className={`${navButton} right-2`}>
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-0.5 text-xs font-medium text-white">
            {i + 1} / {items.length}
          </span>
        </>
      )}
    </div>
  );
};

export default MediaGallery;
