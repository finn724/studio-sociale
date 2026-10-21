import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Studio Socialé — social media management, content and strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [serif, serifItalic, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Manrope-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0F1115",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#9FB4D9",
            opacity: 0.35,
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#C4B5F0",
            opacity: 0.3,
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 420,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#E6D3B3",
            opacity: 0.22,
            filter: "blur(10px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 36,
              color: "#EFECE6",
              display: "flex",
            }}
          >
            S
          </span>
          <div style={{ width: 2, height: 24, background: "#EFECE6" }} />
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 36,
              color: "#EFECE6",
              display: "flex",
            }}
          >
            S
          </span>
        </div>

        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 104,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#EFECE6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>Social media that moves</span>
          <span
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              color: "#C4B5F0",
            }}
          >
            your brand forward.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Manrope",
            fontSize: 24,
            color: "#B8B5AE",
            letterSpacing: "0.02em",
          }}
        >
          Management, content and strategy
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Manrope", data: sans, style: "normal", weight: 500 },
      ],
    }
  );
}
