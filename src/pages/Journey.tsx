import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle, CircleMarker, MapContainer, Marker, Polyline, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MediaGallery from '@/components/MediaGallery';
import { getMedia, type MediaItem } from '@/lib/media';
import ThemedTileLayer from '@/components/map/ThemedTileLayer';
import CurvedArrow from '@/components/map/CurvedArrow';

interface Stop {
  id: string;
  title: string;
  /** Short label for the timeline. */
  short: string;
  place: string;
  position: L.LatLngTuple;
  /** Pixel offset applied to the thumbnail when zoomed out, so close-by places don't overlap. */
  fan?: [number, number];
  /** Zoom level when the map flies to this stop. */
  zoom?: number;
  /** Stops in Malaysia frame the opening view. */
  inMalaysia?: boolean;
  /** Draft copy - replace with your own words. */
  blurb: string;
  image: string;
  alt: string;
  /** Map pin thumbnail; defaults to `image`. */
  icon?: string;
}

// Travel order. Coordinates are approximate - adjust to the exact campus if needed.
// Next up: University of Manchester (UK), zoomed out to the world.
const stops: Stop[] = [
  {
    id: 'siputeh',
    short: 'Primary\nschool',
    title: 'SK Siputeh',
    place: 'Kodiang, Kedah',
    position: [6.3667, 100.3],
    fan: [-80, -50],
    inMalaysia: true,
    zoom: 10,
    blurb:
      'Where it all began. A small-town school in Kodiang, surrounded by paddy fields and limestone hills, and the place I first got curious about the world beyond Kedah.',
    image: '/images/journey/sk-siputeh.jpg',
    alt: 'Entrance sign of Sekolah Kebangsaan Siputeh, Kodiang, Kedah',
  },
  {
    id: 'mrsm',
    short: 'Secondary\nschool',
    title: 'MRSM Kubang Pasu',
    place: 'Kubang Pasu, Kedah',
    position: [6.26, 100.43],
    fan: [80, 40],
    inMalaysia: true,
    zoom: 10,
    blurb:
      'Secondary school at MRSM Kubang Pasu, still in Kedah but my first time living away from home and learning to be independent.',
    image: '/images/journey/secondary-school.png',
    alt: 'MRSM Kubang Pasu school building with palm trees in front',
  },
  {
    id: 'kmb',
    short: 'College',
    title: 'Kolej MARA Banting',
    place: 'Banting, Selangor',
    position: [2.82, 101.5],
    fan: [-75, 60],
    inMalaysia: true,
    zoom: 10,
    blurb:
      'Further south to Kolej MARA Banting in Selangor, the stepping stone towards university in the UK.',
    image: '/images/journey/kolej-mara-banting.jpg',
    alt: 'Kolej MARA Banting campus with the "I love KMB" sign',
  },
  {
    id: 'manchester',
    short: 'Degree',
    title: 'University of Manchester',
    place: 'Manchester, United Kingdom',
    position: [53.4668, -2.2339],
    zoom: 10,
    blurb: 'Across the world to the University of Manchester, where I studied Mathematics and Statistics from 2019 to 2022.',
    image: '/images/journey/manchester.jpg',
    alt: 'The Whitworth Hall archway at the University of Manchester',
  },
  {
    id: 'pwc',
    short: 'PwC',
    title: 'PwC Malaysia',
    place: 'Kuala Lumpur, Malaysia',
    position: [3.134, 101.6863],
    fan: [95, -25],
    inMalaysia: true,
    zoom: 12,
    blurb: 'Back home to Kuala Lumpur as an Associate in Financial Risk, building credit risk models for financial services clients (2022 to 2024).',
    icon: '/logos/pwc.jpeg',
    image: '/images/journey/pwc-office.jpg',
    alt: 'PwC sign on the side of an office building in Kuala Lumpur',
  },
  {
    id: 'um',
    short: 'Masters',
    title: 'Universiti Malaya',
    place: 'Kuala Lumpur, Malaysia',
    position: [3.1209, 101.6538],
    fan: [35, 85],
    inMalaysia: true,
    zoom: 12,
    blurb: 'Studying for a Master of Artificial Intelligence at Universiti Malaya (2024 to 2026, expected).',
    icon: '/logos/universiti-malaya.jpeg',
    image: '/images/journey/universiti-malaya.jpg',
    alt: 'Universiti Malaya sign and crest at the campus gate',
  },
  {
    id: 'deloitte',
    short: 'Deloitte',
    title: 'Deloitte Malaysia',
    place: 'Kuala Lumpur, Malaysia',
    position: [3.1396, 101.627],
    fan: [-95, -35],
    inMalaysia: true,
    zoom: 12,
    blurb: 'Now a Consultant in AI & Data at Deloitte, delivering cloud data pipelines and machine learning solutions (2024 to present).',
    icon: '/logos/deloitte.jpeg',
    image: '/images/journey/deloitte-office.jpg',
    alt: 'Deloitte sign on a glass office tower in Kuala Lumpur',
  },
];

