# OLED Black + Burnt Orange Tech Theme System

Reusable visual design standard for Python, Rust/Tauri, HTML, Electron, WPF, Svelte, React, and other desktop/web app stacks.

---

## 1. Theme Identity

**Theme name:** OLED Ember Tech  
**Style direction:** OLED black, precision tech, cyberpunk restraint, professional utility UI  
**Primary mood:** dark, sharp, technical, high-contrast, clean, premium  
**Accent personality:** burnt orange / ember glow, used sparingly for focus, action, warning, and intelligence cues

This theme is intended for technical tools such as:

- Local AI apps
- GGUF / llama.cpp utilities
- System maintenance dashboards
- Security monitors
- Benchmarking tools
- Developer utilities
- Offline-first desktop apps

The theme should feel like **serious engineering software**, not a gaming skin.

---

## 2. Core Design Principles

### 2.1 OLED First

Use true black as the main canvas.

```css
--bg-page: #000000;
```

Avoid large washed-out grey backgrounds. Most surfaces should sit clearly above pure black using near-black greys.

### 2.2 Burnt Orange Is an Accent, Not the Whole Theme

Burnt orange should guide attention. Do **not** flood the UI with orange.

Use orange for:

- Primary action buttons
- Active navigation indicators
- Selected states
- Key metrics
- Warning-adjacent states
- Focus rings
- Small glow accents

Avoid orange for:

- Large panels
- Full backgrounds
- Every border
- Body text
- Dense tables

### 2.3 Clear Panel Separation

Every screen should be visually scannable. Group related controls into cards/panels with consistent spacing, borders, and headings.

Bad pattern:

```text
Controls, labels, buttons, tables, logs all crammed into one flat area.
```

Good pattern:

```text
Page Header
├── Summary Cards
├── Main Tool Panel
├── Results Table
└── Log / Output Panel
```

### 2.4 Professional Cyberpunk

Use cyberpunk influence through:

- Thin borders
- Subtle glow
- Monospace data text
- Angular separators
- Technical labels
- High contrast
- Status chips

Do **not** use:

- Neon rainbow overload
- Emoji buttons
- Excessive gradients
- Cluttered HUD decorations
- Fake scanlines over readable content

---

## 3. Colour Palette

### 3.1 Base Colours

| Token | Hex | Usage |
|---|---:|---|
| `--bg-page` | `#000000` | Main app/window background |
| `--bg-surface-1` | `#050505` | Primary cards and panels |
| `--bg-surface-2` | `#0A0A0A` | Elevated sections |
| `--bg-surface-3` | `#111111` | Inputs, nested cards, table headers |
| `--bg-hover` | `#17120E` | Hover state with warm tint |
| `--bg-active` | `#211409` | Active/selected state |

### 3.2 Border Colours

| Token | Hex | Usage |
|---|---:|---|
| `--border-subtle` | `#1C1C1C` | Default panel border |
| `--border-strong` | `#2A2A2A` | Strong separators |
| `--border-accent` | `#A84F16` | Active/focused border |
| `--border-warning` | `#C46A1C` | Warning border |

### 3.3 Text Colours

| Token | Hex | Usage |
|---|---:|---|
| `--text-primary` | `#F2F2F2` | Main text |
| `--text-secondary` | `#B7B7B7` | Secondary labels |
| `--text-muted` | `#7A7A7A` | Muted helper text |
| `--text-disabled` | `#4D4D4D` | Disabled text |
| `--text-inverse` | `#050505` | Text on orange buttons |

### 3.4 Accent Colours

| Token | Hex | Usage |
|---|---:|---|
| `--accent-primary` | `#C8641B` | Main burnt orange |
| `--accent-primary-hover` | `#E07822` | Primary hover |
| `--accent-primary-active` | `#A84F16` | Primary pressed |
| `--accent-soft` | `#3A1D0B` | Soft orange background |
| `--accent-glow` | `rgba(232, 120, 34, 0.35)` | Glow/shadow |

### 3.5 Semantic Colours

