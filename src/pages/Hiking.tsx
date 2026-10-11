import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, ArrowRight, Globe, Mountain } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MediaGallery from '@/components/MediaGallery';
import { getMedia, type MediaItem } from '@/lib/media';
import ThemedTileLayer from '@/components/map/ThemedTileLayer';

interface Hike {
  year: number;
  /** Folder name under src/media/hiking/ for this hike's photos and videos. */
  slug: string;
  name: string;
  /** Trailhead / summit location (approximate - from OpenStreetMap search). */
  position: L.LatLngTuple;
  /** Zoom level when the map flies to this hike. */
  zoom: number;
  /** Photo for the hike; a placeholder shows until one is added. */
  image?: string;
  alt?: string;
  /** Personal details - shown as "To be added" until filled in. */
  difficulty?: string;
  time?: string;
  pace?: string;
  /** About the place. */
  description?: string;
}

interface Region {
  id: string;
  name: string;
  /** Where the numbered badge sits on the world map. */
  badge: L.LatLngTuple;
  /** Where the map flies when the region is opened. */
  view: L.LatLngTuple;
  zoom: number;
  hikes: Hike[];
}

const regions: Region[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    badge: [54, -2.5],
    view: [54.6, -2.5],
    zoom: 6,
    hikes: [
      { year: 2019, slug: 'mam-tor', name: 'Mam Tor (Peak District, England)', position: [53.3493, -1.8096], zoom: 14, description: 'A hill in the Peak District known as the "Shivering Mountain" because of its unstable shale slopes. A short climb rewards you with wide views over the Hope and Edale valleys.' },
      { year: 2021, slug: 'arthurs-seat', name: "Arthur's Seat (Edinburgh, Scotland)", position: [55.9441, -3.1616], zoom: 14, description: 'An extinct volcano in Holyrood Park, right in the middle of Edinburgh. The summit looks out over the city, the Firth of Forth and the Pentland Hills.' },
    ],
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    badge: [4.2, 102],
    view: [4.4, 102],
    zoom: 6,
    hikes: [
      { year: 2023, slug: 'bukit-pau-kemensah', name: 'Bukit Pau - Kemensah', position: [3.2354, 101.7746], zoom: 15 },
      { year: 2024, slug: 'bukit-broga', name: 'Bukit Broga', position: [2.9504, 101.903], zoom: 15, description: 'A popular hill near Semenyih, Selangor, best known for its sunrise views over the clouds and the Semenyih valley.' },
      { year: 2024, slug: 'bukit-desa-damai', name: 'Bukit Desa Damai', position: [3.562, 101.8797], zoom: 15 },
      { year: 2024, slug: 'bukit-guling-ayam', name: 'Bukit Guling Ayam', position: [3.2436, 101.7162], zoom: 15 },
      { year: 2024, slug: 'kanching-waterfalls', name: 'Kanching Waterfalls', position: [3.3036, 101.619], zoom: 16, description: 'A multi-tiered waterfall near Rawang, Selangor, with pools along the stream that make it a favourite weekend stop close to Kuala Lumpur.' },
      { year: 2024, slug: 'bukit-talipong', name: 'Bukit Talipong', position: [6.4233, 100.371], zoom: 15 },
      { year: 2024, slug: 'sungai-pisang-waterfalls', name: 'Sungai Pisang Waterfalls', position: [3.3144, 101.7276], zoom: 15 },
      { year: 2025, slug: 'gunung-angsi', name: 'Gunung Angsi, Negeri Sembilan', position: [2.6986, 102.048], zoom: 14, description: 'One of Negeri Sembilan\'s best-known peaks, a steady forest climb with views over the state from the top.' },
      { year: 2025, slug: 'gunung-datuk', name: 'Gunung Datuk, Negeri Sembilan', position: [2.5509, 102.1826], zoom: 14, description: 'A well-known mountain near Rembau, Negeri Sembilan, with a long forest trail leading up to a rocky summit.' },
      { year: 2025, slug: 'gunung-keriang', name: 'Gunung Keriang', position: [6.1872, 100.3317], zoom: 15, description: 'A limestone hill rising out of the paddy fields near Alor Setar, Kedah, with views across the Kedah plains.' },
      { year: 2025, slug: 'tasik-cermin', name: 'Tasik Cermin', position: [3.1319, 101.4804], zoom: 15 },
      { year: 2026, slug: 'bukit-perangin-waterfalls', name: 'Bukit Perangin Waterfalls', position: [6.371, 100.5174], zoom: 15 },
    ],
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    badge: [-7.5, 112.5],
    view: [-8.0, 112.95],
    zoom: 9,
    hikes: [
      { year: 2026, slug: 'tumpak-sewu', name: 'Tumpak Sewu Waterfall', position: [-8.2303, 112.9165], zoom: 14, description: 'Often called the "thousand waterfalls", a wide curtain of falls in East Java that pours into a deep, mist-filled canyon.' },
      { year: 2026, slug: 'kapas-biru', name: 'Kapas Biru Waterfall', position: [-8.2202, 112.9402], zoom: 15 },
      { year: 2026, slug: 'madakaripura', name: 'Madakaripura Waterfall', position: [-7.8553, 113.0077], zoom: 15, description: 'A tall waterfall in East Java, reached by a stream-side walk into a narrow gorge, and close to Mount Bromo.' },
      { year: 2026, slug: 'mount-bromo', name: 'Mount Bromo', position: [-7.9421, 112.953], zoom: 13, description: 'An active volcano in East Java\'s Tengger caldera, famous for its sunrise views over a sea of sand and neighbouring volcanoes.' },
    ],
  },
];

