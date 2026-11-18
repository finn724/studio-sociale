"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p = rot * p;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.x * 2.3;
  float t = uTime * 0.05;

  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  p += m * 0.18;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.7 * t),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.45 * t)
  );
  float f = fbm(p + 2.6 * r);

  vec3 midnight = vec3(0.059, 0.067, 0.082);
  vec3 mist = vec3(0.624, 0.706, 0.851);
  vec3 lilac = vec3(0.769, 0.710, 0.941);
  vec3 champagne = vec3(0.902, 0.827, 0.702);

  vec3 col = midnight;
  col = mix(col, mist * 0.62, smoothstep(0.4, 0.92, f) * 0.9);
  col = mix(col, lilac * 0.6, smoothstep(0.5, 1.15, length(q)) * 0.78);
  col = mix(col, champagne * 0.55, smoothstep(0.6, 0.96, r.y) * 0.58);
  col += mist * smoothstep(0.014, 0.0, abs(f - 0.6)) * 0.18;

  vec2 mouseUv = vec2((uv.x - uMouse.x) * aspect, uv.y - uMouse.y);
  col += lilac * smoothstep(0.6, 0.0, length(mouseUv)) * 0.07;

  col = mix(midnight, col, uIntensity);
  float vignette = smoothstep(1.2, 0.2, length((uv - 0.5) * vec2(1.05, 0.6)));
  col *= mix(0.5, 1.0, vignette);
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LiquidBackground({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");
    gl.uniform1f(uIntensity, intensity);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seed = Math.random() * 60;
    const mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 };
    let visible = true;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!canvas.dataset.ready) canvas.dataset.ready = "true";
    };

    // ~30fps is plenty for a slow-moving field and halves GPU cost.
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 32) return;
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      draw(seed + now / 1000);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw(seed);
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    intersection.observe(canvas);

    resize();
    if (reduced) {
      draw(seed);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms] data-[ready=true]:opacity-100 ${className}`}
    />
  );
}