| Token | Hex | Usage |
|---|---:|---|
| `--success` | `#22C55E` | Success |
| `--success-bg` | `#071A0D` | Success chip background |
| `--warning` | `#F59E0B` | Warning |
| `--warning-bg` | `#1D1203` | Warning chip background |
| `--error` | `#EF4444` | Errors |
| `--error-bg` | `#1F0707` | Error chip background |
| `--info` | `#38BDF8` | Informational state |
| `--info-bg` | `#06151D` | Info chip background |

---

## 4. CSS Theme Tokens

Use these tokens as the canonical source for web, Tauri, Electron, and browser-based UI layers.

```css
:root {
  color-scheme: dark;

  --bg-page: #000000;
  --bg-surface-1: #050505;
  --bg-surface-2: #0A0A0A;
  --bg-surface-3: #111111;
  --bg-hover: #17120E;
  --bg-active: #211409;

  --border-subtle: #1C1C1C;
  --border-strong: #2A2A2A;
  --border-accent: #A84F16;
  --border-warning: #C46A1C;

  --text-primary: #F2F2F2;
  --text-secondary: #B7B7B7;
  --text-muted: #7A7A7A;
  --text-disabled: #4D4D4D;
  --text-inverse: #050505;

  --accent-primary: #C8641B;
  --accent-primary-hover: #E07822;
  --accent-primary-active: #A84F16;
  --accent-soft: #3A1D0B;
  --accent-glow: rgba(232, 120, 34, 0.35);

  --success: #22C55E;
  --success-bg: #071A0D;
  --warning: #F59E0B;
  --warning-bg: #1D1203;
  --error: #EF4444;
  --error-bg: #1F0707;
  --info: #38BDF8;
  --info-bg: #06151D;

  --font-ui: "Inter", "Segoe UI", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --shadow-panel: 0 12px 32px rgba(0, 0, 0, 0.65);
  --shadow-accent: 0 0 0 1px rgba(200, 100, 27, 0.55), 0 0 24px rgba(232, 120, 34, 0.12);

  --transition-fast: 120ms ease-out;
  --transition-normal: 180ms ease-out;
}
```

---

## 5. Typography

### 5.1 Font Rules

Use a clean sans-serif for the interface and a monospace font only for technical data.

Recommended UI fonts:

- Inter
- Segoe UI
- SF Pro Display
- Roboto
- System UI fallback

Recommended monospace fonts:

- JetBrains Mono
- Cascadia Code
- Consolas
- Fira Code

### 5.2 Type Scale

| Token | Size | Usage |
|---|---:|---|
| `--text-xs` | `12px` | Chips, metadata, table hints |
| `--text-sm` | `13px` | Secondary UI text |
| `--text-md` | `14px` | Default body/control text |
| `--text-lg` | `16px` | Section headings |
| `--text-xl` | `20px` | Page title |
| `--text-2xl` | `24px` | Dashboard title / hero stat |

### 5.3 Text Usage

- Page titles: `20–24px`, `600–700 weight`
- Section titles: `15–16px`, `600 weight`
- Body text: `14px`, `400–500 weight`
- Labels: `12–13px`, uppercase optional, letter spacing `0.04em`
- Metrics: monospace or semi-bold UI font

---

## 6. Layout System

### 6.1 Page Structure

Every page should follow this base layout:

```text
App Shell
├── Sidebar / Top Navigation
├── Page Header
│   ├── Title
│   ├── Subtitle
│   └── Primary Actions
├── Content Grid
│   ├── Summary Cards
│   ├── Main Panel
│   ├── Secondary Panel
│   └── Output / Logs / Details
└── Status Bar / Footer
```

### 6.2 Spacing Rules

| Area | Recommended Spacing |
|---|---:|
| Page outer padding | `24px` |
| Section gap | `20–24px` |
| Card inner padding | `16–20px` |
| Form field gap | `12px` |
| Button horizontal padding | `14–18px` |
| Table cell padding | `10–12px` |

### 6.3 Density Modes

For technical apps, support two density modes if practical:

| Mode | Purpose |
|---|---|
| Comfortable | Default, clearer spacing |
| Compact | Dense tables/logs, more rows visible |