// One soft circle around Kuala Lumpur and Banting. Every trip in or out of the area meets its edge.
const HUB_CENTER: L.LatLngTuple = [2.98, 101.59];
const HUB_RADIUS_M = 32000;

// Point on the hub's edge facing `toward`, measured in map (Web Mercator) space so it matches what is drawn.
const hubEdge = (toward: L.LatLngTuple): L.LatLngTuple => {
  const crs = L.CRS.EPSG3857;
  const c = crs.project(L.latLng(HUB_CENTER));
  const t = crs.project(L.latLng(toward));
  const len = Math.hypot(t.x - c.x, t.y - c.y);
  const r = HUB_RADIUS_M / Math.cos((HUB_CENTER[0] * Math.PI) / 180);
  const ll = crs.unproject(L.point(c.x + ((t.x - c.x) / len) * r, c.y + ((t.y - c.y) / len) * r));
  return [ll.lat, ll.lng];
};

type Point = { id: string; position: L.LatLngTuple };
const stopPos = (id: string) => stops.find((s) => s.id === id)!.position;
const point = (id: string): Point => ({ id, position: stopPos(id) });

// Arrows on the map. The KL-area places hang off the hub circle, so there are no arrows between them.
// `minZoom` hides an arrow when zoomed out past it (short hops look clunky). Bulge sign picks which side the curve bows to.
const edges: { from: Point; to: Point; bulge: number; bidirectional?: boolean; minZoom?: number }[] = [
  { from: point('siputeh'), to: point('mrsm'), bulge: 0.3, minZoom: 10 },
  { from: point('mrsm'), to: { id: 'hub-north', position: hubEdge(stopPos('mrsm')) }, bulge: -0.2, minZoom: 7 },
  {
    from: { id: 'hub-west', position: hubEdge(stopPos('manchester')) },
    to: point('manchester'),
    bulge: 0.2,
    bidirectional: true,
  },
];

// Text sits straight on the map, lifted by a glow in the page background colour.
const halo = '[text-shadow:0_0_10px_hsl(var(--background)),0_0_4px_hsl(var(--background))]';

const WORLD = L.latLngBounds([-70, -180], [80, 180]);

const FAN_FULL_ZOOM = 8; // fully fanned out at/below this zoom
const FAN_NONE_ZOOM = 11; // no offset at/above this zoom

const thumbIcon = (s: Stop, active: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    html: `<div style="width:64px;height:64px;border-radius:9999px;overflow:hidden;border:4px solid ${
      active ? '#2563EB' : '#fff'
    };box-shadow:0 4px 14px rgba(0,0,0,.35);background:#fff url('${s.icon ?? s.image}') center/${s.icon ? 'contain' : 'cover'} no-repeat;transform:scale(${
      active ? 1.15 : 1
    })"></div>`,
  });

// Reports whether the map is at its minimum zoom, so the page can drop the text and photo.
const ZoomWatcher = ({ minZoom, onChange }: { minZoom: number; onChange: (zoomedOut: boolean) => void }) => {
  const map = useMap();
  useMapEvents({ zoomend: () => onChange(map.getZoom() <= minZoom) });
  return null;
};

const FlyTo = ({ target }: { target: Stop | null }) => {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    const zoom = target.zoom ?? Math.max(map.getZoom(), 9);
    // On desktop the text column covers the right half, so land the pin in the middle of the free left half.
    const { x: w, y: h } = map.getSize();
    const shift = w >= 768 ? L.point(w * 0.24, -h * 0.04) : L.point(0, h * 0.18);
    map.flyTo(map.unproject(map.project(target.position, zoom).add(shift), zoom), zoom, { duration: 1.2 });
  }, [target, map]);
  return null;
};

