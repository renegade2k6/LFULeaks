# OLED Ember Tech Reskin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the LFULeaks static site to the OLED Ember Tech theme (true black + burnt orange), changing presentation only — zero functional/deploy/data changes.

**Architecture:** Edit CSS design tokens and rules in `tools/template.html`, plus two hardcoded color literals in inline `style=""` strings inside `tools/lib/pageBuilder.mjs`. Existing CSS variable *names* are kept and repointed so all downstream rules and JS continue to work unchanged. Verification is `npm run lint` (0 errors) + `npm run rebuild` (regenerates site) + grep guards proving no JS logic changed.

**Tech Stack:** Static HTML/CSS, Node ESM build scripts, ESLint, Prettier.

**Reference spec:** `docs/superpowers/specs/2026-06-30-oled-ember-reskin-design.md`
**Theme source:** `OLED_BURNT_ORANGE_TECH_THEME.md`

---

## Pre-flight (run once before Task 1)

- [ ] **Capture baseline guard hash of JS logic** (so we can prove logic is untouched at the end)

Run:
```bash
git -C F:/Github/LFULeaks hash-object tools/generate.mjs tools/watch.mjs tools/config.mjs tools/lib/fileSystem.mjs tools/lib/differ.mjs tools/lib/metadata.mjs tools/lib/templateEngine.mjs
```
Expected: 7 hashes printed. Record them. These files must NOT change. `pageBuilder.mjs` is allowed to change (color literals only).

- [ ] **Confirm clean build before edits**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: lint passes (0 errors), rebuild prints "Built ..." lines and exits 0.

---

## Task 1: Repoint design tokens (`:root`)

**Files:**
- Modify: `tools/template.html` (the `:root{...}` block, ~lines 88-103)

- [ ] **Step 1: Replace the `:root` token block**

Replace the existing `:root{ ... }` with:

```css
:root{
  color-scheme:dark;
  /* OLED Ember Tech — repointed legacy names kept for downstream rules/JS */
  --bg:#000000;
  --fg:#F2F2F2;
  --muted:#7A7A7A;
  --card:#0A0A0A;
  --accent:#C8641B;
  --accent-hover:#E07822;
  --accent-active:#A84F16;
  --accent-soft:#3A1D0B;
  --accent-glow:rgba(232, 120, 34, 0.35);
  --border:#1C1C1C;
  --border-strong:#2A2A2A;
  /* surfaces */
  --surface-1:#050505;
  --surface-2:#0A0A0A;
  --surface-3:#111111;
  /* diff stays semantic */
  --add:#071A0D;
  --del:#1F0707;
  --ctx:#0A0A0A;
  /* warning / disclaimer stays warm amber, clearly visible */
  --warn-bg:rgba(245, 158, 11, 0.10);
  --warn-border:rgba(245, 158, 11, 0.35);
  --warn-text:#FCD34D;
}
```

- [ ] **Step 2: Update the body background gradient orbs to ember tones**

Find the `body{ ... background-image: radial-gradient(...) ... }` rule (~lines 105-120). Replace the two `radial-gradient` color stops (currently blue `rgba(106,162,255,0.1)` and purple `rgba(168,85,247,0.08)`) with restrained ember tints, and keep the noise SVG layer:
```css
    radial-gradient(at 0% 0%, rgba(200, 100, 27, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(232, 120, 34, 0.05) 0px, transparent 50%),
```
Leave the `url("data:image/svg+xml,...noise...")` layer and all other body properties unchanged.

- [ ] **Step 3: Lint + rebuild**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0.

- [ ] **Step 4: Commit**

```bash
git add tools/template.html
git commit -m "style: repoint design tokens to OLED Ember Tech palette"
```

---

## Task 2: Calm the animations (remove infinite/heavy effects)

User decision: "follow theme — calm it." Remove perpetual motion; keep subtle hover/focus/transition + one gentle page-load stagger.

**Files:**
- Modify: `tools/template.html` (CSS only)

- [ ] **Step 1: Remove infinite header glow + title shine loop**

