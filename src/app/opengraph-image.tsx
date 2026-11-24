import { ImageResponse } from "next/og";
import { PROFILE } from "@/content/profile";
export const alt = `${PROFILE.name}, Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#fafaf8", color: "#111513", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#1d6b52" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#1d6b52" }} />
          Software Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 34, color: "#4a524e", marginTop: 22, maxWidth: 940, lineHeight: 1.3 }}>Full-stack applications, cloud infrastructure, AI-powered tools and data engineering.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#636b67", borderTop: "2px solid #e3e4df", paddingTop: 24 }}>
          <span>{PROFILE.region}</span><span>Projects: Guap, Baseline, DocChat</span>
        </div>
      </div>
    ),
    size,
  );
}
