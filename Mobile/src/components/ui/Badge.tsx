import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { PinkTokens, ClinicalStatusKey } from '@/theme/tokens';

export type BadgeVariant = ClinicalStatusKey | 'brand' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Badge({
  label,
  variant = 'brand',
  size = 'md',
  icon,
  style,
  textStyle,
}: BadgeProps) {
  const colorConfig = getBadgeColors(variant);

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[
        styles.base,
        sizeStyles[size].container,
        {
          backgroundColor: colorConfig.bg,
          borderColor: colorConfig.border,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text
        style={[
          styles.text,
          sizeStyles[size].text,
          { color: colorConfig.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function getBadgeColors(variant: BadgeVariant) {
  if (variant in PinkTokens.colors.status) {
    const status = PinkTokens.colors.status[variant as ClinicalStatusKey];
    return {
      bg: status.bg,
      border: status.border,
      text: status.text,
    };
  }

  if (variant === 'brand') {
    return {
      bg: PinkTokens.colors.brand.soft,
      border: PinkTokens.colors.brand.borderFocus,
      text: PinkTokens.colors.brand.primary,
    };
  }

  // neutral
  return {
    bg: '#F1F5F9',
    border: '#CBD5E1',
    text: PinkTokens.colors.text.secondary,
  };
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: PinkTokens.radius.full,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
  },
});

const sizeStyles = {
  sm: StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    text: {
      fontSize: 11,
      lineHeight: 14,
    },
  }),
  md: StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    text: {
      fontSize: 12,
      lineHeight: 16,
    },
  }),
};