- In the `header h1{...}` rule (~line 126): remove `background-size:200% auto;animation:shine 4s linear infinite;` and the `background:linear-gradient(...)` shine gradient. Replace the title fill with a static ember gradient:
  `background:linear-gradient(135deg,#F2F2F2 0%, var(--accent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`
- Delete the `@keyframes shine` block (~line 129).
- Delete the later `header{ animation: headerGlow 4s ease-in-out infinite; }` rule (~lines 1146-1148) and the `@keyframes headerGlow` block (~lines 1137-1144).

- [ ] **Step 2: Remove floating card animation + spotlight/shimmer pseudo-elements**

- Delete `@keyframes float` (~lines 1151-1154) and the rules `a.card{ animation: float ... }`, `a.card:nth-child(2n){...}`, `a.card:nth-child(3n){...}`, `a.card:hover{ animation-play-state: paused; }` (~lines 1156-1171).
- Delete the `.thumb::before{ ... animation: shimmer ... }` rule (~lines 1214-1230) and `@keyframes shimmer` (~lines 1209-1212).
- Delete `a.card::after{ ...spotlight... }` and `a.card:hover::after{ opacity:1 }` (~lines 1262-1278).
- Delete `.header-line::after{ ...animation: particles... }` (~lines 1238-1253) and `@keyframes particles` (~lines 1233-1236).

- [ ] **Step 3: Remove CTA pulse, bounce, slide, tab pulse, skeleton, duplicate fade**

- Delete `@keyframes pulse` (~lines 1191-1198), `.cta-button{ animation: pulse 2s infinite; }` and `.cta-button:hover{ animation:none; }` (~lines 1200-1206).
- Delete `.back-to-top.show{ animation: bounceIn ... }` (~lines 1372-1374) and `@keyframes bounceIn` (~lines 1376-1388).
- Delete `.disclaimer{ animation: slideInLeft ... }` (~lines 1391-1394) and `@keyframes slideInLeft` (~lines 1396-1405).
- Delete `.tab-btn.active{ animation: tabPulse ... }` (~lines 1344-1346) and `@keyframes tabPulse` (~lines 1348-1352).
- Delete `.thumb.loading{ ...skeletonShimmer... }` (~lines 1360-1369) and `@keyframes skeletonShimmer` (~lines 1355-1358).
- Delete `@keyframes fadeInScale` (~lines 1281-1290) and its `.container > *{ animation: fadeInScale ... }` (~lines 1292-1294). KEEP the earlier `@keyframes fadeInUp` + `.container > *{ animation: fadeInUp 0.6s ... }` (~lines 790-800) as the single gentle load stagger.
- Delete `.support-icon{ animation: float 3s ... }` (~lines 1318-1321).

- [ ] **Step 4: Simplify lightbox open animation to a fade**

In the `.lightbox.open{ animation: lbFade ... }` / `.lightbox.open img{ animation: lbZoom ... }` rules (~lines 781-787): keep `lbFade`, delete the `lbZoom` animation line on the image (keep the box-shadow). Delete `@keyframes lbZoom` (~line 782). Keep `@keyframes lbFade`.

- [ ] **Step 5: Lint + rebuild**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0.

- [ ] **Step 6: Grep guard — no orphaned animation references**

Run: `cd /f/Github/LFULeaks && grep -nE "shine|headerGlow|float|shimmer|particles|pulse|bounceIn|slideInLeft|tabPulse|skeletonShimmer|fadeInScale|lbZoom" tools/template.html`
Expected: only matches for kept items (none of the deleted keyframe names should appear). If a deleted name still appears, remove that reference.

- [ ] **Step 7: Commit**

```bash
git add tools/template.html
git commit -m "style: calm animations to match OLED Ember Tech restraint"
```

---

## Task 3: Restyle core components to ember palette

All these rules already use `var(--accent)` etc., so the token swap in Task 1 covers most. This task fixes the remaining hardcoded blue/purple hex values and tunes surfaces.

**Files:**
- Modify: `tools/template.html` (CSS only)

