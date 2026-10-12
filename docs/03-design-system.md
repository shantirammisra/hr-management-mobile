# 03 - Mobile UI Design System (Pink Healthcare Theme)

This document establishes the UI/UX design tokens, component guidelines, visual accessibility standards, and styling architecture for the Healthcare HR Management Mobile Application.

---

## 1. Visual Design Philosophy & Aesthetics

In healthcare environments, mobile interfaces must balance **clinical calm, sterile clarity, and human warmth**. 

- **Primary Identity:** Deep Raspberry Rose (`#BE185D`) radiates compassion, clinical authority, and high brand recall without the clinical fatigue of standard hospital blue.
- **Backgrounds:** Gentle Petal Tint (`#FFF1F7`) replaces blinding pure white glare, softening contrast for night-shift healthcare workers in dimmed wards.
- **Content Cards:** Clean Pure White (`#FFFFFF`) cards with soft border definitions (`#E2E8F0`) and subtle elevation create clear physical separation between dense data modules.
- **Accessibility:** All text-to-background combinations meet or exceed **WCAG 2.1 AA** (4.5:1 for body copy, 3:1 for large headers and interactive buttons).

---

## 2. Design Tokens Architecture

### A. Color Palette Specifications

```
+-----------------------------------------------------------------------------------------+
|                                CORE BRAND & CANVAS                                      |
|  Primary Pink:      #BE185D  (Buttons, active tabs, major icons, brand headers)         |
|  Primary Dark:      #9D174D  (Pressed states, active highlights, header gradients)      |
|  Soft Pink:         #FCE7F3  (Pill badge backgrounds, secondary buttons, active cells)  |
|  Canvas/Background: #FFF1F7  (Full-screen background canvas, list view backdrop)        |
|  Card Surface:      #FFFFFF  (Interactive cards, modal sheets, popups, inputs)          |
|  Border/Divider:    #E2E8F0  (Subtle card dividers, hairline borders, calendar lines)   |
|  Border Focus:      #F472B6  (Input active focus ring, active date outline)             |
+-----------------------------------------------------------------------------------------+
|                                TYPOGRAPHY & NEUTRALS                                    |
|  Text Primary:      #334155  (Slate 700 - Titles, data values, primary labels)          |
|  Text Secondary:    #64748B  (Slate 500 - Subtitles, helper text, timestamps)          |
|  Text Muted:        #94A3B8  (Slate 400 - Placeholders, disabled text, hints)           |
|  Text Inverted:     #FFFFFF  (Pure White - Text on primary pink buttons and badges)     |
+-----------------------------------------------------------------------------------------+
|                                CLINICAL STATUS PALETTE                                  |
|  Present (Green):   #16A34A  (Text/Icon)  |  #DCFCE7  (Badge/Cell Background)           |
|  Late (Amber):      #D97706  (Text/Icon)  |  #FEF3C7  (Badge/Cell Background)           |
|  Absent (Red):      #DC2626  (Text/Icon)  |  #FEE2E2  (Badge/Cell Background)           |
|  Leave (Purple):    #7C3AED  (Text/Icon)  |  #F3E8FF  (Badge/Cell Background)           |
|  Weekly Off (Slate):#475569  (Text/Icon)  |  #F1F5F9  (Badge/Cell Background)           |
|  Holiday (Teal):    #0D9488  (Text/Icon)  |  #CCFBF1  (Badge/Cell Background)           |
+-----------------------------------------------------------------------------------------+
```

### B. Typography Scale (Mobile Scale)
Utilizes system sans-serif (`SF Pro` on iOS, `Roboto` on Android) or loaded font families (`Inter`) for optimal tabular figure alignment.

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `font.titleLarge` | 24px | 30px | Bold (700) | Main Screen Titles, Dashboard Greetings |
| `font.titleMedium`| 20px | 26px | SemiBold (600) | Section Headers, Modal Titles |
| `font.titleSmall` | 17px | 22px | SemiBold (600) | Card Headers, Dialog Titles |
| `font.bodyLarge`  | 16px | 22px | Regular (400) | Primary Data Inputs, Prominent Lists |
| `font.bodyMedium` | 14px | 20px | Regular (400) | Standard Body Copy, Descriptive Text |
| `font.bodySmall`  | 12px | 16px | Regular (400) | Timestamps, Secondary Metadata |
| `font.caption`    | 11px | 14px | Medium (500) | Tab Bar Labels, Badge Text |
| `font.numeric`    | 28px | 34px | Bold (700) | Punch Clocks, KPI Counter Numbers |

### C. Spacing & Touch Metrics
All spacing respects a base-4 / base-8 modular grid system:

- `spacing.xxs`: 2px
- `spacing.xs`: 4px
- `spacing.sm`: 8px
- `spacing.md`: 12px
- `spacing.lg`: 16px (Standard screen horizontal padding)
- `spacing.xl`: 24px
- `spacing.xxl`: 32px
- **Minimum Touch Target:** 48x48 dp for all primary buttons, interactive calendar cells, and action chips (ensuring effortless tap accuracy even when wearing clinical nitrile gloves).

### D. Radii & Elevation (Rounded Healthcare Feel)
- `radius.sm`: 6px (Small badges, chips)
- `radius.md`: 10px (Form input textboxes, action buttons)
- `radius.lg`: 16px (Content cards, bottom sheet dialogs)
- `radius.xl`: 24px (Pill buttons, floating status pills)
- `radius.full`: 9999px (Circular avatars, punch buttons)
- **Shadows & Elevation:**
  - `shadow.card`: Soft ambient shadow (`shadowColor: '#BE185D'`, `shadowOffset: {width: 0, height: 2}`, `shadowOpacity: 0.05`, `shadowRadius: 8`, `elevation: 2`)
  - `shadow.floating`: Pronounced lift (`shadowColor: '#BE185D'`, `shadowOpacity: 0.15`, `shadowRadius: 16`, `elevation: 6`)

