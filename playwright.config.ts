import { defineConfig, devices } from "@playwright/test";
const PORT = 3220;
export default defineConfig({
  testDir: "e2e",
  reporter: [["line"]],
  use: { baseURL: `http://127.0.0.1:${PORT}` },
  projects: [
    { name: "phone", use: { ...devices["iPhone 15"], browserName: "chromium" } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "iphone-safari", use: { ...devices["iPhone 15"], browserName: "webkit" } },
  ],
  webServer: { command: `npm run build && npx next start -H 127.0.0.1 -p ${PORT}`, port: PORT, reuseExistingServer: false, timeout: 240_000, env: { FORCE_INDEXABLE: "1" } },
});