- [ ] **Step 1: Find remaining hardcoded legacy colors**

Run: `cd /f/Github/LFULeaks && grep -nE "#6aa2ff|#8cb8ff|#a855f7|#5b8fd9|#7ab0ff|#6a9ee6|106, ?162, ?255|106,162,255|168, ?85, ?247" tools/template.html`
Expected: a list of line numbers. Each must be replaced with the ember equivalent below.

- [ ] **Step 2: Replace each hardcoded color**

Apply these substitutions everywhere they appear in `tools/template.html`:
- `#6aa2ff` → `var(--accent)` (or `#C8641B` inside gradients)
- `#8cb8ff` / `#7ab0ff` → `var(--accent-hover)` (`#E07822`)
- `#5b8fd9` / `#6a9ee6` → `var(--accent-active)` (`#A84F16`)
- `#a855f7` (purple, used in gradients/loading bar) → `#E07822` (ember hover) so gradients read ember→bright-ember
- `rgba(106,162,255,X)` / `rgba(106, 162, 255, X)` → `rgba(200,100,27,X)`
- `rgba(168,85,247,X)` / `rgba(168, 85, 247, X)` → `rgba(232,120,34,X)`

This covers: header-line, tab active shadow, search focus glow, keyboard-help button, modal accents, loading-bar gradient, scrollbar thumb gradient, meta badges, diff add/del text already semantic (leave `#4ade80`/`#f87171` diff line text as-is — they are green/red semantics).

- [ ] **Step 3: Give cards a near-black panel surface**

In the `.card{ ... }` rule (~lines 133-141) change `background:var(--card);` to:
`background:linear-gradient(180deg, var(--surface-2), var(--surface-1));`
Keep border/radius/padding/transition. The `.card::before` gradient border already uses `var(--accent)` — leave it.

- [ ] **Step 4: Lint + rebuild**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0.

- [ ] **Step 5: Grep guard — no legacy blue/purple left**

Run: `cd /f/Github/LFULeaks && grep -nE "#6aa2ff|#8cb8ff|#a855f7|#5b8fd9|#7ab0ff|#6a9ee6|106, ?162, ?255|168, ?85, ?247" tools/template.html`
Expected: **no output** (all replaced).

- [ ] **Step 6: Commit**

```bash
git add tools/template.html
git commit -m "style: replace legacy blue/purple with ember accents"
```

---

## Task 4: Disclaimer prominence + CTA hero (user priority)

User requirement: disclaimer must stay clearly visible; CTA must be clearly visible and enticing.

**Files:**
- Modify: `tools/template.html` (CSS only — `.disclaimer*`, `.support-cta*`, `.cta-button*`, `.support-content h3`)

- [ ] **Step 1: Keep disclaimer clearly visible**

In `.disclaimer{...}` (~lines 162-170): keep the warm gradient + amber left border. Ensure background uses the warm tokens (now amber via Task 1) and `border-left:4px solid #F59E0B;`. Confirm `.disclaimer-text{ color:var(--fg); }` stays high-contrast (`#F2F2F2`). No animation (removed in Task 2). This panel must remain visually obvious — do not reduce padding or contrast.

- [ ] **Step 2: Make CTA a hero with ember gradient + soft glow**

In `.support-cta{...}` (~lines 192-205): change the background to an ember-tinted panel:
`background:linear-gradient(135deg, rgba(200,100,27,0.10) 0%, rgba(232,120,34,0.06) 100%);`
and `border:1px solid rgba(200,100,27,0.25);`. Add a persistent-but-subtle ember glow so it draws the eye:
`box-shadow:0 0 0 1px rgba(200,100,27,0.12), 0 8px 30px rgba(0,0,0,0.5);`

In `.support-content h3{...}` (~lines 231-241): change gradient to `linear-gradient(135deg, var(--accent-hover) 0%, #F2F2F2 100%)`.

