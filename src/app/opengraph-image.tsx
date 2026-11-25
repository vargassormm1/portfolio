import { ImageResponse } from "next/og";
import { PROFILE } from "@/content/profile";
export const alt = `${PROFILE.name}, Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#202225", color: "#e8e9e6", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#a5baaa" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#a5baaa" }} />
          Software Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 34, color: "#a9adb4", marginTop: 22, maxWidth: 940, lineHeight: 1.3 }}>Full-stack applications, cloud infrastructure, data processing and AI-powered tools.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8f949c", borderTop: "2px solid #3a3e44", paddingTop: 24 }}>
          <span>Ralph Vargas</span><span>New Jersey, USA</span>
        </div>
      </div>
    ),
    size,
  );
}
