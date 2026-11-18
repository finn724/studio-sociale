import { useSyncExternalStore } from "react";

type UAData = { brands?: { brand: string }[] };

let refractionSupport: boolean | null = null;

// SVG filters inside backdrop-filter only render in Chromium; everyone else gets frosted glass.
function detectRefraction(): boolean {
  if (refractionSupport !== null) return refractionSupport;
  const uaData = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
  const chromium = !!uaData?.brands?.some((b) =>
    /Chromium|Google Chrome|Microsoft Edge/i.test(b.brand)
  );
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedTransparency = window.matchMedia(
    "(prefers-reduced-transparency: reduce)"
  ).matches;
  refractionSupport = chromium && finePointer && !reducedTransparency;
  return refractionSupport;
}

const noopSubscribe = () => () => {};

export function useRefraction(): boolean {
  return useSyncExternalStore(noopSubscribe, detectRefraction, () => false);
}

const mapCache = new Map<string, string>();

const encode = (v: number) => Math.max(0, Math.min(255, Math.round(128 + v * 127)));

function render(
  key: string,
  w: number,
  h: number,
  sample: (px: number, py: number) => [number, number]
): string {
  const cached = mapCache.get(key);
  if (cached) return cached;

  const res = 0.5;
  const cw = Math.max(4, Math.round(w * res));
  const ch = Math.max(4, Math.round(h * res));
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(cw, ch);
  const data = img.data;
  for (let y = 0; y < ch; y++) {
    const py = (y + 0.5) / res;
    for (let x = 0; x < cw; x++) {
      const [vx, vy] = sample((x + 0.5) / res, py);
      const i = (y * cw + x) * 4;
      data[i] = encode(vx);
      data[i + 1] = encode(vy);
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL();
  mapCache.set(key, url);
  return url;
}

// Convex rim: steepest bend right at the edge, flat clear glass in the middle.
const convex = (t: number) => 1 - Math.sqrt(1 - t * t);

export function bezelMap(w: number, h: number, radius: number, bezel: number): string {
  const r = Math.min(radius, w / 2, h / 2);
  const hw = w / 2;
  const hh = h / 2;

  return render(`b${w}x${h}r${r}b${bezel}`, w, h, (px, py) => {
    const ax = Math.abs(px - hw);
    const ay = Math.abs(py - hh);
    const qx = ax - (hw - r);
    const qy = ay - (hh - r);

    let depth: number;
    let nx: number;
    let ny: number;
    if (qx > 0 && qy > 0) {
      const len = Math.hypot(qx, qy) || 1;
      depth = r - len;
      nx = qx / len;
      ny = qy / len;
    } else if (qx > qy) {
      depth = hw - ax;
      nx = 1;
      ny = 0;
    } else {
      depth = hh - ay;
      nx = 0;
      ny = 1;
    }

    if (depth < 0 || depth >= bezel) return [0, 0];
    const mag = convex(1 - depth / bezel);
    const sx = px < hw ? -1 : 1;
    const sy = py < hh ? -1 : 1;
    return [-nx * sx * mag, -ny * sy * mag];
  });
}

// Circular magnifier: uniform zoom inside, extra bend on the rim.
export function lensMap(size: number, rim: number): string {
  const c = size / 2;
  return render(`l${size}r${rim}`, size, size, (px, py) => {
    const dx = px - c;
    const dy = py - c;
    const dist = Math.hypot(dx, dy);
    if (dist >= c || dist === 0) return [0, 0];
    const edge = c - dist;
    const rimBend = edge < rim ? convex(1 - edge / rim) : 0;
    const mag = Math.min(1, 0.62 * (dist / c) + 0.38 * rimBend);
    return [(-dx / dist) * mag, (-dy / dist) * mag];
  });
}