const WORLD = L.latLngBounds([-70, -180], [80, 180]);
const OPENING_BOUNDS = L.latLngBounds([-12, -8], [58, 122]);

// Text sits straight on the map, lifted by a glow in the page background colour.
const halo = '[text-shadow:0_0_10px_hsl(var(--background)),0_0_4px_hsl(var(--background))]';

const badgeIcon = (r: Region, active: boolean, dark: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [72, 72],
    iconAnchor: [36, 36],
    html: `<div style="position:relative;width:72px;height:72px">
      <div style="width:72px;height:72px;border-radius:9999px;background:#2563EB;color:#fff;display:flex;align-items:center;justify-content:center;font:700 28px/1 system-ui,sans-serif;border:4px solid ${
        active ? '#fff' : 'rgba(255,255,255,.85)'
      };box-shadow:0 4px 14px rgba(0,0,0,.35)${active ? ',0 0 0 5px rgba(37,99,235,.35)' : ''}">${r.hikes.length}</div>
      <div style="position:absolute;top:78px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 13px/1 system-ui,sans-serif;color:${dark ? '#f3f4f6' : '#1a1d21'};text-shadow:0 0 6px ${dark ? '#111' : '#fff'},0 0 3px ${dark ? '#111' : '#fff'}">${r.name}</div>
    </div>`,
  });

// Flies to the open hike, else the open region (landing in the free left half on desktop), else the whole world.
const Camera = ({ region, hike }: { region: Region | null; hike: Hike | null }) => {
  const map = useMap();
  const skipFirst = useRef(true);
  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    if (!region) {
      map.flyToBounds(OPENING_BOUNDS, { paddingTopLeft: [60, 140], paddingBottomRight: [60, 90], duration: 1.2 });
      return;
    }
    const centre = hike ? hike.position : region.view;
    const zoom = hike ? hike.zoom : region.zoom;
    const { x: w, y: h } = map.getSize();
    const shift = w >= 768 ? L.point(w * 0.24, -h * 0.04) : L.point(0, h * 0.18);
    map.flyTo(map.unproject(map.project(centre, zoom).add(shift), zoom), zoom, { duration: 1.2 });
  }, [region, hike, map]);
  return null;
};