const displayedPositions = (map: L.Map): L.LatLngTuple[] => {
  const z = map.getZoom();
  const f = Math.min(1, Math.max(0, (FAN_NONE_ZOOM - z) / (FAN_NONE_ZOOM - FAN_FULL_ZOOM)));
  return stops.map((s) => {
    if (!s.fan || f === 0) return s.position;
    const ll = map.unproject(map.project(s.position, z).add(L.point(s.fan[0] * f, s.fan[1] * f)), z);
    return [ll.lat, ll.lng] as L.LatLngTuple;
  });
};

// Pins, leader lines and arrows. Thumbnails of nearby places fan apart when zoomed out.
const JourneyLayer = ({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) => {
  const map = useMap();
  const [, setTick] = useState(0);
  useMapEvents({ zoomend: () => setTick((n) => n + 1) });

  const f = Math.min(1, Math.max(0, (FAN_NONE_ZOOM - map.getZoom()) / (FAN_NONE_ZOOM - FAN_FULL_ZOOM)));
  const shown = displayedPositions(map);

  return (
    <>
      {stops.map(
        (s, i) =>
          s.fan &&
          f > 0 && (
            <Polyline key={`l-${s.id}`} positions={[s.position, shown[i]]} pathOptions={{ color: '#2563EB', weight: 2 }} />
          ),
      )}
      {stops.map((s) => (
        <CircleMarker
          key={`d-${s.id}`}
          center={s.position}
          radius={5}
          pathOptions={{ color: '#fff', weight: 2, fillColor: '#2563EB', fillOpacity: 1 }}
          interactive={false}
        />
      ))}
      {edges
        .filter((e) => map.getZoom() >= (e.minZoom ?? 0))
        .map((e) => (
        <CurvedArrow key={`${e.from.id}-${e.to.id}`} from={e.from.position} to={e.to.position} bulge={e.bulge} bidirectional={e.bidirectional} inset={3} minSag={45} />
      ))}
      <Circle
        center={HUB_CENTER}
        radius={HUB_RADIUS_M}
        pathOptions={{ color: '#2563EB', weight: 1.5, opacity: 0.5, dashArray: '4 6', fillColor: '#2563EB', fillOpacity: 0.06 }}
        interactive={false}
      />
      {stops.map((s, i) => (
        <Marker
          key={s.id}
          position={shown[i]}
          icon={thumbIcon(s, i === selected)}
          title={s.title}
          alt={s.title}
          eventHandlers={{ click: () => onSelect(i) }}
        />
      ))}
    </>
  );
};

// Opening view = the first stop (primary school) selected: same framing as clicking it.
const viewFor = (stop: Stop, width: number, height: number) => {
  const zoom = stop.zoom ?? 10;
  const shift = width >= 768 ? L.point(width * 0.24, -height * 0.04) : L.point(0, height * 0.18);
  const crs = L.CRS.EPSG3857;
  const ll = crs.pointToLatLng(crs.latLngToPoint(L.latLng(stop.position), zoom).add(shift), zoom);
  return { center: [ll.lat, ll.lng] as L.LatLngTuple, zoom };
};

const Journey = () => {
  const [selected, setSelected] = useState(0);
  const initialView = useMemo(() => viewFor(stops[0], window.innerWidth, window.innerHeight), []);
  const [zoomedOut, setZoomedOut] = useState(false);
  const [flyTarget, setFlyTarget] = useState<Stop | null>(null);
  const current = stops[selected];
  const [photoIndex, setPhotoIndex] = useState(0);
  // Photos dropped into src/media/journey/<stop>/; the original placeholder photo until then.
  const items = useMemo<MediaItem[]>(() => {
    const found = getMedia('journey', current.id);
    return found.length ? found : [{ src: current.image, type: 'image', name: 'placeholder', alt: current.alt }];
  }, [current]);
  const caption = items[Math.min(photoIndex, items.length - 1)]?.caption ?? current.blurb;
  // Smallest zoom at which one copy of the world still fills the screen width (no repeated maps).
  const minZoom = Math.max(2, Math.ceil(Math.log2((typeof window !== 'undefined' ? window.innerWidth : 1024) / 256)));

  useEffect(() => {
    document.title = 'My Life Journey | Aidiel Ziat';
  }, []);

  const select = (i: number) => {
    setSelected(i);
    setPhotoIndex(0);
    setFlyTarget(stops[i]);
  };

  return (
    <div className="fixed inset-0 bg-background">
      <MapContainer
        center={initialView.center}
        zoom={initialView.zoom}
        scrollWheelZoom
        wheelDebounceTime={150}
        minZoom={minZoom}
        maxBounds={WORLD}
        maxBoundsViscosity={1}
        zoomControl={false}
        className="h-full w-full"
      >
        <ThemedTileLayer />
        <ZoomControl position="bottomleft" />
        <JourneyLayer selected={selected} onSelect={select} />
        <FlyTo target={flyTarget} />
        <ZoomWatcher minZoom={minZoom} onChange={setZoomedOut} />
      </MapContainer>

      {/* Gradients behind the title and bottom controls keep text readable over busy map labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[900] h-40 bg-gradient-to-b from-background/85 via-background/45 to-transparent" />
      {zoomedOut && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[900] h-32 bg-gradient-to-t from-background/85 via-background/45 to-transparent" />
      )}
      {/* Light wash behind the text column only, so the rest of the map stays clear */}
      {!zoomedOut && <div aria-hidden="true" className="pointer-events-none absolute z-[1050] inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-background/95 via-background/80 to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-[58%] md:bg-gradient-to-l" />}

      <div className="pointer-events-none absolute inset-0 z-[1100] p-5 md:p-10">
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
          <div className={`md:max-w-xl md:order-1 ${halo}`}>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">My Life Journey</h1>
          </div>
          <div className="pointer-events-auto flex items-center justify-between gap-2 md:order-2">
            <Link to="/" className={`inline-flex items-center gap-2 min-h-[44px] text-sm font-medium hover:text-primary ${halo}`}>
              <ArrowLeft size={16} aria-hidden="true" /> Home
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div
          className={
            zoomedOut
              ? 'absolute left-16 right-5 bottom-3 md:left-24 md:right-auto md:w-[560px] flex flex-col'
              : 'absolute inset-x-5 bottom-5 md:inset-x-auto md:right-10 md:top-28 md:bottom-10 md:w-[42%] flex flex-col md:justify-center gap-4'
          }
        >
          {/* Timeline: jump straight to any stop */}
          <nav aria-label="Journey timeline" className="pointer-events-auto relative">
            <div aria-hidden="true" className="absolute top-[22px] h-0.5 bg-foreground/20" style={{ left: `${50 / stops.length}%`, right: `${50 / stops.length}%` }}>
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(selected / (stops.length - 1)) * 100}%` }} />
            </div>
            <ol className="relative flex overflow-x-auto md:overflow-visible">
              {stops.map((s, i) => (
                <li key={s.id} className="flex-1 min-w-[64px]">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={i === selected ? 'step' : undefined}
                    aria-label={`${s.title}, ${s.place}`}
                    className={`group flex w-full flex-col items-center gap-1 min-h-[44px] pt-4 ${halo} ${
                      i === selected ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 rounded-full border-2 border-white shadow transition-transform group-hover:scale-125 ${
                        i <= selected ? 'bg-primary' : 'bg-foreground/40'
                      } ${i === selected ? 'scale-150 ring-4 ring-primary/25' : ''}`}
                    />
                    <span className={`whitespace-pre-line text-center leading-tight text-xs ${i === selected ? 'font-bold' : 'font-medium'}`}>{s.short}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          {!zoomedOut && (
            <>
          <MediaGallery
            items={items}
            index={photoIndex}
            onIndexChange={setPhotoIndex}
            label={current.title}
            className="pointer-events-auto w-full h-32 md:h-auto md:max-h-[45vh] md:aspect-[16/10]"
          />
          <div className={`pointer-events-auto ${halo}`}>
            <p className="text-sm font-semibold text-primary">{current.place}</p>
            <h2 className="text-xl md:text-3xl font-bold leading-tight">{current.title}</h2>
            <p className="mt-2 text-[1.0625rem] leading-[1.65] text-foreground/90">{caption}</p>
            <div className="mt-1 flex items-center gap-4">
              {selected > 0 && (
                <button type="button" onClick={() => select(selected - 1)} className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-foreground/70 hover:text-foreground">
                  <ArrowLeft size={16} aria-hidden="true" /> Back
                </button>
              )}
              {selected < stops.length - 1 && (
                <button type="button" onClick={() => select(selected + 1)} className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-primary hover:underline">
                  Next: {stops[selected + 1].title} <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journey;
