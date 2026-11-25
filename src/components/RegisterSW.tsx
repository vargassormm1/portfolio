"use client";
import { useEffect } from "react";
/** Registers the service worker in production only. Checks for a new version whenever the tab regains focus. */
export function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let reg: ServiceWorkerRegistration | undefined;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).then((r) => { reg = r; }).catch(() => {});
    const onVisible = () => { if (document.visibilityState === "visible") reg?.update().catch(() => {}); };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);
  return null;
}