Do not make the whole app compact by default. Technical data can be dense; the surrounding UI should breathe.

---

## 7. Components

## 7.1 App Shell

```css
.app-shell {
  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-ui);
}
```

Use pure black for the root background.

---

## 7.2 Panels / Cards

```css
.panel {
  background: linear-gradient(180deg, var(--bg-surface-2), var(--bg-surface-1));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
  padding: var(--space-5);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.panel-title {
  font-size: 16px;
  font-weight: 650;
  color: var(--text-primary);
}

.panel-subtitle {
  font-size: 13px;
  color: var(--text-muted);
}
```

### Panel Rules

- Use panels for meaningful groups only.
- Avoid nested cards unless the content genuinely needs hierarchy.
- Do not put every small element inside its own box.

---

## 7.3 Buttons

### Primary Button

```css
.btn-primary {
  background: linear-gradient(180deg, var(--accent-primary-hover), var(--accent-primary));
  color: var(--text-inverse);
  border: 1px solid var(--accent-primary-hover);
  border-radius: var(--radius-md);
  padding: 9px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
}

.btn-primary:hover {
  background: var(--accent-primary-hover);
  box-shadow: var(--shadow-accent);
}

.btn-primary:active {
  background: var(--accent-primary-active);
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--accent-primary-hover);
  outline-offset: 2px;
}
```

### Secondary Button

```css
.btn-secondary {
  background: var(--bg-surface-3);
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 9px 16px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-accent);
}
```

### Danger Button

```css
.btn-danger {
  background: var(--error-bg);
  color: var(--error);
  border: 1px solid rgba(239, 68, 68, 0.45);
  border-radius: var(--radius-md);
  padding: 9px 16px;
  font-weight: 700;
}
```

### Button Rules

- Use icons where useful, but **do not use emoji buttons**.
- Primary action should be visually obvious.
- Avoid more than one primary button in the same panel.
- Destructive actions must never look like normal actions.

---

## 7.4 Inputs

```css
.input,
.select,
.textarea {
  background: var(--bg-surface-3);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 9px 12px;
  font-family: var(--font-ui);
  font-size: 14px;
}

.input::placeholder,
.textarea::placeholder {
  color: var(--text-muted);
}

.input:hover,
.select:hover,
.textarea:hover {
  border-color: var(--border-strong);
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: var(--border-accent);
  box-shadow: 0 0 0 3px rgba(200, 100, 27, 0.18);
}
```

### Input Rules

- Labels must be visible, not placeholder-only.
- Use helper text for risky settings.
- Use validation messages below the field.
- Never hide errors in logs only.

---

## 7.5 Tables

```css
.table-wrap {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-surface-1);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table thead {
  background: var(--bg-surface-3);
}

.table th {
  color: var(--text-secondary);
  font-weight: 700;
  text-align: left;
  padding: 11px 12px;
  border-bottom: 1px solid var(--border-strong);
}

.table td {
  color: var(--text-primary);
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.table tr:hover td {
  background: var(--bg-hover);
}

.table .metric {
  font-family: var(--font-mono);
  color: var(--accent-primary-hover);
}
```

### Table Rules

- Use sticky headers for long tables.
- Use monospace for numeric columns.
- Right-align comparable numbers.
- Keep row hover subtle.
- Avoid zebra striping if borders already separate rows clearly.

---

## 7.6 Status Chips

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid transparent;
}

.chip-success {
  color: var(--success);
  background: var(--success-bg);
  border-color: rgba(34, 197, 94, 0.35);
}

.chip-warning {
  color: var(--warning);
  background: var(--warning-bg);
  border-color: rgba(245, 158, 11, 0.35);
}

.chip-error {
  color: var(--error);
  background: var(--error-bg);
  border-color: rgba(239, 68, 68, 0.35);
}

.chip-info {
  color: var(--info);
  background: var(--info-bg);
  border-color: rgba(56, 189, 248, 0.35);
}

