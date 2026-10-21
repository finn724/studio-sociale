import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = await readFile(
    join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1115",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontFamily: "Instrument Serif",
            fontSize: 20,
            color: "#EFECE6",
          }}
        >
          <span>S</span>
          <div style={{ width: 1, height: 12, background: "#EFECE6" }} />
          <span>S</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
      ],
    }
  );
}
