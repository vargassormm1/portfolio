// Regenerates public/ralph-vargas-sormillon-resume.pdf from the /resume page. Run after editing src/content:
//   npm run build && npx next start -p 3230 &  then  npm run resume:pdf -- http://127.0.0.1:3230
import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://127.0.0.1:3230";
const br = await chromium.launch();
const p = await br.newPage();
await p.goto(`${base}/resume`, { waitUntil: "networkidle" });
await p.emulateMedia({ media: "print" });
await p.pdf({ path: "public/ralph-vargas-sormillon-resume.pdf", format: "Letter", preferCSSPageSize: true, tagged: true, outline: true });
await br.close();
console.log("wrote public/ralph-vargas-sormillon-resume.pdf");
