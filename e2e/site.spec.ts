import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const crawl = async (page: Page) => {
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForLoadState("networkidle");
};
const broken = (page: Page) => page.locator("img").evaluateAll(async (imgs) => {
  const shown = (imgs as HTMLImageElement[]).filter((i) => i.checkVisibility());
  await Promise.race([Promise.all(shown.map((i) => i.decode().catch(() => {}))), new Promise((r) => setTimeout(r, 8000))]);
  return (imgs as HTMLImageElement[]).filter((i) => i.checkVisibility() && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src);
});

for (const path of ["/", "/resume", "/projects/guap", "/projects/baseline", "/nope"]) {
  test(`${path}: accessible, images load, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(path === "/nope" ? 404 : 200);
    await crawl(page);
    expect(await broken(page)).toEqual([]);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" ")}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("no sideways scrolling from 320px to 1920px", async ({ page }) => {
  for (const path of ["/", "/resume", "/projects/guap"]) {
    await page.goto(path);
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${path} @ ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test("mobile menu: opens, Escape closes and returns focus, a link closes it and scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();
  const menu = page.locator("#mobile-nav");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Work" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(button).toBeFocused();
  await button.click();
  await menu.getByRole("link", { name: "Experience" }).click();
  await expect(menu).toBeHidden();
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeInViewport();
});

test("the important facts are in the HTML before any JavaScript runs", async ({ request }) => {
  const html = await (await request.get("/")).text();
  for (const s of ["Ralph Vargas Sormillon", "Software Engineer", "Alliance Advisors", "Incyree Inc.", "Montclair State University", "Guap", "Baseline", "ralphvargassorm@gmail.com", "linkedin.com/in/ralph-vargas-sormillon"]) expect(html, s).toContain(s);
  const resume = await (await request.get("/resume")).text();
  for (const s of ["Professional experience", "Technical skills", "Education", "2025-04", "2022-01"]) expect(resume, s).toContain(s);
});

test("structured data: a valid ProfilePage about one Person, consistent across pages", async ({ request }) => {
  const ld = async (path: string) => {
    const html = await (await request.get(path)).text();
    return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]!));
  };
  const [home] = await ld("/");
  const graph = home["@graph"] as Record<string, any>[];
  const person = graph.find((n) => n["@type"] === "Person")!;
  expect(graph.find((n) => n["@type"] === "ProfilePage")!.mainEntity["@id"]).toBe(person["@id"]);
  expect(person).toMatchObject({ name: "Ralph Vargas Sormillon", alternateName: "Ralph Vargas", jobTitle: "Software Engineer", worksFor: { name: "Alliance Advisors" }, alumniOf: { name: "Montclair State University" } });
  expect(person.sameAs).toContain("https://www.linkedin.com/in/ralph-vargas-sormillon/");
  const [guap] = await ld("/projects/guap");
  const app = (guap["@graph"] as Record<string, any>[]).find((n) => n["@type"] === "SoftwareApplication")!;
  expect(app.creator["@id"]).toBe(person["@id"]);
  expect(app.codeRepository).toBeUndefined(); // private repo: never linked
  expect(JSON.stringify(guap)).not.toMatch(/aggregateRating|review|offers/);
});

test("machine-readable resume, plain text, llms.txt, sitemap and robots", async ({ request }) => {
  const j = await request.get("/resume.json");
  expect(j.headers()["content-type"]).toContain("application/json");
  const r = await j.json();
  expect(r.basics.name).toBe("Ralph Vargas Sormillon");
  expect(r.work.map((w: { name: string }) => w.name)).toEqual(["Alliance Advisors", "Self-employed", "Incyree Inc."]);
  expect(r.work[0].endDate).toBeUndefined();
  expect(r.education[0].institution).toBe("Montclair State University");
  const t = await request.get("/resume.txt");
  expect(t.headers()["content-type"]).toContain("text/plain");
  expect(await t.text()).toContain("Software Engineer, Alliance Advisors (Full-time)");
  const l = await (await request.get("/llms.txt")).text();
  expect(l.startsWith("# Ralph Vargas Sormillon\n\n> ")).toBe(true);
  const sm = await (await request.get("/sitemap.xml")).text();
  for (const p of ["/resume", "/projects/guap", "/projects/baseline"]) expect(sm).toContain(p);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/User-Agent: OAI-SearchBot[\s\S]*Allow: \//);
  expect(robots).toMatch(/User-Agent: GPTBot[\s\S]*Disallow: \//);
  expect(robots).toMatch(/User-Agent: ClaudeBot/);
  expect(robots).toContain("Sitemap:");
  for (const body of [JSON.stringify(r), await t.text(), l]) expect(body).not.toMatch(/11 million|11,000,000|Open to work|salary/i);
});

test("security headers; every outside link opens safely; the private app isn't linked", async ({ page, request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-powered-by"]).toBeUndefined();
  expect(h["x-robots-tag"]).toBeUndefined(); // production build: indexable
  expect(await (await request.get("/nope")).text()).not.toContain('rel="canonical"');
  await page.goto("/");
  for (const a of await page.locator('a[target="_blank"]').all()) await expect(a).toHaveAttribute("rel", /noopener/);
  const hrefs = await page.locator("a").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  expect(hrefs.filter((x) => x.includes("guap-tau.vercel.app") && !x.endsWith("/demo"))).toEqual([]);
  expect(hrefs.filter((x) => x.includes("github.com/vargassormm1/guap"))).toEqual([]);
  await expect(page.getByRole("link", { name: /Explore the interactive demo/ }).first()).toHaveAttribute("href", "https://guap-tau.vercel.app/demo");
  expect((await request.get("/ralph-vargas-sormillon-resume.pdf")).headers()["content-type"]).toContain("application/pdf");
});
