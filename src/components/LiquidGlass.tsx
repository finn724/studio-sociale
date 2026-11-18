"use client";

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
} from "react";
import { bezelMap, lensMap, useRefraction } from "@/lib/liquid-glass";

type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  radius?: number;
  bezel?: number;
  strength?: number;
  tone?: "dark" | "light";
  tint?: string;
  blur?: number;
  refract?: boolean;
  lens?: boolean;
  aberration?: boolean;
  sheen?: boolean;
};

const CHANNELS = [
  { ratio: 1, matrix: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { ratio: 0.975, matrix: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { ratio: 0.95, matrix: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" },
];

export default function LiquidGlass({
  children,
  className = "",
  style,
  radius = 28,
  bezel = 18,
  strength = 36,
  tone = "dark",
  tint,
  blur = 2,
  refract = true,
  lens = false,
  aberration = false,
  sheen = true,
  onPointerMove,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const supported = useRefraction();
  const active = refract && supported;
  const filterId = `lg${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const build = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 4 || h < 4) return;
      const url = lens ? lensMap(w, bezel) : bezelMap(w, h, radius, bezel);
      if (!url) return;
      setMap((prev) => (prev?.url === url ? prev : { url, w, h }));
    };

    // Debounced so width animations don't regenerate the map every frame.
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(build, 140);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [active, lens, radius, bezel]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (!sheen) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  }

  const refracting = active && map !== null;
  const source = blur > 0 ? "soft" : "SourceGraphic";
  const frost = `blur(${tone === "light" ? 18 : 16}px) saturate(170%) brightness(${
    tone === "light" ? 1.05 : 1.1
  })`;
  const backdrop: CSSProperties = refracting
    ? { backdropFilter: `url(#${filterId})` }
    : { backdropFilter: frost, WebkitBackdropFilter: frost };

  return (
    <div
      ref={ref}
      data-tone={tone}
      onPointerMove={handlePointerMove}
      className={`liquid-glass ${className}`}
      style={{
        borderRadius: radius,
        ...backdrop,
        ...(tint ? ({ "--lg-tint": tint } as CSSProperties) : null),
        ...style,
      }}
      {...rest}
    >
      {refracting && (
        <svg
          aria-hidden
          focusable="false"
          width="0"
          height="0"
          className="pointer-events-none absolute"
        >
          <filter
            id={filterId}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={map.url}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              preserveAspectRatio="none"
              result="map"
            />
            {/* stdDeviation=0 yields transparent black in Chromium, so skip the primitive entirely. */}
            {blur > 0 && <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" />}
            {aberration ? (
              <>
                {CHANNELS.map((channel, i) => (
                  <Fragment key={i}>
                    <feDisplacementMap
                      in={source}
                      in2="map"
                      scale={strength * channel.ratio}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result={`d${i}`}
                    />
                    <feColorMatrix
                      in={`d${i}`}
                      type="matrix"
                      values={channel.matrix}
                      result={`c${i}`}
                    />
                  </Fragment>
                ))}
                <feBlend in="c0" in2="c1" mode="screen" result="c01" />
                <feBlend in="c01" in2="c2" mode="screen" result="displaced" />
              </>
            ) : (
              <feDisplacementMap
                in={source}
                in2="map"
                scale={strength}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            )}
            <feColorMatrix
              in="displaced"
              type="saturate"
              values={tone === "light" ? "1.2" : "1.5"}
            />
          </filter>
        </svg>
      )}
      <span aria-hidden className="lg-layer lg-tint" />
      <span aria-hidden className="lg-layer lg-rim" />
      {sheen && <span aria-hidden className="lg-layer lg-sheen" />}
      {children}
    </div>
  );
}
