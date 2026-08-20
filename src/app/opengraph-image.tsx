import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

export const alt = `${portfolio.person.name} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7f7f4",
          color: "#171a1d",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 84px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "720px" }}>
          <div
            style={{
              color: "#315f78",
              display: "flex",
              fontFamily: "Arial, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {portfolio.person.title} · {portfolio.person.school}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Arial, sans-serif",
              fontSize: "68px",
              fontWeight: 600,
              letterSpacing: "-3px",
              lineHeight: 1.02,
              marginTop: "28px",
            }}
          >
            {portfolio.home.headline}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            border: "4px solid #315f78",
            borderRadius: "50%",
            display: "flex",
            height: "290px",
            justifyContent: "center",
            position: "relative",
            transform: "rotate(-28deg)",
            width: "290px",
          }}
        >
          <div
            style={{
              background: "#171a1d",
              borderRadius: "50%",
              display: "flex",
              height: "96px",
              width: "96px",
            }}
          />
          <div
            style={{
              background: "#6e8795",
              borderRadius: "50%",
              display: "flex",
              height: "22px",
              position: "absolute",
              right: "-13px",
              top: "58px",
              width: "22px",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
