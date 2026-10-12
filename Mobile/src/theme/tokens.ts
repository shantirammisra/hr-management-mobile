export const PinkTokens = {
  colors: {
    brand: {
      primary: '#BE185D',      // Deep Raspberry Rose - buttons, active state, major icons
      primaryDark: '#9D174D',  // Pressed states, active highlights
      soft: '#FCE7F3',         // Soft Pink - pills, secondary buttons, highlights
      borderFocus: '#F472B6',  // Active outline, date rings
      accent: '#DB2777',       // Rose accent
    },
    canvas: {
      background: '#FFF1F7',   // Gentle Petal Tint canvas
      surface: '#FFFFFF',      // Pure White card surface
      surfaceSubtle: '#F8FAFC',
    },
    border: {
      divider: '#E2E8F0',
      default: '#CBD5E1',
      focus: '#F472B6',
    },
    text: {
      primary: '#334155',      // Slate 700 - Titles, labels, high contrast
      secondary: '#64748B',    // Slate 500 - Helper text, timestamps
      muted: '#94A3B8',        // Slate 400 - Placeholders, disabled
      inverted: '#FFFFFF',     // Pure White - on primary pink
      brand: '#BE185D',        // Pink text emphasis
    },
    status: {
      present: {
        text: '#16A34A',
        bg: '#DCFCE7',
        border: '#86EFAC',
        label: 'Present',
      },
      late: {
        text: '#D97706',
        bg: '#FEF3C7',
        border: '#FDE68A',
        label: 'Late',
      },
      absent: {
        text: '#DC2626',
        bg: '#FEE2E2',
        border: '#FCA5A5',
        label: 'Absent',
      },
      leave: {
        text: '#7C3AED',
        bg: '#F3E8FF',
        border: '#D8B4FE',
        label: 'Leave',
      },
      weeklyOff: {
        text: '#475569',
        bg: '#F1F5F9',
        border: '#CBD5E1',
        label: 'Off',
      },
      holiday: {
        text: '#0D9488',
        bg: '#CCFBF1',
        border: '#99F6E4',
        label: 'Holiday',
      },
      warning: {
        text: '#EA580C',
        bg: '#FFEDD5',
        border: '#FDBA74',
        label: 'Warning',
      },
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
    screenPadding: 16,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    titleLarge: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700' as const,
    },
    titleMedium: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600' as const,
    },
    titleSmall: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '600' as const,
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '400' as const,
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '500' as const,
    },
    numeric: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700' as const,
    },
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
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 6,
    },
  },
  touch: {
    minTarget: 48,
  },
} as const;

export type ThemeTokens = typeof PinkTokens;
export type ClinicalStatusKey = keyof typeof PinkTokens.colors.status;
