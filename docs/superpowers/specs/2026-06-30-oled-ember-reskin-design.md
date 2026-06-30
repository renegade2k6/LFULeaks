# OLED Ember Tech Reskin — Design Spec

**Date:** 2026-06-30
**Status:** Approved (pending spec review)
**Scope:** Visual reskin only. No functional, data-flow, or deploy changes.

---

## 1. Goal

Reskin the LFULeaks static site to the **OLED Ember Tech** theme
(`OLED_BURNT_ORANGE_TECH_THEME.md`): true black `#000000` canvas with a
burnt-orange `#C8641B` accent used sparingly for action/focus/active states.

The site must look like premium technical software — restrained, high-contrast,
clean — without changing how it is generated, processed, or deployed.

## 2. Hard Constraints

- **Function untouched.** No edits to logic in `generate.mjs`, `watch.mjs`,
  `config.mjs`, `differ.mjs`, `metadata.mjs`, `templateEngine.mjs`, the inbox
  flow, RSS/sitemap/search-index generation, or the GitHub Actions workflow.
- **Markup structure untouched.** No HTML element added/removed/reordered in a
  way that changes behavior; all element IDs/classes the JS depends on stay.
- **JS untouched.** Inline `<script>` blocks in `template.html` and
  `pageBuilder.mjs` are not modified.
- **Disclaimer stays clearly visible.** Fair Use notice remains a prominent,
  high-contrast panel.
- **CTA stays clearly visible and enticing.** "Buy me a coffee" gets hero
  treatment with a burnt-orange gradient and soft ember glow.
- **Emoji kept.** 💙 ⚠️ ⌨️ → ← × remain as-is (user decision).

## 3. Files Edited (exactly two, both presentational)

1. `tools/template.html`
   - `:root` design tokens (repoint values, keep existing variable names so
     nothing downstream breaks; add new semantic tokens alongside).
   - All CSS rules in the `<style>` block.
   - No changes to `<body>` markup or `<script>`.

2. `tools/lib/pageBuilder.mjs`
   - **Only** hardcoded color literals inside inline `style="..."` strings:
     - "← Back" button inline style (`#0a0c0f`, `#6aa2ff`).
     - "Last Updated" badge gradient (`#6aa2ff`, `#a855f7`).
   - No changes to logic, control flow, generated markup structure, or JS.

## 4. Color Tokens

Repoint existing variables and add semantics:

```
--bg:        #000000   (was #0b0d10)
--card:      #0A0A0A   (panel; was #111318)  -- surfaces 050505/0A0A0A/111111
--fg:        #F2F2F2
--muted:     #7A7A7A   (secondary #B7B7B7 where labels need more contrast)
--accent:        #C8641B
--accent-hover:  #E07822
--accent-active: #A84F16   (new)
--accent-soft:   #3A1D0B   (new)
--accent-glow:   rgba(232,120,34,0.35)
--border:        #1C1C1C
--border-strong: #2A2A2A   (new)
--add: green semantic (#22C55E text / dark-green bg) — unchanged intent
--del: red semantic (#EF4444 text / dark-red bg)     — unchanged intent
--warn-*: warm amber, retained for disclaimer
```

Diff add/del keep green/red (semantic correctness > theme accent).

## 5. Animation Policy (user: "follow theme — calm it")

**Remove** these infinite/heavy effects:
- `float` on cards, `headerGlow`, title `shine` loop → static or one-shot.
- `shimmer` sweep on thumbs, `skeletonShimmer`, `pulse` ring on CTA button,
  `particles` on header line, `bounceIn`, `slideInLeft`, `fadeInScale`
  duplicate, `tabPulse`.

**Keep** (subtle, theme-allowed):
- Smooth hover transitions on cards/thumbs/buttons (lift + orange border).
- Focus rings / focus glow.
- One gentle `fadeInUp` page-load stagger.
- Lightbox open as a simple fade (drop heavy zoom/rotate keyframe).

## 6. Component Treatments

| Component | Treatment |
|---|---|
| Header | Title gradient black→ember, static. Subtle bottom border/line. |
| Cards (index) | `linear-gradient(#0A0A0A,#050505)`, subtle border; hover = orange border + soft glow + small lift. No float/spotlight/shimmer. |
| Disclaimer | Prominent warm-amber left border, high-contrast body text. Clearly visible. |
| Support CTA | Hero: burnt-orange gradient button, soft ember glow, enticing copy kept. The one bold-orange element. |
| Thumbs | Checkerboard transparency bg kept (sprite alpha). Hover lift + orange border. No sweep. |
| Tabs | Orange active state, subtle hover. No pulse. |
| Search / inputs | Orange focus ring `0 0 0 3px rgba(200,100,27,.18)`. |
| Diff | add green / del red / ctx muted. Mono font. |
| Lightbox | Orange accents on controls; simple fade. |
| Back-to-top / scrollbar | Orange accents; no bounce. |

## 7. Verification

- `npm run rebuild` completes without error.
- `npm run lint` → 0 errors.
- Pages regenerate; only colors/animations differ. Image grid, search,
  lightbox, tabs, diff all still function (manual spot check).
- No diff in any `.mjs` file except the two inline color literals in
  `pageBuilder.mjs`.

## 8. Out of Scope (separate task, not in this spec)

- `deploy.bat` fix — awaiting symptom from user; handled independently.
- Any workflow/optimization suggestions — proposed only, not actioned without
  approval.
