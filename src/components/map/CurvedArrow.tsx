import { useState } from 'react';
import { Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface CurvedArrowProps {
  from: L.LatLngTuple;
  to: L.LatLngTuple;
  /** Sideways bow of the curve as a fraction of the distance. Negative bows the other way. */
  bulge?: number;
  /** Pixels trimmed from each end so the arrow clears the pin thumbnails. */
  inset?: number;
  /** Minimum sideways bow in pixels, so very short hops still read as a curved arrow. */
  minSag?: number;
  /** Also draw a head at the start, for a two-way arrow. */
  bidirectional?: boolean;
  color?: string;
}

// Curve and arrowhead are computed in screen pixels and rebuilt on zoom,
// so the arrow keeps the same look at every zoom level.
const CurvedArrow = ({ from, to, bulge = 0.25, inset = 36, minSag = 0, bidirectional = false, color = '#2563EB' }: CurvedArrowProps) => {
  const map = useMap();
  const [, setZoomTick] = useState(0);
  useMapEvents({ zoomend: () => setZoomTick((n) => n + 1) });

  const z = map.getZoom();
  const p0 = map.project(from, z);
  const p1 = map.project(to, z);
  const dist = p0.distanceTo(p1);
  if (dist <= inset * 2 + 6) return null;

  const dir = p1.subtract(p0).divideBy(dist);
  const a = p0.add(dir.multiplyBy(inset));
  const b = p1.subtract(dir.multiplyBy(inset));
  const span = a.distanceTo(b);
  const bow = Math.sign(bulge || 1) * Math.max(Math.abs(bulge), (2 * minSag) / span);
  const mid = a.add(b).divideBy(2);
  const ctrl = L.point(mid.x - dir.y * span * bow, mid.y + dir.x * span * bow);

  const curve: L.LatLng[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const x = (1 - t) ** 2 * a.x + 2 * (1 - t) * t * ctrl.x + t ** 2 * b.x;
    const y = (1 - t) ** 2 * a.y + 2 * (1 - t) * t * ctrl.y + t ** 2 * b.y;
    curve.push(map.unproject(L.point(x, y), z));
  }

  // Arrowhead at `tip`, pointing away from the curve's control point.
  const headAt = (tip: L.Point) => {
    const t = tip.subtract(ctrl);
    const tl = Math.hypot(t.x, t.y) || 1;
    const tx = t.x / tl;
    const ty = t.y / tl;
    const side = (k: number) =>
      map.unproject(L.point(tip.x - tx * 14 - k * ty * 8, tip.y - ty * 14 + k * tx * 8), z);
    return [side(1), map.unproject(tip, z), side(-1)];
  };
  const headStyle = { color, weight: 3, lineCap: 'round', lineJoin: 'round' } as const;

  return (
    <>
      <Polyline positions={curve} pathOptions={{ color, weight: 3, dashArray: '2 8', lineCap: 'round' }} />
      <Polyline positions={headAt(b)} pathOptions={headStyle} />
      {bidirectional && <Polyline positions={headAt(a)} pathOptions={headStyle} />}
    </>
  );
};

export default CurvedArrow;
