import type { MetadataRoute } from "next";
import { PROFILE } from "@/content/profile";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${PROFILE.name}, ${PROFILE.title}`,
    short_name: "Ralph Vargas",
    description: "Ralph Vargas Sormillon: software engineer. Projects, experience and resume.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#202225",
    theme_color: "#202225",
    orientation: "any",
    categories: ["personalization", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