In `.cta-button{...}` (~lines 249-264): change background to
`linear-gradient(180deg, var(--accent-hover) 0%, var(--accent) 100%);`
keep `color:#fff!important;` and bold weight. Replace the box-shadow with an ember glow:
`box-shadow:0 4px 14px var(--accent-glow);`
In `.cta-button:hover{...}` (~lines 274-278): `transform:translateY(-2px);` and
`box-shadow:0 8px 24px var(--accent-glow); background:linear-gradient(180deg, #F19A4A 0%, var(--accent-hover) 100%);`
(No pulse animation — removed in Task 2. Hover lift + glow is the enticement.)

- [ ] **Step 3: Lint + rebuild**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0.

- [ ] **Step 4: Commit**

```bash
git add tools/template.html
git commit -m "style: prominent disclaimer + ember hero CTA"
```

---

## Task 5: pageBuilder inline color literals

The only allowed JS-file change: two hardcoded colors inside generated inline `style=""` strings. No logic touched.

**Files:**
- Modify: `tools/lib/pageBuilder.mjs` (inline style color literals only)

- [ ] **Step 1: Recolor the "← Back" tab button**

At `pageBuilder.mjs:158`, the inline style is:
`style="background:#0a0c0f;border-color:#6aa2ff;color:#6aa2ff"`
Change to:
`style="background:#050505;border-color:#C8641B;color:#E07822"`

- [ ] **Step 2: Recolor the "Last Updated" badge gradient**

At `pageBuilder.mjs:504`, the badge inline style contains:
`background:linear-gradient(135deg, #6aa2ff 0%, #a855f7 100%)`
Change to:
`background:linear-gradient(135deg, #C8641B 0%, #E07822 100%)`

- [ ] **Step 3: Lint + rebuild**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0.

- [ ] **Step 4: Grep guard — no legacy colors remain in pageBuilder**

Run: `cd /f/Github/LFULeaks && grep -nE "#6aa2ff|#a855f7|#0a0c0f" tools/lib/pageBuilder.mjs`
Expected: **no output**.

- [ ] **Step 5: Commit**

```bash
git add tools/lib/pageBuilder.mjs
git commit -m "style: ember colors for back button + last-updated badge"
```

---

## Task 6: Final verification (function untouched)

**Files:** none (verification only)

- [ ] **Step 1: Prove core JS logic files are byte-identical to baseline**

Run:
```bash
git -C F:/Github/LFULeaks hash-object tools/generate.mjs tools/watch.mjs tools/config.mjs tools/lib/fileSystem.mjs tools/lib/differ.mjs tools/lib/metadata.mjs tools/lib/templateEngine.mjs
```
Expected: identical to the 7 baseline hashes recorded in pre-flight. If ANY differs, revert that file — it must not change.

- [ ] **Step 2: Confirm only the intended files changed**

Run: `cd /f/Github/LFULeaks && git diff --stat main -- tools/`
Expected: only `tools/template.html` and `tools/lib/pageBuilder.mjs` appear.

- [ ] **Step 3: Full rebuild + lint clean**

Run: `cd /f/Github/LFULeaks && npm run lint && npm run rebuild`
Expected: 0 lint errors; rebuild exits 0; index + update pages regenerated.

- [ ] **Step 4: Manual visual spot-check**

Open `index.html` and one `updates/<date>/index.html` in a browser. Confirm: true-black background, ember accents, disclaimer clearly visible, CTA button bold ember + glow, image grid + search + lightbox + tabs + diff all still work, no perpetual animations.

- [ ] **Step 5: Done — hand back to user for deploy**

Do NOT auto-push. Report completion; user deploys via `deploy.bat` or GitHub Desktop when ready.

---

## Self-Review notes

- **Spec coverage:** tokens (T1), animations calmed (T2), components/legacy-color removal (T3), disclaimer+CTA (T4), pageBuilder literals (T5), verification incl. "function untouched" guard (T6). All spec sections mapped.
- **No placeholders:** every edit names a target rule + concrete replacement value.
- **Line numbers are approximate** (`~`) and will drift as edits land; the grep guards are the source of truth for finding/confirming each change.
