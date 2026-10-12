---
version: 1.0.0
name: Pink Healthcare Design System
description: Official design token specification and visual language for the Healthcare HR Management platform.
colors:
  primary: "#BE185D"
  primary-dark: "#9D174D"
  primary-light: "#FCE7F3"
  surface: "#FFFFFF"
  surface-alt: "#FFF1F7"
  background: "#FFF1F7"
  border: "#E2E8F0"
  border-focus: "#F472B6"
  text-primary: "#334155"
  text-secondary: "#64748B"
  text-muted: "#94A3B8"
  text-inverted: "#FFFFFF"
  status-present: "#16A34A"
  status-present-bg: "#DCFCE7"
  status-late: "#D97706"
  status-late-bg: "#FEF3C7"
  status-absent: "#DC2626"
  status-absent-bg: "#FEE2E2"
  status-leave: "#7C3AED"
  status-leave-bg: "#F3E8FF"
  status-off: "#475569"
  status-off-bg: "#F1F5F9"
  status-holiday: "#0D9488"
  status-holiday-bg: "#CCFBF1"
typography:
  title-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  title-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.3
  numeric-display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverted}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 14px
  card-surface:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 16px
  input-field:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 14px
---

# Pink Healthcare Design System

> **Single Source of Truth** for the visual design, token hierarchy, and touch ergonomics of the Healthcare HR Management System.

---

## Overview

In acute and ambulatory healthcare environments, mobile tools must balance **clinical authority, sterile clarity, and human warmth**.

Clinical staff—nurses, attending physicians, pharmacists, lab technicians, and hospital administrators—frequently interact with mobile devices under high cognitive load, time pressure, and suboptimal physical conditions (dimmed wards, protective gloves).

- **Brand Personality**: Compassionate, decisive, sterile yet welcoming.
- **Emotional Tone**: Calming and trustworthy, avoiding anxiety-inducing harsh alerts.
- **Visual Stance**: Deep Raspberry Rose (`#BE185D`) radiates vitality and care, departing from fatigue-inducing generic hospital blue while preserving strict medical credibility.

---

## Colors

### Brand & Surface Palette

- **Primary (`#BE185D`)**: Deep Raspberry Rose. Used for primary CTA buttons, active tab indicators, brand headers, and high-priority action badges.
- **Primary Dark (`#9D174D`)**: Deep Rose Plum. Pressed interaction states, header gradients, and contrast accents.
- **Primary Light / Soft Pink (`#FCE7F3`)**: Tinted Rose. Subdued pill badges, secondary buttons, and active calendar highlights.
- **Background / Canvas (`#FFF1F7`)**: Petal White canvas. Eliminates sterile monitor glare in dark hospital wards.
- **Surface (`#FFFFFF`)**: Pure White. Modular cards, dialogs, bottom sheets, and form surfaces.
- **Border / Divider (`#E2E8F0`)**: Hairline borders for card structure and grid dividers.
- **Border Focus (`#F472B6`)**: Vibrant ring for active touch inputs and focused calendar dates.

### Typography Neutrals

- **Text Primary (`#334155`)**: Slate 700. Maximum readability for clinical data, names, and metrics.
- **Text Secondary (`#64748B`)**: Slate 500. Subtitles, timestamps, and explanatory labels.
- **Text Muted (`#94A3B8`)**: Slate 400. Placeholder text, inactive hints, and disabled controls.
- **Text Inverted (`#FFFFFF`)**: Crisp White for copy on primary buttons and status pills.

### Clinical Status Palette

| Status | Text / Icon Color | Background Tint | Clinical Semantics |
| :--- | :--- | :--- | :--- |
| **Present** | `#16A34A` (Emerald) | `#DCFCE7` | Shift verified, on-duty |
| **Late** | `#D97706` (Amber) | `#FEF3C7` | Grace period exceeded, punched in late |
| **Absent** | `#DC2626` (Crimson) | `#FEE2E2` | Unexcused absence or missing handover |
| **Leave** | `#7C3AED` (Violet) | `#F3E8FF` | Approved clinical or personal leave |
| **Weekly Off** | `#475569` (Slate) | `#F1F5F9` | Scheduled roster rest day |
| **Holiday** | `#0D9488` (Teal) | `#CCFBF1` | Gazetted national or hospital holiday |

---

## Typography

The typography scale utilizes `Inter` (or native platform sans-serif: `SF Pro` on iOS, `Roboto` on Android) tuned for tabular numbers and fast scannability:

