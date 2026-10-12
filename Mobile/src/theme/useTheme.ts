import { PinkTokens, ClinicalStatusKey } from './tokens';

export function useTheme() {
  return {
    tokens: PinkTokens,
    colors: PinkTokens.colors,
    spacing: PinkTokens.spacing,
    radius: PinkTokens.radius,
    typography: PinkTokens.typography,
    shadows: PinkTokens.shadows,
    touch: PinkTokens.touch,
    getStatusColor: (status: ClinicalStatusKey) => PinkTokens.colors.status[status] ?? PinkTokens.colors.status.present,
  };
}

export { PinkTokens };