---

## 3. UI Component Design Specifications

### A. Navigation Architecture
1. **Bottom Tab Bar:**
   - Background: Pure White (`#FFFFFF`) with 1px top border (`#E2E8F0`).
   - Active Tab: Primary Pink (`#BE185D`) icon and text label with an active soft pill backdrop (`#FCE7F3`).
   - Inactive Tab: Slate Muted (`#94A3B8`).
   - Iconography: Outlined feather/lucide icons when inactive; solid/filled when active.
2. **Stack Navigation Headers:**
   - Clean, lightweight header with Petal Pink (`#FFF1F7`) or White surface.
   - Distinct Left Chevron `<` back button with accessible 48px hit slop.
   - Right action icons (Filter, Search, Export, Notification Bell).

### B. Healthcare Card Component
- Background: `#FFFFFF`
- Border: 1px solid `#E2E8F0`
- Radius: `16px`
- Inner Padding: `16px`
- Standard Layout: Header row (Icon + Category Title + Status Badge), Middle section (Key data points with bold slate labels), Footer (Action links or timestamps).

### C. Status Badge Component
Every status badge combines **Color + Accessible Text Label + Dedicated Icon** (never relying solely on color hue):
- `[✓ Present]` - Green text, `#DCFCE7` background, Checkmark icon.
- `[⏱ Late]` - Amber text, `#FEF3C7` background, Clock icon.
- `[✕ Absent]` - Red text, `#FEE2E2` background, Cross icon.
- `[✈ Leave]` - Purple text, `#F3E8FF` background, Calendar/Plane icon.
- `[☕ Weekly Off]` - Slate text, `#F1F5F9` background, Coffee cup icon.
- `[★ Holiday]` - Teal text, `#CCFBF1` background, Star icon.

### D. Attendance Calendar Specific Component Layout
Mobile screen space requires a specialized vertical layout:
1. **Top Section: Monthly Grid (45% viewport height):**
   - Header with Month Picker (`< October 2026 >`).
   - 7 weekday columns (`S, M, T, W, T, F, S`).
   - Day cells (40x40 dp circle or rounded squircle) containing day number and a distinct colored status pip below it.
   - Selected date highlighted with primary pink outline ring (`#BE185D`).
2. **Bottom Section: Date-Wise Details Deck (55% viewport height):**
   - Scrollable card container updating immediately on date tap.
   - Shift badge, check-in punch time with terminal ID, check-out punch time, total work hours calculation, and correction request button.

---

## 4. UI State Guidelines

### A. Loading State
- **Skeleton Loaders:** Soft shimmering bone placeholders (`#FCE7F3` transitioning to `#FFFFFF`) matching the exact shape of profile cards, attendance summary pills, and directory items.
- **Micro-Spinners:** Subtle pink activity indicator (`#BE185D`) centered for pull-to-refresh.

### B. Empty State
- Centered cheerful medical/clipboard vector graphic with soft pink accents.
- High-contrast title (e.g., *"No Pending Leave Requests"*).
- Informative helper message (e.g., *"All staff leave applications in your department have been reviewed."*).
- Clear primary CTA button if action is available (e.g., `[Apply for Leave]`).

### C. Error State
- Inline notification card with Soft Red background (`#FEE2E2`), Alert-Circle icon, and Clear Retry Button (`[Try Again]`).
- Full-screen error fallback for failed initial bootstrap or server 500s with clear diagnostic code (`ERR_SYNC_FAIL`).

### D. Offline State
- Persistent slim top-banner strip in Soft Amber (`#FEF3C7`): *"Offline Mode - Showing cached records from 10:45 AM"*.
- Actions requiring network connectivity (e.g., *"Submit Leave"*) display an offline indicator explaining that the request is queued locally in the outbox and will auto-sync upon reconnection.

---

## 5. React Native StyleSheet Implementation Reference

Below is the concrete design tokens schema used across all components:

```typescript
// src/theme/tokens.ts
export const PinkTheme = {
  colors: {
    primary: '#BE185D',
    primaryDark: '#9D174D',
    softPink: '#FCE7F3',
    background: '#FFF1F7',
    card: '#FFFFFF',
    textPrimary: '#334155',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverted: '#FFFFFF',
    border: '#E2E8F0',
    borderFocus: '#F472B6',

    // Status Palettes (Color + Light Background)
    status: {
      present: { text: '#16A34A', bg: '#DCFCE7', border: '#86EFAC' },
      late: { text: '#D97706', bg: '#FEF3C7', border: '#FDE68A' },
      absent: { text: '#DC2626', bg: '#FEE2E2', border: '#FCA5A5' },
      leave: { text: '#7C3AED', bg: '#F3E8FF', border: '#D8B4FE' },
      weeklyOff: { text: '#475569', bg: '#F1F5F9', border: '#CBD5E1' },
      holiday: { text: '#0D9488', bg: '#CCFBF1', border: '#99F6E4' },
    },
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    titleLarge: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
    titleMedium: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
    titleSmall: { fontSize: 17, lineHeight: 22, fontWeight: '600' as const },
    bodyLarge: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
    bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
    bodySmall: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
    caption: { fontSize: 11, lineHeight: 14, fontWeight: '500' as const },
    numericClock: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  },
  shadows: {
    card: {
      shadowColor: '#BE185D',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    floating: {
      shadowColor: '#BE185D',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};
```
