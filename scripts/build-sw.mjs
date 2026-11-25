// Writes public/sw.js from the template with a per-deploy VERSION (Vercel commit SHA, else the build time).
import { readFileSync, writeFileSync } from "node:fs";
const version = (process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`).slice(0, 16);
writeFileSync("public/sw.js", readFileSync("scripts/sw.template.js", "utf8").replace("__VERSION__", version));
console.log(`sw.js version ${version}`);