// Zooming out to continent level closes the open country and returns to the world view.
const WORLD_VIEW_MAX_ZOOM = 4;
const ZoomOutWatcher = ({ minZoom, onZoomedOut }: { minZoom: number; onZoomedOut: () => void }) => {
  const map = useMap();
  useMapEvents({
    zoomend: () => {
      if (map.getZoom() <= Math.max(minZoom, WORLD_VIEW_MAX_ZOOM)) onZoomedOut();
    },
  });
  return null;
};

const hikeIcon = (active: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    html: `<div style="width:${active ? 34 : 20}px;height:${active ? 34 : 20}px;margin:${active ? 0 : 7}px;border-radius:9999px;background:#2563EB;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4)${
      active ? ',0 0 0 6px rgba(37,99,235,.3)' : ''
    }"></div>`,
  });

const TBD = <span className="italic text-foreground/60">To be added</span>;

const HikeDetail = ({ hike, region, onBack }: { hike: Hike; region: string; onBack: () => void }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  // Photos and videos dropped into src/media/hiking/<slug>/; a single `image` on the hike is the fallback.
  const items = useMemo<MediaItem[]>(() => {
    const found = getMedia('hiking', hike.slug);
    if (found.length) return found;
    return hike.image ? [{ src: hike.image, type: 'image', name: 'image', alt: hike.alt }] : [];
  }, [hike]);

  return (
  <div>
    <button type="button" onClick={onBack} className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-foreground/70 hover:text-foreground">
      <ArrowLeft size={16} aria-hidden="true" /> All {region} hikes
    </button>
    <MediaGallery
      items={items}
      index={photoIndex}
      onIndexChange={setPhotoIndex}
      label={hike.name}
      placeholderIcon={<Mountain size={36} aria-hidden="true" />}
      className="w-full h-32 md:h-auto md:max-h-[30vh] md:aspect-[16/10] -rotate-1 motion-reduce:rotate-0"
    />
    <p className="mt-4 text-sm font-semibold text-primary">
      {hike.year} · {region}
    </p>
    <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">{hike.name}</h2>
    <dl className="mt-3 grid grid-cols-3 gap-4 text-sm">
      {[
        ['Difficulty', hike.difficulty],
        ['Time taken', hike.time],
        ['Pace', hike.pace],
      ].map(([label, value]) => (
        <div key={label}>
          <dt className="font-semibold text-primary">{label}</dt>
          <dd className="mt-0.5">{value ?? TBD}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-3 text-[1.0625rem] leading-[1.65] text-foreground/90">{hike.description ?? TBD}</p>
  </div>
  );
};

const Hiking = () => {
  const { resolvedTheme } = useTheme();
  const [selected, setSelected] = useState<Region | null>(null);
  const [hike, setHike] = useState<Hike | null>(null);
  const hikeIndex = selected && hike ? selected.hikes.indexOf(hike) : -1;
  const openRegion = (r: Region | null) => {
    setSelected(r);
    setHike(null);
  };
  const total = useMemo(() => regions.reduce((n, r) => n + r.hikes.length, 0), []);
  const minZoom = Math.max(2, Math.ceil(Math.log2((typeof window !== 'undefined' ? window.innerWidth : 1024) / 256)));
  const wide = typeof window !== 'undefined' && window.innerWidth >= 768;

  useEffect(() => {
    document.title = 'My Hiking Journey | Aidiel Ziat';
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <MapContainer
        bounds={OPENING_BOUNDS}
        boundsOptions={{ paddingTopLeft: [60, wide ? 140 : 170], paddingBottomRight: [60, 90] }}
        minZoom={minZoom}
        maxBounds={WORLD}
        maxBoundsViscosity={1}
        scrollWheelZoom
        wheelDebounceTime={150}
        zoomControl={false}
        className="h-full w-full"
      >
        <ThemedTileLayer />
        <ZoomControl position="bottomleft" />
        {!selected &&
          regions.map((r) => (
          <Marker
            key={r.id}
            position={r.badge}
            icon={badgeIcon(r, selected?.id === r.id, resolvedTheme === 'dark')}
            title={`${r.name}: ${r.hikes.length} hikes`}
            alt={`${r.name}: ${r.hikes.length} hikes`}
            eventHandlers={{ click: () => openRegion(r) }}
          />
        ))}
        {selected &&
          selected.hikes.map((h) => (
            <Marker
              key={`${h.year}-${h.name}`}
              position={h.position}
              icon={hikeIcon(hike === h)}
              title={h.name}
              alt={h.name}
              eventHandlers={{ click: () => setHike(h) }}
            />
          ))}
        <Camera region={selected} hike={hike} />
        {selected && <ZoomOutWatcher minZoom={minZoom} onZoomedOut={() => openRegion(null)} />}
      </MapContainer>

      {/* Gradients behind the title and bottom hint keep text readable over busy map labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[900] h-40 bg-gradient-to-b from-background/85 via-background/45 to-transparent" />
      {!selected && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[900] h-28 bg-gradient-to-t from-background/85 via-background/45 to-transparent" />
      )}
      {selected && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-[1050] inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-background/95 via-background/80 to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-[58%] md:bg-gradient-to-l"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-[1100] p-5 md:p-10">
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
          <h1 className={`md:order-1 md:whitespace-nowrap text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-tight ${halo}`}>
            My hiking journey so far…{' '}
            <span className="text-[0.55em] font-medium text-foreground/80 md:ml-2">More to come!</span>
          </h1>
          <div className="pointer-events-auto flex items-center justify-between gap-2 md:order-2">
            <Link to="/" className={`inline-flex items-center gap-2 min-h-[44px] text-sm font-medium hover:text-primary ${halo}`}>
              <ArrowLeft size={16} aria-hidden="true" /> Home
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {selected ? (
          <section
            aria-label={`${selected.name} hikes`}
            className={`pointer-events-auto absolute inset-x-5 bottom-5 max-h-[45vh] md:inset-x-auto md:right-10 md:top-32 md:bottom-10 md:w-[42%] md:max-h-none flex flex-col ${halo}`}
          >
            {/* Pinned: stays put while the list below scrolls */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => openRegion(null)}
                className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-primary hover:underline"
              >
                <Globe size={16} aria-hidden="true" /> Back to world map
              </button>
              {!hike && (
                <>
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">{selected.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {selected.hikes.length} {selected.hikes.length === 1 ? 'hike' : 'hikes'}. Tap one for details.
                  </p>
                </>
              )}
            </div>
            <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-2">
              {hike ? (
                <HikeDetail key={hike.slug} hike={hike} region={selected.name} onBack={() => setHike(null)} />
              ) : (
                <ol>
                  {selected.hikes.map((h) => (
                    <li key={`${h.year}-${h.name}`}>
                      <button
                        type="button"
                        onClick={() => setHike(h)}
                        className="flex w-full min-h-[44px] items-center gap-3 text-left text-[1.0625rem] font-medium leading-snug hover:text-primary"
                      >
                        <span className="w-12 shrink-0 font-semibold text-primary">{h.year}</span>
                        <span className="underline decoration-foreground/30 underline-offset-4">{h.name}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {hike && (
              <div className="mt-2 flex shrink-0 items-center justify-between gap-4 border-t border-foreground/15 pt-1">
                <button
                  type="button"
                  onClick={() => setHike(selected.hikes[hikeIndex - 1])}
                  disabled={hikeIndex <= 0}
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-primary hover:underline disabled:opacity-40 disabled:no-underline"
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Previous
                </button>
                <span className="text-xs font-medium text-foreground/70">
                  {hikeIndex + 1} / {selected.hikes.length}
                </span>
                <button
                  type="button"
                  onClick={() => setHike(selected.hikes[hikeIndex + 1])}
                  disabled={hikeIndex >= selected.hikes.length - 1}
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-primary hover:underline disabled:opacity-40 disabled:no-underline"
                >
                  Next <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
        ) : (
          <p className={`absolute bottom-5 left-5 right-5 md:left-24 md:right-auto md:bottom-10 text-sm text-foreground/80 ${halo}`}>
            {total} hikes across {regions.length} countries. Tap a number to see where.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hiking;