.chip-accent {
  color: var(--accent-primary-hover);
  background: var(--accent-soft);
  border-color: rgba(200, 100, 27, 0.45);
}
```

### Chip Rules

Use chips for:

- Running
- Complete
- Failed
- CUDA enabled
- CPU fallback
- Profile active
- Dirty database
- Needs attention

---

## 7.7 Logs / Console Output

```css
.log-panel {
  background: #020202;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.55;
  color: #D6D6D6;
  overflow: auto;
}

.log-line-info {
  color: var(--info);
}

.log-line-success {
  color: var(--success);
}

.log-line-warning {
  color: var(--warning);
}

.log-line-error {
  color: var(--error);
  font-weight: 700;
}

.log-line-muted {
  color: var(--text-muted);
}
```

### Log Rules

- Logs should be copyable.
- Long-running commands must stream live output.
- Errors must be visible in the main UI, not buried in a log.
- Use red for failures, amber for warnings, blue for info, green for success.

---

## 7.8 Navigation

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  border: 1px solid transparent;
}

.nav-item:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.nav-item-active {
  color: var(--accent-primary-hover);
  background: var(--accent-soft);
  border-color: rgba(200, 100, 27, 0.38);
}
```

### Navigation Rules

- Active section must be obvious.
- Use text labels with icons.
- Do not rely on icons alone unless tooltips are excellent.
- Keep navigation consistent across pages.

---

## 7.9 Tooltips

```css
.tooltip {
  background: #080808;
  color: var(--text-primary);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-sm);
  padding: 7px 9px;
  font-size: 12px;
  box-shadow: var(--shadow-accent);
  max-width: 280px;
}
```

### Tooltip Rules

Tooltips should explain:

- Technical settings
- Risky operations
- Disabled buttons
- Benchmark parameters
- GPU/CPU settings
- Database cleanup actions

Tooltips should **not** replace proper labels.

---

## 8. Motion and Effects

### 8.1 Allowed Effects

Use subtle effects only:

- Soft orange glow on active/focused items
- Tiny button press movement
- Smooth hover transitions
- Low-opacity gradients on panels
- Thin animated progress lines for running tasks

### 8.2 Avoid

- Constant pulsing everywhere
- Heavy blur
- Large animated backgrounds
- Flickering scanlines over text
- Excessive neon bloom

---

## 9. Accessibility Rules

### 9.1 Contrast

- Body text must remain high contrast against black surfaces.
- Do not use muted grey for important values.
- Orange text on black is fine for highlights, but avoid orange body paragraphs.

### 9.2 Focus States

Every interactive control must have a visible focus state.

```css
:focus-visible {
  outline: 2px solid var(--accent-primary-hover);
  outline-offset: 2px;
}
```

### 9.3 Error Handling

Errors must be:

1. Clearly visible in red
2. Written in plain language
3. Logged in the app log
4. Paired with a likely fix or next step

Example:

```text
Error: llama-bench failed to start.
Likely fix: Check that the llama.cpp binary path is correct and CUDA DLLs exist in the selected folder.
```

---

## 10. Icon Style

Use modern line icons or filled technical icons.

Recommended icon libraries:

- Lucide
- Heroicons
- Phosphor Icons
- Tabler Icons
- Fluent UI Icons

Icon rules:

- No emoji buttons.
- Use `16px` icons inside compact controls.
- Use `20px` icons for navigation.
- Use `24px` icons for dashboard cards.
- Icons should inherit text colour unless intentionally accented.

---

## 11. Stack-Specific Implementation Notes

## 11.1 HTML / CSS / JavaScript

Use the CSS variables directly in `:root`.

Recommended structure:

```text
src/styles/
├── tokens.css
├── base.css
├── components.css
├── layout.css
└── utilities.css
```

Import order:

```css
@import "./tokens.css";
@import "./base.css";
@import "./layout.css";
@import "./components.css";
@import "./utilities.css";
```

---

## 11.2 React / Svelte / Tauri Frontend

Use the CSS token file globally.

Recommended files:

```text
src/lib/theme/tokens.css
src/lib/theme/components.css
src/lib/theme/layout.css
```

For Svelte/Tauri:

```ts
import "$lib/theme/tokens.css";
import "$lib/theme/layout.css";
import "$lib/theme/components.css";
```

Component naming suggestion:

