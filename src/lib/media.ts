// Picks up everything in src/media/<section>/<id>/ - see src/media/README.md.
export interface MediaItem {
  src: string;
  type: 'image' | 'video';
  /** Filename, used for ordering and caption lookup. */
  name: string;
  caption?: string;
  alt?: string;
}

const files = import.meta.glob('/src/media/**/*.{jpg,jpeg,png,webp,avif,gif,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const captionFiles = import.meta.glob('/src/media/**/captions.json', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, string>>;

const VIDEO = /\.(mp4|webm|mov)$/i;

export const getMedia = (section: 'journey' | 'hiking', id: string): MediaItem[] => {
  const folder = `/src/media/${section}/${id}/`;
  const captions = captionFiles[`${folder}captions.json`] ?? {};
  return Object.entries(files)
    .filter(([path]) => path.startsWith(folder))
    .map(([path, src]) => {
      const name = path.slice(folder.length);
      return { src, name, type: VIDEO.test(name) ? 'video' : 'image', caption: captions[name] } as MediaItem;
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};