- **`title-lg` (24px / Bold 700 / 1.25)**: Top screen headers, daily dashboard greetings, profile headers.
- **`title-md` (20px / SemiBold 600 / 1.3)**: Section modules, modal dialog titles, department heads.
- **`title-sm` (17px / SemiBold 600 / 1.3)**: Card headers, date headers, bottom sheet titles.
- **`body-lg` (16px / Regular 400 / 1.4)**: Prominent form textboxes, primary list item titles.
- **`body-md` (14px / Regular 400 / 1.45)**: Standard copy, leave reasons, handover notes.
- **`body-sm` (12px / Regular 400 / 1.4)**: Timestamps, registration numbers (NNC/NPC/NMC), audit trails.
- **`caption` (11px / Medium 500 / 1.3)**: Tab bar icons, compact badges, pill indicators.
- **`numeric-display` (28px / Bold 700 / 1.2)**: Digital punch clock, KPI summary metrics, total leave counters.

---

## Layout

1. **Modular Grid**: Base-4 / Base-8 system (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`).
2. **Screen Margin**: Standard `16px` (`spacing.lg`) horizontal gutter on all mobile views.
3. **Card Spacing**: `12px` vertical margin between consecutive clinical cards.
4. **Calendar Split Layout**:
   - Top 45% screen height: Monthly visual calendar grid with status dot matrices.
   - Bottom 55% screen height: Scrollable card list showing punch logs, shift times, and manager remarks for the selected day.

---

## Elevation & Depth

- **Flat Foundation with Soft Boundaries**: Heavy drop shadows create visual noise in dense clinical listings; subtle borders and soft tinted elevation are favored.
- **Card Shadow**:
  - `shadowColor`: `#BE185D`
  - `shadowOffset`: `{ width: 0, height: 2 }`
  - `shadowOpacity`: `0.05`
  - `shadowRadius`: `8px`
  - `elevation`: `2` (Android)
- **Floating Action Lift**:
  - `shadowColor`: `#BE185D`
  - `shadowOpacity`: `0.15`
  - `shadowRadius`: `16px`
  - `elevation`: `6` (Android)

---

## Shapes

- **Badges & Chips (`rounded.sm` / 6px)**: Compact status chips, department tags.
- **Controls & Form Fields (`rounded.md` / 10px)**: Text inputs, dropdown pickers, CTA buttons.
- **Cards & Dialogs (`rounded.lg` / 16px)**: Clinical cards, bottom sheets, profile cards.
- **Floating Controls (`rounded.xl` / 24px)**: Pill buttons, status filters.
- **Avatars & Punch Button (`rounded.full` / 9999px)**: Staff avatars, biometric punch circle.

---

## Components

### 1. Primary Punch Button
- Prominent circular or pill touch control (`min-height: 52px`, `min-width: 52px`).
- Background: `{colors.primary}` with active press `{colors.primary-dark}`.
- Tactile haptic feedback triggered on press.

### 2. Clinical Status Badge
- Rounded pill (`rounded.sm`, padding `4px 8px`).
- Background tint paired with high-contrast text color from the Clinical Status Palette.

### 3. Bottom Navigation Bar
- 5 primary items: Dashboard, Attendance, Shifts, Leaves, Profile.
- Active item uses `{colors.primary}` with `{colors.primary-light}` background pill.
- Inactive item uses `{colors.text-muted}`.

---

## Do's and Don'ts

### Do
- Maintain minimum **48x48 dp** touch targets for all interactive elements to support clinical glove use.
- Use explicit visual status badges accompanied by text labels (never color alone).
- Support quick scan patterns: show time-in, time-out, and shift code prominently on attendance cards.
- Ensure all body text meets **WCAG AA (4.5:1)** contrast against backgrounds.

### Don't
- Don't use harsh pure `#000000` text on `#FFFFFF`; use Slate 700 (`#334155`) to mitigate ocular fatigue.
- Don't use dense multi-column desktop tables on mobile viewports.
- Don't hide critical clinical errors behind cryptic toast dismissals; use inline contextual feedback.
- Don't trigger destructive actions (e.g., leave cancellation) without two-step confirmation.

---

## Healthcare Ergonomics & Glove-Friendly UX

1. **Touch Target Slop**: All buttons include hit slop of at least 8px on all edges.
2. **One-Thumb Zone**: Primary actions (Check-in punch, quick filter, request submission) are positioned within the lower half of the viewport.
3. **High Contrast In Sunlight & Ward Lighting**: Visual elements remain distinct under bright surgical lamps and darkened ward conditions.