```text
AppShell
PageHeader
Panel
MetricCard
StatusChip
CommandOutput
DataTable
Toolbar
SettingsGroup
```

---

## 11.3 Python Desktop Apps

For Python GUI apps, map the same tokens into the GUI framework.

### CustomTkinter Example Tokens

```python
THEME = {
    "bg_page": "#000000",
    "bg_surface_1": "#050505",
    "bg_surface_2": "#0A0A0A",
    "bg_surface_3": "#111111",
    "text_primary": "#F2F2F2",
    "text_secondary": "#B7B7B7",
    "text_muted": "#7A7A7A",
    "accent_primary": "#C8641B",
    "accent_primary_hover": "#E07822",
    "accent_primary_active": "#A84F16",
    "border_subtle": "#1C1C1C",
    "border_strong": "#2A2A2A",
    "success": "#22C55E",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "info": "#38BDF8",
}
```

### Python UI Rules

- Use one central theme dictionary.
- Do not hard-code colours inside individual windows.
- Keep spacing constants centralised.
- Use reusable components for buttons, cards, status chips, and log panels.
- Use clear action feedback: toast, status badge, progress bar, or log line.

---

## 11.4 Rust / Tauri

For Rust backend apps with a web frontend, keep the theme in the frontend CSS layer.

Recommended structure:

```text
src/
├── lib/
│   ├── theme/
│   │   ├── tokens.css
│   │   ├── components.css
│   │   └── layout.css
src-tauri/
├── src/
│   └── commands/
```

Rust should expose status and errors cleanly so the frontend can display them using the theme.

Recommended command result shape:

```rust
#[derive(serde::Serialize)]
pub struct CommandResult<T> {
    pub ok: bool,
    pub data: Option<T>,
    pub message: String,
    pub suggestion: Option<String>,
}
```

Frontend display rule:

- `ok = true` → success chip / toast
- `ok = false` → red error panel + suggestion

---

## 11.5 WPF / .NET

Map tokens to XAML resources.

```xml
<SolidColorBrush x:Key="BgPage" Color="#000000" />
<SolidColorBrush x:Key="BgSurface1" Color="#050505" />
<SolidColorBrush x:Key="BgSurface2" Color="#0A0A0A" />
<SolidColorBrush x:Key="BgSurface3" Color="#111111" />
<SolidColorBrush x:Key="TextPrimary" Color="#F2F2F2" />
<SolidColorBrush x:Key="TextSecondary" Color="#B7B7B7" />
<SolidColorBrush x:Key="TextMuted" Color="#7A7A7A" />
<SolidColorBrush x:Key="AccentPrimary" Color="#C8641B" />
<SolidColorBrush x:Key="AccentPrimaryHover" Color="#E07822" />
<SolidColorBrush x:Key="BorderSubtle" Color="#1C1C1C" />
<SolidColorBrush x:Key="Error" Color="#EF4444" />
<SolidColorBrush x:Key="Warning" Color="#F59E0B" />
<SolidColorBrush x:Key="Success" Color="#22C55E" />
```

WPF rules:

- Use `ResourceDictionary` for all colours and spacing.
- Use styles for buttons, cards, text boxes, tabs, and list rows.
- Avoid hard-coded brush values in individual controls.

---

## 12. Standard Screen Patterns

## 12.1 Dashboard

Use this layout:

```text
Header: App name + current system/profile status
Summary row: 3–5 metric cards
Main section: Primary workflow
Side section: Recent activity / alerts
Bottom section: Logs or history
```

Metric card example:

```text
GPU VRAM
11.2 / 12.0 GB
CUDA Active
```

## 12.2 Settings Page

Group settings by purpose:

```text
General
Paths
Model / Runtime
Performance
Database Tools
Advanced
Danger Zone
```

Rules:

- Rare maintenance tools belong in Settings, not the main workflow.
- Dangerous actions need confirmation.
- Each setting should have a tooltip or helper text.

## 12.3 Benchmark / Optimisation Page

Recommended layout:

```text
Top: Selected model + profile summary
Left: Parameters
Right: Run controls + status
Middle: Results table
Bottom: Live command output
```

Live output must show actual process output, not only generic status text.

## 12.4 File / Model Browser

Recommended layout:

```text
Toolbar: Search, filter, refresh
Table: Name, type, size, modified, status
Details drawer: opens only when selected
Actions: contextual, not permanently consuming space
```

Avoid permanently visible detail panes unless the page is specifically a detail-focused inspector.

---

## 13. Do / Do Not List

### Do

- Use true black backgrounds.
- Use near-black elevated panels.
- Use burnt orange for focus and action.
- Keep borders subtle but visible.
- Use live feedback for long-running actions.
- Use reusable components.
- Keep dangerous tools separated.
- Use consistent spacing.
- Make tables readable.
- Use proper icons, not emoji.

### Do Not

- Do not cram every control into one page.
- Do not use orange everywhere.
- Do not bury errors in logs.
- Do not use placeholder-only inputs.
- Do not use random one-off colours.
- Do not create a different theme per screen.
- Do not permanently waste layout space with rarely used side panels.
- Do not make the UI look like a toy.

---

## 14. Implementation Checklist

Use this checklist when applying the theme to any app.

```text
[ ] Central theme tokens exist.
[ ] No hard-coded random colours remain.
[ ] App background uses true OLED black.
[ ] Cards/panels use near-black surfaces.
[ ] Burnt orange is used only for focus/action/active states.
[ ] Buttons have primary, secondary, danger, and disabled variants.
[ ] Inputs have visible labels and focus states.
[ ] Tables have readable spacing and clear headers.
[ ] Logs use monospace and semantic colours.
[ ] Errors are visible in red and include a suggested fix.
[ ] Long-running actions show progress/status.
[ ] Tooltips exist for technical settings.
[ ] Navigation active state is obvious.
[ ] Spacing is consistent across pages.
[ ] Rare admin/database tools are moved to Settings or Advanced.
[ ] Icons are from a proper icon library, not emojis.
[ ] UI works at common desktop sizes: 1280x720, 1366x768, 1920x1080.
[ ] Dense data areas can scroll without breaking layout.
[ ] Focus states are keyboard-accessible.
```

---

## 15. Reusable Prompt for AI/Codex/Claude/Gemini

Use this prompt when asking an AI coding tool to apply this theme.

```text
Apply the OLED Ember Tech theme across this application.

Theme requirements:
- Use true OLED black (#000000) for the main app background.
- Use near-black elevated panels: #050505, #0A0A0A, and #111111.
- Use burnt orange as the primary accent: #C8641B, hover #E07822, active #A84F16.
- Use high-contrast text: primary #F2F2F2, secondary #B7B7B7, muted #7A7A7A.
- Use subtle borders: #1C1C1C and #2A2A2A.
- Use proper semantic colours for success, warning, error, and info.
- Do not use emoji as UI icons. Use a proper icon set or simple text labels.
- Keep the style professional, technical, cyberpunk-inspired, and clean.
- Avoid neon overload, clutter, excessive gradients, or toy-like styling.

Implementation requirements:
- Create central reusable theme tokens/constants.
- Remove hard-coded one-off colours where practical.
- Build or update reusable components for panels, buttons, inputs, tables, chips, logs, tooltips, and navigation.
- Ensure consistent spacing, padding, and separation between sections.
- Ensure long-running actions have clear progress/status feedback.
- Ensure errors are visible in red, logged, and paired with a suggested fix.
- Ensure all inputs and buttons have visible focus states.
- Ensure tables and logs remain readable in dense technical screens.
- Ensure the app is usable at 1280x720, 1366x768, and 1920x1080.

Do not redesign the application workflow unless necessary. Focus on applying the theme consistently and improving clarity, spacing, hierarchy, and professionalism.
```

---

## 16. Final Standard

The finished UI should look like:

```text
Black OLED engineering console
+ clean near-black panels
+ burnt orange precision accents
+ readable technical data
+ clear actions
+ clear errors
+ no clutter
+ no gimmicks
```

The goal is not “flashy cyberpunk”.  
The goal is **premium technical software with a restrained cyberpunk edge**.
